import React, { Component } from 'react';
import axios from 'axios';

// import npm module for Google Books API
import * as books from 'google-books-search';

import Header from '../components/Header';
import Spinner from '../components/Spinner';
import '../styles/booksearchpage.css';

class BookSearchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: '',
      thumbnail: '',
      foundBookTitle: '',
      message: '',
      isSearching: false
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
      this.setState({ 
        message: '',
        thumbnail: '',
        foundBookTitle: '',
        isSearching: true  
      });      
    }
    books.search(this.state.term, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        this.setState({ 
          thumbnail: results[0].thumbnail,
          foundBookTitle: results[0].title,
          isSearching: false  
        });
      }
    });
  }

  handleAdd() {
    this.setState({ 
      message: '',
      term: ''
    });
    const addBook = axios.post('/addBook', {
      thumbnail: this.state.thumbnail,
      title: this.state.foundBookTitle
    });

    addBook.then(({ data }) => {
      this.setState({ 
        message: data.message
      });
    });
  }

  render() {
    return (
      <div>
        <Header />
        <h3>Find books to add to your collection</h3>
        <form className='column' className='findbook-form' onSubmit={this.findBook}>
          <label htmlFor='book-search'>
            Search by book title
            <input 
              type='text'
              value={this.state.term}
              onChange={this.handleChange}
              placeholder='book title'
            />
          </label>
          
          <button>Find Book</button>
        </form>
        {this.state.isSearching && <Spinner />}
        <div>
          {this.state.thumbnail && 
            <div className='book'>
              <img src={this.state.thumbnail} alt='thumbnail for search result' />
              <button className='addbook-btn' onClick={this.handleAdd}>Add to your books</button>
            </div>
          }
        </div>
        <div className='message-display'>{this.state.message}</div>
      </div>
    );
  }
}

export default BookSearchPage;
