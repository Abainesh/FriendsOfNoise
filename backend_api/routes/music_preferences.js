// Author Jon King
// Started 4/30/19

/*  Quincy Powell
    Date: 2019-05-07
	Adjusted the get route, standard API is to require userId.
	Adjusted post route, the data validation was workinng under assumption about the data - appending a new genre. We will be overwriting existing array of strings with a new array of strings.  */

var express = require('express');
var router = express.Router();

// connect to the data
var filename = '../dummy_json_data/music_pref.json';
var music_preferences = require(filename);

router.get('/', function(req, res, next) {
  var userId = req.query.userId;
  var userIdint = null;

  if(userId === undefined || typeof userId === undefined) {
    res.status(500).send("userId required");
  }else if(isNaN(userId)){
    res.status(500).send("userId must be an integer")
  }else{
    userIdint = parseInt(userId);
  }

  if(!music_preferences[userId]){
    res.status(500).send("user does not exist");
  }else {
    res.send(music_preferences[userId]);
  }
});
  
router.post('/', function(req, res, next){
	var userId = req.body.userId;
	var userIdint = null;
	// expecting an array of strings for newPref
	var newPref = req.body.new_preferences;
	
	// validate userId input, convert to integer
	if (userId === undefined || typeof userId === undefined){
		res.status(500).send("No userId specified");
	} else if (isNaN(userId)){
		res.status(500).send("user Id must be an integer")
	} else {
		userIdint = parseInt(userId);
	}
	
	// Check that userId exists
	if(!music_preferences[userIdint]) {
		res.status(500).send("user does not exist");
	}
	
	// validate input - expecting an array of strings
	if(!newPref.isArray()) {
		res.status(500).send("expecting an array of strings in the new_preferences");
	}
	// trim any non-string pieces
	for(var i = 0; i < newPref.length; i++) {
		if(!typeof newPref[i] === 'string') {
			newPref.splice(i, 1);
			i--;
		}
	}
	
	// Update data
	music_preferences[userIdint] = newPref;
	var fs = require('fs');
	var json_format = JSON.stringify(music_preferences);
	filename = './dummy_json_data/music_pref';
	fs.writeFile(filename, json_format, 'utf8', (err) => {
		if (err) {
			res.status(500).send("fs error: " + err);
		} else {
			res.status(200).send("record updated");
		}
	});
});

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