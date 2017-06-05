const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const petSchema = Schema({

  name: {
    type: String,
    required: true
  },

  species: {
    type: String,
    required: true
  },

  imageUrl: {
    type: String,
    required: true
  },

  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]

});

module.exports = mongoose.model('pet', petSchema);
