import { Card, Checkbox } from "@blueprintjs/core";

function TodoItem({ item, toggleComplete }) {
  return (
    <Card>
      <p>{item.text}</p>
      <p><small>Assigned to: {item.assignee}</small></p>
      <p><small>Difficulty: {item.difficulty}</small></p>
      <Checkbox onClick={() => toggleComplete(item.id)}><small>Complete</small></Checkbox>
    </Card>
  );
}

export default TodoItem;
