var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.send("Nobody here, except us chickens.";
});

module.exports = router;

