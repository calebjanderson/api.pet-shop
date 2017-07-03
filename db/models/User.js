const db = require('../db');
const _ = require('lodash');

const getIdAndIncrement = () => {
  return new Promise((fulfill, reject) => {
    const id = db.get('counter').value();
    db
      .set('counter', id + 1)
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

      findOne(cleanUser.username)
        .then((userSearch) => {

          if (userSearch) {
            reject(new Error('User already exists'));
          } else {

            getIdAndIncrement()
              .then((id) => {
                const newUser = _.assign({}, cleanUser, { id: id });
                db.get('users').push(newUser).write().then(() => {
                  fulfill(id);
                });
              })
              .catch((err) => {
                reject(err);
              });
          }
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
