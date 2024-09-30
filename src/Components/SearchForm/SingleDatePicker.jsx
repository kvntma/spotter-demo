import { useContext } from "react"
import PropTypes from "prop-types"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { TextField } from "@mui/material"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs" // Dayjs adapter

import { InputContext } from "../../Context/AirportContext"

const SimpleDatePicker = ({ onError }) => {
  const { departureDate, setDepartureDate } = useContext(InputContext)

  const handleDateChange = (newDate) => {
    setDepartureDate(newDate)
    onError(departureDate, "")
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Select Date"
        value={departureDate}
        onChange={handleDateChange}
        disablePast
        PaperProps={{
          sx: {
            backgroundColor: "black",
            color: "white",
          },
        }}
        error={!!departureDate}
        helperText={"Please select a date"}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  )
}

SimpleDatePicker.propTypes = {
  onError: PropTypes.func.isRequired,
}

export default SimpleDatePicker
