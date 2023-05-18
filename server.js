const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.CONNECTION_STRING;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then((res) => console.log('Connected to Database'));

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

const testTour = new Tour({
  name: 'The Forest Hiker',
  rating: 4.7,
  price: 470,
});

testTour
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.log('Error💥 : ', err);
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listning on port ${port}....`);
});
