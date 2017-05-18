import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from '../components/HomePage';
import LoginPage from '../containers/LoginPage';
import SignupPage from '../containers/SignupPage';
import BooksContainer from '../containers/BooksContainer';
import Nav from '../components/Nav';
import Header from '../components/Header';

import '../styles/normalize.css';
import '../styles/app.css';

const App = () => {
  const AllBooks = props => 
    <BooksContainer
      url = '/allbooks'
      {...props}
    />;

  const MyBooks = props =>
    <BooksContainer
      url='/mybooks'
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
  

export default App;
