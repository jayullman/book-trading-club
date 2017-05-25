/**
 * this module will display either every book in the database, or just the users
 * depending on the route
 */

/** 
 * TODO: create cancelable promise for when component unmounts but 
 * component is still waiting for AJAX response
 */
import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import TradesPendingBox from '../components/TradesPendingBox';
import PendingTradeDetails from '../components/PendingTradeDetails';

import tradeApi from '../utils/tradeApi';

import '../styles/booksContainer.css';

class BooksContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allBooks: [],
      showPendingDetails: false
    };

    // this.retrieveAllBooks = this.retrieveAllBooks.bind(this);
    this.requestTrade = this.requestTrade.bind(this);
    this.toggleViewPendingDetails = this.toggleViewPendingDetails.bind(this);
    this.cancelRequest = this.cancelRequest.bind(this);
    this.acceptTrade = this.acceptTrade.bind(this);
  }

  componentDidMount() {
    // retreive all books when component mounts
    this.retrieveAllBooks();
  }

  // ensure that component rerenders when router passes in different url
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.retrieveAllBooks();
    }
  }

  retrieveAllBooks() {
    const books = axios('/getallbooks');
    // sort alphabetically by title
    books.then(({ data }) => {
      this.setState({
        allBooks: data.books.sort((a, b) => {
          if (a.title.toLowerCase() < b.title.toLowerCase()) {
            return -1;
          } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
            return 1;
          }
          return 0;
        })
      });
    });
  }

  // this method will handle both cancelling requests and rejecting incoming requests
  cancelRequest(title) {
    tradeApi.cancelRequest(title)
      .then(() => {
        this.retrieveAllBooks();
      });
  }

  // this method will accept a trade initiated by another user and transfer ownership of book
  acceptTrade(title) {
    tradeApi.acceptTrade(title)
      .then(() => {
        this.retrieveAllBooks();
      });
  }

  requestTrade(title) {
    const updateBook = axios.post('/requesttrade', {
      title
    });

    updateBook.then(() => {
      this.retrieveAllBooks();      
    });
  }

  // handles when view will show the details of pending trades for the user
  toggleViewPendingDetails() {
    const newToggleState = !this.state.showPendingDetails;
    this.setState({ showPendingDetails: newToggleState });
  }

  render() {
    const { 
      currentUser, 
      isLoggedIn, 
      url 
    } = this.props;

    let mappedBooks = [];
    let requestsForUser = 0;
    let requestsByUser = 0;

    if (this.state.allBooks.length > 0) {
      // get pending trade information if logged in
      if (isLoggedIn) {
        this.state.allBooks.forEach((book) => {
          if (book.tradePending === true 
            && (currentUser === book.owner || currentUser === book.tradeRequestedBy)) {
            // tests for books awaiting current user's approval
            if (currentUser !== book.tradeRequestedBy) {
              requestsForUser += 1;

            // tests for books that the current user requested
            } else if (currentUser === book.tradeRequestedBy) {
              requestsByUser += 1;
            }
          }
        });
      }

      // map either all books or just the user's books depending on the route
      if (url === '/mybooks') {
        mappedBooks = this.state.allBooks.filter(book => 
          book.owner === currentUser
        ).map(book => 
            <div className='book' key={book.title}>
              <img src={book.thumbnail} alt={`thumbnail for ${book.title}`} />
            </div>
        );

      // map all of the books for the /allbooks route
      } else {
        mappedBooks = this.state.allBooks.map(book => 
          /** 
           * Display book tiles. Add 'Request Trade' button for books not owned by 
           * current user when in the /allbooks route
           */
          
            <div className='book' key={book.title}>
              <img src={book.thumbnail} alt={`thumbnail for ${book.title}`} />
              {isLoggedIn && (currentUser !== book.owner)
                && <button 
                  // disables onClick handler when trade is pending
                  onClick={book.tradePending === false 
                    ? this.requestTrade.bind(this, book.title)
                    : null  
                  }
                  // applies different styles to the trade button depending on whether
                  // a trade is pending
                  className={book.tradePending === true 
                    ? 'request-trade-btn btn-inactive' 
                    : 'request-trade-btn'
                  }
                >
                {/** 
                  * change text of button when trade is pending prevent 
                  * 'request trade' button from showing up on user's owned books
                  */}
                  {book.tradePending === true ? 'Trade Pending' : 'Request Trade'}
                </button>
              }
            </div>
          );
      }
    }

    return (
      <div className='books-container-page'>
        {/* Display the trade pending box if user is logged in */}
        {isLoggedIn &&
          <TradesPendingBox 
            requestsForUser={requestsForUser}
            requestsByUser={requestsByUser}
          />
        }
        {isLoggedIn && (requestsForUser > 0 || requestsByUser > 0) &&
          <button 
            className='view-details-button'
            onClick={this.toggleViewPendingDetails}
          >
          {!this.state.showPendingDetails ? 'View Pending Details' : 'Hide Pending Details'}
          </button>
        }
        {this.state.showPendingDetails 
         && <PendingTradeDetails 
          allBooks={this.state.allBooks} 
          currentUser={currentUser}
          cancelRequest={this.cancelRequest}
          acceptTrade={this.acceptTrade}
          requestsForUser={requestsForUser}
          requestsByUser={requestsByUser}
         />
        }
        {url === '/allbooks'
          ? <h3 className='books-section-title'>All Books</h3>
          : <h3 className='books-section-title'>Your Books</h3>}
        {this.state.allBooks.length === 0
            ? <i className="fa fa-spinner" aria-hidden="true"></i>
            : <div className='books-container'>
                {mappedBooks}
              </div>
        }
      </div>
    );
  }
}

BooksContainer.propTypes = {
  url: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  currentUser: PropTypes.string.isRequired
};

export default BooksContainer;
