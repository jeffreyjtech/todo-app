import React, { useState } from "react";

export const SettingsContext = React.createContext();

function Settings({ children }) {
  const [showCompleted, /*setShowCompleted*/] = useState(true);
  const [itemQty, /*setItemQty*/] = useState(6);
  const [sortParams, /*setSortParams*/] = useState('');

  return (
    <SettingsContext.Provider value={{showCompleted, itemQty, sortParams}}>
      {children}
    </SettingsContext.Provider>
  );
}

export default Settings;