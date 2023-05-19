const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    // validators
    type: String,
    required: true,
    unique: true,
  },
  rating: {
    // validators
    type: Number,
    default: 4.5,
  },
  price: {
    // validators
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
