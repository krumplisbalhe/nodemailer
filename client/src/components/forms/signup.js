import React, {useState} from 'react'

function Signup() {
  const [signupData, setSignupData] = useState({username: '', email: '', password: ''})
  const handleSignupDataChange = (key, value) => {
    setSignupData({...signupData, [key]: value});
  }

  const submit = event => {
    event.preventDefault()
    fetch("http://localhost:8080/users/signup", {
      method: 'POST',
      body: JSON.stringify(signupData),
      headers: {
        'Content-Type': 'application/json'
    }
    })
    .then(res => res.json())
    .then(response => {
      console.log(response)
      if(response.code === 1){
        window.location.href = 'http://localhost:3000/signin'
      }
    })
  }

  return (
    <div className="signup">
      <form onSubmit={submit}>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" onChange={event => handleSignupDataChange('username', event.target.value)}></input>
        <label htmlFor="email">Email address</label>
        <input type="email" name="email" onChange={event => handleSignupDataChange('email', event.target.value)}></input>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" onChange={event => handleSignupDataChange('password', event.target.value)}></input>
        <input type="submit" value="Log-in"></input>
      </form>
    </div>
  )
}

export default Signup
