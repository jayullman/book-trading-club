const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

// connect to mongolab database
require('./controllers/connectToDb')();

app.use(bodyParser.json());

// set up static folders
app.use(express.static(path.join(__dirname, 'public')));

// set up app and passport
const configureApp = require('./controllers/configureApp');
configureApp(app);

// use routes set up in routes.js
app.use(require('./server/routes'));

app.listen(port, () => {
  console.log(`App is listening on port: ${ port }`);
});