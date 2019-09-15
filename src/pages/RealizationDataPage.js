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
  position: relative;
  height: 100%;
  background: #fff;
  display: flex;
  align-items: center;
  @media (max-width: 767px) {
    min-height: 500px;
  }
  .container {
    position: relative;
    bottom: 45px;
    z-index: 2;
  }
`;
const Content = styled.div`
  background: #fbfbfb;
  padding: 30px;
  //background: #f1f2f447;
  border: 2px solid #f1f2f4;
  border-radius: 3px;
  box-shadow: 0px 5px 10px -8px rgba(0, 0, 0, 0.75);
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
  background-color: #063778;
  /* background-color: #6393c5; */
  color: #fff;
  text-align: center;
`;
const PayButton = styled(LuggageButton)`
  margin-left: 30px;
  background-color: #063778;
`;
// background-color: #0069d9de;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  position: relative;
  justify-self: flex-end;
  margin-top: auto;

  .luggage-counter {
    position: absolute;
    left: 0;
    font-size: 24px;
    top: -60px;
    font-weight: 500;
    color: #083377;
  }
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
  goToPage,
  luggageCount
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
              {luggageCount >= 1 && (
                <p className='luggage-counter'>
                  Dodano {luggageCount} {luggageCount === 1 && 'sztukę'}{' '}
                  {luggageCount >= 2 && luggageCount <= 4 && 'sztuki'}{' '}
                  {luggageCount >= 5 && 'sztuk'} bagażu rejestrowanego
                </p>
              )}
              <LuggageButton onClick={() => goToPage(3)}>
                Potrzebujesz dodatkowy bagaż?
              </LuggageButton>
              {details && (
                <div style={{ display: 'flex' }}>
                  <Price>
                    Łącznie do zapłaty: {details.totalPrice + luggageCount * 50}
                    zł{' '}
                  </Price>
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
