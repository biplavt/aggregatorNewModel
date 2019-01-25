var express = require('express');
var router = express.Router();
var AASFcontroller = require('../models/aasf.model');
var db = require('../dbconnection'); //reference of dbconnection.js


function ObjToArray(obj) {
  var arr = obj instanceof Array;

  return (arr ? obj : Object.keys(obj)).map(function(i) {
    var val = arr ? i : obj[i];
    if(typeof val === 'object')
      return ObjToArray(val);
    else
      return val;
  });
}


function postAASF(req,res) {
    
    var AASF=req.body;
    var insertValues =ObjToArray(AASF.AASF_TB);
    var valueData = AASF.AASF_TB[0];

    AASFcontroller.upsertAASFAndState(insertValues, valueData).then((result)=>{
            res.json(result.insertId); //or return count for 1 &amp;amp;amp; 0
        },(error)=>{
            console.log(error);
        });    
}

function getAASF(req,res) {
    AASFcontroller.getAASFs().then(function(result){
        res.send(result);
    },function(error){
        res.send(error);
    });
    
}

module.exports = {
    postAASF,
    getAASF
};