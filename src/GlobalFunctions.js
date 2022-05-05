import React, { useEffect, useState, useCallback } from "react";

// const data = JSON.parse(localStorage.getItem("user-entries"));

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

export function getUniqueCustomers(data) {
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

export function getUniqueProjects(data) {
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
