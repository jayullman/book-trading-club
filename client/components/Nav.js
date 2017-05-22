import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import '../styles/nav.css'

function Nav(props) {
  return (
    <nav>
      <div className='navbar'>
        {props.isLoggedIn === false
          && <NavLink activeClassName='active-nav' className='signup-link' to='/signup'>Sign up</NavLink>
        }
        <NavLink exact activeClassName='active-nav' className='home-link' to='/'>Home</NavLink>
        {props.isLoggedIn === true
          && <NavLink className='mybooks-link' activeClassName='active-nav' to='/mybooks'>My Books</NavLink>
        }
        <NavLink className='allbooks-link' activeClassName='active-nav' to='/allbooks'>All Books</NavLink>
        {props.isLoggedIn === false 
          ? <NavLink className='login-link' activeClassName='active-nav' to='/login'>Log in</NavLink>
          : <a className='logout-link' activeClassName='active-nav' onClick={props.logOut}>Log out</a>
        }
        {props.isLoggedIn === true
          && <NavLink className='settings-link' activeClassName='active-nav' to='/settings'>Settings</NavLink>
        }
      </div>
    </nav>
  );
}

Nav.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  logOut: PropTypes.func.isRequired
};

export default Nav;
