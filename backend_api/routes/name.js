var express = require('express');
var router = express.Router();

// connect to the data source
var fs = require('fs');
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
	
	// Find if userId exists in the JSON
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
	
	// validate inputs
	if(userId === undefined || typeof userId === undefined) {
		res.status(500).send("No userId specified");
	} else if (isNaN(userId)) {
		res.status(500).send("userId must be parseable as integer");
	} else {
		userIdint = parseInt(userId);
	}
	if(fn === undefined || typeof fn == undefined) {
		res.status(500).send("No first_name specified");
	} else if (isEmptyOrAllWhitespace(fn)) {
		res.status(500).send("Empty or all whitespace first_name");
	} else if (isEmptyOrAllWhitespace(ln)) {
		res.status(500).send("Empty or all whitespace last_name");
	} else if (!names[userIdint]) {
		res.status(500).send("User does not exist in database");
	} else {
		// At this point the following should be true: userId exists
		// in the database, first_name and last_name at least contain
		// some text
		names[userIdint].first_name = fn;
		names[userIdint].last_name = ln;
		var json_format = JSON.stringify(names);
		fs.writeFile(filename, json, 'utf8', callback);
	}
});

// helper function to catch empty strings and all whitespace strings
// taken from StackOverflow questionId 10232366
function isEmptyOrAllWhitespace(str) {
	return str === null || str.match(/^\s*$/) !== null;
}

module.exports = router;