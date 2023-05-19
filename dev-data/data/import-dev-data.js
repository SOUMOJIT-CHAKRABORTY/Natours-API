const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModels');

dotenv.config({ path: './config.env' });

const DB = process.env.CONNECTION_STRING;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then((res) => console.log('Connected to Database'));

// Read the json File
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
  // to get an array of js objects we should parse the json.
);

// Import Data into Database
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully imported. ');
  } catch (err) {
    console.log(err);
  }
  process.exit(); // it is aggressive way to stop or terminate a process.
};

// Delete all data from collection

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully Deleted. ');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
// console logging the process
// RUN SCRIPT --> node dev-data/data/import-dev-data.js

// console.log(process.argv);

// process.argv will contain the paths of the run script --> node and dev-data/data/import-dev-data.js
// if we add any flag after the run script, it will show in the process.argv
// So here the logic is , if the user gives --import flag then it will only run the importData function,
// and if the user gives --delete flag it will run only deleteData function.

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
