var express = require('express');
var router = express.Router();
var AASF = require('../models/aasf.model');
var db = require('../dbconnection'); //reference of dbconnection.js

function postAASF(req,res) {
    
    AASF.upsertAASFAndState(req.body, function (err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(count.insertId); //or return count for 1 &amp;amp;amp; 0
        }
    }); 
    
}

function getAASF(req,res) {
    AASF.getAASFs().then(function(result){
        res.send(result);
    },function(error){
        res.send(error);
    });
    
}

module.exports = {
    postAASF,
    getAASF
};