const db = require('../db');
const { newError } = require('../util');
const _ = require('lodash');

const getUserIdAndIncrement = async () => {
  const counters = await db.read('counters');
  const userId = counters.userId++;

  await db.write('counters', counters);

  return userId;
};

exports.findOne = async username => {
  const users = await db.read('users');
  const user = _.find(users, { username: username });

  if (!user) {
    throw newError('User not fount.', 404);
  }

  return user;
};

exports.create = async user => {
  const [users, userId] = await Promise.all([
    db.read('users'),
    getUserIdAndIncrement()
  ]);

  if (!user.username || !user.password) {
    throw newError('Not a valid user object', 400);
  }

  if (_.find(users, { username: user.username })) {
    throw newError('User already exists.', 400);
  }

  user.id = userId;
  users.push(_.pick(user, ['username', 'password', 'id']));

  await db.write('users', users);

  return userId;
};
