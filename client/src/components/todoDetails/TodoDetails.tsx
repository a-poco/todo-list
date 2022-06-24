import React from 'react'
import { Link } from 'react-router-dom';
import { Todo } from '../../types'
import './todoDetails.css'


interface TodoDetailsProps {
  todo: Todo;
}

const TodoDetails: React.FC<TodoDetailsProps> = ({ todo }) => {
  const handleToggle = () => {
    const request = {
      complete: !todo.complete
    }

    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    };


    fetch(`/api/todos/${todo.todoId}`, requestOptions)
      .then(res => {
        if (res.status === 202) {
        }
      }).catch(
        err => console.error("Something went wrong!")
      )

      window.location.reload();
  }

  return (
    <label className={todo.complete ? "todo--completed" : undefined}>
      <div className='todo'>
        <h1 className='todo-title'>{todo.title}</h1>
        <p className='todo-description'>{todo.description}</p>
        <Link to={'/'}>
          <button className='todo__btn-back'>Go back to</button>
        </Link>
        <button className='todo__btn-delete' onClick={handleToggle}>Mark as complete</button>
      </div>
    </label>
  )
}

export default TodoDetails