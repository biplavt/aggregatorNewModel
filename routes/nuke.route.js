var express = require('express');
var router = express.Router();
var nuke = require('../models/nuke.model');
router.post('/', function (req, res, next) {
    nuke.stateTable(function (err, count) {
        if (err) {
            res.json(err);
        } else {
            console.log('Nuked StateTB')
        }
    }); 
    nuke.aasfTable(function (err, count) {
        if (err) {
            res.json(err);
        } else {
            console.log('Nuked aasfTable')
        }
    }); 
    nuke.aircraftAvailable(function (err, count) {
        if (err) {
            res.json(err);
        } else {
            console.log('Nuked aircraftAvailable TB')
        }
    }); 
    nuke.aircraftType(function (err, count) {
        if (err) {
            res.json(err);
        } else {
            console.log('Nuked aircraftType TB')
        }
    }); 
    nuke.AASFAircraft(function (err, count) {
        if (err) {
            res.json(err);
        } else {
            console.log('Nuked AASFAircraft TB')
            res.json('done'); //or return count for 1 &amp;amp;amp; 0
        }
    }); 
});

module.exports = router;
