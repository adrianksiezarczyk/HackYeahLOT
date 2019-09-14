import React, { useState } from 'react';
import styled from 'styled-components';
import { Container, Row } from 'react-bootstrap';

import SelectButton from './holidaysOptions/SelectButton';
import CitiesTable from './holidaysOptions/CitiesTable';

const MODES = { ACTIVE: 0, SIGHTSEEING: 1, REST: 2 };

const data = [
  {
    text: 'Aktywnie',
    cities: [
      {
        city: 'USA',
        price: 200
      },
      {
        city: 'Monako',
        price: 20
      },
      {
        city: 'Polska',
        price: 3000
      },
      {
        city: 'Estonia',
        price: 300
      }
    ]
  },
  {
    text: 'Zwiedzanie',
    cities: [
      {
        city: 'Włochy',
        price: 200
      },
      {
        city: 'Niemcy',
        price: 100
      },
      {
        city: 'Rosja',
        price: 50900340
      },
      {
        city: 'Brazylia',
        price: 200
      }
    ]
  },
  {
    text: 'Wypoczynek',
    cities: [
      {
        city: 'Hiszpania',
        price: 3000
      },
      {
        city: 'Hawaje',
        price: 100000
      },
      {
        city: 'Wenezuela',
        price: 200
      },
      {
        city: 'Wisła',
        price: 50000
      }
    ]
  }
];

const StyledHolidaysOptionsSection = styled.section`
  position: relative;
  margin-top: 60px;
  width: 100%;
  height: 100%;

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

const HolidaysOptions = props => {
  const [selectedBtn, setSelectedBtn] = useState(MODES.ACTIVE);

  const handleClick = e => setSelectedBtn(parseInt(e.target.value));

  return (
    <StyledHolidaysOptionsSection>
      <Container>
        {/* <Row>
          {data.map((action, i) => (
            <SelectButton
              key={action.text}
              handleClick={handleClick}
              active={selectedBtn === i}
              value={i}>
              {action.text}
            </SelectButton>
          ))}
        </Row> */}
        <Row>
          <CitiesTable availableFlights={props.availableFlights} />
        </Row>
      </Container>
    </StyledHolidaysOptionsSection>
  );
};

export default HolidaysOptions;
