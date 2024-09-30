import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import App from "./App.jsx"
import "./index.css"

import theme from "./theme"
import { InputProvider } from "./Context/AirportContext.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <InputProvider>
        <CssBaseline />
        <App />
      </InputProvider>
    </ThemeProvider>
  </StrictMode>
)
