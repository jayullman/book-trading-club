import React, { Component } from 'react';

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
    console.log(event.target.name);
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
        <form onSubmit={this.handleLogin}>
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
            Log in
        </button>
        </form>
        
      </div>
      
    );
  }
}

export default LoginPage;
