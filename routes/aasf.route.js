var express = require('express');
var router = express.Router();
var AASF = require('../models/aasf.model');
var sd = 'wow';
router.post('/', function (req, res, next) {
    AASF.upsertAASFAndState(req.body, function (err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(count.insertId); //or return count for 1 &amp;amp;amp; 0
        }
    }); 
})

module.exports = router;