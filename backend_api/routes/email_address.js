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
	
	if (!validate_email(new_email)) {
		res.status(500).send("String provided is not a properly formatted email address");
	}

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

