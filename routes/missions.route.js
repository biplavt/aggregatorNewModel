var express = require('express');
var router = express.Router();
var missions = require('../models/missions.model');
router.post('/', function (req, res, next) {
    
    if (req.body.mission_TB != ''){
       
        missions.upsertMissions( req.body.mission_TB, function (err, count) {
            if (err) {
                res.json(err);
            } else {
                res.json(count); //or return count for 1 &amp;amp;amp; 0
            }
        }); 

    } else {
        console.log(res.json('done: no items added'));
    }
})

module.exports = router;