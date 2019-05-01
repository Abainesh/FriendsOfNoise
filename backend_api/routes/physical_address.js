/*Author: Gabby Saechao 4.30.2019*/

var express = require('express');
var router = express.Router();

//Connects to data source
var filename = '../dummy_json_data/p_address.json';
var addresses = require(filename);

/* GET home page. */
router.get('/', function(req, res, next) {

    var addressIdint = null;
    
    //Validates addressId
    if(req.query.addressId === undefined || typeof req.query.addressId===undefined)
    {
        res.status(500).set("AddressId is required");
    } else if (isNaN(req.query.addressId)) {
        res.status(500).send("AddressId must be a parseable integer");
    } else {
      addressIdint = parseInt(req.query.addressId, 10);
    }
    
    //Find if addressId exists in JSON and sends the result data if it does.
    if(!addresses[addressIdint]){
        res.status(500).send("Address does not exist");
    }else {
        res.send(addresses[addressIdint]);
    }
    
});

module.exports = router;

