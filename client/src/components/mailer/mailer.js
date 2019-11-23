import React, {useState} from 'react'
import './mailer.css'

function Mailer({user, pullUpState}) {
  const [mailData, setmailData] = useState({to: '', subject:'', text: '', username: user.userName})

  const handleMailDataChange = (key, value) => {
    setmailData({...mailData, [key]: value});
  }

  const submit = event => {
    event.preventDefault()
    fetch("http://localhost:8080/emails/send", {
      method: 'POST',
      body: JSON.stringify(mailData),
      headers: {
        'Content-Type': 'application/json'
    }
    })
    .then(res => res.json())
    .then(response => {
      console.log(response)
      pullUpState(response.userData)
    })
  }

  return (
    <div className="mailer">
      <form onSubmit={submit}>
        <label htmlFor="to">To</label>
        <input type="text" name="to" onChange={event => handleMailDataChange('to', event.target.value)}></input>
        <label htmlFor="subject">Subject</label>
        <input type="text" name="subject" onChange={event => handleMailDataChange('subject', event.target.value)}></input>
        <label htmlFor="text">Text</label>
        <textarea name="text" onChange={event => handleMailDataChange('text', event.target.value)}></textarea>
        <input className="button" type="submit" value="Send"></input>
      </form>
    </div>
  )
}

export default Mailer
