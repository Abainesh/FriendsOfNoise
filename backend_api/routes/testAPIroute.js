const express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('API is working properly');
});

router.get('/myStuff', (req, res) => {
  res.send({ express: 'Hello all friends of noise!!!!!!!' });
});

router.post('/yourStuff', (req, res) => {
  console.log(req.body);
  res.send(
    'I received your POST. Want to see?... : ${req.body.post}',
  );
});

module.exports = router;
