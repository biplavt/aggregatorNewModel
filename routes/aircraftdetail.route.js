var express = require('express');
var router = express.Router();
var ac = require('../models/aircraftdetail.model');
router.post('/', function (req, res, next) {
    let siteID = req.body.siteID
    ac.aircraftDetail(req.body.ac_TB, function (err, count) {
        if (err) {
            res.json(err);
            // if (err.code === 'ETIMEDOUT') {
            //     console.log('My dish error: ', util.inspect(err, { showHidden: true, depth: 2 }));
            // }
        } else {
            console.log(count.insertId)
            // ac.insertJoin(siteID, count.insertId, function (err, extra) {
            //     if (err) {
            //         res.json(err);
            //     } else {
            //         console.log('worked')
            //         res.json(extra); //or return count for 1 &amp;amp;amp; 0
            //     }
            // })
        }
    }); 
});

module.exports = router;