const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const BookSchema = new mongoose.Schema({
  title: String,
  thumbnail: String,
  owner: String,
  tradePending: { type: Boolean, default: false },
  tradeRequestedBy: String
});

const Book = mongoose.model('book', BookSchema);

module.exports = Book;
