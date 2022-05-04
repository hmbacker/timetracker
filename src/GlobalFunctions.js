import React, { useEffect, useState, useCallback } from "react";

const data = JSON.parse(localStorage.getItem("user-entries"));

// export const unique_customers = [
//   ...new Set(
//     Object.values(data).map((row) => {
//       Object.values(row.entries).map((value) => {
//         return value.customer;
//       });
//     })
//   ),
// ];

// export const unique_projects = [
//   ...new Set(
//     Object.values(data).map((row) => {
//       Object.values(row.entries).map((value) => {
//         return value.project;
//       });
//     })
//   ),
// ];

export function getUniqueCustomers() {
  let all_customers = [];
  try {
    Object.values(data).map((row) => {
      Object.values(row.entries).map((value) => {
        all_customers.push(value.customer);
      });
    });
  } catch (e) {}
  return [...new Set(all_customers)];
}

export function getUniqueProjects() {
  let all_projects = [];

  try {
    Object.values(data).map((row) => {
      Object.values(row.entries).map((value) => {
        all_projects.push(value.project);
      });
    });
  } catch (e) {}

  return [...new Set(all_projects)];
}
// export function getCurrentWeekNumber() {
//   let current_date = new Date();
//   let start_date = new Date(current_date.getFullYear(), 0, 1);
//   let days = Math.floor((current_date - start_date) / (24 * 60 * 60 * 1000));
//   // return Math.ceil((current_date.getDay() + 1 + days) / 7);
//   return Math.ceil(days / 7);
//   // return Math.floor((current_date.getDay() + 1 + days) / 7);
// }

// export function getWeekNumberFromDate(date) {
//   let start_date = new Date(date.getFullYear(), 0, 1);
//   let days = Math.floor((date - start_date) / (24 * 60 * 60 * 1000));
//   // return Math.ceil((date.getDay() + 1 + days) / 7);
//   // return Math.floor((date.getDay() + 1 + days) / 7);
//   return Math.ceil(days / 7);
// }

// export function useLocalStorage(key, initialState) {
//   const serializedInitialState = JSON.stringify(initialState);
//   let storageValue = initialState;
//   try {
//     storageValue = JSON.parse(localStorage.getItem(key)) ?? initialState;
//   } catch {
//     localStorage.setItem(key, serializedInitialState);
//   }
//   const [value, setValue] = useState(storageValue);
//   const updatedSetValue = useCallback(
//     (newValue) => {
//       const serializedNewValue = JSON.stringify(newValue);
//       if (
//         serializedNewValue === serializedInitialState ||
//         typeof newValue === "undefined"
//       ) {
//         localStorage.removeItem(key);
//       } else {
//         localStorage.setItem(key, serializedNewValue);
//       }
//       setValue(newValue ?? initialState);
//     },
//     [initialState, serializedInitialState, key]
//   );
//   return [value, updatedSetValue];
// }

export const useLocalStorage = (keyName, defaultValue) => {
  const [storedValue, setStoredValue] = React.useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);

      if (value) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });

  const setValue = (newValue) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {}
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
};
