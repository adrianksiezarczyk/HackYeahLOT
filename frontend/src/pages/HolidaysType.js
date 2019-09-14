import React, { useEffect } from "react"
import { connect } from "react-redux"
import styled from "styled-components"
import { Container, Row, Col } from "react-bootstrap"

import Dropdown from "../components/Inputs/Dropdown"

import HolidayCard from "./holidayType/HolidayCard"
import Cat from "../assets/images/cat.jpg"
import Surprise from "../assets/images/surprise.png"
import Summer from "../assets/images/wakajki.jpg"
import backgroundImg from "../assets/images/backgroundImg.png"

const whenAnswers = ["Kiedykolwiek", "Jutro", "Pojutrze"]
const whereFromAnswers = ["Polska", "Estonia", "Gliwice", "Sosnowiec"]

const texts = {
  winter: {
    text: "Zimowe szaleństwo",
    desc: "Wybierz się w mroźne rejony"
  },
  surprise: {
    text: "Zaskocz mnie!",
    desc: "Pozwól nam zająć się Twoimi wakacjami"
  },
  summer: {
    text: "Letnie opalanko",
    desc: "Wyleguj się na słonecznych plażach"
  }
}

const StyledHolidaysTypeSection = styled.section`
  background-image: url(${backgroundImg});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  position: relative;
  margin-top: 60px;
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
  justify-content: space-between;

  .dropdown-menu {
    width: 100%;
  }

  .dropdown {
    width: 48%;

    button {
      display: block;
      width: 100%;
    }
  }
`

const HolidaysType = ({ fetchInfo, info }) => {
  
  useEffect(() => {
    fetchInfo()
  }, [fetchInfo])

  console.log("TEST", info)
  return (
    <StyledHolidaysTypeSection>
      <Container>
        <Row className="dropdown-row">
          <Dropdowns>
            <Dropdown answers={whenAnswers} title="When"></Dropdown>
            <Dropdown answers={whereFromAnswers} title="Where"></Dropdown>
          </Dropdowns>
        </Row>
        <Row>
          <Col className="no-padding-left">
            <HolidayCard image={Cat} text={texts.winter}></HolidayCard>
          </Col>
          <Col>
            <HolidayCard image={Surprise} text={texts.surprise}></HolidayCard>
          </Col>
          <Col className="no-padding-right">
            <HolidayCard image={Summer} text={texts.summer}></HolidayCard>
          </Col>
        </Row>
      </Container>
    </StyledHolidaysTypeSection>
  )
}

export default connect(
  state => ({
    info: state.lot.info
  }),
  dispatch => ({
    fetchInfo: dispatch.lot.fetchInfo
  })
)(HolidaysType)
