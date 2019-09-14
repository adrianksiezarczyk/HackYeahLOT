import React from 'react';
import styled from 'styled-components';
import { Col } from 'react-bootstrap';

import FlightCard from './FlightCard';

const CitiesTable = props => {
  console.log(props.availableFlights);
  return props.availableFlights.map(flight => (
    <Col lg={4} md={6}>
      <FlightCard key={flight.to} flightData={flight}></FlightCard>
    </Col>
  ));
};

export default CitiesTable;
