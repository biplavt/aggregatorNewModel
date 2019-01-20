var express = require('express');
var router = express.Router();
var cryptModel = require('../models/crypt.model');
var siteID = "CAAASF3";
router.post('/', function (req, res, next) {
   
    cryptModel.apiKeySelect(siteID, function (err, apiKey) {
        if (err) {

        } else {
           

            
            // res.json(apiKey); //or return count for 1 &amp;amp;amp; 0
        }
    }); 

   
})

module.exports = router;

