// TODO: Handle case when user tries to submit a blank form

import React, { Component } from 'react';
import axios from 'axios';
// import npm module for Google Books API
import * as books from 'google-books-search';

import '../styles/booksearchform.css';

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
    // handle case if user tries to submit empty form
    if (!this.state.term) {
      this.setState({ message: 'You must enter a search term' });
      return;
    } else if (this.state.term) {
      this.setState({ message: '' });      
    }
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
        <h3>Find a book to add to your collection</h3>
        <form className='findbook-form' onSubmit={this.findBook}>
          <input 
            type='text'
            value={this.state.term}
            onChange={this.handleChange}
          />
          
          <button>Find Book</button>
        </form>
        <div>
          {this.state.thumbnail && 
            <div className='book'>
              <img src={this.state.thumbnail} />
              <button className='addbook-btn' onClick={this.handleAdd}>Add to your books</button>
            </div>
          }
        </div>
        <div className='message-display'>{this.state.message}</div>
      </div>
    );
  }
}

export default BookSearchForm;
