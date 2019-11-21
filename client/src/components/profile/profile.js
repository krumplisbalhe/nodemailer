import React from 'react'
import './profile.css'
import avatar from '../../assets/avatar.png'

function Profile({user}) {
  return (
    <div className="profile">
      <h2>
        Hi {user.userName}!
      </h2>
      <img src={avatar} className="avatar" alt="avatar" style={{width: "100px", height: "100px"}} />
      <div className="messages">
        {user.messages.map(item => (
          <div className="message" key={item.time}>
            <p className="bold">{item.to}</p>
            <p className="smaller">{item.subject}</p>
            <p className="smaller">{item.time}</p>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Profile
