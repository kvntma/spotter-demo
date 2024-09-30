import { createContext, useState } from "react"
import PropTypes from "prop-types"

export const InputContext = createContext()

export const InputProvider = ({ children }) => {
  const [inputValues, setInputValues] = useState({})
  const [departureDate, setDepartureDate] = useState(null)
  const [returnDate, setReturnDate] = useState(null)
  const [flights, setFlights] = useState(null)
  const [travelers, setTravelers] = useState({
    adults: 1,
    children: 0,
  })
  const [travelClass, setTravelClass] = useState("economy")

  const setInputValue = (type, value) => {
    // exporting this one
    setInputValues((prevValues) => ({
      ...prevValues,
      [type]: value,
    }))
  }

  return (
    <InputContext.Provider
      value={{
        inputValues,
        setInputValue,
        departureDate,
        setDepartureDate,
        returnDate,
        setReturnDate,
        flights,
        setFlights,
        travelers,
        setTravelers,
        travelClass,
        setTravelClass,
      }}
    >
      {children}
    </InputContext.Provider>
  )
}

InputProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
