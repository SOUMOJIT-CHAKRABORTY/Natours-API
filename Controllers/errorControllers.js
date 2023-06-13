//  Setting Global Error handler
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};
const sendErrorProd = (err, res) => {
  // Operational , trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // Programming or other Unknown error: don't leak error details
  } else {
    // 1) Log error
    console.log('Error 💥', err);

    // 2) send a generic message
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
    });
  }
};

module.exports = (err, req, res, next) => {
  console.log(err.stack);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.ENV_NODE === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.ENV_NODE === 'production') {
    sendErrorProd(err, res);
  }
};
