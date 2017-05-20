import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';

import HomePage from '../components/HomePage';
import LoginPage from '../containers/LoginPage';
import SignupPage from '../containers/SignupPage';
import BooksContainer from '../containers/BooksContainer';
import Nav from '../components/Nav';
import Header from '../components/Header';

import '../styles/normalize.css';
import '../styles/app.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      currentUser: ''
    }

    this.getCurrentUser = this.getCurrentUser.bind(this);
    this.checkAuthStatus = this.checkAuthStatus.bind(this);
    this.getCurrentUser = this.getCurrentUser.bind(this);
  }

  // perform these actions whenever the route is reloaded
  componentWillReceiveProps() {
    this.checkAuthStatus()
      .then((loggedIn) => {
        if (loggedIn) {
          this.getCurrentUser();
        }
      });
  }

  checkAuthStatus() {
    const authStatus = axios('/checkauthstatus');

    return authStatus.then(({ data }) => {
      this.setState({ isLoggedIn: data.status });
      return data.status;
    });
  }

  getCurrentUser() {
    const user = axios('/currentuser')

    user.then(({ data }) => {
      this.setState({ currentUser: data.currentUserEmail })
    });
  }

  render() {
    const AllBooks = props =>
      <BooksContainer
        url='/allbooks'
        isLoggedIn={this.state.isLoggedIn}
        currentUser={this.state.currentUser}
        {...props}
      />;

    const MyBooks = props =>
      <BooksContainer
        url='/mybooks'
        isLoggedIn={this.state.isLoggedIn}
        currentUser={this.state.currentUser}
        {...props}
      />;

    return (
      <div>
        <Nav />
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/login' component={LoginPage} />
          <Route path='/signup' component={SignupPage} />
          <Route path='/allbooks' render={AllBooks} />
          <Route path='/mybooks' render={MyBooks} />
        </Switch>
      </div>
    );
  } 
}
  

export default App;
