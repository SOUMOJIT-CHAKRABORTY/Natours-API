const fs = require('fs');

const express = require('express');

const morgan = require('morgan');

const app = express();

const tourRouter = require('./Routes/tourRouter');
const userRouter = require('./Routes/userRouter');
const globalErrorHandler = require('./Controllers/errorControllers');
const AppError = require('./utils/AppError');

// MIDDLEWARES
app.use(express.json());
if (process.env.ENV_NODE === 'development') {
  app.use(morgan('dev'));
}
app.use(express.static(`${__dirname}/public`));
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
// Handling all the unhandled routes

app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find ${req.originalUrl} on this server! `,
  // });

  // const err = new Error(`Can't find ${req.originalUrl} on this server! `);
  // err.status = 'fail';
  // err.statusCode = 404;

  next(new AppError(`Can't find ${req.originalUrl} on this server! `, 404));
});
// Global Error Handling
app.use(globalErrorHandler);

module.exports = app;
