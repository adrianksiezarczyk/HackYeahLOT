import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Container, Row, Col } from "react-bootstrap"

import Dropdown from "../components/Inputs/Dropdown"

import HolidayCard from "./holidayType/HolidayCard"
import Draw from "../assets/images/draw.jpg"
import Summer from "../assets/images/summer.jpg"
import Winter from "../assets/images/winter.jpg"
import Clouds from "../assets/images/top.jpg"

import LotApi from "../services/lot/api"

const whenAnswers = ["W najbliższym czasie", "Za 3 miesiące", "Za pół roku"]

const MODES = { 1: "cold", 2: null, 3: "hot" }

const texts = {
  winter: {
    header: "Zimno",
    text: "Zimowe szaleństwo",
    desc: "Wybierz się w mroźne rejony"
  },
  surprise: {
    header: "Inspiracja",
    text: "Zaskocz mnie!",
    desc: "Pozwól nam zająć się Twoimi wakacjami"
  },
  summer: {
    header: "Ciepło",
    text: "Letnie plażowanie",
    desc: "Wyleguj się na słonecznych plażach"
  }
}

const StyledHolidaysTypeSection = styled.section`
  background-image: url(${Clouds});
  background-repeat: no-repeat;
  background-position: top;
  background-size: 100% 80%;

  /* margin-top: 60px; */
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    color: rgba(255, 255, 255, 0.8);
    text-align: center;
    position: relative;
    font-weight: 300;
    bottom: 100px;

    @media (max-width: 767px) {
      font-size: 24px;
      font-weight: 400;
      top: -20px;
      bottom: unset;
    }

    animation: headingAnimation 1s ease-in-out forwards;

    @keyframes headingAnimation {
      0% {
        left: -15px;
        opacity: 0;
      }
      100% {
        left: 0px;
        opacity: 1;
      }
    }
  }

  .col {
    @media (max-width: 767px) {
      flex-basis: auto;
      padding-left: 15px !important;
      padding-right: 15px !important;
      margin-bottom: 30px;
    }
  }
  .row {
    margin: 0;
  }

  .dropdown-row {
    margin-bottom: 20px;
  }

  .no-padding-right {
    padding-right: 0;
  }

  .no-padding-left {
    padding-left: 0;
  }

  .container {
    position: relative;
    top: 35px;
    z-index: 2;
  }
`

const DarkOverlap = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 80%;
  background: rgba(9, 52, 121, 0.4);
`

const Dropdowns = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
  justify-content: space-between;
  @media (max-width: 767px) {
    flex-direction: column;
  }

  .dropdown-menu {
    width: 100%;
  }

  .btn-primary {
    color: #063778;
    background-color: #fff;
    border: none;
    outline: none;
    padding: 1em;
    border-radius: 10px;

    &:hover {
      background: #063778;
    }
  }

  .btn-primary:not(:disabled):not(.disabled).active:focus,
  .btn-primary:not(:disabled):not(.disabled):active:focus,
  .show > .btn-primary.dropdown-toggle:focus {
    box-shadow: none;
    background: #063778;
  }

  .btn-primary.focus,
  .btn-primary:focus {
    box-shadow: none;
  }

  .dropdown {
    width: 47%;
    @media (max-width: 767px) {
      width: 100%;
      margin-bottom: 5px;
    }
    &:nth-child(1) {
      margin-right: 10px;
    }

    button {
      display: block;
      width: 100%;
      @media (max-width: 767px) {
        padding: 10px;
        font-size: 12px;
      }
    }
  }
`
const BlueBackgroundStrip = styled.div`
  position: absolute;
  background: #003b96;
  width: 500px;
  height: 7500px;
  transform: rotate(45deg);
  right: -500px;
  z-index: 1;
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
    const fetchData = async () => {
      try {
        const data = await LotApi.getAirportsNames()
        setCities(data)
      } catch (e) {
        console.error(e)
      }
    }
    fetchData()
  }, [])

  const handleDropdownClick = (e, id) => {
    if (id === 2) {
      setSelectedCity({
        name: e.target.innerText,
        code: e.target.attributes[0].value
      })
    } else setSelectedTime(e.target.innerText)
  }

  const handleCardClick = mode => {
    setLoading(true)

    const modeString = MODES[mode] === null ? "" : `&Mode=${MODES[mode]}`

    fetch(
      `https://api.zainspirujlot.tk/Flight?From=${selectedCity.code}${modeString}`
    )
      .then(res => res.json())
      .then(flights => {
        setAvailableFlights(flights)
        goToPage(1)
        setLoading(false)
      })
  }

  return (
    <StyledHolidaysTypeSection>
      <BlueBackgroundStrip />
      <DarkOverlap />
      {/* <BackgroundSquare /> */}
      <Container>
        <h1>Znajdź swoje miejsce</h1>
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
              onClick={() => handleCardClick(1)}
              image={Winter}
              text={texts.winter}
            ></HolidayCard>
          </Col>
          <Col>
            <HolidayCard
              onClick={() => handleCardClick(2)}
              image={Draw}
              text={texts.surprise}
            ></HolidayCard>
          </Col>
          <Col className="no-padding-right">
            <HolidayCard
              onClick={() => handleCardClick(3)}
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
