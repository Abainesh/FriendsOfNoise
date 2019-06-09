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
		
	console.log("starting post")
	if (userId === undefined || typeof userId === undefined){
		res.status(500).send("No userId specified");
		console.log(userId);
	} else if (newPref === undefined || typeof newPref === undefined){
		console.log("no newPref");
		res.status(500).send("No preference specified");
	}

		
		
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
	
	// Update data
	var prefRef = db.collection('user').doc(""+userId).collection('data').doc('music_prefs');
	console.log(newPref);
	var arrUnion = prefRef.set({
		genre: admin.firestore.FieldValue.arrayUnion(newPref)});
		console.log("database updated");
		res.send("database updated");
		res.end();
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
	
	if (re.test(str)) {
		return true;
	} else {
		return false;
	}
}
module.exports = router;