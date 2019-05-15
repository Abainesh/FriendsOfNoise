/*Author: Gabby Saechao 5.7.2019*/

/*  Author: Quincy Powell
    Date: 2019-05-07  */

var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
	// non-nullable fields
	var new_fn = trim(req.body.first_name);
	console.log(new_fn);
	var new_ln = trim(req.body.last_name);
	console.log(new_ln);
	var new_email = trim(req.body.email);
	console.log(new_email);
	// nullable fields
	var new_address1 = trim(req.body.address1);
	console.log(new_address1);
	var new_address2 = trim(req.body.address2);
	console.log(new_address2);
	var new_city = trim(req.body.city);
	console.log(new_city);
	var new_state = trim(req.body.state);
	console.log(new_state);
	var new_zip = trim(req.body.zip);
	console.log(new_zip);
	var new_zip_ext = trim(req.body.zip_ext);
	console.log(new_zip_ext);
	var new_phone = trim(req.body.phone);
	console.log(new_phone);
	
	// validate non-null fields
	if (!isAllAlpha(new_fn)) {
		res.status(500).send("first_name must be all alphanumeric");
	}
	if (!isAllAlpha(new_ln)) {
		res.status(500).send("last_name must be all alphanumeric");
	}
	if (!validate_email(email)) {
		res.status(500).send("email address format not valid.");
	}
	
	// validate nullable fields
	
});

// helper function - requires all alpha characters
function isAllAlpha(str) {
	var re = /^[A-Za-z]+$/;
	if(re.test(str)) {
		return true;
	} else {
		return false;
	}
}

// helper function - is a two-letter state code?
function isUS_StateCode(str) {
	var re = /^[A-Z][A-Z]$/;
	if(re.test(str)) {
		return true;
	} else {
		return false;
	}
}

// helper function - is a 5-number zip code?
function isZipCode(str) {
	var re = /^[0-9]{4}[0-9]$/;
	if(re.test(str)) {
		return true;
	} else {
		return false;
	}
}

// helper function - is a 4-number zip extension?
function isZipExtension(str) {
	var re = /^[0-9]{3}[0-9]$/;
	if(re.test(str)) {
		return true;
	} else {
		return false;
	}
}

// helper function - is a 10-digit phone number?
function isUSPhoneNumber(str) {
	var re = /^[0-9]{3}-[0-9]{3}-[0-9]{3}[0-9]$/;
	if(re.test(str)) {
		return true;
	} else {
		return false;
	}
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