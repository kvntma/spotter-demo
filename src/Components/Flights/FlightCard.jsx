import { useState } from "react"
import PropTypes from "prop-types"
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Collapse,
  Box,
  Divider,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { styled } from "@mui/material/styles"

// Not sure what the types are for the itinerary object but using PropTypes for now

// Styled component to handle expand button rotation
const ExpandMore = styled((props) => {
  return <IconButton {...props} />
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}))

const FlightCard = ({ itinerary }) => {
  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Card
      sx={{
        marginBottom: 2,
        backgroundColor: "#1f2125",
        borderRadius: 8,
        border: 1,
        borderColor: "#fff",
        overflow: "hidden",
        width: "100%",
        maxWidth: 800,
        margin: "auto",
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <Typography variant="h6">
              Departure:{" "}
              {new Date(itinerary?.legs?.[0]?.departure ?? "").toLocaleString(
                "en-US",
                {
                  weekday: "long",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}
            </Typography>
            <Typography variant="h6">
              Arrival:{" "}
              {new Date(itinerary?.legs?.[0]?.arrival ?? "").toLocaleString(
                "en-US",
                {
                  weekday: "long",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}
            </Typography>
          </Box>
          <Typography
            variant="h5"
            color="info"
            sx={{
              margin: 1,
              borderRadius: 8,
              fontWeight: "bold",
              backgroundColor: "#333",
            }}
          >
            {itinerary?.price?.formatted ?? "N/A"} USD
            {/* Display formatted price */}
          </Typography>
        </Box>
        <Typography variant="subtitle2" color="primary">
          {itinerary?.legs?.[0]?.stopCount === 0
            ? "Direct flight"
            : `${itinerary?.legs?.[0]?.segments?.length - 1} stops`}{" "}
          | {itinerary?.legs?.[0]?.origin?.name ?? "Unknown"} to{" "}
          {itinerary?.legs?.[0]?.destination?.name ?? "Unknown"}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ overflowY: "auto", margin: 0, padding: 0 }}>
          {itinerary?.legs?.map((leg, legIndex) => (
            <Box key={legIndex} marginBottom={2}>
              <Typography
                variant="h6"
                color={legIndex === 0 ? "success" : "warning"}
              >
                {legIndex === 0 ? "Departure Flight" : "Return Flight"}
              </Typography>

              <img
                src={leg?.carriers?.marketing?.[0]?.logoUrl ?? ""}
                alt={leg?.carriers?.marketing?.[0]?.name ?? "Carrier Logo"}
                style={{ width: 32, height: 32 }}
              />
              {leg?.segments?.map((segment, segmentIndex) => (
                <Box key={segmentIndex} marginBottom={2}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    overflow="wrap"
                    padding={1}
                  >
                    <Typography variant="subtitle1">
                      {new Date(segment?.departure ?? "").toLocaleTimeString(
                        [],
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                          month: "short",
                          day: "numeric",
                        }
                      )}{" "}
                      -{" "}
                      {new Date(segment?.arrival ?? "").toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                    <Typography variant="subtitle2" color="primary">
                      Travel time:{" "}
                      {`${
                        Math.floor(segment?.durationInMinutes / 60) ?? 0
                      } hr ${
                        segment?.durationInMinutes
                          ? segment.durationInMinutes % 60
                          : 0
                      } min`}
                    </Typography>
                  </Box>
                  <Typography variant="body2">
                    {segment?.origin?.name ?? "Unknown"} (
                    {segment?.origin?.displayCode ?? "N/A"}) to{" "}
                    {segment?.destination?.name ?? "Unknown"} (
                    {segment?.destination?.displayCode ?? "N/A"})
                  </Typography>
                  <Typography variant="body2" color="primary">
                    {segment?.marketingCarrier?.name ?? "Unknown"} | Flight
                    Number {segment?.flightNumber ?? "Unknown"}
                  </Typography>

                  {/* Display layover duration for all segments except the last one */}

                  {segmentIndex < (leg?.segments?.length ?? 0) - 1 && (
                    <Typography variant="body2" color="primary">
                      {(() => {
                        const currentArrival = new Date(
                          segment?.arrival ?? ""
                        ).getTime()
                        const nextDeparture = new Date(
                          leg?.segments?.[segmentIndex + 1]?.departure ?? ""
                        ).getTime()
                        const layoverDurationInMinutes = Math.floor(
                          (nextDeparture - currentArrival) / (1000 * 60)
                        )
                        return `${Math.floor(
                          layoverDurationInMinutes / 60
                        )} hr ${layoverDurationInMinutes % 60} min layover in ${
                          segment?.destination?.name ?? "Unknown"
                        }`
                      })()}
                    </Typography>
                  )}
                  <Divider sx={{ marginY: 1 }} />
                </Box>
              ))}
            </Box>
          ))}
        </CardContent>
      </Collapse>
    </Card>
  )
}
FlightCard.propTypes = {
  itinerary: PropTypes.shape({
    legs: PropTypes.arrayOf(
      PropTypes.shape({
        departure: PropTypes.string,
        arrival: PropTypes.string,
        stopCount: PropTypes.number,
        origin: PropTypes.shape({
          name: PropTypes.string,
        }),
        destination: PropTypes.shape({
          name: PropTypes.string,
        }),
        segments: PropTypes.arrayOf(
          PropTypes.shape({
            departure: PropTypes.string,
            arrival: PropTypes.string,
            durationInMinutes: PropTypes.number,
            origin: PropTypes.shape({
              name: PropTypes.string,
              displayCode: PropTypes.string,
            }),
            destination: PropTypes.shape({
              name: PropTypes.string,
              displayCode: PropTypes.string,
            }),
            marketingCarrier: PropTypes.shape({
              name: PropTypes.string,
            }),
            flightNumber: PropTypes.string,
          })
        ),
        carriers: PropTypes.shape({
          marketing: PropTypes.arrayOf(
            PropTypes.shape({
              logoUrl: PropTypes.string,
              name: PropTypes.string,
            })
          ),
        }),
      })
    ),
    price: PropTypes.shape({
      formatted: PropTypes.string,
    }),
  }),
}

export default FlightCard
