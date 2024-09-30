import { createTheme } from "@mui/material/styles"

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#1f2125", // Dark background
    },
    text: {
      primary: "#d3d3d3", // Light grey text globally
    },
    divider: "#ffffff", // White borders
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          color: "#d3d3d3", // Global text color
          backgroundColor: "#1f2125", // Dark background globally
          borderColor: "#ffffff", // Global white border color
        },
        "*": {
          color: "#d3d3d3", // Global text color for all elements
          borderColor: "#ffffff", // White border globally
        },
      },
    },

    // headers
    MuiDayCalendar: {
      styleOverrides: {
        weekDayLabel: {
          color: "white",
          fontWeight: "bold", // Optionally make the labels bold
        },
        paper: {
          backgroundColor: "#222",
          color: "#fff",
        },
      },
    },

    // day circles
    MuiPickersDay: {
      styleOverrides: {
        root: {
          color: "white",
          backgroundColor: "#333",
          "&:hover": {
            backgroundColor: "#444", // Hover background color
          },
          paper: {
            backgroundColor: "#222", // Background color for the picker dialog
            color: "#fff", // Text color inside the picker dialog
          },
        },
      },
    },

    //overall background and
    MuiDateCalendar: {
      styleOverrides: {
        root: {
          backgroundColor: "#222", // Dark background for the calendar
        },
        paper: {
          backgroundColor: "#333", // Custom background for Paper within calendar only
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ffffff",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ffffff",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ffffff",
          },
        },
        input: {
          color: "#d3d3d3", // White text in input fields
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#d3d3d3",
          "&.Mui-focused": {
            color: "#d3d3d3",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderColor: "#ffffff",
        },
      },
    },
  },
})

export default theme
