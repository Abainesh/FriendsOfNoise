/*Author: Gabby Saechao 4.30.2019*/

var express = require('express');
var router = express.Router();

//Connects to data source
var filename = '../dummy_json_data/physical_address.json';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("Nobody here, except us chickens.");
});

module.exports = router;

