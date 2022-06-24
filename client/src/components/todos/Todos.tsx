import React from 'react'
import { useParams } from 'react-router-dom'
import { Todo } from '../../types'
import AddTodo from '../addTodo/AddTodo'
import TodoDetails from '../todoDetails/TodoDetails'

const initialTodos: Array<Todo> = []


const Todos = () => {
    const [todos, setTodos] = React.useState(initialTodos);
    const {id, listId} = useParams();

    console.log('====================================');
    console.log(id, listId);
    console.log('====================================');

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
      hello
      <AddTodo/>
    {todos.map((todo: Todo) => {
     return <TodoDetails key={todo.todoId} todo={todo} />
    })}
  </div>
  )
}

export default Todos