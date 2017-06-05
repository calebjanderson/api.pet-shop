const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({

  username: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  apiToken: {
    type: String,
    unique: true
  }

});

module.exports = mongoose.model('user', userSchema);
