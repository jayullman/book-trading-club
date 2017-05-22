import React from 'react';

import BookSearchForm from '../containers/BookSearchForm';
import '../styles/homepage.css';

const HomePage = () => (
  <div>
    <div>This is the home page</div>
    <p>
      Blurb about app goes here
    </p>
    <BookSearchForm />
  </div>
);

export default HomePage;
