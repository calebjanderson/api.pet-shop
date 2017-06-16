const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence');
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

petSchema.plugin(autoIncrement, { inc_field: 'id' });

module.exports = mongoose.model('pet', petSchema);
