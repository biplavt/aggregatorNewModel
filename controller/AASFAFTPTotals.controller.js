var express = require('express');
var router = express.Router();
var AASFAFTPTotals = require('../models/AASFAFTPTotals.model');


function postAASFTotals(req,res) {
    if (req.body.AASFAFTPTotalsByUser_TB != ''){
        AASFAFTPTotals.AFTPUpsert( req.body.AASFAFTPTotalsByUser_TB, function (aftps, count) {
            if (count) {
            } else {
                res.json('done'); //or return count for 1 &amp;amp;amp; 0
            }
        }); 
    } else {
        // console.log(res.json('done: no items added'));
    }
};

module.exports = {
    postAASFTotals
}

