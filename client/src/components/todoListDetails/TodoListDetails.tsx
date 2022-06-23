import React from 'react'
import { Link } from 'react-router-dom';
import { TodosList } from '../../types';
import { RiDeleteBin6Line } from "react-icons/ri";

interface TodoListDetailsProps {
        todoList: TodosList;
    }
    
    const TodoListDetails: React.FC<TodoListDetailsProps> = ({todoList}) =>{
    
      const handleDelete = () => {
        fetch(`/api/todos/${todoList.todoListId}`, {method: 'DELETE'})
          .then(res => {
            if (res.status === 202){
              alert("Successfully deleted!")
              
            }
          }).catch(
            err => alert("Something went wrong!")
          )
      }
    
  return (
    <div className='todos-list-card'>
    <Link to={`/todos/${todoList.todoListId}`}>
      <p className='todos-list'>{todoList.TodoListName.charAt(0).toUpperCase() + todoList.TodoListName.slice(1)}</p>
    </Link>
    <button className='todo-detail__btns-delete' onClick={handleDelete}><RiDeleteBin6Line/></button>
  </div>
  )
}

export default TodoListDetails