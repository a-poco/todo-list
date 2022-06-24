import React from "react";
import Todos from './components/todos/Todos';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TodoList from "./pages/todoList/TodoList";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/users/:id' element={<TodoList />} />
          <Route path='/users/:id/todo-lists/:listId' element={<Todos />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
