const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt-nodejs');

module.exports = new LocalStrategy({
  usernameField: 'email'
},
  function (email, password, done) {
    User.findOne({ email }, (err, user) => {
      if (err) throw err;
      if (!user) {
        return done(null, false);
      }
      // if hash does not match
      if (!bcrypt.compareSync(password, user.password)) {
        return done(null, true);
      }

      return done(null, user);
    });
  });
