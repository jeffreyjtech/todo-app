import React, { useContext, useEffect, useState, useReducer } from 'react';
import { Menu, Button, ButtonGroup } from '@blueprintjs/core';
import { v4 as uuid } from 'uuid';

import { SettingsContext } from '../../context/settings.js';
import TodoItem from '../todoItem/ToDoItem';
import Form from '../form/Form';
import Controls from '../controls/Controls.js';

function filterList(displayList, payload) {
  console.log(payload, typeof payload)
  switch (typeof payload) {
    case 'object':
      if (Array.isArray(payload)) {
        return payload;
      }
      break;
    case 'function':
      return displayList.filter(payload);
    default:
      return displayList;
  }
}

const ToDoList = () => {
  const { showCompleted, itemQty, sortParams } = useContext(SettingsContext);
  const [list, setList] = useState([]);
  const [displayList, displayDispatch] = useReducer(filterList, []);
  const [paginatedList, setPaginatedList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  /*
  function deleteItem(id) {
    const items = list.filter(item => item.id !== id);
    setList(items);
  }
  */

  function addToList(item) {
    setList([...list, item]);
  }

  function changePage(e) {
    e.preventDefault();
    setCurrentPage(parseInt(e.target.value));
  }

  useEffect(() => {
    setCurrentPage(1);
  }, [itemQty, showCompleted, sortParams]);

  useEffect(() => {
    displayDispatch(list);
  }, [list]);


  useEffect(() => {
    if (!showCompleted) {
      displayDispatch((item) => !item.complete);
    } else {
      displayDispatch(list);
    }
  }, [showCompleted, list]);

  useEffect(() => {
    if (sortParams) {
      displayDispatch((item) =>
        item.text.toLowerCase().includes(sortParams.toLowerCase())
      );
    } else {
      displayDispatch(list);
    }
  }, [sortParams, list]);

  useEffect(() => {
    let temp = displayList.filter((item, idx) =>
      idx < currentPage * itemQty && idx >= (currentPage - 1) * itemQty);
    setPaginatedList(temp);
    setPageCount(Math.ceil(displayList.length / itemQty))
  }, [currentPage, itemQty, list, showCompleted, sortParams]);

  function toggleComplete(id) {
    const items = list.map((item) => {
      if (item.id === id) {
        item.complete = !item.complete;
      }
      return item;
    });
    setList(items);
  }

  useEffect(() => {
    let incompleteCount = list.filter((item) => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
  }, [list, incomplete]);

  let pageButtons = [];
  for (let i = 1; i <= pageCount; i++) {
    let isActive = i === currentPage;
    pageButtons[i] = (
      <Button onClick={changePage} value={i} key={uuid()} active={isActive}>
        {i}
      </Button>
    );
  }

  return (
    <>
      <header>
        <h1>To Do List: {incomplete} items pending</h1>
      </header>
      <Controls />
      <Menu>
        <Form addToList={addToList} />
        <ButtonGroup>{pageButtons}</ButtonGroup>
      </Menu>
      <div>
        {displayList.map((item) => (
          <TodoItem key={item.id} toggleComplete={toggleComplete} item={item} />
        ))}
      </div>
    </>
  );
};

export default ToDoList;
