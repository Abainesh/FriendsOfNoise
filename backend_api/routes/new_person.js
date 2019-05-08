/*Author: Gabby Saechao 5.7.2019*/

/*  Author: Quincy Powell
    Date: 2019-05-07  */

var express = require('express');
var router = express.Router();

router.post('/', function(req, res next) {
	// non-nullable fields
	var new_fn = trim(req.body.first_name);
	var new_ln = trim(req.body.last_name);
	var new_email = trim(req.body.email);
	// nullable fields
	var new_address1 = trim(req.body.address1);
	var new_address2 = trim(req.body.address2);
	var new_city = trim(req.body.city);
	var new_state = trim(req.body.state);
	var new_zip = trim(req.body.zip);
	var new_zip_ext = trim(req.body.zip_ext);
	var new_phone = trim(req.body.phone);
	
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