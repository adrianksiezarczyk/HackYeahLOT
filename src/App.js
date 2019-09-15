import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import ReactPageScroller from 'react-page-scroller';

import FourthPage from './pages/FourthPage';
import HolidaysType from './pages/HolidaysType';
import HolidaysOptions from './pages/HolidaysOptions';
import RealizationDataPage from './pages/RealizationDataPage';
import Header from './pages/layout/Header';
import LocalStore from './services/LocalStore';
import Luggage from './pages/Luggage';

const Layout = styled.div`
  width: 100vw;
  padding: 0 !important;
  margin: 0 !important;
`;

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const scrollerRef = useRef(null);

  const goToPage = pageNumber => {
    if (pageNumber < 0 || pageNumber > 3) return;
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
          setAvailableFlights,
          selectedFlight,
          setSelectedFlight,
          peopleData,
          setPeopleData,
          luggageCount,
          setLuggageCount
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
              goToPage={goToPage}
              setSelectedFlight={setSelectedFlight}
            />
            <RealizationDataPage
              selectedFlight={selectedFlight}
              selectedCity={selectedCity}
              peopleData={peopleData}
              setPeopleData={setPeopleData}
              goToPage={goToPage}
              luggageCount={luggageCount}
            />
            <Luggage
              goToPage={goToPage}
              peopleData={peopleData}
              setPeopleData={setPeopleData}
              setLuggageCount={setLuggageCount}
              luggageCount={luggageCount}
            />
          </ReactPageScroller>
        )}
      </LocalStore>
    </Layout>
  );
}

export default App;
