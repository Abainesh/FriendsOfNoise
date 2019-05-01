var express = require('express');
var router = express.Router();

// connect to the data source
var fs = require('fs');
var filename = '../dummy_json_data/email.json';
var emails = require(filename);


router.get('/', function(req, res, next) {
	// Validate query and convert
	// ToDo: refactor this as an exportable function
	var userIdint = null;
	if(req.query.userId === undefined || typeof req.query.userId === undefined) {
		res.status(500).send("query parameter userId is required");
	} else if(isNaN(req.query.userId)) {
		res.status(500).send("query parameter userId must be parseable as integer");
	} else {
		userIdint = parseInt(req.query.userId, 10);
	}
	
	// Find if userId exists in the json, send result data if it does
	if(!emails[userIdint]) {
		res.status(500).send("user does not exist");
	} else {	
		res.send(emails[userIdint]);
	}
});

router.post('/', function(req, res, next) {
	var userId = req.body.userId;
	var email = req.body.email;
	
	// Validate userId and convert to int
	// ToDo: refactor this as an exportable function
	var userIdint = null;
	if(userId === undefined || typeof userId === undefined) {
		res.status(500).send("query parameter userId is required");
	} else if(isNaN(userId)) {
		res.status(500).send("query parameter userId must be parseable as integer");
	} else {
		userIdint = parseInt(req.query.userId, 10);
	}
	
	// validate email address
	if(validate_email(email)) {
		emails[userIdint].email = email;
		var json_format = JSON.stringify(emails);
		fs.writeFile(filename, json_format, 'utf8', (err) => {
			res.status(500).send("fs error: " + err);
		});
		res.status(200).send("Updated record");
	} else {
		res.status(500).send("Provided email does not match W3C email regexp");
	}
});

// helper function to validate an email address using a regexp
// slightly modified from source: 
// https://www.w3resource.com/javascript/form/email-validation.php
function validate_email(email) {
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
	.test(email)) {
		return (true);
	} else {
		return (false);
	}
}

module.exports = router;

