import { screen, fireEvent, render } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';

import SettingsProvider from './context/settings';
import AuthProvider from "./context/auth";

// Helper functions
export function deepRender(component) {
  render(<AuthProvider><SettingsProvider>{component}</SettingsProvider></AuthProvider>);
}

export function addItem(text, assignee, difficulty) {
  const textInput = screen.getByTestId('text-input');
  fireEvent.change(textInput, { target: { value: text } });
  const assigneeInput = screen.getByTestId('assignee-input');
  fireEvent.change(assigneeInput, { target: { value: assignee } });
  const difficultyInput = screen.getByTestId('difficulty-input');
  fireEvent.change(difficultyInput, { target: { value: difficulty } });

  const addButton = screen.getByText('Add Item');
  fireEvent.click(addButton);
}

export function checkComplete(text) {
  const checkbox = screen.getByTestId(`checkbox-${text}`);
  fireEvent.click(checkbox);
}

export function login(username, password) {
  const logoutButton = screen.queryByText(/logout/i);
  if (logoutButton) {
    fireEvent.click(logoutButton);
  }
  
  const loginButton = screen.getByText(/login/i);

  const usernameInput = screen.getByTestId('username');
  fireEvent.change(usernameInput, { target: { value: username } });

  const passwordInput = screen.getByTestId('password');
  fireEvent.change(passwordInput, { target: { value: password } });

  fireEvent.click(loginButton);
}

export function logout() {
  const logoutButton = screen.getByText(/logout/i);
  fireEvent.click(logoutButton);
}

