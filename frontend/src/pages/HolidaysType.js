import React, { useState } from 'react';
import styled from 'styled-components';

import { Container, Row, Col } from 'react-bootstrap';

import Dropdown from '../components/Inputs/Dropdown';

import Cat from '../images/cat.jpg';
import Surprise from '../images/surprise.png';
import Summer from '../images/wakajki.jpg';

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

const StyledCard = styled.div`
  border-radius: 4px;
  position: relative;
  cursor: pointer;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

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
  opacity: ${props => (props.show ? '1' : '0')};
  transition: opacity 0.2s ease-in-out;

  p:nth-child(1) {
    position: relative;
    padding-left: 7%;
    font-size: 30px;
    color: #fff;
    margin: 0;

    top: ${props => (props.show ? '0' : '5px')};
    opacity: ${props => (props.show ? '1' : '0')};
    transition: all 0.2s ease-in-out;
  }

  p:nth-child(2) {
    position: relative;
    padding-left: 7%;
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
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}>
      <StyledImage src={props.image}></StyledImage>
      <StyledText show={show}>
        <p>{props.text.text}</p>
        <p>{props.text.desc}</p>
      </StyledText>
    </StyledCard>
  );
};

const HolidaysType = () => {
  const [whenTitle, setWhenTitle] = useState();

  return (
    <StyledHolidaysTypeSection>
      <Container>
        <Row className='dropdown-row'>
          <Dropdowns>
            <Dropdown answers={whenAnswers} title='When'></Dropdown>
            <Dropdown answers={whereFromAnswers} title='Where'></Dropdown>
          </Dropdowns>
        </Row>
        <Row>
          <Col className='no-padding-left'>
            <HolidayCard image={Cat} text={texts.winter}></HolidayCard>
          </Col>
          <Col>
            <HolidayCard image={Surprise} text={texts.surprise}></HolidayCard>
          </Col>
          <Col className='no-padding-right'>
            <HolidayCard image={Summer} text={texts.summer}></HolidayCard>
          </Col>
        </Row>
      </Container>
    </StyledHolidaysTypeSection>
  );
};

export default HolidaysType;
