import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'; // This fixes ".toBeInTheDocument is not a function" error

import App from '../App';
import SettingsProvider from '../context/settings';
import AuthProvider from "../context/auth";

// Helper functions
import { login, addItem } from '../testHelpers';

describe('Integration tests of auth features', () => {

  test('Testing that logged-out users only render a login button', () => {
    
  });
});