var express = require('express');
var router = express.Router();
var crewsModel = require('../models/crews.model');


function postCrewData(req,res) {
    
    crewsModel.postCrews(req,res);

};

module.exports = {
postCrewData
};