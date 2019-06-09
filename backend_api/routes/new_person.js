/*Author: Gabby Saechao 5.7.2019*/

/*  Author: Quincy Powell
	Date: 2019-05-07  */
	
/*	Jon King
Date: 2019-06-03
Added firebase functionality	*/


const admin = require('firebase-admin');
const functions = require('firebase-functions');
var initialize = require('../firebase_initialize')
var db = admin.firestore();
var express = require('express');
var router = express.Router();

	
//Check if UserId already exists. If not, create new user
//and add all user data.

router.post('/', function(req, res, next) {
	var userId = req.body.userId;
	var checkUser = db.collection('user').doc(""+userId);
	console.log(userId);
	
	var getDoc = checkUser.get()
	.then(doc => {
		if (doc.exists){
			console.log("userId already exists");
			res.status(500).send("user already exists");
			//res.end();
		} else {
			var newUser = {}
			//var newUser = db.collection('user').doc();
			var setNewUser = db.collection('user').doc(userId).set(newUser);
			res.send("user created");
		

	// // non-nullable fields
	// var new_fn = trim(req.body.first_name);
	// console.log(new_fn);
	// var new_ln = trim(req.body.last_name);
	// console.log(new_ln);
	// var new_email = trim(req.body.email);
	// console.log(new_email);
	// // nullable fields
	// var new_address1 = trim(req.body.address1);
	// console.log(new_address1);
	// var new_address2 = trim(req.body.address2);
	// console.log(new_address2);
	// var new_city = trim(req.body.city);
	// console.log(new_city);
	// var new_state = trim(req.body.state);
	// console.log(new_state);
	// var new_zip = trim(req.body.zip);
	// console.log(new_zip);
	// var new_zip_ext = trim(req.body.zip_ext);
	// console.log(new_zip_ext);
	// var new_phone = trim(req.body.phone);
	// console.log(new_phone);

	// // non-nullable fields
	
	
	// validate non-null fields
	if (!isAllAlpha(new_fn)) {
		res.status(500).send("first_name must be all alphanumeric");
	}
	if (!isAllAlpha(new_ln)) {
		res.status(500).send("last_name must be all alphanumeric");
	}

		

var new_fn =  req.body.first_name ;
	console.log (new_fn) ;
	var new_ln =  req.body.last_name ;
	console.log (new_ln) ;
	var new_email =  req.body.email ;
	console.log (new_email) ;
	// nullable fields
	var new_address1 =  req.body.address1 ;
	console.log (new_address1) ;
	var new_address2 =  req.body.address2 ;
	console.log (new_address2) ;
	var new_city =  req.body.city ;
	console.log (new_city) ;
	var new_state =  req.body.state ;
	console.log (new_state) ;
	var new_zip =  req.body.zip ;
	console.log (new_zip) ;
	var new_zip_ext =  req.body.zip_ext ;
	console.log (new_zip_ext) ;
	var new_phone =  req.body.phone ;
	console.log (new_phone) ;
	
	// if (!validate_email(new_email)) {
	// 	res.status(500).send("email address format not valid.");
	// }
	
	// // validate nullable fields


	var nameRef = db.collection('user').doc(""+userId).collection('data').doc('name');
		var setWithOptions = nameRef.set(
			{
				first_name: new_fn,
				last_name: new_ln
			},
			{merge: true});
	
	var dataRef = db.collection('user').doc(""+userId).collection('data').doc('address');
		setWithOptions = dataRef.set(
			{
				//email: new_email,
				address1: new_address1,
				address2: new_address2,
				city: new_city,
				state: new_state,
				zip: new_zip,
				zip_ext: new_zip_ext,
				phone: new_phone
			},
			{merge: true});
	
	var prefRef = db.collection('user').doc(""+userId).collection('data').doc('music_prefs');
		setWithOptions = prefRef.set({});


		console.log("database updated");
		res.send("database updated");
		res.end();
	}
})

});

// helper function - requires all alpha characters
function isAllAlpha(str) {
	var re = /^[A-Za-z]+$/;
	return (re.test(str));
}

// helper function - is a two-letter state code?
function isUS_StateCode(str) {
	var re = /^[A-Z][A-Z]$/;
	return (re.test(str));
}

// helper function - is a 5-number zip code?
function isZipCode(str) {
	var re = /^[0-9]{4}[0-9]$/;
	return (re.test(str));
}

// helper function - is a 4-number zip extension?
function isZipExtension(str) {
	var re = /^[0-9]{3}[0-9]$/;
	return (re.test(str));
}

// helper function - is a 10-digit phone number?
function isUSPhoneNumber(str) {
	var re = /^[0-9]{3}-[0-9]{3}-[0-9]{3}[0-9]$/;
	return (re.test(str));
}

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