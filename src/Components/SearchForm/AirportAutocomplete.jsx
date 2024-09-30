import { useState, useEffect, useContext } from "react"
import axios from "axios"
import {
  Autocomplete,
  TextField,
  CircularProgress,
  Popper,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import { InputContext } from "../../Context/AirportContext"
import PropTypes from "prop-types"

const CustomPopper = styled(Popper)({
  "& .MuiAutocomplete-option": {
    color: "black",
  },
})

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const AirportAutocomplete = ({ type, onError }) => {
  const { inputValues, setInputValue } = useContext(InputContext)
  const [options, setOptions] = useState([])
  const [loading, setLoading] = useState(false)
  const [debouncedInputValue, setDebouncedInputValue] = useState("")
  const [error, setError] = useState("")

  const fetchAirports = async (query) => {
    setLoading(true)
    try {
      const response = await axios.get(
        "https://scrapper.p.rapidapi.com/api/v1/flights/searchAirport",
        {
          params: { query, locale: "en-US" },
          headers: {
            "X-RapidAPI-Key": import.meta.env.VITE_SKY_API_KEY,
            "X-RapidAPI-Host": import.meta.env.VITE_SKY_API_HOST,
          },
        }
      )
      setOptions(response.data.data || [])
    } catch (error) {
      console.error("Error fetching airports:", error)
      setOptions([])
    } finally {
      setLoading(false)
    }
  }

  // Debounced input handler
  useEffect(() => {
    if (debouncedInputValue.trim() === "") {
      setOptions([])
      return
    }

    const timeoutId = setTimeout(() => {
      fetchAirports(debouncedInputValue)
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [debouncedInputValue])

  const handleBlur = () => {
    const matchedOption =
      inputValues[type] &&
      inputValues[type].presentation.suggestionTitle === debouncedInputValue
    if (!matchedOption) {
      const errorMessage = "No matching airport found"
      setError(errorMessage)
      setInputValue(type, "") // Clear the input value for the specific type
      onError && onError(type, errorMessage) // Propagate error to the parent
    } else {
      setError("")
      onError && onError(type, "") // Clear error in the parent
    }
  }

  const handleChange = (_, newValue) => {
    if (newValue) {
      setError("") // Clear the error message if a valid option is selected
      onError && onError(type, "") // Clear error in the parent
    }
    setInputValue(type, newValue) // Set the input value for the specific type
  }

  return (
    <>
      <Autocomplete
        freeSolo
        options={options}
        getOptionLabel={(option) => option.presentation.suggestionTitle}
        renderOption={(props, option) => (
          <li {...props} key={option.skyId}>
            {option.presentation.suggestionTitle}
          </li>
        )}
        filterOptions={(x) => x}
        onInputChange={(_, newInputValue) => {
          setDebouncedInputValue(newInputValue)
        }}
        onChange={handleChange}
        onBlur={handleBlur}
        PopperComponent={CustomPopper}
        renderInput={(params) => (
          <TextField
            {...params}
            label={`Search ${capitalizeFirstLetter(type)} Airport`}
            variant="outlined"
            error={!!error}
            helperText={error}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        value={inputValues[type] || null} // Display the selected option
      />
    </>
  )
}

AirportAutocomplete.propTypes = {
  type: PropTypes.string.isRequired, // Prop to differentiate between departure and arrival
  onError: PropTypes.func, // Prop to propagate errors to the parent
}

export default AirportAutocomplete
