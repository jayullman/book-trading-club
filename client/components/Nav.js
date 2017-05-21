import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Nav(props) {
  return (
    <nav>
      <ul>
        {props.isLoggedIn === false
          && <Link to='/signup'>Sign up</Link>
        }
        <Link to='/'>Home</Link>
        {props.isLoggedIn === true
          && <Link to='/mybooks'>My Books</Link>
        }
        <Link to='/allbooks'>All Books</Link>
        {props.isLoggedIn === false 
          ? <Link to='/login'>Log in</Link>
          : <a onClick={props.logOut}>Log out</a>
        }
        {props.isLoggedIn === true
          && <Link to='/settings'>Settings</Link>
        }
      </ul>
    </nav>
  );
}

Nav.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  logOut: PropTypes.func.isRequired
};

export default Nav;
