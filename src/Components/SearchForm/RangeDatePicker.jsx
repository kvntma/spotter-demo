import { useState, useRef, useContext } from "react"
import PropTypes from "prop-types"
import { TextField, IconButton, Popover, Button } from "@mui/material"
import { DateRange } from "@mui/icons-material"
import { DayPicker } from "react-day-picker"
import "react-day-picker/style.css"
import dayjs from "dayjs"
import "./RangeDatePicker.css" // Import the CSS file
import { InputContext } from "../../Context/AirportContext"

const RangeDatePicker = ({ onDateChange, onClose }) => {
  const { setDepartureDate, setReturnDate } = useContext(InputContext)
  const [selected, setSelected] = useState({ from: undefined, to: undefined })

  const footer =
    selected.from && selected.to
      ? `Departure ${dayjs(selected.from).format("YYYY-MM-DD")} to ${dayjs(
          selected.to
        ).format("YYYY-MM-DD")}`
      : "Choose a date range"

  const handleSelect = (range) => {
    setSelected(range)
    if (range.from && range.to) {
      onDateChange(range)
    }
    setDepartureDate(dayjs(selected.from).format("YYYY-MM-DD"))
    setReturnDate(dayjs(selected.to).format("YYYY-MM-DD"))
  }

  return (
    <div className="day-picker-container">
      <div className="day-picker">
        <DayPicker
          mode="range"
          selected={selected}
          onSelect={handleSelect}
          min={1}
          footer={footer}
          disabled={{ before: new Date() }}
        />
        <div className="button-container">
          <Button onClick={onClose} variant="contained" color="primary">
            Done
          </Button>
        </div>
      </div>
    </div>
  )
}

const DatePickerWithIcon = ({ onError }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedRange, setSelectedRange] = useState({ from: null, to: null })

  const textFieldRef = useRef(null)

  const handleIconClick = () => {
    setAnchorEl(textFieldRef.current)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? "date-picker-popover" : undefined

  const handleDateChange = (range) => {
    setSelectedRange(range)
    if (range.from && range.to) {
      onError(range, "")
    }
  }

  return (
    <div>
      <TextField
        label="Select Date Range"
        value={
          selectedRange.from && selectedRange.to
            ? `${dayjs(selectedRange.from).format("DD/MM/YYYY")} to ${dayjs(
                selectedRange.to
              ).format("DD/MM/YYYY")}`
            : ""
        }
        InputProps={{
          endAdornment: (
            <IconButton onClick={handleIconClick}>
              <DateRange />
            </IconButton>
          ),
        }}
        fullWidth
        inputRef={textFieldRef}
        error={!!selectedRange.from && !selectedRange.to}
        helperText={"Please select a date"}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <RangeDatePicker
          onDateChange={handleDateChange}
          onClose={handleClose}
        />
      </Popover>
    </div>
  )
}

export { RangeDatePicker, DatePickerWithIcon }

RangeDatePicker.propTypes = {
  onDateChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}

DatePickerWithIcon.propTypes = {
  onError: PropTypes.func.isRequired,
}
