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

// export default useLocalStorage;

// const defaultConfig = {
//   theme: "light",
//   lang: "fr",
//   settings: {
//     pushNotifications: true,
//   },
// };

//   function Settings() {
//     const [config, setConfig] = useLocalStorage("config", defaultConfig);

//     const handleChange = (e) => {
//       // Still a bit tricky, but we don't really have any other choice
//       setConfig((oldConfig) => ({
//         ...oldConfig,
//         settings: {
//           ...oldConfig.settings,
//           pushNotifications: e.target.checked,
//         },
//       }));
//     };

//     return (
//       <>
//         <h1>Settings</h1>

//         <label htmlFor="pushNotifications">Push Notifications</label>
//         <input
//           type="checkbox"
//           id="pushNotifications"
//           checked={config.settings.pushNotifications}
//           onChange={handleChange}
//         />
//       </>
//     );
//   }
// };
