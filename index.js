const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const app = express();

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

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    result: tours.length,
    data: {
      tours,
    },
  });
};

const createTour = (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  // if (id > tours.length) {
  if (!tour) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  }
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    res.status(404).json({
      status: 'fail',
      message: 'Invaild ID',
    });
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        tour: '<This is Updated Tour>',
      },
    });
  }
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    res.status(404).json({
      status: 'fail',
      message: 'Invaild ID',
    });
  } else {
    res.status(204).json({
      status: 'success',
      data: {
        tour: null,
      },
    });
  }
};

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

// Routes
app.route('/api/v1/tours').get(getAllTours).post(createTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

const port = 3000;
app.listen(port, () => {
  console.log(`listning on port ${port}....`);
});
