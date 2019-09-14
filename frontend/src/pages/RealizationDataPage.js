import React from "react"

import styled from "styled-components"
import { Container, Row, Col, Form } from "react-bootstrap"
import DataInfo from "./realizationDataPage/DataInfo"
import People from "./realizationDataPage/People"
import Luggage from './realizationDataPage/Luggage';
import PlanePlaces from './realizationDataPage/PlanePlaces';

const Page = styled.div`
  height: 100%;
  background: #1bb9ff;

  /* TEMPORARY */
  /* margin-top: 60px; */
`

const RealizationDataPage = () => {
  return (
    <Page>
      <Container>
        <Row>
          <Col>
            <Form>
              <DataInfo />
              <People />
            </Form>
          </Col>
          <Col >
          <Luggage/>
          <PlanePlaces/>
          </Col>
        </Row>
      </Container>
    </Page>
  )
}

export default RealizationDataPage
