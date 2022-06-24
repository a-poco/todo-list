import React from 'react'
import { Link } from 'react-router-dom';
import { TodosList } from '../../types';
import { RiDeleteBin6Line } from "react-icons/ri";

interface TodoListDetailsProps {
        userId?: string,
        todoList: TodosList;
    }
    
    const TodoListDetails: React.FC<TodoListDetailsProps> = ({userId,todoList}) =>{
    
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
    <Link to={`todo-lists/${todoList.todoListId}`} style={{ textDecoration: 'none', color: 'black'}}>
      <p className='todos-list'>{todoList.TodoListName.charAt(0).toUpperCase() + todoList.TodoListName.slice(1)}</p>
    </Link>
    <p className='todo-detail__btns-delete' onClick={handleDelete}><RiDeleteBin6Line/></p>
  </div>
  )
}

export default TodoListDetails