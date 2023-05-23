const express = require('express');
const Tour = require('../models/tourModels');

// Middlewares
// Alias Route
exports.topFiveCheap = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = 'price,-ratingsAverage';
  req.query.fields = 'difficulty,ratingsAverage,price,name';
  next();
};

class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // BUILD THE QUERY
    // Filtering
    const queryObjs = { ...this.queryString };
    const excludedFields = ['limit', 'page', 'sort', 'fields'];
    excludedFields.forEach((el) => delete queryObjs[el]);
    // Advanced Filtering
    let queryStr = JSON.stringify(queryObjs);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    this.query.find(JSON.parse(queryStr));
    // let query = Tour.find(JSON.parse(queryStr));
  }
}

// Route Handlers

exports.getAllTours = async (req, res) => {
  try {
    // // BUILD THE QUERY
    // // Filtering
    // const queryObjs = { ...req.query };
    // const excludedFields = ['limit', 'page', 'sort', 'fields'];
    // excludedFields.forEach((el) => delete queryObjs[el]);

    // console.log(req.query);
    // // Advanced Filtering
    // let queryStr = JSON.stringify(queryObjs);
    // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // let query = Tour.find(JSON.parse(queryStr));

    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }
    console.log(queryStr);

    // Field Limiting
    if (req.query.fields) {
      const limitFields = req.query.fields.split(',').join(' ');
      query = query.select(limitFields);
    } else {
      query = query.select('-__v');
    }

    // Setting Limits
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numTours = await Tour.countDocuments();
      if (skip >= numTours) throw new Error('This page does not exist');
    }

    // EXECUTE THE QUERY
    const features = new APIFeatures(Tour.find(), req.query.filter());
    const tours = await features.query;

    // Querying the data

    // const query = await Tour.find()
    //   .where('duration')
    //   .equals(5)
    //   .where('difficulty')
    //   .equals('easy');
    // SEND RES
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      result: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    // const newTour = new Tour({});
    // newTour.save();
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: tour,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Not Found!',
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Not Found!',
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'success',
      message: 'Deleted',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Not Found!',
    });
  }
};
