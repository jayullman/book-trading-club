// this module will display every book in the database

import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

class BooksContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: []
    };

    this.retrieveBooks = this.retrieveBooks.bind(this);
    this.requestTrade = this.requestTrade.bind(this);
  }

  componentDidMount() {
    // retreive all books when component mounts
    this.retrieveBooks(this.props.url);
  }

  // ensure that component rerenders when router passes in different url
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.retrieveBooks(nextProps.url);
    }
  }

  retrieveBooks(url) {
    const books = axios(url);

    books.then(({ data }) => {
      this.setState({ books: data.books });
    });
  }

  requestTrade(title) {
    const updateBook = axios.post('/trade', {
      title
    });

    updateBook.then(({ data }) => {
      console.log(data);
    });
  }

  render() {
    let mappedBooks = [];
    if (this.state.books.length > 0) {
      mappedBooks = this.state.books.map(book => {
        // Display book tiles. Add 'Request Trade' button for books not owned by current user
        // when in the /allbooks route
        return (
          <div key={book.title}>
            <img src={book.thumbnail} />
            {
              // TODO: change text of button when trade is pending
              // prevent 'request trade' button from showing up on user's owned books
              this.props.url === '/allbooks' && this.props.isLoggedIn && (this.props.currentUser !== book.owner)
              && <button onClick={this.requestTrade.bind(this, book.title)}>Request Trade</button>
            }
          </div>
        );
      });
    }
    return (
      <div>
        {
          this.state.books.length === 0
            ? <i className="fa fa-spinner" aria-hidden="true"></i>
            : mappedBooks

        }
      </div>
    );
  }
}

BooksContainer.PropTypes = {
  url: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};

export default BooksContainer;
