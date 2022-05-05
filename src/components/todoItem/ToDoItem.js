import { Button, Card, Checkbox, Icon } from "@blueprintjs/core";

import './toDoItem.scss';

import Auth from "../auth/Auth";

function TodoItem({ item, toggleComplete, deleteItem }) {

  return (
    <Card>
      <p>{item.text}</p>
      <p><small>Assigned to: {item.assignee}</small></p>
      <p><small>Difficulty: {item.difficulty}</small></p>
      <Auth capability="delete">
        <Button 
          onClick={() => deleteItem(item.id)}
          data-testid="you-have-delete-perms"
        >
          <Icon icon="delete" intent="Danger"/>
        </Button>
      </Auth>
      <Auth capability="update">
        <Checkbox 
          checked={item.complete} 
          onClick={() => toggleComplete(item.id)} 
          data-testid={`checkbox-${item.text}`}
        >
          <small>Complete</small>
        </Checkbox>
      </Auth>
    </Card>
  );
}

export default TodoItem;
