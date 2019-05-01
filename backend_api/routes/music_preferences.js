var express = require('express');
var router = express.Router();

var filename = '../dummy_json_data/music_pref.json';
var music_preferences = require(filename);
router.get('/', function(req, res, next) {
  res.send(music_preferences[1]);
  


});
module.exports = router;