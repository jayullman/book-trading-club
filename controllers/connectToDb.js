require('dotenv').config();
const mongoose = require('mongoose');

const url = process.env.MONGOLAB_URI;
const db = mongoose.connection;

// options for mLab
const options = {
  server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }
};

module.exports = function() {
  mongoose.connect(url, options);
  db.on('open', () => {
    console.log('Connected to database');
  });
};