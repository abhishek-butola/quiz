const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const app = express();
const path = require('path');

const fs = require('fs');

app.use(cors({ credentials: true, origin: true }));

const users = require('./routes/api/users');
const test = require('./routes/api/test');
const question = require('./routes/api/question');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB Config URI
const db = require('./config/keys').mongoURI;
//Connect to Mongo DB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDb Connected'))
  .catch(err => console.log(err));

//Passport middleware
app.use(passport.initialize());

//Passport Config
require('./config/passport')(passport);

//Routes
app.use('/api/users', users);
app.use('/api/demo', test);
app.use('/api/question', question);

const port = 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
