const db = require('lowdb')('db/data.json', {
  storage: require('lowdb/lib/storages/file-async')
});

db
  .defaults({
    pets: [],
    users: [],
    petCounter: 1,
    userCounter: 1
  })
  .write()
  .then(() => {
    console.log('Database initialized');
  });

module.exports = db;
