import { useState } from "react"
import { Pagination, Box, Typography } from "@mui/material"
import FlightCard from "./FlightCard"

// eslint-disable-next-line react/prop-types
const FlightList = ({ flights }) => {
  const { data } = flights ?? {}
  const { itineraries } = data ?? {}
  const [currentPage, setCurrentPage] = useState(1) // Current page number
  const itemsPerPage = 20 // Number of items to show per page

  // Calculate total pages
  const totalPages = Math.ceil(itineraries?.length / itemsPerPage) || 1

  // Slice the data array to only show items for the current page
  const currentItems = itineraries?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value)
  }

  return (
    <Box
      sx={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Typography variant="h5" gutterBottom>
        Flights (Page {currentPage} of {totalPages})
      </Typography>

      {itineraries?.length === 0 && (
        <Typography variant="h5" color={"warning"}>
          No flights found
        </Typography>
      )}

      <Box display="flex" flexDirection="column" gap={2}>
        {currentItems.map((item) => (
          <FlightCard itinerary={item} key={item.id} />
        ))}
      </Box>
      {/* Pagination Controls */}
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        variant="outlined"
        shape="rounded"
      />
    </Box>
  )
}

export default FlightList
