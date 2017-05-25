import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import axios from 'axios';

class SignupPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emailText: '',
      passwordText: '',
      message: ''
    };

    this.handleSignup = this.handleSignup.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSignup(event) {
    event.preventDefault();
    if (!this.state.emailText) {
      this.setState({ message: 'You must enter an email address' });
      return;
    } else if (!this.state.passwordText) {
      this.setState({ message: 'You must enter a password' });
      return;
    } 
    this.setState({ message: '' });
    
    const response = axios.post('/signup', {
      email: this.state.emailText,
      password: this.state.passwordText
    });

    response.then(({ data }) => {
      if (data.error) {
        this.setState({ message: data.error });
      } else {
        // redirect to home page
        this.context.router.history.push('/');
      }
    });
  }

  // set state for all input fields
  handleInputChange(event) {
    const targetName = event.target.name;
    const value = event.target.value;

    switch (targetName) {
      case 'email':
        this.setState({ emailText: value });
        break;

      case 'password':
        this.setState({ passwordText: value });
        break;

      default:
        break;
    }
  }

  render() {
    return (
      <div>
        <h2>Sign Up</h2>
        <form className='column' onSubmit={this.handleSignup}>
          <label htmlFor='signup-email'>
            Email
            <input
              id='signup-email'
              type='email'
              value={this.state.emailText}
              name='email'
              onChange={this.handleInputChange}
              placeholder='email address'
            />
          </label>
          <label htmlFor='signup-password'>
            Password
            <input
              id='signup-password'          
              type='password'
              value={this.state.passwordText}
              name='password'
              onChange={this.handleInputChange}
              placeholder='password'            
            />
          </label>
          <button
          >
            Sign up
        </button>
        </form>
        <div className='message-display'>
          {this.state.message}
        </div>
        <p>
          Log in <Link to='/login'>here</Link> if you already have an account
        </p>
      </div>
    );
  }
}

SignupPage.contextTypes = {
  router: PropTypes.object
};

export default SignupPage;
