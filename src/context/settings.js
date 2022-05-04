import React, { useState, useEffect } from "react";

export const SettingsContext = React.createContext();

function Settings({ children }) {
  const retrievedSettings = localStorage.getItem('settings')

  const initialState = retrievedSettings ?
    JSON.parse(retrievedSettings) :
    { showCompleted: true, itemQty: 6, sortParams: '' };

  const [showCompleted, setShowCompleted] = useState(initialState.showCompleted);
  const [itemQty, setItemQty] = useState(initialState.itemQty);
  const [sortParams, setSortParams] = useState(initialState.sortParams);

  const handleSortParams = (params) => {
    setSortParams(params.toString());
  }

  const handleItemQty = (qty) => {
    const parsedQty = parseInt(qty)
    if (!Number.isNaN(parsedQty)) {
      setItemQty(parsedQty);
    }
  }

  const toggleShowCompleted = () => {
    setShowCompleted(!showCompleted);
  }

  useEffect(() => {
    const settings = JSON.stringify({ showCompleted, itemQty, sortParams });
    localStorage.setItem('settings', settings);
  }, [showCompleted, itemQty, sortParams]);

  const value = {
    showCompleted,
    toggleShowCompleted,
    itemQty,
    handleItemQty,
    sortParams,
    handleSortParams,
  }

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export default Settings;