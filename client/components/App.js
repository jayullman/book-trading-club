import React from 'react';
import { Switch, Route } from 'react-router-dom';


import HomePage from '../components/HomePage';
import LoginPage from '../containers/LoginPage';
import SignupPage from '../containers/SignupPage';
import Nav from '../components/Nav';
import Header from '../components/Header';

import '../styles/app.css';

const App = () => 
  <div>
    <Nav />
    <Header/>
    <Switch>
      <Route exact path ='/' component={HomePage} />
      <Route path='/login' component={LoginPage} />
      <Route path='/signup' component={SignupPage} />
    </Switch>
  </div>;

export default App;
