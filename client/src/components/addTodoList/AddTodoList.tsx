import React from 'react'
import { TodosList } from '../../types';
import './addTodoList.css'

const initialState = {
    todoListId: null,
    TodoListName: null,
    userId: null,
  } as unknown as TodosList

const AddTodoList = () => {
    const [todoListToBeAdded, setTodoListToBeAdded] = React.useState(initialState);
   
    const handleSubmit = (event: React.FormEvent<HTMLFormElement> & { target: HTMLFormElement }) => {
        event.preventDefault()
        const formData = Object.fromEntries(new FormData(event.target)) as unknown as TodosList;
        setTodoListToBeAdded(formData)
        
      }

      React.useEffect(() => {
        if (todoListToBeAdded === initialState || !todoListToBeAdded.TodoListName) {
          return
        }
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(todoListToBeAdded)
        };

        fetch('/api/todos-list', requestOptions)
          .then(response => handleSuccessfulInsertion(response))
          .catch(err => console.error("Something went wrong while adding a todo! ", err))
      }, [todoListToBeAdded]);
    
      const handleSuccessfulInsertion = (response: any) => {
    
        if (response.status !== 202) {
          throw new Error("Not accepted by the server!")
        }
    
        alert(`todo successfully added!`)
      }

  return (
    <form className="todoListCard" onSubmit={handleSubmit}>
    <input className='todoListCard__input' type="text" placeholder="new category" name="todo list"></input>
      <button className='todoListCard__add' type="submit">Add</button>
  </form>
  )
}

export default AddTodoList
