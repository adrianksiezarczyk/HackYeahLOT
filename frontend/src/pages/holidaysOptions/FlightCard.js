import React, { useState } from 'react';
import styled from 'styled-components';

const StyledFlightCard = styled.div`
  position: relative;
  margin-bottom: 10px;
  cursor: pointer;

  p {
    position: absolute;
    font-size: 20px;
    color: #fff;

    &:nth-child(2) {
      top: 5px;
      right: 7%;
    }

    &:nth-child(3) {
      bottom: 0;
      left: 7%;
      font-size: 34px;
    }

    &:nth-child(4) {
      bottom: 0;
      left: 7%;
      font-size: 34px;
    }

    &:nth-child(5) {
      bottom: 0;
      right: 7%;
    }
  }

  img {
    height: 200px;
    width: 100%;
    border-radius: 5px;
  }
`;

const DarkOverlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(9, 52, 121, 0.85);
  opacity: ${props => (props.show ? '1' : '0')};
  transition: all 0.2s ease-in-out;
  border-radius: 5px;
`;

const FlightCard = props => {
  const [show, setShow] = useState(false);

  return (
    <StyledFlightCard
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}>
      <DarkOverlay show={show} />
      <p>{props.flightData.temperature}&deg;C</p>
      <p>{props.flightData.destinationName}</p>
      <p>{props.flightData.destinationName}</p>
      <p>od {props.flightData.minPrice}zł</p>
      <img src={props.flightData.imageUrl} alt='Destination place' />
    </StyledFlightCard>
  );
};

export default FlightCard;
