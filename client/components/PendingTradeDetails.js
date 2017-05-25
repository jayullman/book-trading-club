import React from 'react';
import PropTypes from 'prop-types';

/**
 * This component will take in the allBooks array and a filter function and will return a 
 * list of <li>'s The filter will determine whether the list is for books awaiting 
 * users approval or user initiated trades.
 */
const BookList = ({ books, filter, cancelRequest, acceptTrade }) => {
  const filteredBooks = books.filter(filter);

  return (
    <div className='pending-trade-list-container'>
      <ul className='pending-trade-list'>
        {filteredBooks.map(book =>
          <li
            key={book.title}
          >
            {book.title}
            {/** 
            * If the acceptTrade function is  null, 
            * it means the list is for user initiated requests 
            */}
            {!acceptTrade
              ? <span 
                  className='cancel-trade' 
                  onClick={cancelRequest.bind(null, book.title)}>
                    Cancel
                </span>
              : <div className='accept-reject-trade-container'>
                <span
                  className='accept-trade' 
                  onClick={acceptTrade.bind(null, book.title)}>
                    Accept
                </span>
                <span
                  className='reject-trade'                 
                  onClick={cancelRequest.bind(null, book.title)}>
                    Reject
                </span>
              </div>
            }
          </li>)}
      </ul>
    </div>
  );
};

BookList.propTypes = {
  books: PropTypes.array.isRequired,
  filter: PropTypes.func.isRequired,
  cancelRequest: PropTypes.func,
  acceptTrade: PropTypes.func
};

/**
 * This component will render the list to the view
 */
const PendingTradeDetails = ({ 
  allBooks, 
  currentUser, 
  cancelRequest, 
  acceptTrade, 
  requestsByUser, 
  requestsForUser 
}) => {
  // filters all books for books that are pending trade
  const filteredBooks = allBooks.filter(book => book.tradePending);

  return (
    <div>
      {/* This list will display all trades the user initiated */}
        <h3>Your requests</h3>
        {requestsByUser > 0 
        ? <BookList
          books={filteredBooks}
          filter={book => currentUser === book.tradeRequestedBy}
          cancelRequest={cancelRequest} />
        : <p>You have no requests awaiting other's approval</p>}
        
      {/* This list will display all trades awaiting the user's approval */}
        <h3>Trades awaiting your approval</h3>
        {requestsForUser > 0 
        ? <BookList
          books={filteredBooks}
          filter={book => (currentUser === book.owner && currentUser !== book.tradeRequestedBy)}
          cancelRequest={cancelRequest}
          acceptTrade={acceptTrade} />
        : <p>You have no requests awating your approval</p>}      
        
    </div>
  );
};

PendingTradeDetails.propTypes = {
  allBooks: PropTypes.array.isRequired,
  currentUser: PropTypes.string.isRequired,
  cancelRequest: PropTypes.func.isRequired,
  acceptTrade: PropTypes.func.isRequired,
  requestsForUser: PropTypes.number.isRequired,
  requestsByUser: PropTypes.number.isRequired
};

export default PendingTradeDetails;
