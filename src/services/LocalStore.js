import { useState } from 'react';
import useImmerState from '../hooks/useImmerState';

const TITLES = ['Skąd chcesz wylecieć?', 'Kiedy planujesz podróż?'];
const initialPersonData = { fullName: '' };

const LocalStore = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState({
    name: TITLES[0],
    code: ''
  });
  const [selectedTime, setSelectedTime] = useState(TITLES[1]);
  const [availableFlights, setAvailableFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [peopleData, setPeopleData] = useImmerState(() => [initialPersonData]);
  const [luggageCount, setLuggageCount] = useState(0);

  return children({
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
  });
};

export default LocalStore;
