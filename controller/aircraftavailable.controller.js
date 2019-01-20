var express = require('express');
var router = express.Router();
var aircraft = require('../models/aircraftavailable.model');


function postAircraftData(req,res) {
    let siteID;
    // console.log('hi');
    req.body.aircraftData_TB.forEach(element => {
        if (element['siteID']){
             siteID = element['siteID']
        }
    });
    
    aircraft.insertAircraftAvailable(req.body, function (err, count) {
        // let siteID = req.body
        if (err) {
            res.json(err);
            
        } else {
            aircraft.insertJoin(siteID,count.insertId, function (err, extra) {
                if (err) {
                    res.json(err);
                } else {
                    console.log('worked')
                    res.json(extra); //or return count for 1 &amp;amp;amp; 0
                }
            })
        }
    }); 
};

module.exports = {
    postAircraftData
}