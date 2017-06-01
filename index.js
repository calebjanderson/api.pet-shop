var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

global.session = {};

var app = express();

var port = process.env.PORT || 3370;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use((req, res, next) => {
  var err = new Error('404 - Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  var status = err.status || 500;
  res.status(status).send(err.message);
});

app.listen(port, () => {
  console.log('Listening on port ' + port);
});
