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
            if (err.code === 'ETIMEDOUT') {
                console.log('My dish error: ', util.inspect(err, { showHidden: true, depth: 2 }));
            }
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
});

module.exports = router;