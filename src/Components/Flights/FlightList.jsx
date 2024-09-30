import { useState } from "react"
import { Pagination, Box, Typography } from "@mui/material"
import PropTypes from "prop-types"
import FlightCard from "./FlightCard"

const FlightList = ({ flights }) => {
  const { data } = flights ?? {}
  const { itineraries } = data ?? {}
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20

  // should move to helper function if time available + test
  const totalPages = Math.ceil(itineraries?.length / itemsPerPage) || 1

  const currentItems = itineraries?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

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
FlightList.propTypes = {
  flights: PropTypes.shape({
    data: PropTypes.shape({
      itineraries: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          price: PropTypes.number,
        })
      ),
    }),
  }),
}

export default FlightList
