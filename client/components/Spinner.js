// this is the loading image when waiting for network response
import React from 'react';
import '../styles/spinner.css';

const Spinner = () => 
  <div className='loading-icon-container'>
    <i className="fa fa-spinner fa-5x" aria-hidden="true"></i>
  </div>;

export default Spinner;
