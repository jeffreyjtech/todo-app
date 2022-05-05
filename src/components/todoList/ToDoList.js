import React, { useContext, useEffect, useState } from 'react';
import { Menu, Button, ButtonGroup } from '@blueprintjs/core';
import { v4 as uuid } from 'uuid';

import { SettingsContext } from '../../context/settings.js';
import TodoItem from '../todoItem/ToDoItem';
import Form from '../form/Form';
import Controls from '../controls/Controls.js';
import Auth from '../auth/Auth.js';

const ToDoList = () => {

  const { showCompleted, itemQty, sortParams } = useContext(SettingsContext)
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const [page, setPage] = useState(1);

  function deleteItem(id) {
    const items = list.filter(item => item.id !== id);
    setList(items);
  }

  function addToList(item) {
    setList([...list, item]);
  }

  function toggleComplete(id) {

    const items = list.map(item => {
      if (item.id === id) {
        item.complete = !item.complete;
      }
      return item;
    });

    setList(items);

  }

  function changePage(id) {
    setPage(id);
  }

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
  }, [list, incomplete]);

  let sortedList = [...list];
  if (!showCompleted) {
    sortedList = sortedList.filter((item) => !item.complete)
  }

  sortedList = sortedList.filter((item) => {
    return item.text.toLowerCase().includes(sortParams.toLowerCase());
  });

  let pageButtons = [];
  let pageQty = Math.ceil(sortedList.length / itemQty);
  for (let i = 1; i <= pageQty; i++) {
    pageButtons[i] = (
      <Button 
        onClick={() => changePage(i)} 
        value={i} 
        key={uuid()} 
        active={i === page}
      >
        {i}
      </Button>
    )
  }

  sortedList = sortedList.filter((item, idx) => idx < page * itemQty && idx >= (page - 1) * itemQty);

  return (
    <>
      <header>
        <h1>To Do List: {incomplete} items pending</h1>
      </header>
      <Controls />
      <Menu>
        <Auth capability="write">
          <Form addToList={addToList} />
        </Auth>
        <ButtonGroup>
          {pageButtons}
        </ButtonGroup>
      </Menu>
      <div>
        {sortedList.map(item => (
          <TodoItem
            key={item.id}
            toggleComplete={toggleComplete}
            deleteItem={deleteItem}
            item={item}
          />
        ))}
      </div>
    </>
  );
};

export default ToDoList;
