import React from 'react'
import { Todo, DeletTodo } from '../../types'

interface TodoDetailsProps {
    todo: Todo;
}

const TodoDetails: React.FC<TodoDetailsProps> = ({todo}) =>{

  const handleDelete = () => {
    fetch(`/api/todos/${todo.id}`, {method: 'DELETE'})
      .then(res => {
        if (res.status === 202){
          alert("Successfully deleted!")
          
        }
      }).catch(
        err => alert("Something went wrong!")
      )
  }

  return (
    <div>
        <h1>{todo.tittle}</h1>
        <p>{todo.description}</p>
        <button className='todo-detail__btns-delete' onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default TodoDetails