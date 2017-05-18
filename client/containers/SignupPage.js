import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
        sign up
        <form onSubmit={this.handleSignup}>
          <input
            type='email'
            value={this.state.emailText}
            name='email'
            onChange={this.handleInputChange}
          />
          <input
            type='password'
            value={this.state.passwordText}
            name='password'
            onChange={this.handleInputChange}
          />
          <button
          >
            Sign up
        </button>
        </form>
        <div className='message-display'>
          {this.state.message}
        </div>
      </div>
    );
  }
}

SignupPage.contextTypes = {
  router: PropTypes.object
}

export default SignupPage;
