import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'; // This fixes ".toBeInTheDocument is not a function" error

import App from '../App';
import SettingsProvider from '../context/settings';

// Helper function
function addItem(text, assignee, difficulty) {
  const textInput = screen.getByTestId('text-input')
  fireEvent.change(textInput, { target: { value: text } })
  const assigneeInput = screen.getByTestId('assignee-input')
  fireEvent.change(assigneeInput, { target: { value: assignee } })
  const difficultyInput = screen.getByTestId('difficulty-input')
  fireEvent.change(difficultyInput, { target: { value: difficulty } })

  const addButton = screen.getByText('Add Item');
  fireEvent.click(addButton)
}

describe('Integration tests of todo list', () => {

  test('Items can be added and they renders', async () => {
    render(<SettingsProvider><App /></SettingsProvider>);

    addItem('test text 1', 'test assignee', 5)

    const newTodoItem = screen.getByText('test text 1');
    expect(newTodoItem).toBeInTheDocument();
  });

  test('Items past the page limit are not rendered', async () => {
    render(<SettingsProvider><App /></SettingsProvider>);

    addItem('test text 1', 'test assignee', 5)
    addItem('test text 2', 'test assignee', 5)
    addItem('test text 3', 'test assignee', 5)
    addItem('test text 4', 'test assignee', 5)
    addItem('test text 5', 'test assignee', 5)
    addItem('test text 6', 'test assignee', 5)
    addItem('test text 7', 'test assignee', 5)

    const hiddenItem = screen.queryByText('test text 7');
    expect(hiddenItem).not.toBeInTheDocument();
  });

  test('Completed items are hidden after showCompleted setting is toggled off', async () => {
    render(<SettingsProvider><App /></SettingsProvider>);

    addItem('test text 1', 'test assignee', 5)

    const todoItem = screen.queryByText('test text 1');
    expect(todoItem).toBeInTheDocument();

    const completeSwitch = screen.getByTestId("checkbox")
    fireEvent.click(completeSwitch);
    
    const showSwitch = screen.getByTestId("show-completed-switch")
    fireEvent.click(showSwitch);

    expect(todoItem).not.toBeInTheDocument();
  });
});