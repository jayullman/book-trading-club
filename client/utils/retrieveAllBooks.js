import axios from 'axios';

function retrieveAllBooks() {
  const books = axios('/allbooks');

  return books.then(({ data }) => {
    return data.books;
  });
}

export default retrieveAllBooks;
