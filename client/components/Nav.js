import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Nav(props) {
  return (
    <nav>
      <ul>
        <Link to='/signup'>Sign up</Link>
        <Link to='/'>Home</Link>
        <Link to='/mybooks'>My Books</Link>
        <Link to='/allbooks'>All Books</Link>
        {props.isLoggedIn === false 
          ? <Link to='/login'>Log in</Link>
          : <a onClick={props.logOut}>Log out</a>
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
