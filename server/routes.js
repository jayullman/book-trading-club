const express = require('express');
const path = require('path');
const passport = require('passport');
const bcrypt = require('bcrypt-nodejs');

const User = require('../models/User');

const router = express.Router();

// router.get('/test', (req, res) => {
 
// });

router.post('/signup', (req, res) => {
  const email = req.body.email;
  const password = req.body.email;

  User.findOne({ email }, (err, user) => {
    if (err) throw err;

    if (user) {
      res.json({ error: 'user exists' });
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