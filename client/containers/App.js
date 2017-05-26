import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

import HomePage from '../components/HomePage';
import LoginPage from '../containers/LoginPage';
import SignupPage from '../containers/SignupPage';
import BooksContainer from '../containers/BooksContainer';
import UserSettingsPage from '../containers/UserSettingsPage';
import Nav from '../components/Nav';
import BookSearchPage from '../containers/BookSearchPage';
import Footer from '../components/Footer';

import '../styles/app.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      currentUser: ''
    };

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
    const user = axios('/currentuser');

    user.then(({ data }) => {
      this.setState({ currentUser: data.currentUserEmail });
    });
  }

  logOut(event) {
    event.preventDefault();
    axios.post('/logout')
      .then(() => {
        this.context.router.history.push('/');
        this.setState({ isLoggedIn: false });
      })
      .catch((err) => {
        console.log(err);
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

    const Settings = props =>
      <UserSettingsPage
        currentUser={this.state.currentUser}
        {...props}
      />;

    return (
      <div className='app-container'>
        <div className='content'>
          <Nav 
            isLoggedIn={this.state.isLoggedIn}
            logOut={this.logOut.bind(this)}
          />
          <Switch>
            <Route exact path='/' component={HomePage} />
            {/*<Route path='/' component={Header} />*/}
            <Route path='/login' component={LoginPage} />
            <Route path='/signup' component={SignupPage} />
            <Route path='/allbooks' render={AllBooks} />
            <Route path='/mybooks' render={MyBooks} />
            <Route path='/settings' render={Settings} />
            <Route path='/addbooks' component={BookSearchPage} />
            <Route render={() => <p>Page not found</p>} />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  } 
}
  
App.contextTypes = {
  router: PropTypes.object
};

export default App;
