/*  Author: Quincy Powell
	Date: 2019-04-30  */

/*	Jon King
	Date: 2019-06-01
	Added firebase functionality	*/


	const admin = require('firebase-admin');
	const functions = require('firebase-functions');
	var initialize = require('../firebase_initialize')
	var db = admin.firestore();
	var express = require('express');
	var router = express.Router();

/**
 * API definition, get first and last name given a userId
 * Route syntax
 * HTTP request = GET
 * http://<servername>:<port>/name
 *     Query parameter: userId = an integer quoted as a string
 * Error: the response will be a 500 error with a message if
 * 1 - the query parameter is not provided
 * 2 - the query parameter is not parseable as an integer
 * 3 - the provided userId does not exist in the data source
 * Success: responds with a JSON object similar to
 * {
 *   "first_name": "Quincy",
 *   "last_name": "Powell"
 * }
 */
router.get('/:userId', function(req, res, next) {
	
	var userId = req.query.userId;
	var userIdint = null;
	var name = db.collection('user').doc(""+userId).collection('data').doc('name');
	var getDoc = name.get()
  .then(doc => {
    if (!doc.exists) {
			console.log('name set for user');
			res.status(500).send("no name set for user");
		} else {
			res.send(doc.data());
		}
	})
  .catch(err => {
    console.log('Error getting document', err);
	});
});


/**
 * API definition, set name given a userId, first and last name
 * Route syntax
 * HTTP request = POST
 * http://<servername>:<port>/name
 *     HTTP request body: userId = an integer quoted as a string
 *     HTTP request body: first_name = first name as a string
 *     HTTP request body: last_name = last name as a string
 * Error: response will be a 500 error with a message if
 * 1 - userId was not provided in body
 * 2 - userId was not parseable as an integer
 * 3 - method was unable to write to the data source
 * 4 - either first_name OR last_name were blank
 * Success: responds with "record updated"
 */
router.post('/', function(req, res, next) {
	var userId = req.body.userId;
	var userIdint = null;
	var fn = req.body.first_name;
	if (!isEmptyOrAllWhitespace(fn)) {
		res.status(500).send("First name is undefined, null, or all whitespace");
	}
	if (typeof fn === "string") {
		fn.trim();
	}
	
	var ln = req.body.last_name;
	if (!isEmptyOrAllWhitespace(ln)) {
		res.status(500).send("Last name is undefined, null, or all whitespace");
	}
	if (typeof ln === "string") {
		ln.trim();
	}

	var checkUser = db.collection('user').doc(""+userId);
	var getDoc = checkUser.get()
  .then(doc => {
    if (!doc.exists) {
			console.log('user does not exist');
			res.status(500).send("user does not exist");
		} else {
			console.log('good user ID');
		}

		var nameRef = db.collection('user').doc(""+userId).collection('data').doc('name');
		var setWithOptions = nameRef.set(
			{
				first_name: fn,
				last_name: ln
			},
			{merge: true});

		console.log("database updated");
		res.send("database updated");
		res.end();
		}
	)
	});
                        


/** 
 * helper function to catch various null-like conditions:
 * uninitialized variables as indicated by the JS undefined type
 * strings set to the null value
 * empty strings and all whitespace strings by RegExp
 * source of the RegExp syntax: StackOverflow questionId 10232366
 * choosing to accept any non-null string is dangerous so I'm adding
 * ToDo: add DB injection screening as a separate input validation method
 */
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