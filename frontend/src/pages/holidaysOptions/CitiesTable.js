import React from "react"
import styled from "styled-components"
import { Col } from "react-bootstrap"

import FlightCard from "./FlightCard"

const CitiesTable = ({ availableFlights, selectFlight }) => {
  return availableFlights.map(flight => (
    <Col lg={4} md={6}>
      <FlightCard
        onClick={() => selectFlight(flight)}
        key={flight.to}
        flightData={flight}
      ></FlightCard>
    </Col>
  ))
}

export default CitiesTable
