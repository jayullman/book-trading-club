import React, { Component } from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emailText: '',
      passwordText: '',
      message: ''
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
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

  handleLogin(event) {
    event.preventDefault();
    const response = axios.post('/login', {
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

  render() {
    return (
      <div>
        <h2>Log In</h2>
        <form className='column' onSubmit={this.handleLogin}>
          <label htmlFor='login-email'>
            Email
            <input
              id='login-email'
              type='email'
              value={this.state.emailText}
              name='email'
              onChange={this.handleInputChange}
              placeholder='email address'
            />
          </label>
          <label htmlFor='login-password'>
            Password
            <input
              id='login-password'
              type='password'
              value={this.state.passwordText}
              name='password'
              onChange={this.handleInputChange}
              placeholder='password'            
            />
          </label>
          <button
          >
            Log in
        </button>
        </form>
        <div className='message-display'>
          {this.state.message}
        </div>
      </div>
    );
  }
}

LoginPage.contextTypes = {
  router: PropTypes.object
};

export default LoginPage;
