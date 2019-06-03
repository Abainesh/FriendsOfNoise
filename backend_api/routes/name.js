/*  Author: Quincy Powell
	Date: 2019-04-30  */

/*	Jon King
	Date: 2019-06-01
	Added firebase functionality	*/


	const admin = require('firebase-admin');
	const functions = require('firebase-functions');
	
	
	// // TO OBTAIN SERVICE ACCOUNT KEY go to our Firestore App > Project Settings > Service Accounts
	// // Click GENERATE NEW KEY. Save this to your disk and add the file location  to the below variable
	// var serviceAccount = require("/Users/kingj/OneDrive/Documents/North Seattle/AD410_Web_App_Practicum/friendsofnoise-2ced6-firebase-adminsdk-pih7o-8eaac3cb45.json");
	
	
	// admin.initializeApp({
	//   credential: admin.credential.cert(serviceAccount),
	//   databaseURL: "https://friendsofnoise-2ced6.firebaseio.com"
	// });

	var initialize = require('../firebase_initialize')
	
	var db = admin.firestore();
	var express = require('express');
	var router = express.Router();

// connect to the data source
// var filename = '../dummy_json_data/name.json';
// var names = require(filename);


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

router.get('/', function(req, res, next) {
	
	var userId = req.query.userId;
	var userIdint = null;
	var name = db.collection('user').doc(""+userId).collection('name').doc('name_doc');
	var getDoc = name.get()
  .then(doc => {
    if (!doc.exists) {
			console.log('No such document!');
			res.status(500).send("user does not exist");
		} else {
			res.send(doc.data());
		}
	})
  .catch(err => {
    console.log('Error getting document', err);
	});
});





// router.get('/', function(req, res, next) {
// 	var userIdint = null;
	
// 	//console.log("userId value: " + req.query.userId);
// 	//console.log("userId type: " + typeof req.query.userId);
	
// 	// Validate query and convert
// 	if(req.query.userId === undefined || typeof req.query.userId === undefined) {
// 		res.status(500).send("query parameter userId is required");
// 	} else if(isNaN(req.query.userId)) {
// 		res.status(500).send("query parameter userId must be parseable as integer");
// 	} else {
// 		userIdint = parseInt(req.query.userId, 10);
// 	}
	
// 	// Find if userId exists in the JSON, send result data if it does.
// 	if(!names[userIdint]) {
// 		res.status(500).send("user does not exist");
// 	} else {	
// 		res.send(names[userIdint]);
// 	}
// });


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
	var ln = req.body.last_name;
	
	// validate userId input, convert to integer
	// if(userId === undefined || typeof userId === undefined) {
	// 	res.status(500).send("No userId specified");
	// } else if (isNaN(userId)) {
	// 	res.status(500).send("userId must be parseable as integer");
	// } else {
	// 	userIdint = parseInt(userId);
	// }
	// // validate name input using helper function, trim whitespace
	// if (isEmptyOrAllWhitespace(fn)) {
	// 	res.status(500).send("Empty or all whitespace first_name");
	// } else {
	// 	fn.trim();
	// }
	// if (isEmptyOrAllWhitespace(ln)) {
	// 	res.status(500).send("Empty or all whitespace last_name");
	// } else {
	// 	ln.trim();
	// }

	var checkUser = db.collection('user').doc(""+userId);
	var getDoc = checkUser.get()
  .then(doc => {
    if (!doc.exists) {
			console.log('No such document!');
			res.status(500).send("user does not exist");
		} else {
			console.log('good user ID');
		// At this point the following should be true: userId exists
		// in the database, first_name and last_name at least contain
		// some text

		var nameRef = db.collection('user').doc(""+userId).collection('name').doc('name_doc');
		var setWithOptions = nameRef.set(
			{
				first_name: fn,
				last_name: ln
			},
			{merge: true});


		console.log("database updated");
		res.send("database updated");
		res.end();



		// names[userIdint].first_name = fn;
		// names[userIdint].last_name = ln;
		// var json_format = JSON.stringify(names);
		// fs = require('fs');
		// filename = './dummy_json_data/name.json';
		// fs.writeFile(filename, json_format, 'utf8', function(err) {
		// 	if (err) {
		// 		res.status(500).send("fs write error: " + err);
		// 	} else {
		// 		res.status(200).send("record updated");
		// 	}
		}
	});
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