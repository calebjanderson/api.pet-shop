const express = require('express');
const User = require('../db/User.js');
const router = express.Router();

module.exports = Session => {

  router.post('/signup', (req, res, next) => {

  });

  router.post('/signin', (req, res, next) => {

  });

  return router;
};
