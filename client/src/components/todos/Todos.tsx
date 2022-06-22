import React from 'react'
import { Todo, DeletTodo } from '../../types'
import TodoDetails from '../todoDetails/TodoDetails'

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
    {todos.map((todo: Todo) => {
     return <TodoDetails key={todo.id} todo={todo} />
    })}
  </div>
  )
}

export default Todos