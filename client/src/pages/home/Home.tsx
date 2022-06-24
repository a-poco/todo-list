import React from 'react'
import { User } from '../../types';
import { useNavigate } from "react-router-dom";
import './home.css'

const initialState = {
  userName: null,
} as unknown as User

const Home = () => {
  const [userToBeAdded, setUserToBeAdded] = React.useState(initialState);
  let navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement> & { target: HTMLFormElement }) => {
    event.preventDefault()
    const formData = Object.fromEntries(new FormData(event.target)) as unknown as User;
    setUserToBeAdded(formData)
  }

  React.useEffect(() => {
    if (!userToBeAdded.userName) {
      return
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userToBeAdded)
    };

    fetch('/api/users', requestOptions)
      .then()
      .then(response => {
        if (response.status === 202) {
          response.json().then(json => {
            navigate({
              pathname: `/users/${json.userId}`
            })
          });
        }
        else {
          throw new Error("Not accepted")
        }
      }).catch(err => console.error("Something went wrong while adding a todo! ", err))
  }, [userToBeAdded]);



  return (
    <div>
      <h1 className='welcome-title'>Enter your user name and start!</h1>
      <form className="home" onSubmit={handleSubmit} >
        <input className='home__user-name' type="text" placeholder="User name" name="userName"></input>
        <div className='home__user-btns'>
          <button className='home__user-btn' type="submit">Start</button>
        </div>
      </form>
    </div>
  )
}

export default Home
