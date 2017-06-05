const express = require('express');
const User = require('../models/User.js');
const uuid = require('uuid/v4');
const _ = require('lodash');
const router = express.Router();

module.exports = Session => {

  router.post('/signup', (req, res, next) => {
    const { username, password } = req.body;

    const newUser = {
      username: username,
      password: password,
      apiToken: uuid()
    };

    User.create(newUser)

    .then(user => {
      res.json(_.pick(user, ['username', 'apiToken', '_id']));
    })

    .catch(err => {
      next(err);
    });
  });

  router.post('/signin', (req, res, next) => {
    const { username, password } = req.body;

    User.findOne({ username: username })

    .then(user => {
      if (!user) {
        return next(new Error('User does not exist.'));
      }

      if (user.password !== password) {
        return next(new Error('Invalid password.'));
      }

      res.json(_.pick(user, ['username', 'apiToken', '_id']));
    })

    .catch(err => {
      next(err);
    });
  });

  return router;
};
