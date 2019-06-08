/*  Author: Quincy Powell
	Date: 2019-04-30  */

	/*  Jon King
		Date: 2019-06-08
		Added firebase functionality    */

	const admin = require('firebase-admin');
	const functions = require('firebase-functions');
	var initialize = require('../firebase_initialize')
	var db = admin.firestore();
	var express = require('express');
	var router = express.Router();

// connect to the data source
var filename = '../dummy_json_data/email.json';
var emails = require(filename);

/**
 * API definition, get email address given a userId
 * Route syntax
 * HTTP request = GET
 * http://<servername>:<port>/email_address
 *		Query parameter: userId = An integer quoted as a string
 * Error: The response will be a 500 error with a message if
 * 1 - the query parameter is not provided
 * 2 - the query parameter is not parseable as an integer
 * 3 - the provided userId does not exist in the data source
 * Success: responds with a JSON object similar to
 * {
 *   "email": "bob@coontoso.com"
 * } 
 */
// router.get('/', function(req, res, next) {
// 	// Validate query and convert
// 	// ToDo: refactor this as an exportable function
// 	var userIdint = null;
// 	if(req.query.userId === undefined || typeof req.query.userId === undefined) {
// 		res.status(500).send("query parameter userId is required");
// 	} else if(isNaN(req.query.userId)) {
// 		res.status(500).send("query parameter userId must be parseable as integer");
// 	} else {
// 		userIdint = parseInt(req.query.userId, 10);
// 	}
	
// 	// Find if userId exists in the json, send result data if it does
// 	if(!emails[userIdint]) {
// 		res.status(500).send("user does not exist");
// 	} else {	
// 		res.send(emails[userIdint]);
// 	}
// });

router.get('/', function(req, res, next){

	var userId = req.query.userId;
	var user_email = db.collection('user').doc(""+userId).collection('data').doc('email');
	var getEmail = user_email.get()
	.then(doc => {
		if (!doc.exists){
			console.log('No email data');
			res.status(500).send("No address data");
		} else {
			console.log('valid email data');
			res.send(doc.data());
		}
	})
})


 /**
  * API definition, set email address given a userId and an email address
  * Route syntax
  * HTTP request = POST
  * http://<servername>:<port>/email_address
  *    HTTP request body: userId = an integer quoted as a string
  *    HTTP request body: email = an email address quoted as a string
  * Error: response will be a 500 error with a message if
  * 1 - userId was not provided in body
  * 2 - userId was not parsable as an integer
  * 3 - method was unable to write to the data source
  * 4 - email provided does not conform to our email regexp
  * Success: responds with "record updated"
  */
router.post('/', function(req, res, next) {
	var userId = req.body.userId;
	var new_email = req.body.email;

	var emailRef = db.collection('user').doc(""+userId).collection('data').doc('email');
	var setWithOptions = emailRef.set(
		{
			email: new_email
		},
		{merge: true});
	console.log("database updated");
	res.send("datbase updated");
	res.end();
});


	
	
	// Validate userId and convert to int
	// ToDo: refactor this as an exportable function
	// if(userId === undefined || typeof userId === undefined) {
	// 	res.status(500).send("query parameter userId is required");
	// } else if(isNaN(userId)) {
	// 	res.status(500).send("userId must be parseable as integer");
	// } else {
	// 	userIdint = parseInt(userId);
	// }
	
	// debugging console logs
	//console.log("Post body:email = " + email);
	//console.log("userIdint = " + userIdint);
	//console.log("Json array[index].email = " + emails[userIdint].email);
	
	// validate email address and write if valid
// 	if(validate_email(email)) {
// 		emails[userIdint].email = email;
// 		var fs = require('fs');
// 		var json_format = JSON.stringify(emails);
// 		filename = './dummy_json_data/email.json';
// 		fs.writeFile(filename, json_format, 'utf8', (err) => {
// 			if (err) {
// 				res.status(500).send("fs error: " + err);
// 			} else {
// 				res.status(200).send("record updated");
// 			}
// 		});
// 	} else {
// 		res.status(500).send("No email provided, or does not match W3C email regexp");
// 	}
// });

// helper function to validate an email address using a regexp
// slightly modified from source: 
// https://www.w3resource.com/javascript/form/email-validation.php
function validate_email(email) {
	var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if (re.test(email)) {
		return (true);
	} else {
		return (false);
	}
}

module.exports = router;

