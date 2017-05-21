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

router.post('/logout', function (req, res) {
  req.logout();
  res.sendStatus(200);
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
          res.json({ message: 'success' });
        });
      })
    }
  });
});

// returns user profile information as json
router.post('/userprofileinfo', checkAuthenticated, (req, res) => {
  const email = req.body.email;

  User.findOne({ email }, (err, user) => {
    if (err) throw err;

    if (user) {
      res.json({
        firstName: user.firstName,
        lastName: user.lastName,
        city: user.city,
        state: user.state
      });
    } else {
      res.json({ error: 'User not found'});
    }
  });  
});

router.post('/updateuserprofileinfo', checkAuthenticated, (req, res) => {
  const { firstName, lastName, city, state } = req.body;
  const email = req.user.email;

  User.findOne({ email }, (err, user) => {
    if (err) throw err;

    if (user) {
      user.firstName = firstName;
      user.lastName = lastName;
      user.city = city;
      user.state = state;

      user.save((err, updatedUser) => {
        if (err) throw err;

        // send updated user in json if successfull
        res.json(updatedUser);
      });
    } else {
      res.json({ error: 'User not found' });
    }
  });
});

// this route will check to see if the current password matches the password
// in the database and will update to new password 
router.post('/updatepassword', checkAuthenticated, (req, res) => {
  const email = req.user.email;
  const currentPassword = req.body.currentPassword;
  const newPassword = req.body.newPassword;

  User.findOne({ email }, (err, user) => {
    if (err) throw err;
    
    if (user) {
      // compare the users given current password with what is stored in the database
      if (bcrypt.compareSync(currentPassword, user.password)) {
        // create new password hash and update password in user's record
        const hash = bcrypt.hashSync(newPassword);

        user.password = hash;
        user.save((err, updatedUser) => {
          if (err) throw err;

          // send updated user in json if successfull
          res.json(updatedUser);
        });
      // if currentPassword does not match stored password in database
      } else {
        res.json({ error: 'Password is incorrect' });
      }
    } else {
      res.json({ error: 'User not found' });
    }
  });
});

router.post('/addBook', checkAuthenticated, (req, res) => {
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

// get list of all books as array
router.get('/allbooks', (req, res) => {
  Book.find({}, (err, books) => {
    if (err) throw err;

    res.json({ books });
  });
});

// get list of all books for one user
router.get('/mybooks', checkAuthenticated, (req, res) => {
  const userEmail = req.user.email;
  Book.find({}, (err, books) => {
    if (err) throw err;

    const myBooks = books.filter(book => {
      // check each book to see if it is the users
      return book.owner === userEmail;
    });
    res.json({ books: myBooks });
  });
});

router.get('/currentuser', checkAuthenticated, (req, res) => {
  res.json({ currentUserEmail: req.user.email });
});

// requests trade
router.post('/trade', checkAuthenticated, (req, res) => {
  const userEmail = req.user.email;
  const title = req.body.title;

  Book.findOne({ title }, (err, book) => {
    if (err) throw err;

    if (book) {
      console.log(book);
      book.tradePending = true;
      book.tradeRequestedBy = userEmail;

      book.save((err, updatedBook) => {
        if (err) throw err;

        res.json(updatedBook);
      });
    } else {
      res.json({ message: 'Book not found' });
    }

  });
});

router.get('/checkauthstatus', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ status: true });
  } else {
    res.json({ status: false });
  }
});

// catch all other routes
router.get('/*', (req, res) => {
  res.redirect('/');
});

module.exports = router;