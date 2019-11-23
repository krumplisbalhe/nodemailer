import React from 'react'
import {NavLink} from 'react-router-dom'
import './nav.css'

function Nav({isUserAuthenticated, pullUpState}) {
  return (
    <div className="nav">
      {isUserAuthenticated
        ? (
          <>
            <NavLink activeClassName="isActive" to="/profile">
              <i className="fas fa-envelope-open-text fa-2x" />
            </NavLink>
            <NavLink to="/" onClick={()=>pullUpState(null)}>
              <i className="fas fa-door-open fa-2x" />
            </NavLink>
          </>
        ) : (
          <>
            <NavLink activeClassName="isActive" exact to="/">
              <i className="fas fa-home fa-2x" />
            </NavLink>
            <NavLink activeClassName="isActive" to="/signup">
              <i className="fas fa-user-plus fa-2x" />
            </NavLink>
            <NavLink activeClassName="isActive" to="/signin">
              <i className="fas fa-sign-in-alt fa-2x" />
            </NavLink>
          </>
        )
      }
    </div>
  )
}

export default Nav
