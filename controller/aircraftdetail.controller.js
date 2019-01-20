var express = require('express');
var router = express.Router();
var ac = require('../models/aircraftdetail.model');
var db = require('../dbconnection'); //reference of dbconnection.js

function postAircraftDetail(req,res) {
  console.log(req.body);
    ac.aircraftDetail(req.body, function (success, error) { // insert ac detail data to Db
        if (success) {
            res.json('success'); //or return count for 1 &amp;amp;amp; 0
        } else {
            res.json('error'); //or return count for 1 &amp;amp;amp; 0
            
        }
    }); 
}


function getAircraftDetail(req,res) {
   console.log(req.query)
    ac.getAllAC(function (err, results) {  // get ac detail data from Db
   if (err){
    res.json('error' + err);
    // throw error
   } else{
       res.json(results);
       db.end()
   }
        });
};

// console.log(success);

module.exports = {
  postAircraftDetail,
  getAircraftDetail
}