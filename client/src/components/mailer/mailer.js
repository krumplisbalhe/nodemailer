import React, {useState} from 'react'
import './mailer.css'

function Mailer({user, pullUpState, pullUpErrorMessage}) {
  const [mailData, setmailData] = useState({
    to: '',
    subject: '',
    text: '',
    username: user.userName
  })

  const handleMailDataChange = (key, value) => {
    setmailData({...mailData, [key]: value})
  }

  const submit = event => {
    event.preventDefault()
    fetch('http://localhost:8080/emails/send', {
      method: 'POST',
      body: JSON.stringify(mailData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(response => {
        if (response.code === 1) {
          pullUpState(response.userData)
        }
        if (response.error) {
          pullUpErrorMessage(response.error[0].msg)
        }
      })
  }

  return (
    <div className="mailer">
      <form onSubmit={submit}>
        <label htmlFor="to">To</label>
        <input type="text" name="to" onChange={event => handleMailDataChange('to', event.target.value)} />
        <label htmlFor="subject">Subject</label>
        <input type="text" name="subject" onChange={event => handleMailDataChange('subject', event.target.value)} />
        <label htmlFor="text">Text</label>
        <textarea name="text" onChange={event => handleMailDataChange('text', event.target.value)} />
        <input className="button" type="submit" value="Send" />
      </form>
    </div>
  )
}

export default Mailer
