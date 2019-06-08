/*  Quincy Powell
	Date: 2019-05-07  */
	
	/*	Jon King
Date: 2019-06-08
Added firebase functionality	*/

const admin = require('firebase-admin');
const functions = require('firebase-functions');
var initialize = require('../firebase_initialize')
var db = admin.firestore();
var express = require('express');
var router = express.Router();

// connect to data source
// var filename = '../dummy_json_data/member_date.json';
// var member_exp_dates = require(filename);

/**
 * API definition, get membership end date given a userId
 * Route syntax
 * HTTP request = GET
 * http://<servername>:<port>/member_end_date
 *     Query parameter: userId = an integer quoted as a string
 * Error: the response will be an error code 500 if
 * 1 - the query parameter is not provided
 * 2 - the query parameter is not parseable as an integer
 * 3 - the provided userId does not exist in the data source
 * Success: responds with a JSON object similar to:
 * {
 *     "membership_exp_date": "2019-08-08"
 * }
 */
router.get('/', function(req, res, next) {
  var userIdint = null;
  var userId = req.query.userId;

  if(req.query.userId === undefined || typeof req.query.userId === undefined) {
		res.status(500).send("query parameter userId is required");
  } else {
	// } else if(isNaN(req.query.userId)) {
	// 	res.status(500).send("query parameter userId must be parseable as integer");
	// } else {
	// 	userIdint = parseInt(req.query.userId, 10);
	// }
	
	// Find if userId exists in the data, send result if exists

	// if(!member_exp_dates[userIdint]) {
	// 	res.status(500).send("user does not exist");
	// } else {
	// 	res.send(member_exp_dates[userIdint]);
	// }

	var member_end_date = db.collection('user').doc(""+userId).collection('data').doc('member_end_date');
	var getEndDate = member_end_date.get()
	.then(doc => {
		if (!doc.exists){
			console.log("No membership end date");
			res.status(500).send("No membership end date");
		} else {
			console.log('valid membership end date data');
			res.send(doc.data());
		}
	})
}
});

/**
 * API definition, set member end date given a userId and new member end date
 * Route syntax
 * HTTP request = POST
 * http://<servername>:<port>/member_end_date
 *    HTTP request body: userId = an integer quoted as a string
 *    HTTP request body: new_membership_exp_date = a quoted date in ISO-8601 format
 * Error: response will be a 500 error with a message if
 * 1 - userId was not provided in body
 * 2 - userId was not parseable as an integer
 * 3 - method was unable to write to the data source
 * 4 - new_membership_exp_date was not provided in ISO-8601 format
 */
router.post('/', function(req, res, next) {
	var userId = req.body.userId;
	var userIdint = null;
	var new_member_end_date = req.body.member_end_date;
	
	// validate userId
	if(userId === undefined || typeof userId === undefined) {
		res.status(500).send("query parameter userId is required");
	// } else if(isNaN(userId)) {
	// 	res.status(500).send("userId must be parseable as integer");
	// } else {
	// 	userIdint = parseInt(userId);
	// }

	} else {
		var dateRef = {
			date: new_member_end_date
		}
		var endDateRef = db.collection('user').doc(""+userId).collection('data').doc('member_end_date').set(dateRef);
		// var setWithOption = endDateRef.set(
		// 	{
		// 		date: new_member_end_date
		// 	}
		console.log("database updated");
		res.send("database updated");
		res.end();
		}
});
		


	
	// validate new_member_exp_date valid format
	// if(isIso8601(new_member_exp_date)) {
	// 	member_exp_dates[userIdint].membership_exp_date = new_member_exp_date;
	// 	var fs = require('fs');
	// 	var json_format = JSON.stringify(member_exp_dates);
	// 	filename = './dummy_json_data/member_date.json';
	// 	fs.writeFile(filename, json_format, 'utf8', (err) => {
	// 		if (err) {
	// 			res.status(500).send("fs error: " + err);
	// 		} else {
	// 			res.status(200).send("record updated");
	// 		}
	// 	});
	// } else {
	// 	res.status(500).send("provide dates in ISO 8601 format");
	// }

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

