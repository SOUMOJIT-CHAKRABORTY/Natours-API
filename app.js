const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const app = express();

const tourRouter = require('./Routes/tourRouter');
const userRouter = require('./Routes/userRouter');

// MIDDLEWARES
app.use(express.json());
app.use(morgan('dev'));
// Creating Our Own Middlewares -->
app.use((req, res, next) => {
  console.log('Creating Middlewares 🙏🏻');

  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// // Handling GET Requests
// app.get('/api/v1/tours', getAllTours);
// // Handling POST Requests
// app.post('/api/v1/tours', createTour);
// // Handling Params
// app.get('/api/v1/tours/:id', getTour);
// // Handling PATCH Request
// app.patch('/api/v1/tours/:id', updateTour);
// // Handling DELETE Request
// app.delete('/api/v1/tours/:id', deleteTour);

// Routes : Tours

// Users

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
