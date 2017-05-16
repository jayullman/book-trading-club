const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const UserSchema = new mongoose.Schema({
  email: String,
  password: String
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
