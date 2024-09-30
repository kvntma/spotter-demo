import { useContext, useState } from "react"
import {
  Button,
  IconButton,
  Popover,
  Box,
  Typography,
  ButtonGroup,
} from "@mui/material"
import { Person } from "@mui/icons-material"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import { InputContext } from "../../Context/AirportContext"

const TravelerSelection = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const { travelers, setTravelers } = useContext(InputContext)

  // Maybe more testing here, if time available
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? "traveler-popover" : undefined

  // Increment and decrement functions helpers
  const handleIncrement = (type) => {
    setTravelers((prev) => ({
      ...prev,
      [type]: prev[type] < 9 ? prev[type] + 1 : prev[type],
    }))
  }

  const handleDecrement = (type) => {
    setTravelers((prev) => ({
      ...prev,
      [type]: prev[type] > 0 ? prev[type] - 1 : 0,
    }))
  }

  const totalTravelers = travelers.adults + travelers.children

  return (
    <div>
      {/* Button to trigger the popover */}
      <Button
        sx={{ height: "100%" }}
        aria-describedby={id}
        variant="outlined"
        startIcon={<Person />}
        onClick={handleClick}
      >
        {totalTravelers} Traveler{totalTravelers > 1 ? "s" : ""}
      </Button>

      {/* Popover content */}
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
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box
          p={2}
          sx={{ width: 250, backgroundColor: "#1f2125", color: "#fff" }}
        >
          {/* Adults */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography>Adults</Typography>
            <ButtonGroup
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconButton
                onClick={() => handleDecrement("adults")}
                disabled={travelers.adults <= 1}
              >
                <RemoveIcon />
              </IconButton>
              <Typography color="primary">{travelers.adults}</Typography>
              <IconButton
                onClick={() => handleIncrement("adults")}
                disabled={travelers.adults >= 9}
              >
                <AddIcon />
              </IconButton>
            </ButtonGroup>
          </Box>

          {/* Children */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Box>
              <Typography>Children</Typography>
              <Typography variant="caption">Aged 2-11</Typography>
            </Box>
            <ButtonGroup
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconButton
                onClick={() => handleDecrement("children")}
                disabled={travelers.children <= 0}
                color={travelers.children >= 9 ? "disabled" : "primary"}
              >
                <RemoveIcon />
              </IconButton>
              <Typography color="primary">{travelers.children}</Typography>
              <IconButton
                onClick={() => handleIncrement("children")}
                disabled={travelers.children >= 9}
                color={travelers.children >= 9 ? "disabled" : "primary"}
              >
                <AddIcon />
              </IconButton>
            </ButtonGroup>
          </Box>
        </Box>
      </Popover>
    </div>
  )
}

export default TravelerSelection
