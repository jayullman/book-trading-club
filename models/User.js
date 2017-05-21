const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  city: { type: String, default: '' },
  state: { type: String, default: '' }
});

const User = mongoose.model('book-club-user', UserSchema);

module.exports = User;
