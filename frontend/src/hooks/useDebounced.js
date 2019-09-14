import { useState, useEffect } from 'react';

// Our hook
export default function useDebounced(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      return () => {
        clearTimeout(handler);
      };
    },
    [delay, value] 
  );

  return debouncedValue;
}