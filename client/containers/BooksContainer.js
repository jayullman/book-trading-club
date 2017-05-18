// this module will display every book in the database

import React, { Component } from 'react';
import axios from 'axios';

class BooksContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: []
    };

    this.retrieveBooks = this.retrieveBooks.bind(this);
  }

  retrieveBooks(url) {
    const books = axios(url);

    books.then(({ data }) => {
      this.setState({ books: data.books });
    });
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

  render() {
    let mappedBooks = [];
    if (this.state.books.length > 0) {
      mappedBooks = this.state.books.map(book => {
        return (
          <img key={book.title} src={book.thumbnail} />
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

export default BooksContainer;
