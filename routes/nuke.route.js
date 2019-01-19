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
        }
    }); 
    nuke.crewData(function (err, count) {
        if (err) {
            res.json(err);
        } else {
            console.log('Nuked crewData_TB')
        }
    });
    nuke.AASFcrewData(function (err, count) {
        if (err) {
            res.json(err);
        } else {
            console.log('Nuked AASFcrewData')
        }
    }); 
    nuke.aftpData(function (err, count) {
        if (err) {
            res.json(err);
        } else {
            console.log('Nuked AFTPData_TB')
        }
    });
    nuke.AASFaftpData(function (err, count) {
        if (err) {
            res.json(err);
        } else {
            console.log('Nuked AASFAFTP_TB')
        }
    });   
    nuke.missionData(function (err, count) {
        if (err) {
            res.json(err);
        } else {
            console.log('Nuked missionData')
        }
    });
    nuke.AASFmissionData(function (err, count) {
        if (err) {
            res.json(err);
        } else {
            console.log('Nuked AASFmissionData')
        }
    });  
    nuke.aircratDetailData(function (err, count) {
        if (err) {
            res.json(err);
        } else {
            console.log('Nuked aircratDetailData')
        }
    });
    nuke.AASFAFTPTotalsByUserData(function (err, count) {
        if (err) {
            res.json(err);
        } else {
            console.log('Nuked AASFAFTPTotalsByUserData')
        }
    });
    nuke.AASFaircratDetailData(function (err, count) {
        if (err) {
            res.json(err);
        } else {
            console.log('Nuked AASFaircratDetailData')
            res.json('done'); //or return count for 1 &amp;amp;amp; 0
        }
    });   
});

module.exports = router;