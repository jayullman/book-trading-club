import React, { Component } from 'react';

import axios from 'axios';

// import npm module for Google Books API
import * as books from 'google-books-search';

class BookSearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: '',
      thumbnail: '',
      foundBookTitle: '',
      message: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.findBook = this.findBook.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
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
        this.setState({ 
          thumbnail: results[0].thumbnail,
          foundBookTitle: results[0].title 
        });
      }
    });
  }

  handleAdd() {
    const addBook = axios.post('/addBook', {
      thumbnail: this.state.thumbnail,
      title: this.state.foundBookTitle
    });

    addBook.then(({ data }) => {
      console.log(data);
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
          {this.state.thumbnail && 
            <div>
              <img src={this.state.thumbnail} />
              <button onClick={this.handleAdd}>Add to your books</button>
              <div>{this.state.message}</div>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default BookSearchForm;
