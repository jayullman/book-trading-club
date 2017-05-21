import React from 'react';
import PropTypes from 'prop-types';

// TODO: Create button that will display a users pending transactions
// TODO: Pass in books array from BooksContainer

const TradesPendingBox = (props) => {
  // requests that other users made for the books owned by current user
  const requestsForUser = props.requestsForUser;
  // requests made by the user for books owned by other users
  const requestsByUser = props.requestsByUser;

  return (
    <div>
      <div>
        Trades You Requested: {requestsByUser}
      </div>
      <div>
        Trades Others Requested: {requestsForUser}
      </div>
    </div>
  );
};

TradesPendingBox.PropTypes = {
  requestsForUser: PropTypes.number.isRequired,
  requestsByUser: PropTypes.number.isRequired
};

export default TradesPendingBox;
