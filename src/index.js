import React from 'react';
import ReactDOM from 'react-dom/client';
import AuthProvider from './context/auth';
import './index.scss'
import App from './App.js';
import SettingsProvider from './context/settings';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>    
      <SettingsProvider>
        <App />
      </SettingsProvider>
    </AuthProvider>
  </React.StrictMode>
);
