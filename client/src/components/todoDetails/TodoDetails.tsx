import React from 'react'
import { Todo } from '../../types'


interface TodoDetailsProps {
    todo: Todo;
}

const TodoDetails: React.FC<TodoDetailsProps> = ({todo}) =>{

  const handleDelete = () => {
    fetch(`/api/todos/${todo.todoId}`, {method: 'DELETE'})
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
        <h1>{todo.title}</h1>
        <p>{todo.description}</p>
        <button className='todo-detail__btns-delete' onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default TodoDetails