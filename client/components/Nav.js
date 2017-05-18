import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {

  render() {
    return (
      <nav>
        <ul>
          <Link to='/signup'>Sign up</Link>
          <Link to='/login'>Log in</Link>
          <Link to='/'>Home</Link>
          <Link to='/mybooks'>My Books</Link>
          <Link to='/allbooks'>All Books</Link>
        </ul>
      </nav>
    );
  }
}

export default Nav;
