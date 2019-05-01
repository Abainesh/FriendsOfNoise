/*  Author: Quincy Powell
	Date: 2019-04-30  */

var express = require('express');
var router = express.Router();

// connect to the data source
var filename = '../dummy_json_data/name.json';
var names = require(filename);


// GET request - given userID, provide first name & last name
router.get('/', function(req, res, next) {
	var userIdint = null;
	
	//console.log("userId value: " + req.query.userId);
	//console.log("userId type: " + typeof req.query.userId);
	
	// Validate query and convert
	if(req.query.userId === undefined || typeof req.query.userId === undefined) {
		res.status(500).send("query parameter userId is required");
	} else if(isNaN(req.query.userId)) {
		res.status(500).send("query parameter userId must be parseable as integer");
	} else {
		userIdint = parseInt(req.query.userId, 10);
	}
	
	// Find if userId exists in the JSON, send result data if it does.
	if(!names[userIdint]) {
		res.status(500).send("user does not exist");
	} else {	
		res.send(names[userIdint]);
	}
});


// POST request - given userID, first_name, and last_name set those values
// but only for an existing record
router.post('/', function(req, res, next) {
	var userId = req.body.userId;
	var userIdint = null;
	var fn = req.body.first_name;
	var ln = req.body.last_name;
	
	// validate userId input, convert to integer
	if(userId === undefined || typeof userId === undefined) {
		res.status(500).send("No userId specified");
	} else if (isNaN(userId)) {
		res.status(500).send("userId must be parseable as integer");
	} else {
		userIdint = parseInt(userId);
	}
	// validate name input using helper function, trim whitespace
	if (isEmptyOrAllWhitespace(fn)) {
		res.status(500).send("Empty or all whitespace first_name");
	} else {
		fn.trim();
	}
	if (isEmptyOrAllWhitespace(ln)) {
		res.status(500).send("Empty or all whitespace last_name");
	} else {
		ln.trim();
	}
	if (!names[userIdint]) {
		res.status(500).send("User does not exist in database");
	} else {
		// At this point the following should be true: userId exists
		// in the database, first_name and last_name at least contain
		// some text
		names[userIdint].first_name = fn;
		names[userIdint].last_name = ln;
		var json_format = JSON.stringify(names);
		fs = require('fs');
		filename = './dummy_json_data/name.json';
		fs.writeFile(filename, json_format, 'utf8', function(err) {
			if (err) {
				res.status(500).send("fs write error: " + err);
			} else {
				res.status(200).send("record updated");
			}
		});
	}
});

// helper function to catch empty strings and all whitespace strings
// source: StackOverflow questionId 10232366
function isEmptyOrAllWhitespace(str) {
	var re = /^\s*$/;
	
	if (str === undefined || typeof str === undefined) {
		return true;
    } else if(str === null) {
		return true;
	} else if (re.test(str)) {
		return true;
	} else {
		return false;
	}
}



module.exports = router;