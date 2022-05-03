import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';

import App from '../app';
import SettingsProvider from '../context/settings';

describe('Integration tests of todo list', () => {

  test('Testing that you can add an item and it renders', async () => {
    render(
      <SettingsProvider>
        <App />
      </SettingsProvider>
    )

    const textInput = screen.getByTestId('text-input')
    fireEvent.change(textInput, { target: { value: 'test text' } })
    const assigneeInput = screen.getByTestId('assignee-input')
    fireEvent.change(assigneeInput, { target: { value: 'test assignee' } })
    const difficultyInput = screen.getByTestId('difficulty-input')
    fireEvent.change(difficultyInput, { target: { value: 5 } })

    const addButton = screen.getByText('Add Item');
    fireEvent.click(addButton);

    const newTodoItem = await screen.findByText('test text');
    expect(newTodoItem).toBeInTheDocument();
  });
});