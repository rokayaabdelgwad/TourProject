const Tour = require('../models/tourModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');

exports.aliasTopTours = async (req, res, next) => {
  req.query.limit = 5;
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.getAllTour = factory.getAll(Tour);
exports.getTour = factory.getOne(Tour, { path: 'reviews' });
exports.createTour = factory.createOne(Tour);
exports.deleteTour = factory.deletOne(Tour);
exports.updateTour = factory.UdateOne(Tour);

exports.getTourStats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        //  _id:'$ratingsAverage',
        // _id:'$difficulty',
        numRating: { $sum: '$ratingsQuantity' },
        numTours: { $sum: 1 },
        avgRating: { $avg: '$ratingsAverage' },
        avePrice: { $avg: '$price' },
        minPricde: { $min: '$price' },
        maxPricde: { $max: '$price' },
      },
    },
    {
      $sort: { avePrice: 1 },
    },
    // {
    //   $match:{_id:{$ne:'EASY'}}
    // }
  ]);
  res.status(200).json({
    status: 'success',
    data: {
      stats,
    },
  });
});

