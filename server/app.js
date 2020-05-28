require("dotenv").config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');

// Routers
var authRouter = require('./routes/auth');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.log("im here");
  // render the error page
  res.status(err.status || 500);
  res.send({"message": err.message});
});

module.exports = app;
