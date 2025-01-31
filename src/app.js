// require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride =require ('method-override');
const cors = require('cors');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const apiRouter = require('./routes/apiRoutes/apiR');
const apiUserRouter = require('./routes/apiRoutes/apiUSerRouter');
const session = require("express-session");
const cookieValidate = require('./middleware/cookieValidate');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(cors({
  origin: "*"
}))
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"..",'public')));
app.use(methodOverride('_method'));


app.use(session({
  secret:"electrogrup",
  resave: false,
  saveUninitialized: true,
}))

app.use(cookieValidate);


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/apiRoutes',apiRouter);
app.use('/apiUser',apiUserRouter)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;