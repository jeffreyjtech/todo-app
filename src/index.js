import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.scss'
import App from './App.js';
import SettingsProvider from './context/settings';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SettingsProvider>
      <App />
    </SettingsProvider>
  </React.StrictMode>
);
