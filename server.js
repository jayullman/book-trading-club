// const mongoose = require('mongoose');
const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

// connect to mongolab database
require('./controllers/connectToDb')();






app.listen(port, () => {
  console.log(`App is listening on port: ${ port }`);
});