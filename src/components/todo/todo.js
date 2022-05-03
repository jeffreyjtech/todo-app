import React, { useContext, useEffect, useState } from 'react';
import TodoItem from '../todoItem/todoItem';

import { Menu, Button, ButtonGroup } from '@blueprintjs/core';
import { SettingsContext } from '../../context/settings.js';
import Form from '../form/form';

const ToDo = () => {

  const { showCompleted, itemQty, sortParams } = useContext(SettingsContext)
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const [page, setPage] = useState(1);

  /*
  function deleteItem(id) {
    const items = list.filter(item => item.id !== id);
    setList(items);
  }
  */
 
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

  function changePage(e) {
    e.preventDefault();
    setPage(parseInt(e.target.value));
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
    console.log(item.text, sortParams)
    return item.text.toLowerCase().includes(sortParams.toLowerCase());
  });

  let pageButtons = [];
  let pageQty = Math.ceil(sortedList.length / itemQty);
  for (let i = 1; i <= pageQty; i++) {
    pageButtons[i] = <Button onClick={changePage} value={i}>{i}</Button>
  }

  sortedList = sortedList.filter((item, idx) => idx < page * itemQty && idx >= (page - 1) * itemQty)

  return (
    <>
      <header>
        <h1>To Do List: {incomplete} items pending</h1>
      </header>
      <Menu>
        <Form addToList={addToList}/>
        <ButtonGroup>
          {pageButtons}
        </ButtonGroup>
      </Menu>
      <div>
        {sortedList.map(item => (
          <TodoItem
            key={item.id}
            toggleComplete={toggleComplete}
            item={item}
          />
        ))}
      </div>
    </>
  );
};

export default ToDo;
