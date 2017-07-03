const db = require('../db');
const _ = require('lodash');

const getIdAndIncrement = () => {
  return new Promise((fulfill, reject) => {
    const id = db.get('userCounter').value();
    db
      .set('userCounter', id + 1)
      .write()
      .then(() => {
        fulfill(id);
      })
      .catch(() => {
        reject(new Error('Error inrementing counter'));
      });
  });
};


const findOne = function(username) {
  return new Promise((fulfill) => {
    fulfill(db.get('users').find({ username: username }).value());
  });
};

const create = function(user) {
  return new Promise((fulfill, reject) => {

    const cleanUser = _.pick(user, ['username', 'password']);

    if (cleanUser.username && cleanUser.password) {

      getIdAndIncrement()
        .then((id) => {
          const newUser = _.assign({}, cleanUser, { id: id });
          db.get('users').push(newUser).write().then(() => {
            fulfill(newUser);
          });
        })
        .catch((err) => {
          reject(err);
        });

    } else {
      reject(new Error('User object must include name and password.'));
    }
  });
};

module.exports = {
  create: create,
  findOne: findOne
};
