const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/petshop');

const app = express();
const session = {};
const port = process.env.PORT || 3370;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use((req, res, next) => {
  const err = new Error('404 - Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).send(err.message);
});

app.listen(port, () => {
  console.log('Listening on port ' + port);
});
