import useForm from '../../hooks/form.js';

import { v4 as uuid } from 'uuid';

function Form({ addToList }) {

  const defaultValues = {
    difficulty: 4,
  }

  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  function addItem(item) {
    item.id = uuid();
    item.complete = false;
    addToList(item);
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