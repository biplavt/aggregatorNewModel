var express = require('express');
var router = express.Router();
var aircraft = require('../models/aircraft.model');
router.post('/', function (req, res, next) {
    aircraft.upsertAircraft(req.body, function (err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(count.insertId); //or return count for 1 &amp;amp;amp; 0
        }
    }); 
});

module.exports = router;