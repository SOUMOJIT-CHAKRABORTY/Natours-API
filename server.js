const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.CONNECTION_STRING;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then((res) => console.log('Connected to Database'))
  .catch((err) => console.log(err));

// const testTour = new Tour({
//   name: 'The Forest Hiker',
//   rating: 4.7,
//   price: 470,
// });

// testTour
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log('Error💥 : ', err);
//   });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listning on port ${port}....`);
});
