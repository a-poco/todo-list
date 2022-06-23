import React from "react";
import Todos from './components/todos/Todos';
import AddTodo from './components/addTodo/AddTodo';
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
        <Route path='/user' element={ <TodoList/>} >
            <Route index element={<TodoList />} />
            <Route path=':id' element={<TodoList />} />
          </Route>
       </Routes>
       </BrowserRouter>
  </React.Fragment>
  );
}

export default App;
