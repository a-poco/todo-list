import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
