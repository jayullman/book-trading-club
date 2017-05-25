import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './styles/normalize.css';

// adds classes to touch and non-touch devices for css targeting
import './modernizr-touch';

import App from './containers/App';

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
  ), document.getElementById('root'));
