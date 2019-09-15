import React, { useState } from "react"

import styled from "styled-components"
import { Container, Row, Col, Form } from "react-bootstrap"
import DataInfo from "./realizationDataPage/DataInfo"
import People from "./realizationDataPage/People"
import PlanePlaces from "./realizationDataPage/PlanePlaces"
import Loader from "react-loader-spinner"
import LotApi from "../services/lot/api"

const Page = styled.div`
  height: 100%;
  background: #fff;
`
const Content = styled.div`
  background: #f1f2f4;
  padding: 30px;
`
const Side = styled.div`
  //  padding: 24px 40px 20px;
`
const LuggageButton = styled.div`
  background-color: #e22730;
  color: #fff;
  text-align: center;
  border: none;
  box-shadow: none;
  text-shadow: none;
  border-radius: 5px;
  transition: none 0.2s ease-in;
  width: auto;
  cursor: pointer;
  display: inline-block;
  font-weight: 400;
  position: relative;
  text-align: center;
  text-decoration: none;
  overflow: hidden;
  vertical-align: top;
  margin: 0;
  font-size: 1.28571em;
  padding: 0 0.55556em 0;
  line-height: 2.05556em;
  background-color: #4fcd3f;
  color: #fff;
  text-align: center;
  margin-top: 30px;
`
const Heading = styled.h3`
  text-align: center;
  margin-bottom: 30px;
`
const RealizationDataPage = ({ selectedFlight, selectedCity }) => {
  const [isLoading, setLoading] = useState(true)
  const [details, setDetails] = useState(null)
  const [peopleCount, setPeopleCount] = useState(1)

  const onDateChange = async (fromDate, toDate) => {
    try {
      const data = await LotApi.getFlightDetails({
        DepartueDate: fromDate,
        ReturnDate: toDate,
        OriginCode: selectedFlight.originCode,
        DestinationCode: selectedFlight.destinationCode,
        NumberOfAdults: peopleCount
      })
      setDetails(data)
    } catch (e) {
      console.error("err", e)
    }
    setLoading(false)
  }

  if (!selectedFlight)
    return (
      <Loader
        type="TailSpin"
        color="#063778"
        height={100}
        width={100}
        timeout={3000}
      />
    )
  return (
    <Page>
      <Container>
        <Content>
          <Heading>Kierunek podróży: {selectedFlight.originName}</Heading>
          <Row>
            <Col>
              <Form>
                <Side>
                  <DataInfo onDateChange={onDateChange} />
                  <People
                    peopleCount={peopleCount}
                    setPeopleCount={setPeopleCount}
                  />
                </Side>
              </Form>
            </Col>
            <Col></Col>
            <Col>
              {!isLoading && (
                <PlanePlaces
                  places={details && details.departuePlaneSeats}
                  peopleCount={peopleCount}
                />
              )}
            </Col>
          </Row>
          <LuggageButton>Potrzebujesz bagaż?</LuggageButton>
        </Content>
      </Container>
    </Page>
  )
}

export default RealizationDataPage
