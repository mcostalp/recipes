// // Ref: https://dev.to/iamludal/custom-react-hooks-uselocalstorage-309p

import { useEffect, useState } from 'react';

export default useLocalStorage = (key, defaultValue = null) => {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      if (saved !== null) {
        return JSON.parse(saved);
      }
      return defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    const newValue = JSON.stringify(value);
    localStorage.setItem(key, newValue);
  }, [value, key]);

  return [value, setValue];
};
