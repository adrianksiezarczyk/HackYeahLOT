import 'bootstrap/dist/css/bootstrap.min.css';
import './css/global.css';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import ReactPageScroller from 'react-page-scroller';
import SecondPage from './pages/SecondPage';

import FourthPage from './pages/FourthPage';
import { ArrowUp, ArrowDown } from 'react-feather';
import HolidaysType from './pages/HolidaysType';
import HolidaysOptions from './pages/HolidaysOptions';
import RealizationDataPage from './pages/RealizationDataPage';
import Header from './pages/layout/Header';
import LocalStore from './services/LocalStore';

const Layout = styled.div`
  width: 100vw;
  padding: 0 !important;
  margin: 0 !important;
`;

const ScrollerArrows = styled.div`
  position: fixed;
  right: 15px;
  top: calc((100% - 150px + 60px) / 2);
  width: 50px;
  height: 150px;
  color: #fff;
`;

const Arrow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border: 2px solid #fff;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px 0;
`;

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const scrollerRef = useRef(null);

  const goToPage = pageNumber => {
    if (pageNumber < 0 || pageNumber > 2) return;
    setCurrentPage(pageNumber);
    scrollerRef.current.goToPage(pageNumber);
  };

  return (
    <Layout>
      <Header />

      <LocalStore>
        {(
          loading,
          setLoading,
          selectedCity,
          setSelectedCity,
          selectedTime,
          setSelectedTime,
          availableFlights,
          setAvailableFlights
        ) => (
          <ReactPageScroller
            blockScrollDown={availableFlights.length === 0}
            ref={scrollerRef}
            animationTimer={300}>
            <HolidaysType
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
              setLoading={setLoading}
              setAvailableFlights={setAvailableFlights}
              goToPage={goToPage}
              currentPage={currentPage}
            />
            <HolidaysOptions
              loading={loading}
              availableFlights={availableFlights}
            />
            <RealizationDataPage />
            <FourthPage />
          </ReactPageScroller>
        )}
      </LocalStore>
      {/* <ScrollerArrows>
        <Arrow>
          <ArrowUp
            onClick={() => {
              goToPage(currentPage - 1);
            }}
          />
        </Arrow>
        <Arrow>
          <ArrowDown
            onClick={() => {
              goToPage(currentPage + 1);
            }}
          />
        </Arrow>
      </ScrollerArrows> */}
    </Layout>
  );
}

export default App;
