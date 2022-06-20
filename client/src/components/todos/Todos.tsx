import React from 'react'
import { Todo } from '../../types'

const initialTodos: Array<Todo> = []


const Todos = () => {
    const [todos, setTodos] = React.useState(initialTodos);
    React.useEffect(() => {
        fetch("/api/todos")
          .then(res => res.json())
          .then(todos => {
            setTodos(todos)
          })
          .catch(err => alert("Something went wrong"))
    
      }, []);
  return (
    <div className='todos'>
    {todos.map((todo: Todo) =>
      <div key={todo.id}>
          <h1 className='todo'>{todo.tittle} </h1>
          <p>{todo.description}</p>
      </div>
    )}.
  </div>
  )
}

export default Todos