var express = require('express');
var router = express.Router();
var AASF = require('../models/AASF');

router.get('/:id?', function (req, res, next) {
    // getAASFByLocation
    console.log(req.params)
   
    if (req.params.id) {
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
    // var data = JSON.parse(AASF);
    AASF.addAASF(req.body, function (err, count) {
        // console.log(req.body);
        if (err) {
            res.json(err);
        } else {
            // console.log(count.insertId);
            res.json(count.insertId); //or return count for 1 &amp;amp;amp; 0
            
        }
    });
});
router.delete('/:id', function (req, res, next) {

    AASF.deleteAASF(req.params.id, function (err, count) {

        if (err) {
            res.json(err);
        } else {
            res.json(count);
        }

    });
});
router.put('/:id', function (req, res, next) {

    AASF.updateAASF(req.params.id, req.body, function (err, rows) {

        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});
module.exports = router;