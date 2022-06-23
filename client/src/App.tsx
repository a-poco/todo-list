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
        <Route path='/todos' element={ <TodoList/>} >
            <Route index element={<Todos />} />
            <Route path=':id' element={<Todos />} />
          </Route>
       </Routes>
       </BrowserRouter>
  </React.Fragment>
  );
}

export default App;
