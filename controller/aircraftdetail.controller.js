var express = require('express');
var router = express.Router();
var acModel = require('../models/aircraftdetail.model');
var db = require('../dbconnection'); //reference of dbconnection.js

function postAircraftDetail(req,res) {

  acModel.aircraftDetailFunction(req,res);
}


// function getAircraftDetail(req,res) {
//    console.log(req.query)
//     ac.getAllAC(function (err, results) {  // get ac detail data from Db
//    if (err){
//     res.json('error' + err);
//     // throw error
//    } else{
//        res.json(results);
//        db.end()
//    }
//         });
// };

// console.log(success);

module.exports = {
  postAircraftDetail
}