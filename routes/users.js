const express = require('express');
const User = require('../db/models/User.js');
const uuid = require('uuid/v4');
const { addSession, newError } = require('../util');
const router = express.Router();

router.post('/signup', async (req, res, next) => {
  const { username, password } = req.body;

  const newUser = {
    username: username,
    password: password
  };

  try {
    const id = await User.create(newUser);
    res.json({
      username: username,
      id: id,
      apiToken: addSession(id)
    });
  } catch (e) {
    next(e);
  }
});

router.post('/signin', async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne(username);

    if (user.password !== password) {
      throw newError('Invalid password.', 401);
    }

    res.json({
      username: user.username,
      id: user.id,
      apiToken: addSession(user.id)
    });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
