var express = require('express');
var router = express.Router();
var AASF = require('../models/aasf.model');

router.get('/:id?', function (req, res, next) {
    if (req.params.id) {y
        AASF.getAASFById(req.params.id, function (err, rows) {

            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } else {
       
        AASF.getAllAASF(function (err, rows) {

            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }

        });
    }
});
router.post('/', function (req, res, next) {
    AASF.upsertAASFAndState(req.body, function (err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(count.insertId); //or return count for 1 &amp;amp;amp; 0
        }
    }); 
       
   
});

module.exports = router;