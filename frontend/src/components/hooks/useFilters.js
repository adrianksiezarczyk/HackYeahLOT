import { useState } from 'react';
import { debounce } from '../../utils/helpers/debounce';

const useFilters = () => {
  const [filters, setFilters] = useState({});

  const modifyFilters = debounce((columnName, value) => {
    setFilters({ ...filters, [columnName]: value });
  }, 500);

  return {
    filters,
    modifyFilters
  };
};

export default useFilters;
