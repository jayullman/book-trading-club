import React, { Component } from 'react';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emailText: '',
      passwordText: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div>
        log in
        <form action='/login' method='post'>
          <input
            type='email'
            value={this.state.emailText}
          />
          <input
            type='password'
            value={this.state.passwordText}
          />
          <button

          >
            Log in
        </button>
        </form>
        sign up
        <form action='/signup' method='post'>
          <input
            type='email'
            value={this.state.emailText}
          />
          <input
            type='password'
            value={this.state.passwordText}
          />
          <button

          >
            Sign up
        </button>
        </form>
      </div>
      
    );
  }
}

export default LoginPage;
