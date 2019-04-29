var express = require('express');
var router = express.Router();


// GET request - given userID, provide first name & last name
router.get('/', function(req, res, next) {
	var fs = require('fs');
	var filename = '../dummy_json_data/name.json';
	var names = require(filename);
	console.log(names);
	
		
	res.response
});

module.exports = router;