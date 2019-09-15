import React, { useState } from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
  border-radius: 8px;
  position: relative;
  cursor: pointer;

  h3 {
    position: absolute;
    bottom: 15px;
    font-size: 30px;
    left: 7%;
    font-weight: 300;
    right: 0;
    color: #fff;
    opacity: ${props => (props.show ? '0' : '1')};
    transition: all 0.2s ease-in-out;
  }
`;

const DarkOverlap = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 8px;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 8px;
`;

const StyledText = styled.div`
  position: absolute;
  padding: 0 7%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(9, 52, 121, 0.85);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  opacity: ${props => (props.show ? '1' : '0')};
  transition: opacity 0.2s ease-in-out;
  border-radius: 8px;

  p:nth-child(1) {
    position: relative;
    font-size: 30px;
    color: #fff;
    margin: 0;

    top: ${props => (props.show ? '0' : '5px')};
    opacity: ${props => (props.show ? '1' : '0')};
    transition: all 0.2s ease-in-out;
  }

  p:nth-child(2) {
    position: relative;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.8);

    top: ${props => (props.show ? '0' : '5px')};
    opacity: ${props => (props.show ? '1' : '0')};
    transition: all 0.2s ease-in-out;
  }
`;

const HolidayCard = props => {
  const [show, setShow] = useState(false);

  return (
    <StyledCard
      onClick={props.onClick}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      show={show}>
      <DarkOverlap />
      <StyledImage src={props.image}></StyledImage>
      <h3>{props.text.header}</h3>
      <StyledText show={show}>
        <p>{props.text.text}</p>
        <p>{props.text.desc}</p>
      </StyledText>
    </StyledCard>
  );
};

export default HolidayCard;
