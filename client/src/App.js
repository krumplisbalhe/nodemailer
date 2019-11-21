import React from 'react'
import './App.css'
import './global.css'
import Mailer from './components/mailer/mailer'
import Signin from './components/forms/signin'
import Signup from './components/forms/signup'
import Landing from './components/landing/landing'
import Profile from './components/profile/profile'
import Nav from './components/nav/nav'
import Email from './assets/email.png'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

function App() {
  const user = { "_id" : "5dd48a774833425651bea332", "userName" : "Dori", "emailAddress" : "dora@kukac.com", "password" : "$2b$10$JwSQb75Q3lA6WZapdsi5t.ZjYyRf/6oZcLAGT1sdHt2CTIjmTHnu6", "messages" : [ { "to" : "radovicsrita@gmail.com", "subject" : "Doritol", "text" : "Doritol jott a level!" } ] }

  return (
    <Router>
      <div className="App">
        <div className="navColumn">
          <Nav/>
        </div>
        <div className="profileColumn">
          <Switch>
            <Route exact path="/(|signup|signin)/" render={() => <img src={Email} alt="logo" />} />
          </Switch>
          <Switch>
            <Route
              exact path="/profile"
              render={() => <Profile user={user} />}
            />
          </Switch>
        </div>
        <div className="messageColumn">
        <Switch>
            <Route
              exact path="/"
              render={() => <Landing />}
            />
          </Switch>
          <Switch>
            <Route
              exact path="/signup"
              render={() => <Signup />}
            />
          </Switch>
          <Switch>
            <Route
              exact path="/signin"
              render={() => <Signin/>}
            />
          </Switch>
          <Switch>
            <Route
              exact path="/profile"
              render={() => <Mailer user={user} />}
            />
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App
