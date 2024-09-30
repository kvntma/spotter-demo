import { useContext } from "react"
import spotter from "./assets/spotter.png"
import SearchForm from "./Components/SearchForm/SearchForm"
import FlightList from "./Components/Flights/FlightList"
import "./App.css"
import { InputContext } from "./Context/AirportContext"
import { Box } from "@mui/material"

function App() {
  const { flights, setFlights } = useContext(InputContext)

  const handleSearch = (flightData) => {
    setFlights(flightData)
  }

  return (
    <Box
      sx={{
        textAlign: "center",
        backgroundColor: "#1f2125",
        color: "#fff",
        padding: "20px",
        borderRadius: "10px",
        width: "100%",
        margin: "auto",
      }}
    >
      <a href="https://spotter.ai/" target="_blank">
        <img src={spotter} className="logo" alt="Vite logo" />
      </a>
      <h1>Spotter Flight Demo</h1>
      <SearchForm onSearch={handleSearch} />
      {flights && <FlightList flights={flights} />}
    </Box>
  )
}

export default App
