// Author Jon King
// Started 4/30/19

var express = require('express');
var router = express.Router();

var filename = '../dummy_json_data/music_pref.json';
var music_preferences = require(filename);
router.get('/', function(req, res, next) {
  res.send(music_preferences[2]);
  


});
module.exports = router;