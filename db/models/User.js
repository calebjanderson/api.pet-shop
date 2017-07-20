const db = require('../db');
const _ = require('lodash');

const getIdAndIncrement = async () => {
  const counters = await db.read('counters');
  const userId = counters.userId++;

  await db.write('counters', counters);

  return userId;
};

exports.findOne = async id => {
  const users = await db.read('users');
  return _.find(users, { id: id });
};

exports.create = async user => {
  const [users, userId] = await Promise.all([
    db.read('users'),
    getIdAndIncrement()
  ]);

  console.log(user);

  if (!user.username || !user.password) {
    throw new Error('Not a valid user object');
  }

  if (_.find(users, { username: user.username })) {
    throw new Error('User already exists');
  }

  user.id = userId;
  users.push(user);

  await db.write('users', users);

  return userId;
};

(async function() {
  try {
    await exports.create({ username: 'bike' }).then(console.log);
  } catch (e) {
    console.log(e);
  }
})();
