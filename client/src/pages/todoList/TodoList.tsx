import React from 'react'
import { Link, useParams } from 'react-router-dom';
import AddTodoList from '../../components/addTodoList/AddTodoList';
import TodoListDetails from '../../components/todoListDetails/TodoListDetails';
import { TodosList } from '../../types'
import "./todoList.css"


const initialTodos: Array<TodosList> = []


const TodoList = () => {
    const [todoLists, setTodoLists] = React.useState(initialTodos);
    const userId = useParams().id;

    React.useEffect(() => {
        fetch(`/api/user/${userId}`)
          .then(res => res.json())
          .then(todoLists => {
            setTodoLists(todoLists)
          })
          .catch(err => alert("Something went wrong"))
    
      }, []);
    
  return (
    <div>
      <h1 className='header'>Categories</h1>
      {todoLists.map((todo: TodosList) => {
        return<TodoListDetails key={todo.todoListId} todoList={todo} />
    })}
    <AddTodoList/>
    </div>
  )
}

export default TodoList
