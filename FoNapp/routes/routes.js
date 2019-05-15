var express = require('express');
var router = express.Router();

const { body, validationResult } = require('express-validator/check');



/*INDEX PAGE ROUTES*/
router.get('/', function(req, res, next){
   res.render('index', {title: 'Index'}) 
});




/*LOGIN PAGE ROUTES*/
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login Page' });
});

/*PROFILE PAGE ROUTES*/
router.post('/profile', function(req, res, next) {
  res.render('profile', { title: 'Profile Page' });
});

/*MEMBER PAGE ROUTES*/
router.post('/member', function(req, res, next) {
  res.render('member', { title: 'Member Page' });
});

/*ADMIN PAGE ROUTES*/
router.post('/admin', function(req, res, next) {
  res.render('admin', { title: 'Admin Page' });
});

/*TICKET PAGE ROUTES*/
router.post('/ticket', function(req, res, next) {
  res.render('ticket', { title: 'Ticket Page' });
});

/*EVENT PAGE ROUTES*/
router.get('/event', function(req, res, next) {
  res.render('event', { title: 'Event Page' });
});


module.exports = router;
