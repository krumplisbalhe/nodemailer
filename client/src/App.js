import React from 'react'
import './App.css'
import Mailer from './components/mailer/mailer'
import Signin from './components/forms/signin'
import Signup from './components/forms/signup'
import Landing from './components/landing/landing'
import Profile from './components/profile/profile'
import Nav from './components/nav/nav'
import { ReactComponent as Logo } from './logo.svg'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <div className="navColumn">
          <Nav/>
        </div>
        <div className="profileColumn">
          <Switch>
            <Route exact path="/(|signup|signin)/" render={() => <Logo />} />
          </Switch>
          <Switch>
            <Route
              exact path="/profile"
              render={() => <Profile />}
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
              render={() => <Signin />}
            />
          </Switch>
          <Switch>
            <Route
              exact path="/profile"
              render={() => <Mailer />}
            />
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App
