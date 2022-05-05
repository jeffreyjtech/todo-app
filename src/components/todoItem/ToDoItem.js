import { Card, Checkbox } from "@blueprintjs/core";

import Auth from "../auth/Auth";

function TodoItem({ item, toggleComplete }) {

  return (
    <Card>
      <p>{item.text}</p>
      <p><small>Assigned to: {item.assignee}</small></p>
      <p><small>Difficulty: {item.difficulty}</small></p>
      <Auth capability="update">
        <Checkbox 
          checked={item.complete} 
          onClick={() => toggleComplete(item.id)} 
          data-testid="checkbox"
        >
          <small>Complete</small>
        </Checkbox>
      </Auth>
    </Card>
  );
}

export default TodoItem;
