var express = require('express');
var router = express.Router();
var crews = require('../models/crews.model');
router.post('/', function (req, res, next) {
    let siteID
    req.body.crewData_TB.forEach(element => {
        if (element['siteID']){
             siteID = element['siteID']
        }
    });
    crews.insertCrewsAvailable(req.body, function (err, count) {
        // let siteID = req.body
        if (err) {
            res.json(err);
            if (err.code === 'ETIMEDOUT') {
                console.log('My  error: ', util.inspect(err, { showHidden: true, depth: 2 }));
            }
        } else {
            crews.insertJoin(siteID, count.insertId, function (err, extra) {
                if (err) {
                    res.json(err);
                } else {
                    console.log('worked')
                    res.json(extra); //or return count for 1 &amp;amp;amp; 0
                }
            })
        }
    }); 
});

module.exports = router;