import { useContext } from "react"
import { FormControl, MenuItem, Select, Box, Typography } from "@mui/material"
import CheckIcon from "@mui/icons-material/Check"
import { InputContext } from "../../Context/AirportContext"

const TravelClassDropdown = () => {
  const { travelClass, setTravelClass } = useContext(InputContext)

  const handleChange = (event) => {
    setTravelClass(event.target.value)
  }

  const travelClasses = [
    { value: "economy", label: "Economy" },
    { value: "premium_economy", label: "Premium Economy" },
    { value: "business", label: "Business" },
    { value: "first", label: "First Class" },
  ]

  return (
    <Box sx={{ minWidth: 150, backgroundColor: "#1f2125", color: "#fff" }}>
      <FormControl fullWidth>
        <Select
          value={travelClass}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Select travel class" }}
          sx={{
            color: "#fff",
            backgroundColor: "#1f2125",
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#777",
            },
            ".MuiSvgIcon-root": {
              color: "#fff",
            },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: "#222",
              },
            },
          }}
        >
          {travelClasses.map((travelClassOption) => (
            <MenuItem
              key={travelClassOption.value}
              value={travelClassOption.value}
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                width="100%"
              >
                <Typography>{travelClassOption.label}</Typography>
                {travelClass === travelClassOption.value && <CheckIcon />}
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default TravelClassDropdown
