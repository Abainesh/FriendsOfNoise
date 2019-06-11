/*Author: Gabby Saechao 4.30.2019*/

/*  Jon King
    Date: 2019-06-08
    Added firebase functionality    */

// QRP - Would be nice feature: Use an external web service to validate address. Maybe USPS has a web api?


const admin = require('firebase-admin');
const functions = require('firebase-functions');
var initialize = require('../firebase_initialize')
var db = admin.firestore();
var express = require('express');
var router = express.Router();


/**
 * API definition, get physical address given a userId
 * Route syntax
 * HTTP request = GET
 * http://<servername>:<port>/physical_address
 *     Query parameter: userId = an integer quoted as a string
 * Error: the response will be a 500 error with a message if
 * 1 - the query parameter is not provided
 * 2 - the query parameter is not parseable as an integer
 * 3 - the provided userId does not exist in the data source
 * Success: responds with a JSON object similar to
 * {
 *   "address1": "1900 N Urban Way",
 *   "address2": "",
 *   "city": "Tukwilla",
 *   "state": "WA",
 *   "zip": "98543",
 *   "zip_ext": ""
 * }
 * Note: address2 and zip_ext are nullable fields (may be blank)
 * all others are required
 */
router.get('/', function(req, res, next) {
	
	var userId = req.query.userId;
    var user_address = db.collection('user').doc(""+userId).collection('data').doc('address');
	var getAddress = user_address.get()
	.then(doc => {
		if (!doc.exists) {
			console.log('No address data');
			res.status(500).send("No address data");
		} else {
				console.log('valid address data');
				res.send(doc.data());
			}
	})
});

/**
 * API definition, set a physical address given a userId, address1, address2, city, state, zip, and zip_ext
 * Route syntax
 * HTTP request = POST
 * http://<servername>:<port>/physical_address
 *     HTTP request body fields
       userId = an integer quoted as a string
	   address1 = a string, representing house number and street
	   address2 = optional string, representing unit or appartment number
	   city = a string, representing city name
	   state = a string, 2 characters in length, representing a U.S. state or territory postal code
	   zip = a string of integers, 5 characters in length, representing a U.S. zip code
	   zip_ext = optional strinng of integers, 4 characters in length, representing a U.S. zip extension
 */
router.post('/', function(req, res, next){  
	var userId = req.body.userId;
    var new_address1 = req.body.address1;
    var new_address2 = req.body.address2;
    var new_city = req.body.city;
    var new_state = req.body.state;
    var new_zip = req.body.zip;
    var new_zip_ext = req.body.zip_ext;
    var new_phone = req.body.phone;
	
    
    if(userId === undefined || typeof userId === undefined) {
        res.status(500).send("No userId specified");
    }
    
	new_address1.trim();
    if(isEmptyOrAllWhitespace(new_address1)){
        res.status(500).send("Empty or all whitespace address1");
    }
    
	new_address2.trim();
	if(isEmptyOrAllWhitespace(new_address2)) {
		new_address2 = "";
	}
	
	new_city.trim();
    if(isEmptyOrAllWhitespace(new_city)){
        res.status(500).send("Empty of all whitespace city");
    }
    
	new_state.trim();
	new_state.toUpperCase();
    if(isEmptyOrAllWhitespace(new_state)){
        res.status(500).send("Empty of all whitespace state");
    }
	if(!isValidStateCode(new_state)) {
		res.status(500).send("State code appears to be invalid. Expected: two upper case letters in English alphabet.");
	}
    
	new_zip.trim();
    if(isEmptyOrAllWhitespace(new_zip)){
        res.status(500).send("Empty of all whitespace zip");
    }
	if(!isValidZipCode(new_zip)) {
		res.status(500).send("Zip code appears to be invalid. Expected: 5 arabic numerals with no extraneous characters.");
	}
    
	new_zip_ext.trim();
    if(isEmptyOrAllWhitespace(new_zip_ext)){
        new_zip_ext="";
    } else {
		if(!isValidZipExtension(new_zip_ext)) {
			res.status(500).send("Zip extension appears to be invalid. Expected: empty string OR 4 arabic numerals with no extraneous characters.");
		}
	}
    
    
    var addressRef = db.collection('user').doc(""+userId).collection('data').doc('address');
    var setWithOptions = addressRef.set(
        {
            address1: new_address1,
            address2: new_address2,
            city: new_city,
            state: new_state,
            zip: new_zip,
            zip_ext: new_zip_ext,
            phone: new_phone
        },
        {merge:true});
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

/**
 * helper for identifying state codes
 * currently just verifies two capital letters
 * ToDo: update to check for any valid state, U.S. territory, or APO
 */
function isValidStateCode(str) {
	var re = /^[A-Z][A-Z]$/;
	return re.test(str);
}

/**
 * helper function for identifying zip codes
 * currently just verifies five arabic numerals in a row and no extraneous characters
 */
function isValidZipCode(str) {
	var re = /^[0-9]{4}[0-9]$/;
	return re.test(str);
}

/**
 * helper function for identifying zip extension codes
 * currently just verifies four arabic numerals in a row and no extraneous characters
 */
function isValidZipExtension(str) {
	var re = /^[0-9]{3}[0-9]$/;
	return re.test(str);
}

module.exports = router;

