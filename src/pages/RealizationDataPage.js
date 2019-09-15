import React, { useState } from 'react';

import styled from 'styled-components';
import { Container, Row, Col, Form } from 'react-bootstrap';
import DataInfo from './realizationDataPage/DataInfo';
import People from './realizationDataPage/People';
import PlanePlaces from './realizationDataPage/PlanePlaces';
import Loader from 'react-loader-spinner';
import LotApi from '../services/lot/api';
import MediaQuery from 'react-responsive';

const Page = styled.div`
  height: 100%;
  background: #fff;
  @media (max-width: 767px) {
    min-height: 500px;
  }
`;
const Content = styled.div`
  background: #f1f2f4;
  padding: 30px;
`;
const Side = styled.div`
  //  padding: 24px 40px 20px;
`;
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
  background-color: #3a99ff;
  color: #fff;
  text-align: center;
`;
const PayButton = styled(LuggageButton)`
  margin-left: 30px;
  background-color: #0069d9;
`;
const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;
const Price = styled.h3`
  text-align: center;
  font-size: 30px;
`;

const Heading = styled.h3`
  margin-bottom: 30px;
`;

const SeatsHeading = styled(Heading)`
  text-align: center;
  font-size: 24px;
`;

const RealizationDataPage = ({
  selectedFlight,
  selectedCity,
  peopleData,
  setPeopleData,
  goToPage
}) => {
  const [isLoading, setLoading] = useState(true);
  const [details, setDetails] = useState(null);
  const [peopleCount, setPeopleCount] = useState(1);
  const [twoWayDirection, setTwoWayDirection] = useState(false);

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const changePeopleCount = count => {
    fetchData({ _peopleCount: count });
    setPeopleCount(count);
  };

  const fetchData = async ({ _fromDate, _toDate, _peopleCount }) => {
    try {
      const data = await LotApi.getFlightDetails({
        DepartueDate: _fromDate || fromDate,
        ReturnDate: _toDate || toDate,
        OriginCode: selectedFlight.originCode,
        DestinationCode: selectedFlight.destinationCode,
        NumberOfAdults: _peopleCount || peopleCount
      });
      setDetails(data);
    } catch (e) {
      console.error('err', e);
    }
    setLoading(false);
  };

  const onDateChange = async (fromDate, toDate) => {
    setFromDate(fromDate);
    setToDate(toDate);
    fetchData({ _fromDate: fromDate, _toDate: toDate });
  };

  return (
    <Page>
      {!selectedFlight ? (
        <MediaQuery minWidth={768}>
          <Loader
            type='TailSpin'
            color='#063778'
            height={100}
            width={100}
            timeout={3000}
          />
        </MediaQuery>
      ) : (
        <Container>
          <Content>
            <Heading>
              Kierunek podróży: {selectedFlight.destinationName}
            </Heading>
            <Row>
              <Col>
                <Form>
                  <Side>
                    <DataInfo
                      onDateChange={onDateChange}
                      twoWayDirection={twoWayDirection}
                      setTwoWayDirection={setTwoWayDirection}
                    />
                    <People
                      peopleCount={peopleCount}
                      setPeopleCount={setPeopleCount}
                      peopleData={peopleData}
                      setPeopleData={setPeopleData}
                    />
                  </Side>
                </Form>
              </Col>
              <Col>
                {!isLoading && (
                  <>
                    <SeatsHeading>
                      {selectedFlight.originName} -{' '}
                      {selectedFlight.destinationName}
                    </SeatsHeading>
                    <PlanePlaces
                      places={details && details.departuePlaneSeats}
                      peopleCount={peopleCount}
                    />
                  </>
                )}
              </Col>
              <Col>
                {twoWayDirection &&
                  !isLoading &&
                  details &&
                  details.returnPlaneSeats && (
                    <>
                      <SeatsHeading>
                        {selectedFlight.destinationName} -{' '}
                        {selectedFlight.originName}
                      </SeatsHeading>
                      <PlanePlaces
                        places={details && details.returnPlaneSeats}
                        peopleCount={peopleCount}
                      />
                    </>
                  )}
              </Col>
            </Row>
            <Footer>
              <LuggageButton onClick={() => goToPage(3)}>
                Potrzebujesz dodatkowy bagaż?
              </LuggageButton>
              {details && (
                <div style={{ display: 'flex' }}>
                  <Price>Łącznie do zapłaty: {details.totalPrice}zł </Price>
                  <PayButton
                    onClick={() => {
                      window.location.href = `${details.deepLink}`;
                    }}>
                    Przechodzę do rezerwacji
                  </PayButton>
                </div>
              )}
            </Footer>
          </Content>
        </Container>
      )}
    </Page>
  );
};

export default RealizationDataPage;
