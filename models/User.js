const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const UserSchema = new mongoose.Schema({
  email: String,
  password: String
});

const User = mongoose.model('book-club-user', UserSchema);

module.exports = User;
