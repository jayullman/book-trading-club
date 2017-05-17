const express = require('express');
const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

module.exports = function (app) {
  app.use(require('body-parser').urlencoded({ extended: true }));

  // set up passport
  const passport = require('passport');
  passport.serializeUser(function (user, done) {

    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      if (err) { return done(err); }
      done(null, user);
    });
  });

  const session = require('express-session');
  app.use(session({
    secret: 'secretword',
    resave: false,
    saveUninitialized: true,
    cookie: {}
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  const localStrategy = require('../authentication/localStrategy');
  passport.use(localStrategy);
}
