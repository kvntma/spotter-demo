import { useContext, useState } from "react"
import axios from "axios"
import PropTypes from "prop-types"
import {
  Button,
  Box,
  Alert,
  Snackbar,
  CircularProgress,
  Typography,
} from "@mui/material"
import dayjs from "dayjs"
import AirportAutocomplete from "./AirportAutocomplete"
import { InputContext } from "../../Context/AirportContext"
import SingleDatePicker from "./SingleDatePicker"
import { DatePickerWithIcon } from "./RangeDatePicker"
import { FormControlLabel, Switch } from "@mui/material"
import TravelerSelection from "./Travelers"
import TravelClassDropdown from "./Class"

const SearchForm = ({ onSearch }) => {
  const {
    inputValues,
    departureDate,
    setDepartureDate,
    returnDate,
    setReturnDate,
    travelers,
    travelClass,
  } = useContext(InputContext)
  const [errors, setErrors] = useState({})
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [isRangePicker, setIsRangePicker] = useState(false)

  const handleToggleChange = (event) => {
    setIsRangePicker(event.target.checked)
    if (!event.target.checked) {
      setReturnDate(null)
      setDepartureDate(null)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (Object.values(errors).some((error) => error)) {
      setSnackbarMessage("Please fix the errors before submitting.")
      setSnackbarOpen(true)
      return
    }

    if (!inputValues.departure || !inputValues.arrival) {
      setSnackbarMessage("Please select both departure and arrival airports.")
      setSnackbarOpen(true)
      return
    }

    if (!departureDate) {
      setSnackbarMessage("Please select a departure date.")
      setSnackbarOpen(true)
      return
    }

    if (isRangePicker && !returnDate) {
      setSnackbarMessage("Please select a return date and departure date.")
      setSnackbarOpen(true)
      return
    }

    setLoading(true)

    const options = {
      method: "GET",
      url: "https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchFlights",
      params: {
        originSkyId: inputValues.departure.skyId || "",
        destinationSkyId: inputValues.arrival.skyId || "",
        originEntityId: inputValues.departure.entityId || "",
        destinationEntityId: inputValues.arrival.entityId || "",
        date: departureDate ? dayjs(departureDate).format("YYYY-MM-DD") : "",
        returnDate: returnDate ? dayjs(returnDate).format("YYYY-MM-DD") : "",
        sortBy: "best",
        currency: "USD",
        adults: travelers.adults,
        childrens: travelers.children,
        cabinClass: travelClass || "economy",
      },
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_SKY_API_KEY,
        "X-RapidAPI-Host": import.meta.env.VITE_SKY_API_HOST,
      },
    }

    try {
      const response = await axios.request(options)
      if (response.status === false) {
        setSnackbarMessage("Check API")
        setSnackbarOpen(true)
      }
      onSearch(response.data)
    } catch (error) {
      console.error(error)
      setSnackbarMessage("An error occurred while searching for flights.")
      setSnackbarOpen(true)
    } finally {
      setLoading(false) // Set loading to false when the API call ends
    }
  }

  const handleError = (type, errorMessage) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [type]: errorMessage,
    }))
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false)
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <AirportAutocomplete type="departure" onError={handleError} />
      <AirportAutocomplete type="arrival" onError={handleError} />
      {isRangePicker ? (
        <DatePickerWithIcon onError={handleError} />
      ) : (
        <SingleDatePicker onError={handleError} />
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <FormControlLabel
          control={
            <Switch
              checked={isRangePicker}
              onChange={handleToggleChange}
              name="datePickerToggle"
              color="primary"
            />
          }
          label={isRangePicker ? "Round Trip" : "One Way"}
        />
        <TravelerSelection sx={{ height: "100%" }} />
        <TravelClassDropdown sx={{ height: "100%" }} />
      </Box>
      {Object.values(errors).some((error) => error) && (
        <Alert severity="error" variant="filled">
          Please fix the errors before submitting.
        </Alert>
      )}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
        startIcon={loading ? <CircularProgress size={20} /> : null}
      >
        {loading ? (
          <Typography color="primary" variant="button">
            Searching...
          </Typography>
        ) : (
          "Search Flights"
        )}
      </Button>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  )
}

SearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
}

export default SearchForm
