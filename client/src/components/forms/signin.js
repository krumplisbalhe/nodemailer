import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import './signin.css'

function Signin({pullUpState, pullUpErrorMessage}) {
  const history = useHistory()
  const [signinData, setSigninData] = useState({username: '', password: ''})
  const handleSigninDataChange = (key, value) => {
    setSigninData({...signinData, [key]: value})
  }

  const submit = (event) => {
    event.preventDefault()
    fetch('http://localhost:8080/users/signin', {
      method: 'POST',
      body: JSON.stringify(signinData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(response => {
        if (response.code === 1) {
          pullUpState(response.userData)
          pullUpErrorMessage(null)
          history.push('/profile')
        }
        if (response.error) {
          pullUpErrorMessage(response.error[0].msg)
        }
      })
  }

  return (
    <div className="signin">
      <form onSubmit={submit}>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" onChange={event => handleSigninDataChange('username', event.target.value)} />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" onChange={event => handleSigninDataChange('password', event.target.value)} />
        <input className="button" type="submit" value="Sign in" />
      </form>
    </div>
  )
}

export default Signin
