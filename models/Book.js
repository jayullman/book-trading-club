const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const BookSchema = new mongoose.Schema({
  title: String,
  thumbnail: String,
  tradePending: { type: Boolean, default: false },
  owner: String
});

const Book = mongoose.model('book', BookSchema);

module.exports = Book;
