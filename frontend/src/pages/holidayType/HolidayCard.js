import React, { useState } from "react"
import styled from "styled-components"

const StyledCard = styled.div`
  border-radius: 4px;
  position: relative;
  cursor: pointer;
`

const StyledImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`

const StyledText = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(9, 52, 121, 0.85);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  opacity: ${props => (props.show ? "1" : "0")};
  transition: opacity 0.2s ease-in-out;

  p:nth-child(1) {
    position: relative;
    padding-left: 7%;
    font-size: 30px;
    color: #fff;
    margin: 0;

    top: ${props => (props.show ? "0" : "5px")};
    opacity: ${props => (props.show ? "1" : "0")};
    transition: all 0.2s ease-in-out;
  }

  p:nth-child(2) {
    position: relative;
    padding-left: 7%;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.8);

    top: ${props => (props.show ? "0" : "5px")};
    opacity: ${props => (props.show ? "1" : "0")};
    transition: all 0.2s ease-in-out;
  }
`

const HolidayCard = props => {
  const [show, setShow] = useState(false)

  return (
    <StyledCard
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <StyledImage src={props.image}></StyledImage>
      <StyledText show={show}>
        <p>{props.text.text}</p>
        <p>{props.text.desc}</p>
      </StyledText>
    </StyledCard>
  )
}

export default HolidayCard
