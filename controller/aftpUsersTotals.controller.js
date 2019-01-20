var express = require('express');
var router = express.Router();
var aftpUsersTotals = require('../models/aftpUsersTotals.model');
var db = require('../dbconnection'); //reference of dbconnection.js



router.post('/', function (req, res, next) {
        
    let siteID
        req.body.forEach(element => {
            // if (element['siteID']){
            //     siteID = element['siteID']
            // }
           
            console.log(element['siteID']);
        });
        // console.log(req.body.siteid);

    if (req.body != ''){
        aftpUsersTotals.upsertUserTotals( req.body, function (err, count) {
            if (err) {
                res.json(err);
            } else {
                // res.json(count); //or return count for 1 &amp;amp;amp; 0
                console.log(res.json('done'));
            }
        }); 

    } else {
        console.log(res.json('done: no items added'));
    }
}),
router.get('/', function (req, res, next) {
    console.log('yippieMission');
})

module.exports = router;