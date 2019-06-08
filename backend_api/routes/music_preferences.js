// Author Jon King
// Started 4/30/19

/*  Quincy Powell
    Date: 2019-05-07
	Adjusted the get route, standard API is to require userId.
	Adjusted post route, the data validation was workinng under assumption about the data - appending a new genre. We will be overwriting existing array of strings with a new array of strings.  */


	//Initialize Firestore
const admin = require('firebase-admin');
const functions = require('firebase-functions');


// // TO OBTAIN SERVICE ACCOUNT KEY go to our Firestore App > Project Settings > Service Accounts
// // Click GENERATE NEW KEY. Save this to your disk and add the file location  to the below variable
// var serviceAccount = require("/Users/kingj/OneDrive/Documents/North Seattle/AD410_Web_App_Practicum/friendsofnoise-2ced6-firebase-adminsdk-pih7o-8eaac3cb45.json");


// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://friendsofnoise-2ced6.firebaseio.com"
// });

var Initialize = require('../firebase_initialize')

var db = admin.firestore();
var express = require('express');
var router = express.Router();

// connect to the data
// var filename = '../dummy_json_data/music_pref.json';
// var music_preferences = require(filename);

/**
 * API definition, get music preferences given a userId
 * Route syntax
 * HTTP request = GET
 * http://<servername>:<port>/music_preferences
 *     Query paramegter: userId = an integer quoted as a string
 * Error: The response will be a 500 error code with a message if
 * 1 - the query parameter is not provided
 * 2 - the query parameter is not parseable as an integer
 * 3 - the provided userId does not exist in the data source
 * Success: responds with a JSON object similar to:
 * [
 *   "jazz",
 *   "classical",
 *   "ska",
 *   "international"
 * ]
 */


router.get('/', function(req, res, next) {
	
	var userId = req.query.userId;
	var userIdint = null;
	var checkUser = db.collection('user').doc(""+userId);
	var prefRef = db.collection('user').doc(""+userId).collection('data').doc('music_prefs');
	var getDoc = checkUser.get()
  .then(doc => {
    if (!doc.exists) {
			console.log('user does not exist');
			res.status(500).send("user does not exist");
		}
		console.log ('valid user');
			getDoc = prefRef.get()
			.then(doc => {
				if (!doc.exists){
					console.log('no preferences set');
					res.status(500).send("no preferences set");
				} else {
					console.log('valid prefs data');
					res.send(doc.data());
				}
				})
			.catch(err => {
				console.log('Error getting document', err);
			})
		.catch(err => {
    console.log('Error getting document', err);
	});
});
});

 // router.get('/', function(req, res, next) {
//   var userId = req.query.userId;
//   var userIdint = null;

//   if(userId === undefined || typeof userId === undefined) {
//     res.status(500).send("userId required");
//   }else if(isNaN(userId)){
//     res.status(500).send("userId must be an integer")
//   }else{
//     userIdint = parseInt(userId);
//   }

//   if(!music_preferences[userId]){
//     res.status(500).send("user does not exist");
//   }else {
//     res.send(music_preferences[userId]);
//   }
// });

/**
 * API definition, set music preferences given a userId and an array of strings
 * Route syntax
 * HTTP request = POST
 * http://<servername>:<port>/music_preferences
 *     HTTP request body: userId = an integer quoted as a string
 *     HTTP request body: new_preferences = an array of strings, representing a list of new user preferences
 * Error: The response will be a 500 error with a message if
 * 1 - userId was not provided in body
 * 2 - userId was not parseable as an integer
 * 3 - method was unable to write to the data source
 * Note: an empty array is accepted, and will be stored
 * Success: responds with "record updated"
 */


router.post('/', function(req, res, next){
	var newPref = req.body.newPref;
	toString(newPref);
	var userId = req.body.userId;
	var userIdint = null;
	// validate userId input
	
	console.log("starting post")
	if (userId === undefined || typeof userId === undefined){
		res.status(500).send("No userId specified");
		console.log(userId);
	} else if (newPref === undefined || typeof newPref === undefined){
		console.log("no newPref");
		res.status(500).send("No preference specified");
	} else {

		
		
	// check for existing user in db
	var checkUser = db.collection('user').doc(""+userId);
	var getDoc = checkUser.get()
  .then(doc => {
    if (!doc.exists) {
			console.log('No such document!');
			res.status(500).send("user does not exist");
		} else {
			console.log('good user ID');
		}
	})

	// check for existing music_prefs array in db
	var checkPrefs = db.collection('user').doc(""+userId).collection('data').doc('music_prefs');
	getDoc = checkPrefs.get()
  .then(doc => {
    if (!doc.exists) {
			// create music_prefs array
			var emptyArray = {}
			var newPrefArray = db.collection('user').doc(""+userId).collection('data').doc('music_prefs').set(emptyArray);
			console.log('music_prefs array created');
			
		} else {
			console.log('existing music_prefs array');
		}
	})

	
	// validate input - expecting an array of strings
// 	if(!newPref.isArray()) {
// 		res.status(500).send("expecting an array of strings in the new_preferences");
// 	}
// 	// trim any non-string pieces
// 	for(var i = 0; i < newPref.length; i++) {
// 		if(!typeof newPref[i] === 'string') {
// 			newPref.splice(i, 1);
// 			i--;
// 		}
 
	
	// Update data
	var prefRef = db.collection('user').doc(""+userId).collection('data').doc('music_prefs');
	console.log(newPref);
	var arrUnion = prefRef.set({
		genre: admin.firestore.FieldValue.arrayUnion(newPref)});
	console.log("database updated");
	res.send("database updated");
	res.end();
		}
	});
	

//  router.post('/', function(req, res, next){
// 	var userId = req.body.userId;
// 	var userIdint = null;
// 	// expecting an array of strings for newPref
// 	var newPref = req.body.new_preferences;
	
// 	// validate userId input, convert to integer
// 	if (userId === undefined || typeof userId === undefined){
// 		res.status(500).send("No userId specified");
// 	} else if (isNaN(userId)){
// 		res.status(500).send("user Id must be an integer")
// 	} else {
// 		userIdint = parseInt(userId);
// 	}
	
// 	// Check that userId exists
// 	if(!music_preferences[userIdint]) {
// 		res.status(500).send("user does not exist");
// 	}
	
// 	// validate input - expecting an array of strings
// 	if(!newPref.isArray()) {
// 		res.status(500).send("expecting an array of strings in the new_preferences");
// 	}
// 	// trim any non-string pieces
// 	for(var i = 0; i < newPref.length; i++) {
// 		if(!typeof newPref[i] === 'string') {
// 			newPref.splice(i, 1);
// 			i--;
// 		}
// 	}
	
// 	// Update data
// 	music_preferences[userIdint] = newPref;
// 	var fs = require('fs');
// 	var json_format = JSON.stringify(music_preferences);
// 	filename = './dummy_json_data/music_pref';
// 	fs.writeFile(filename, json_format, 'utf8', (err) => {
// 		if (err) {
// 			res.status(500).send("fs error: " + err);
// 		} else {
// 			res.status(200).send("record updated");
// 		}
// 	});
// });

// helper function to catch empty strings and all whitespace strings
// source: StackOverflow questionId 10232366
function isEmptyOrAllWhitespace(str) {
	var re = /^\s*$/;
	
	if (re.test(str)) {
		return true;
	} else {
		return false;
	}
}
module.exports = router;