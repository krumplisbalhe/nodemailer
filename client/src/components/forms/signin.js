import React, {useState} from 'react'

function Signin() {
  const [signinData, setSigninData] = useState({username: '', password: ''})
  const [authorizedUser, setAuthorizedUser] = useState()

  const handleSigninDataChange = (key, value) => {
    setSigninData({...signinData, [key]: value});
  }

  console.log(authorizedUser)

  const submit = event => {
    event.preventDefault()
    fetch("http://localhost:8080/users/signin", {
      method: 'POST',
      body: JSON.stringify(signinData),
      headers: {
        'Content-Type': 'application/json'
    }
    })
    .then(res => res.json())
    .then(response => {
      console.log(response)
      setAuthorizedUser(response.userData)
      window.location.href = 'http://localhost:3000/profile'
    })
  }

  return (
    <div className="signin">
      <form onSubmit={submit}>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" onChange={event => handleSigninDataChange('username', event.target.value)}></input>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" onChange={event => handleSigninDataChange('password', event.target.value)}></input>
        <input type="submit" value="Log-in"></input>
      </form>
    </div>
  )
}

export default Signin
