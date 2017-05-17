import React, { Component } from 'react';

import axios from 'axios';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emailText_signup: '',
      passwordText_signup: '',
      emailText_login: '',
      passwordText_login: '',
      message: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  // set state for all input fields
  handleInputChange(event) {
    console.log(event.target.name);
    const targetName = event.target.name;
    const value = event.target.value;

    switch (targetName) {
      case 'email_login':
        this.setState({ emailText_login: value });
        break;

      case 'password_login':
        this.setState({ passwordText_login: value });
        break;
      
      case 'email_signup':
        this.setState({ emailText_signup: value });
        break;
      
      case 'password_signup':
        this.setState({ passwordText_signup: value });
        break;

      default:
        break;
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('here');
    const response = axios.post('/signup', {
      email: this.state.emailText_signup,
      password: this.state.passwordText_signup
    });

    response.then(({ data }) => {
      console.log(data);
      if (data.error) {
        this.setState({ message: data.error });
      } else {
        // redirect to home page
      }
    });
  }

  render() {
    return (
      <div>
        log in
        <form onSubmit={this.handleSubmit}>
          <input
            type='email'
            value={this.state.emailText}
            name='email_login'
            onChange={this.handleInputChange}
          />
          <input
            type='password'
            value={this.state.passwordText}
            name='password_login'
            onChange={this.handleInputChange}
          />
          <button

          >
            Log in
        </button>
        </form>
        sign up
        <form onSubmit={this.handleSubmit}>
          <input
            type='email'
            value={this.state.emailText}
            name='email_signup'            
            onChange={this.handleInputChange}
          />
          <input
            type='password'
            value={this.state.passwordText}
            name='password_signup'
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

export default LoginPage;
