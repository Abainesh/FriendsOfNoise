/*  Quincy Powell
    Date: 2019-05-07  */

var express = require('express');
var router = express.Router();

// connect to data source
var filename = '../dummy_json_data/member_date.json';
var member_exp_dates = require(filename);

router.get('/', function(req, res, next) {
  var userIdint = null;
  if(req.query.userId === undefined || typeof req.query.userId === undefined) {
		res.status(500).send("query parameter userId is required");
	} else if(isNaN(req.query.userId)) {
		res.status(500).send("query parameter userId must be parseable as integer");
	} else {
		userIdint = parseInt(req.query.userId, 10);
	}
	
	// Find if userId exists in the data, send result if exists
	if(!member_exp_dates[userIdint]) {
		res.status(500).send("user does not exist");
	} else {
		res.send(member_exp_dates[userIdint]);
	}
});

router.post('/', function(req, res, next) {
	var userId = req.body.userId;
	var userIdint = null;
	var new_member_exp_date = req.body.new_membership_exp_date;
	
	// validate userId
	if(userId === undefined || typeof userId === undefined) {
		res.status(500).send("query parameter userId is required");
	} else if(isNaN(userId)) {
		res.status(500).send("userId must be parseable as integer");
	} else {
		userIdint = parseInt(userId);
	}
	
	// validate new_member_exp_date valid format
	if(isIso8601(new_member_exp_date)) {
		member_exp_dates[userIdint].membership_exp_date = new_member_exp_date;
		var fs = require('fs');
		var json_format = JSON.stringify(member_exp_dates);
		filename = './dummy_json_data/member_date.json';
		fs.writeFile(filename, json_format, 'utf8', (err) => {
			if (err) {
				res.status(500).send("fs error: " + err);
			} else {
				res.status(200).send("record updated");
			}
		});
	} else {
		res.status(500).send("provide dates in ISO 8601 format");
	}
});

// helper function to validate an ISO 8601 date format
function isIso8601(date) {
	var re = /^\d{4}-\d{2}-\d{2}$/;
	if (re.test(date)) {
		return true;
	} else {
		return false;
	}
}

module.exports = router;

