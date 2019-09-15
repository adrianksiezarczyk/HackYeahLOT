import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Container, Row, Col } from "react-bootstrap"

import Dropdown from "../components/Inputs/Dropdown"

import HolidayCard from "./holidayType/HolidayCard"
import Cat from "../assets/images/cat.jpg"
import Surprise from "../assets/images/surprise.png"
import Summer from "../assets/images/wakajki.jpg"
import backgroundImg from "../assets/images/backgroundImg.png"

const whenAnswers = ["Kiedykolwiek", "Jutro", "Pojutrze"]

const texts = {
  winter: {
    header: "Zimno",
    text: "Zimowe szaleństwo",
    desc: "Wybierz się w mroźne rejony"
  },
  surprise: {
    header: "Obojętne",
    text: "Zaskocz mnie!",
    desc: "Pozwól nam zająć się Twoimi wakacjami"
  },
  summer: {
    header: "Ciepło",
    text: "Letnie opalanko",
    desc: "Wyleguj się na słonecznych plażach"
  }
}

const StyledHolidaysTypeSection = styled.section`
  background-image: url(${backgroundImg});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  margin-top: 60px;
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .dropdown-row {
    margin-bottom: 20px;
  }

  .no-padding-right {
    padding-right: 0;
  }

  .no-padding-left {
    padding-left: 0;
  }
`

const Dropdowns = styled.div`
  display: flex;
  width: 100%;

  .dropdown-menu {
    width: 100%;
  }

  .btn-primary {
    background-color: #063778;
    border-color: #063778;
  }

  .dropdown {
    width: 30%;
    background-color: #063778;

    &:nth-child(1) {
      margin-right: 10px;
    }

    button {
      display: block;
      width: 100%;
    }
  }
`

const BackgroundSquare = styled.div`
  background: rgba(9, 52, 121, 0.85);
`

const HolidaysType = ({
  selectedCity,
  setSelectedCity,
  selectedTime,
  setSelectedTime,
  setLoading,
  setAvailableFlights,
  goToPage,
  currentPage
}) => {
  const [cities, setCities] = useState([])

  useEffect(() => {
    fetch("http://134.209.248.19:8080/Airport")
      .then(res => res.json())
      .then(data => setCities(data))
  }, [])

  const handleDropdownClick = (e, id) => {
    if (id === 2) {
      setSelectedCity({
        name: e.target.innerText,
        code: e.target.attributes[0].value
      })
    } else setSelectedTime(e.target.innerText)
  }

  const handleCardClick = props => {
    setLoading(true)

    fetch(`http://134.209.248.19:8080/Flight?From=${selectedCity.code}`)
      .then(res => res.json())
      .then(flights => {
        setAvailableFlights(flights)
        goToPage(1)
        setLoading(false)
      })
  }

  return (
    <StyledHolidaysTypeSection>
      {/* <BackgroundSquare /> */}
      <Container>
        <Row className="dropdown-row">
          <Dropdowns>
            <Dropdown
              handleClick={handleDropdownClick}
              id={1}
              answers={whenAnswers}
              title={selectedTime}
            ></Dropdown>
            <Dropdown
              handleClick={handleDropdownClick}
              id={2}
              answers={cities}
              title={selectedCity.name}
            ></Dropdown>
          </Dropdowns>
        </Row>
        <Row>
          <Col className="no-padding-left">
            <HolidayCard
              onClick={handleCardClick}
              image={Cat}
              text={texts.winter}
            ></HolidayCard>
          </Col>
          <Col>
            <HolidayCard
              onClick={handleCardClick}
              image={Surprise}
              text={texts.surprise}
            ></HolidayCard>
          </Col>
          <Col className="no-padding-right">
            <HolidayCard
              onClick={handleCardClick}
              image={Summer}
              text={texts.summer}
            ></HolidayCard>
          </Col>
        </Row>
      </Container>
    </StyledHolidaysTypeSection>
  )
}

export default HolidaysType
