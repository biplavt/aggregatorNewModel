var express = require('express');
var router = express.Router();
var aircraft = require('../models/aircraft.model');


function postAircraft(req,res) {
    aircraft.postGivenAircraft(req, res);
       
}

module.exports = {
	postAircraft
}