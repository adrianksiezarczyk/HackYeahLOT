import React, { useState } from 'react';

const TITLES = ['Skąd chcesz wylecieć?', 'Kiedy planujesz podróż?'];
const LocalStore = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState({
    name: TITLES[0],
    code: ''
  });
  const [selectedTime, setSelectedTime] = useState(TITLES[1]);
  const [availableFlights, setAvailableFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  return children(
    loading,
    setLoading,
    selectedCity,
    setSelectedCity,
    selectedTime,
    setSelectedTime,
    availableFlights,
    setAvailableFlights,
    selectedFlight,
    setSelectedFlight
  );
};

export default LocalStore;
