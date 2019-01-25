var express = require('express');
var router = express.Router();
var aircraftModel = require('../models/aircraftavailable.model');


function postAircraftData(req,res) {
   
    aircraftModel.aircraft(req,res);
};

module.exports = {
    postAircraftData
}