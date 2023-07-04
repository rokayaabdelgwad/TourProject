// contain express file
const path=require('path');
const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewsRouter=require('./routes/reviewRouter')
const bookingRouter=require('./routes/bookingRoutes')
const PackageRouter=require('./routes/PackageRouter')
const AppError=require('./utils/appError')
const globalErrorHandler=require('./controllers/errorControlllers')
const compression=require('compression')
const cors=require('cors')
require('dotenv').config();

// express is function
const app = express();
app.set('view engine', 'pug')
app.set('views',path.join(__dirname,'views'))

// Serving static files
app.use(express.static(path.join(__dirname,'public')));

// 1) first middlewares

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
// Implement Cors
// app.use(cors())
app.use(cors({
  origin:'https://petstore.swagger.io'
}))
// app.options('*',cors())
app.use(express.static(path.join(__dirname,'public')));


// ## middleware must contain three  argument
app.use((req, res, next) => {
  console.log('hello from the middleware 😍');
  next();
});

app.use(compression())
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

////////////////////////////////////////////////////////////////////////////

//2) ROUTE HANDLERS

// ROUTES


app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews',reviewsRouter)
app.use('/api/v1/bookings',bookingRouter)
app.use('/api/v1/Travel Packages',PackageRouter)
module.exports = app;


