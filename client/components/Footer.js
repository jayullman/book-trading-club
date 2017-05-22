import React from 'react';

import '../styles/footer.css';

const Footer = (props) => {
  return (
    <footer>
      <p>
        View the source code on{' '}
        <a target='_blank'
          href='https://github.com/libeja/book-trading-club'>GitHub{' '}
          <i className="fa fa-github" aria-hidden="true"></i>
        </a>
      </p>
      <div className="icons-container">
        <a href="https://github.com/libeja" target="_blank"><i className="fa fa-github-square fa-4x" aria-hidden="true"></i></a>
        <a href="https://www.freecodecamp.com/libeja" target="_blank"><i className="fa fa-free-code-camp fa-4x" aria-hidden="true"></i></a>
        <a href="mailto:jayullman@gmail.com"><i className="fa fa-envelope-o fa-4x" aria-hidden="true"></i></a>
      </div>
      <br />
      <small>Created by Jay</small>
    </footer>
  );
};

export default Footer;
