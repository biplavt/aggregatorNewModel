var express = require('express');
var router = express.Router();
var ac = require('../models/aircraftdetail.model');
var db = require('../dbconnection'); //reference of dbconnection.js

router.post('/', function (req, res, next) {
    ac.aircraftDetail(req.body, function (success, error) { // insert ac detail data to Db
        if (success) {
            res.json('success'); //or return count for 1 &amp;amp;amp; 0
        } else {
            res.json('error'); //or return count for 1 &amp;amp;amp; 0
            
        }
    }); 
}),
router.get('/', function (req, res, next) {
   console.log(req.query)
    //    ac.getAllACByAASF(function (err, results) {  // get ac detail data from Db
    //        if (err){
    //         res.json(err);
    //        } else{
    //            res.json(results);
    //        }
    //     });  
        ac.getAllAC(function (err, results) {  // get ac detail data from Db
           if (err){
            res.json('error' + err);
            // throw error
           } else{
               res.json(results);
               db.end()
           }
        });
});

// console.log(success);

module.exports = router;