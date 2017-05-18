const express = require('express');
const path = require('path');
const passport = require('passport');
const bcrypt = require('bcrypt-nodejs');

const User = require('../models/User');
const Book = require('../models/Book');
const checkAuthenticated = require('../helpers/checkAuthenticated');

const router = express.Router();

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

router.post('/addBook', checkAuthenticated, (req, res) =>{
  console.log(req.user.email);
  const title = req.body.title;
  const thumbnail = req.body.thumbnail;
  const userEmail = req.user.email;

  Book.findOne({ title }, (err, book) => {
    if (err) throw err;

    // if the title is unique for this user, add to the database
    if (!book || (book && (book.owner !== userEmail))) {
      // add book
      const newBook = new Book({
        title,
        thumbnail,
        owner: userEmail
      });

      // save new book to database
      newBook.save((err) => {
        if (err) throw err;
        res.json({ message: 'This book has been added your collection' });
      });
      
    } else {
      // tell user that they have already added this book
      res.json({ message: 'This book is already in your collection' });
    }
  });
});


module.exports = router;