var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var helmet = require('helmet');
var bodyParser = require('body-parser');


const port = 3000;


// member information routes
var physicalAddressRouter = require('./routes/physical_address');
var emailAddressRouter = require('./routes/email_address');
var nameRouter = require('./routes/name');
var membershipEndDateRouter = require('./routes/membership_end_date');
var musicPreferencesRouter = require('./routes/music_preferences');
var newPersonRouter = require('./routes/new_person');
var userDataAllRouter = require('./routes/user_data_all');

//express app
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
app.use('/new_person', newPersonRouter);
app.use('/user_data_all', userDataAllRouter);

// testing integration!!!
// var testAPIRouter = require('./routes/testAPIroute');
// app.use('/testAPI', testAPIRouter);


app.get('/api/products', (req, res) => {
  res.sendFile(path.join(__dirname, 'dummy_json_data', 'products.json'));
});

app.listen(port, () => {
  console.log(`[products] API listening on port ${port}.`);
});


module.exports = app;
