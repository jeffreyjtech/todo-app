import { useContext } from 'react';
import { When } from 'react-if';

import ToDo from './components/todoList/ToDoList.js';
import { AuthContext } from './context/auth';
import Login from './components/auth/Login.js';

function App() {

  const { isLoggedIn } = useContext(AuthContext);

  return (
    <>
      <Login />
      <When condition={isLoggedIn}>
        <ToDo />
      </When>
    </>
  );
}

export default App;
