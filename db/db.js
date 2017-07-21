const fs = require('fs');
const path = require('path');

exports.read = (name) => {
  return new Promise((fulfill, reject) => {
    const dbPath = path.join(__dirname, `./data/${name}.json`);
    fs.readFile(dbPath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        fulfill(JSON.parse(data));
      }
    });
  });
};

exports.write = (name, data) => {
  return new Promise((fulfill, reject) => {
    const dbPath = path.join(__dirname, `./data/${name}.json`);
    fs.writeFile(dbPath, JSON.stringify(data), 'utf8', (err) => {
      if (err) {
        reject(err);
      } else {
        fulfill();
      }
    });
  });
};
