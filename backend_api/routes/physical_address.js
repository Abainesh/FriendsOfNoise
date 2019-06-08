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

//Connects to data source
// var filename = '../dummy_json_data/p_address.json';
// var addresses = require(filename);

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
 */
// router.get('/', function(req, res, next) {

//     var userIdint = null;
    
//     //Validates userId
//     if(req.query.userId === undefined || typeof req.query.userId===undefined)
//     {
//         res.status(500).set("userId is required");
//     } else if (isNaN(req.query.userId)) {
//         res.status(500).send("userId must be a parseable integer");
//     } else {
//       userIdint = parseInt(req.query.userId, 10);
//     }
    
//     //Find if userId exists in JSON and sends the result data if it does.
//     if(!addresses[userIdint]){
//         res.status(500).send("Address does not exist");
//     }else {
//         res.send(addresses[userIdint]);
//     }
    
// });

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
	var userIdint = null;
    var address1 = req.body.address1;
    var address2 = req.body.address2;
    var city = req.body.city;
    var state = req.body.state;
    var zip = req.body.zip;
    var zip_ext = req.body.zip_ext;
	
    
    if(userId === undefined || typeof userId === undefined) {
		res.status(500).send("No userId specified");
	} else if (isNaN(userId)) {
		res.status(500).send("UserId must be parseable as an int");
	} else {
		userIdint = parseInt(userId);
	}
    
    
    //WHITESPACE
    if(isEmptyOrAllWhitespace(address1)){
        res.status(500).send("Empty or all whitespace address1");
    }else{
        address1.trim();
    }
    
    if(isEmptyOrAllWhitespace(city)){
        res.status(500).send("Empty of all whitespace city");
    }else{
        city.trim();
    }
    
    if(isEmptyOrAllWhitespace(state)){
        res.status(500).send("Empty of all whitespace state");
    }else{
        state.trim();
    }
    
    if(isEmptyOrAllWhitespace(zip)){
        res.status(500).send("Empty of all whitespace zip");
    }else{
        zip.trim();
    }
    
    //TRIMS NONREQUIRED ADDRESS LINES
    
    if(isEmptyOrAllWhitespace(address2)){
        address2="";
    }else{
        address2.trim();
    }
    
    if(isEmptyOrAllWhitespace(zip_ext)){
        zip_ext="";
    }else{
        zip_ext.trim();
    }    
    
    
    //CHECKS IF ID IS IN DB
    //IF TRUE, UPDATE
    //IF FALSE, THROW ERROR
    
    if(!addresses[userIdint]){
        res.status(500).send("User does not exist in database");
    }else{
        addresses[userIdint].address1=address1;
        addresses[userIdint].address2=address2;
        addresses[userIdint].city=city;
        addresses[userIdint].state=state;
        addresses[userIdint].zip=zip;
        addresses[userIdint].zip_ext=zip_ext;
        
        var json_format=JSON.stringify(addresses);
        fs=require('fs');
        filename = './dummy_json_data/p_address.json';
        fs.writeFile(filename, json_format, 'utf8', function(err){
            if(err){
                res.status(500).send("fs write error: " + err)
            }else{
                res.status(200).send("Record updated!");
            }
        });
    }
    
    
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

