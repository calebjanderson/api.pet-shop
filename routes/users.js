const express = require('express');
const User = require('../db/models/User.js');
const uuid = require('uuid/v4');
const { addSession } = require('../session');
const router = express.Router();

router.post('/signup', (req, res, next) => {
  const { username, password } = req.body;

  const newUser = {
    username: username,
    password: password
  };

  User.findOne(username)
    .then((userSearch) => {

      if (userSearch) {
        next(new Error('User already exists'));
      } else {

        return User.create(newUser)
          .then(user => {
            res.json({
              username: user.username,
              id: user.id,
              apiToken: addSession(user.id)
            });
          });
      }
    })

    .catch(err => {
      next(err);
    });
});

router.post('/signin', (req, res, next) => {
  const { username, password } = req.body;

  User.findOne(username)
    .then(user => {
      if (!user) {
        return next(new Error('User does not exist.'));
      }

      if (user.password !== password) {
        return next(new Error('Invalid password.'));
      }

      res.json({
        username: user.username,
        id: user.id,
        apiToken: addSession(user.id)
      });
    })

    .catch(err => {
      next(err);
    });
});

module.exports = router;
