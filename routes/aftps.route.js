var express = require('express');
var router = express.Router();
var aftps = require('../models/aftps.model');
router.post('/', function (req, res, next) {
    let siteID
    console.log(req.body)
    req.body.AFTPData_TB.forEach(element => {
        if (element['siteID']){
             siteID = element['siteID']
        }
    });
    aftps.insertAftps(req.body, function (err, count) {
        if (err) {
            res.json(err);
        } else {
            aftps.insertJoin(siteID, count.insertId, function (err, extra) {
                if (err) {
                    res.json(err);
                } else {
                    console.log('worked')
                    res.json(extra); //or return count for 1 &amp;amp;amp; 0
                }
            })
        }
    }); 
})
router.get('/', function (req, res, next) {
    console.log(req)
})

module.exports = router;