import React from "react"

import styled from "styled-components"
import { Container, Row, Col, Form } from "react-bootstrap"
import DataInfo from "./realizationDataPage/DataInfo"
import People from "./realizationDataPage/People"
import PlanePlaces from "./realizationDataPage/PlanePlaces"

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
const RealizationDataPage = () => {
  return (
    <Page>
      <Container>
        <Content>
          <Row>
            <Col>
              <Form>
                <Side>
                  <DataInfo />
                  <People />
                </Side>
              </Form>
            </Col>
            <Col></Col>
            <Col>
              <PlanePlaces />
            </Col>
          </Row>
          <LuggageButton>Potrzebujesz bagaż?</LuggageButton>
        </Content>
      </Container>
    </Page>
  )
}

export default RealizationDataPage
