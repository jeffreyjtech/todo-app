import { screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'; // This fixes ".toBeInTheDocument is not a function" error

import App from '../App';

// Helper functions
import { login, addItem, deepRender, logout } from '../integrationTestHelpers';

describe('Integration tests of auth features', () => {

  test('Logged-out user see a login button', () => {
    deepRender(<App />);

    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  test('User can log in, and then a logout button appears', () => {
    deepRender(<App />);
    login('Reader', 'reader');

    expect(screen.queryByText(/login/i)).not.toBeInTheDocument();
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
    logout();
  });

  test('Readers cannot see the add item form', () => {
    deepRender(<App />);
    login('Reader', 'reader');

    expect(screen.queryByTestId(/you-have-write-perms/i)).not.toBeInTheDocument();
    logout();
  });

  test('WriteOnly users can see & use "add item" form but not the delete or complete controls', () => {
    deepRender(<App />);
    login('WriteOnly', 'writeonly');

    expect(screen.getByTestId(/you-have-write-perms/i)).toBeInTheDocument();

    addItem('testing 1 2 3', 'test assignee', 5);

    expect(screen.getByText(/testing 1 2 3/i)).toBeInTheDocument();
    expect(screen.queryByTestId(/checkbox.*/i)).not.toBeInTheDocument();
    expect(screen.queryByTestId(/you-have-delete-perms/i)).not.toBeInTheDocument();
    logout();
  });

  test('Write users can see all controls', () => {
    deepRender(<App />);
    login('Writer', 'writer');

    addItem('testing 4 5 6', 'test assignee', 5);

    expect(screen.getByText(/testing 4 5 6/i)).toBeInTheDocument();
    expect(screen.getByTestId(/you-have-write-perms/i)).toBeInTheDocument();
    expect(screen.getByTestId(/checkbox.*/i)).toBeInTheDocument();
    expect(screen.getByTestId(/you-have-delete-perms/i)).toBeInTheDocument();
    logout();
  });
});