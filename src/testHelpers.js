import { screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';

// Helper functions
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

export function checkComplete() {
  const checkbox = screen.getByTestId('checkbox');
  fireEvent.click(checkbox);
}

export function login(username, password) {
  const loginButton = screen.getByText(/login/i);

  const usernameInput = screen.getByTestId('username');
  fireEvent.change(usernameInput, { target: { value: username } });

  const passwordInput = screen.getByTestId('password');
  fireEvent.change(passwordInput, { target: { value: password } });

  fireEvent.click(loginButton);
}