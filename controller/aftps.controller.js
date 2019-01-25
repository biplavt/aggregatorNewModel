var express = require('express');
var router = express.Router();
var aftpsModel = require('../models/aftps.model');

function postAFTPData(req,res) {
   aftpsModel.postAftps(req,res);
}

function getAFTPData(req,res) {
    res.json('worked bla');
}

module.exports = {
    postAFTPData,
    getAFTPData
}