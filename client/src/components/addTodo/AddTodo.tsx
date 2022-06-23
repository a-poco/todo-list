import React from 'react'
import { Todo } from '../../types'

const initialState = {
    title: null,
    description: null,
  } as unknown as Todo

const AddTodo: React.FC = () => {
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
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(todoToBeAdded)
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