<<<<<<< HEAD
import React from "react"
import styled from "styled-components"
=======
import React, { useState } from 'react';
import styled from 'styled-components';
>>>>>>> bc7fcc60b5f611cdb4b9110ea3834bf000130f16

import { Container, Row, Col } from 'react-bootstrap';

import Dropdown from '../components/Inputs/Dropdown';

<<<<<<< HEAD
import Cat from "../images/cat.jpg"
import Surprise from "../images/surprise.png"
import Summer from "../images/wakajki.jpg"
import HolidayCard from "./holidayType/HolidayCard"
=======
import Cat from '../images/cat.jpg';
import Surprise from '../images/surprise.png';
import Summer from '../images/wakajki.jpg';
>>>>>>> bc7fcc60b5f611cdb4b9110ea3834bf000130f16

const whenAnswers = ['Kiedykolwiek', 'Jutro', 'Pojutrze'];
const whereFromAnswers = ['Polska', 'Estonia', 'Gliwice', 'Sosnowiec'];

const texts = {
  winter: {
    text: 'Zimowe szaleństwo',
    desc: 'Wybierz się w mroźne rejony'
  },
  surprise: {
    text: 'Zaskocz mnie!',
    desc: 'Pozwól nam zająć się Twoimi wakacjami'
  },
  summer: {
    text: 'Letnie opalanko',
    desc: 'Wyleguj się na słonecznych plażach'
  }
};

const StyledHolidaysTypeSection = styled.section`
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
`;

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
`;

const BackgroundSquare = styled.div`
  background: rgba(9, 52, 121, 0.85);
`

const HolidaysType = () => (
  <StyledHolidaysTypeSection>
    {/* <BackgroundSquare /> */}
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

export default HolidaysType
