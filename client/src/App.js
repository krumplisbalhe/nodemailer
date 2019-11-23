import React, {useState} from 'react'
import Mailer from './components/mailer/mailer'
import Signin from './components/forms/signin'
import Signup from './components/forms/signup'
import Landing from './components/landing/landing'
import Profile from './components/profile/profile'
import Nav from './components/nav/nav'
import Email from './assets/email.png'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css'
import './global.css'

function App() {
  const [authorizedUser, setAuthorizedUser] = useState()

  const isUserAuthenticated = authorizedUser != null

  const pullUpState = (value) => {
    setAuthorizedUser(value)
    console.log(value)
  }

  return (
    <Router>
      <div className="App">
        <div className="navColumn">
          <Nav isUserAuthenticated={isUserAuthenticated} pullUpState={pullUpState} />
        </div>
        <div className="profileColumn">
          <Switch>
            <Route exact path="/(|signup|signin)/" render={() => <img src={Email} alt="logo" />} />
          </Switch>
          <Switch>
            <Route
              exact path="/profile"
              render={authorizedUser ? (() => <Profile user={authorizedUser} />) : ''}
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
              render={() => <Signin pullUpState={pullUpState} />}
            />
          </Switch>
          <Switch>
            <Route
              exact path="/profile"
              render={authorizedUser ? (() => <Mailer user={authorizedUser} pullUpState={pullUpState} />) : ''}
            />
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App
