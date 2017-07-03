const db = require('lowdb')('data.json');

db.defaults({
  pets: [],
  users: []
});

module.exports = db;
