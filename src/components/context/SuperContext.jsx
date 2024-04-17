import React, { createContext, useContext, useState } from 'react';

const SuperContext = createContext();

export const useDivCount = () => useContext(SuperContext);

export const DivCountProvider = ({ children }) => {
  const [divCount, setDivCount] = useState(1);

  const addDiv = (e) => {
    e.preventDefault();
    if (divCount < 4) {
      setDivCount(prevCount => prevCount + 1);
    } else {
      alert("You can't add more than 4 tiers.");
    }
  };

  const removeDiv = () => {
    if (divCount > 1) {
      setDivCount(prevCount => prevCount - 1);
    }
  };

  return (
    <SuperContext.Provider value={{ divCount, addDiv, removeDiv }}>
      {children}
    </SuperContext.Provider>
  );
};
