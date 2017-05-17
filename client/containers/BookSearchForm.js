import React, { Component } from 'react';

// import axios from 'axios';

// import npm module for Google Books API
import * as books from 'google-books-search';

class BookSearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: '',
      thumbnailUrl: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.findBook = this.findBook.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState({ term: value });
  }

  findBook(event) {
    event.preventDefault();
    books.search(this.state.term, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        console.log(results);
        this.setState({ thumbnailUrl: results[0].thumbnail })
      }
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.findBook}>
          <input 
            type='text'
            value={this.state.term}
            onChange={this.handleChange}
          />
          
          <button>Find Book</button>
        </form>
        <div>
          {this.state.thumbnailUrl && <img src={this.state.thumbnailUrl} />}
        </div>
      </div>
    );
  }
}

export default BookSearchForm;
