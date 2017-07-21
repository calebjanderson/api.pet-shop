const db = require('../db');
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
    const error = new Error('User not found.');
    error.status = 404;
    throw error;
  }

  return user;
};

exports.create = async user => {
  const [users, userId] = await Promise.all([
    db.read('users'),
    getUserIdAndIncrement()
  ]);

  if (!user.username || !user.password) {
    const error = new Error('Not a valid user object.');
    error.status = 400;
    throw error;
  }

  if (_.find(users, { username: user.username })) {
    const error = new Error('User already exists');
    error.status = 400;
    throw error;
  }

  user.id = userId;
  users.push(_.pick(user, ['username', 'password', 'id']));

  await db.write('users', users);

  return userId;
};
