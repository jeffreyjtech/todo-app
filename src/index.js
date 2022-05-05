import React from 'react';
import ReactDOM from 'react-dom/client';
import LoginContext from './context/auth';
import './index.scss'
import App from './App.js';
import SettingsProvider from './context/settings';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LoginContext>    
      <SettingsProvider>
        <App />
      </SettingsProvider>
    </LoginContext>
  </React.StrictMode>
);
