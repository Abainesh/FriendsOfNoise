/*  Author:  
    Jon King
    Date: 2019-06-08  */

const admin = require('firebase-admin');
const functions = require('firebase-functions');
var initialize = require('../firebase_initialize')
var db = admin.firestore();
var express = require('express');
var router = express.Router();

router.get('/', function(req,res,next){

    var allData = {};
    var data = {}; 
    var userId = req.query.userId;    
    let nameRef = db.collection('user').doc(""+userId).collection('data').doc('name');
    let emailRef = db.collection('user').doc(""+userId).collection('data').doc('email');
    let addressRef = db.collection('user').doc(""+userId).collection('data').doc('address');
    let member_endRef = db.collection('user').doc(""+userId).collection('data').doc('member_end_date');
    let prefsRef = db.collection('user').doc(""+userId).collection('data').doc('music_prefs');

    let getData = nameRef.get()
    .then(doc => {
        data = doc.data();
        if (!doc.exists) {
            console.log('No such document!');
          } else {
            allData = Object.assign(allData, data);
        var string = JSON.stringify(allData);
          }
    });

    getData = emailRef.get()
    .then(doc => {
        data = doc.data();
        if (!doc.exists) {
            console.log('No such document!');
          } else {
            allData = Object.assign(allData, data);
        var string = JSON.stringify(allData);
          }
    })

    getData = addressRef.get()
    .then(doc => {
        data = doc.data();
        if (!doc.exists) {
            console.log('No such document!');
          } else {
            allData = Object.assign(allData, data);
        var string = JSON.stringify(allData);
          }
    })

    getData = member_endRef.get()
    .then(doc => {
        data = doc.data();
        if (!doc.exists) {
            console.log('No such document!');
          } else {
            allData = Object.assign(allData, data);
        var string = JSON.stringify(allData);
          }
    })
    getData = prefsRef.get()
    .then(doc => {
        data = doc.data();
        if (!doc.exists) {
            console.log('No such document!');
          } else {
            allData = Object.assign(allData, data);
        var string = JSON.stringify(allData);

          }
    })
    .then(doc => {
        res.send(allData);
    })
    .catch(err => {
        console.log('Error getting document', err);
      });;


});


module.exports = router;