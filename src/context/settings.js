import React, { useState } from "react";

export const SettingsContext = React.createContext();

function Settings({ children }) {
  const [showCompleted, setShowCompleted] = useState(true);
  const [itemQty, setItemQty] = useState(6);
  const [sortParams, setSortParams] = useState('');

  const handleSortParams = (params) => {
    setSortParams(params.toString());
  }

  const handleItemQty = (qty) => {
    const parsedQty = parseInt(qty)
    if(!parsedQty.isNaN()) {
      setItemQty(parsedQty);
    }
  }

  const toggleShowCompleted = () => {
    setShowCompleted(!showCompleted);
  }

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