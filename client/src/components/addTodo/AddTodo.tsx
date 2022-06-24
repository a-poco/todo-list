import React from 'react'
import { Todo } from '../../types'
import './addTodo.css'

const initialState = {
  title: null,
  description: null,
  todoListId: null,
} as unknown as Todo

interface AddTodoProps {
  listId?: string;
}

const AddTodo: React.FC<AddTodoProps> = (props) => {
  const [todoToBeAdded, setTodoToBeAdded] = React.useState(initialState);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement> & { target: HTMLFormElement }) => {
    event.preventDefault()
    const formData = Object.fromEntries(new FormData(event.target)) as unknown as Todo;
    setTodoToBeAdded(formData)
  }

  React.useEffect(() => {
    if (todoToBeAdded === initialState || !todoToBeAdded.title) {
      return
    }
    todoToBeAdded.todoListId = props.listId || ""

    let request = JSON.stringify(todoToBeAdded)

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: request
    };

    fetch('/api/todos', requestOptions)
      .then(response => handleSuccessfulInsertion(response))
      .catch(err => console.error("Something went wrong while adding a todo! ", err))
  }, [todoToBeAdded]);
  const handleSuccessfulInsertion = (response: any) => {
    if (response.status !== 202) {
      throw new Error("Not accepted by the server!")
    }
    alert(`todo successfully added!`)
    window.location.reload();
  }

  return (
    <form className="todoCard" onSubmit={handleSubmit}>
      <input className='todoCard__input' type="text" placeholder="title" name="title"></input>
      <input className='todoCard__input' type="text" placeholder="desctiption" name="description"></input>
      <div className='todoCard__buttons'>
        <button className='todoCard__buttons-add' type="submit">Add</button>
      </div>
    </form>
  )
}

export default AddTodo