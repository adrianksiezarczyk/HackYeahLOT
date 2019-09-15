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
import MediaQuery from 'react-responsive';

const Layout = styled.div`
  width: 100vw;
  padding: 0 !important;
  margin: 0 !important;

  .container:focus,
  div:focus {
    outline: none !important;
  }
`;
const BreakWall = styled.div`
  height: 120px;
`;

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const scrollerRef = useRef(null);

  const goToPage = pageNumber => {
    if (pageNumber < 0 || pageNumber > 3) return;
    setCurrentPage(pageNumber);
    if (scrollerRef.current) scrollerRef.current.goToPage(pageNumber);
    else {
      let pageAnchor = null;
      if (pageNumber === 1) pageAnchor = document.getElementById('page2Anchor');
      if (pageNumber === 2) pageAnchor = document.getElementById('page3Anchor');
      //if (pageNumber === 2) pageAnchor = document.getElementById("page3Anchor")
      pageAnchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // if (pageNumber < 0 || pageNumber > 2) return;
    // setCurrentPage(pageNumber);
    // scrollerRef.current.goToPage(pageNumber);
  };

  return (
    <Layout>
      
      <Header />
      <LocalStore>
        {({
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
        }) => (
          <>
            <MediaQuery minWidth={768}>
              <ReactPageScroller
                blockScrollDown={
                  availableFlights.length === 0 ||
                  (currentPage === 1 && selectedFlight === null)
                }
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
            </MediaQuery>
            <MediaQuery maxWidth={767}>
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
              <BreakWall />
              <div id='page2Anchor' />
              <HolidaysOptions
                loading={loading}
                availableFlights={availableFlights}
                goToPage={goToPage}
                setSelectedFlight={setSelectedFlight}
              />
              <BreakWall />
              <div id='page3Anchor' />
              <RealizationDataPage
                selectedFlight={selectedFlight}
                selectedCity={selectedCity}
                goToPage={goToPage}
                peopleData={peopleData}
                setPeopleData={setPeopleData}
                luggageCount={luggageCount}
              />

              <Luggage
                goToPage={goToPage}
                peopleData={peopleData}
                setPeopleData={setPeopleData}
                setLuggageCount={setLuggageCount}
                luggageCount={luggageCount}
              />
            </MediaQuery>
          </>
        )}
      </LocalStore>
    </Layout>
  );
}

export default App;
