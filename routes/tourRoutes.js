const express = require('express');
const tourController = require('../controllers/tourContollers');
const authController = require('./../controllers/authControllers');
// const {getAllTour,createTour,getTour,UpdateTour,deleteTour}=require('../controllers/tourContollers')
// const reviewController = require('./../controllers/reviewsController');
const reviewRouter = require('./../routes/reviewRouter');
const router = express.Router();
// post /tour/235252/reviews

router.use('/:tourId/reviews', reviewRouter);

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTour);

router.route('/tour-stats').get(tourController.getTourStats);

router
  .route('/monthly-plan/:year')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide', 'guide'),
    tourController.getMonthlyPlan
  );

router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(tourController.getToursWithin);
//  tours-distance ?distance=233 &center=-40,unit=mi
//  tours-distance/233/center/-40/unit/mi
router
.route('/distance/:latlng/unit/:umit')
.get(tourController.getDistances);


router
  .route('/')
  .get(tourController.getAllTour)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.createTour
  );

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

module.exports = router;
