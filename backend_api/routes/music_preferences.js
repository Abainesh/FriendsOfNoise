// Author Jon King
// Started 4/30/19

var express = require('express');
var router = express.Router();

var filename = '../dummy_json_data/music_pref.json';
var music_preferences = require(filename);
router.get('/', function(req, res, next) {
  var prefId = null;

  if(req.query.prefId === undefined || typeof req.query.prefId === undefined) {
    res.status(500).send("prefId required");
  }else if(isNaN(req.query.prefId)){
    res.status(500).send("prefId must be an integer")
  }else{
    prefId = parseInt(req.query.prefId, 10);
  }

  if(!music_preferences[prefId]){
    res.status(500).send("preference does not exist");
  }else {
    res.send(music_preferences[prefId]);
  }
  
router.post('/', function(req, res, next){
  var userId = req.body.userId;
  var userIdint = null;
  var newPref = req.body.new_preference;

  if(userId === undefined || typeof userId === undefined){
    res.status(500).send("No userId specified");
  }else if (isNaN(userId)){
    res.status(500).send("user Id must be an integer")
  }else {
    userIdint = parseInt(userId);
  }

  if (isEmptyOrAllWhitespace(newPref)) {
		res.status(500).send("Empty or all whitespace");
	} else {
		newPref.trim();
  }
	if (music_preferences[userIdint].newPref) {
		res.status(500).send("You have already added this genre");
	} else {

		music_preferences[userIdint].new_preference = newPref;
		var json_format = JSON.stringify(music_preferences);
		fs = require('fs');
		filename = './dummy_json_data/music_pref.json';
		fs.writeFile(filename, json_format, 'utf8', function(err) {
			if (err) {
				res.status(500).send("fs write error: " + err);
			} else {
				res.status(200).send("record updated");
			}
		});
	}
})
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