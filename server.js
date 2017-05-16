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

// TODO: create login and sign up routes
// app.post('/login', passport.authenticate('local',))

app.listen(port, () => {
  console.log(`App is listening on port: ${ port }`);
});