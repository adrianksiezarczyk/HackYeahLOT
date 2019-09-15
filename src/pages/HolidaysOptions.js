import React from "react"
import styled from "styled-components"
import { Container, Row } from "react-bootstrap"

import CitiesTable from "./holidaysOptions/CitiesTable"

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
`

const HolidaysOptions = ({ availableFlights, goToPage, setSelectedFlight }) => {
  const selectFlight = flight => {
    setSelectedFlight(flight)
    goToPage(2)
  }

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
          <CitiesTable
            availableFlights={availableFlights}
            selectFlight={selectFlight}
          />
        </Row>
      </Container>
    </StyledHolidaysOptionsSection>
  )
}

export default HolidaysOptions
