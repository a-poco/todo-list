import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Todo } from '../../types'
import AddTodo from '../addTodo/AddTodo'
import TodoDetails from '../todoDetails/TodoDetails'
import './todos.css'

const initialTodos: Array<Todo> = []


const Todos = () => {
    const [todos, setTodos] = React.useState(initialTodos);
    const {id, listId} = useParams();

    React.useEffect(() => {
        fetch(`/api/todos?todoListId=${listId}`)
          .then(res => res.json())
          .then(todos => {
            setTodos(todos)
          })
          .catch(err => alert("Something went wrong"))
      }, []);

  return (
    <div className='todos'>
      <Link to={'/'}>
            <button className='todo__btn-back'>Go back to</button>
    </Link>
    {todos.map((todo: Todo) => {
      return <TodoDetails key={todo.todoId} todo={todo} />
    })}
      <AddTodo listId={listId}/>
  </div>
  )
}

export default Todos