var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");

// member information routes
var physicalAddressRouter = require('./routes/physical_address');
var emailAddressRouter = require('./routes/email_address');
var nameRouter = require('./routes/name');
var membershipEndDateRouter = require('./routes/membership_end_date');
var musicPreferencesRouter = require('./routes/music_preferences');
//var newPersonRouter = require('./routes/new_person');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// member information routes
app.use('/physical_address', physicalAddressRouter);
app.use('/email_address', emailAddressRouter);
app.use('/name', nameRouter);
app.use('/member_end_date', membershipEndDateRouter);
app.use('/music_preferences', musicPreferencesRouter);
//app.use('/new_person', newPersonRouter);

// testing integration!!!
// var testAPIRouter = require('./routes/testAPIroute');
// app.use('/testAPI', testAPIRouter);


module.exports = app;
