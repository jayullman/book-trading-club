import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
// import react burger menu module
import { slide as Menu } from 'react-burger-menu';

import '../styles/burger-menu.css'
import '../styles/nav.css'

class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMenuOpen: false
    };

    this.handleSlideNavClick = this.handleSlideNavClick.bind(this);
  }

  handleSlideNavClick() {
    this.setState({ isMenuOpen: false });
  }

  render() {
    return (
      <div className='nav-container'>
        <nav className='navbar'>
          {this.props.isLoggedIn === false
            && <NavLink activeClassName='active-nav' className='signup-link' to='/signup'>Sign up</NavLink>
          }
          <NavLink exact activeClassName='active-nav' className='home-link' to='/'>Home</NavLink>
          {this.props.isLoggedIn === true
            && <NavLink className='mybooks-link' activeClassName='active-nav' to='/mybooks'>My Books</NavLink>
          }
          <NavLink className='allbooks-link' activeClassName='active-nav' to='/allbooks'>All Books</NavLink>
          {this.props.isLoggedIn === false
            ? <NavLink className='login-link' activeClassName='active-nav' to='/login'>Log in</NavLink>
            : <NavLink className='logout-link' to='' onClick={this.props.logOut}>Log out</NavLink>
          }
          {this.props.isLoggedIn === true
            && <NavLink className='settings-link' activeClassName='active-nav' to='/settings'>Settings</NavLink>
          }
        </nav>

        {/* Burger Menu Rendering when screen is narrow */}
        <nav className='burger-menu'>
          <Menu width={200} isOpen={this.state.isMenuOpen}>
            <NavLink exact activeClassName='active-nav' className='home-link' to='/'>Home</NavLink>
            {this.props.isLoggedIn === false
              && <NavLink activeClassName='active-nav' className='signup-link' to='/signup'>Sign up</NavLink>
            }
            {this.props.isLoggedIn === false
              ? <NavLink className='login-link' activeClassName='active-nav' to='/login'>Log in</NavLink>
              : <NavLink className='logout-link' to='' onClick={this.props.logOut}>Log out</NavLink>
            }
            {this.props.isLoggedIn === true
              && <NavLink className='settings-link' activeClassName='active-nav' to='/settings'>Settings</NavLink>
            }
          </Menu>
          <NavLink className='allbooks-link' activeClassName='active-nav' to='/allbooks'>All Books</NavLink>
          {this.props.isLoggedIn === true
            && <NavLink className='mybooks-link' activeClassName='active-nav' to='/mybooks'>My Books</NavLink>
          }
      </nav>
    </div>
    );
  }
}

Nav.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  logOut: PropTypes.func.isRequired
};

export default Nav;
