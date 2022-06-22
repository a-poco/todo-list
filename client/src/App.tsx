import React from "react";
import Todos from './components/todos/Todos';
import AddTodo from './components/addTodo/AddTodo';

function App() {
  return (
    <React.Fragment>
      < AddTodo />
       <Todos />
  </React.Fragment>
  );
}

export default App;
