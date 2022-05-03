import useForm from '../../hooks/form.js';

import { v4 as uuid } from 'uuid';

function Form({ addToList }) {

  const defaultValues = {
    difficulty: 4,
  }

  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  function addItem(item) {
    // This deep copy assignment is needed in order to avoid improperly changing the "values" state in the useForm hook
    // The current architecture of this app is terrible.
    // This callback takes in a seemingly innocuous "item"  param but that's actually a React state object which should never ever be manipulated directly
    let newItem = { ...item }
    newItem.id = uuid();
    newItem.complete = false;
    addToList(newItem);
  }


  return (
    <form onSubmit={handleSubmit}>
      <h2>Add To Do Item</h2>

      <label>
        <span>To Do Item</span>
        <input
          onChange={handleChange}
          name="text"
          type="text"
          placeholder="Item Details"
          data-testid="text-input"
        />
      </label>

      <label>
        <span>Assigned To</span>
        <input
          onChange={handleChange}
          name="assignee"
          type="text"
          placeholder="Assignee Name"
          data-testid="assignee-input"
        />
      </label>

      <label>
        <span>Difficulty</span>
        <input
          onChange={handleChange}
          defaultValue={defaultValues.difficulty}
          type="range"
          min={1}
          max={5}
          name="difficulty"
          data-testid="difficulty-input"
        />
      </label>

      <label>
        <button type="submit">Add Item</button>
      </label>
    </form>
  );
}

export default Form;