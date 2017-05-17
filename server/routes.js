const express = require('express');
const path = require('path');
const passport = require('passport');
const bcrypt = require('bcrypt-nodejs');

const User = require('../models/User');

const router = express.Router();

// router.get('/test', (req, res) => {
 
// });
// router.post('/login', (req, res) => {
//   passport.authenticate('local', { failureRedirect: 'error-page.html' }),
//     function (req, res, info) {
//       res.redirect('/');
//     }
// });

const error = {
  userExists: 'user exists',
  userNotFound: 'cannot find user',
  passwordIncorrect: 'incorrect password'
};

router.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) { return next(err); }
    if (!user) { 
      return res.json({ error: error.userNotFound }); 
    }
    // if the user was found, but the password is incorrect
    if (user && !user.email) {
      return res.json({ error: error.passwordIncorrect }); 
    }
    req.logIn(user, function (err) {
      if (err) { return next(err); }
      return res.json({ message: 'success' });
    });
  })(req, res, next);
});

router.post('/signup', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }, (err, user) => {
    if (err) throw err;

    if (user) {
      res.json({ error: error.userExists });
    } else {
      const hash = bcrypt.hashSync(password)

      const newUser = new User({
        email: email,
        password: hash
      });

      // saves new user to the database
      newUser.save((err, user) => {
        if (err) throw err;

        // log new user in
        req.login(user, (err) => {
          if (err) return next(err);
          res.redirect('/');
        });
      })
    }
  });
});


module.exports = router;