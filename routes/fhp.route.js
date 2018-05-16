var express = require('express');
var router = express.Router();
var fhpModel = require('../models/fhp.model');

router.get('/:id?', function (req, res, next) {
    if (req.params.id) {y
        fhpModel.getAASFById(req.params.id, function (err, rows) {

            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } else {
       
        fhpModel.getAllAASF(function (err, rows) {

            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }

        });
    }
});
router.post('/', function (req, res, next) {
    fhpModel.upsertAASFAndState(req.body, function (err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(count.insertId); //or return count for 1 &amp;amp;amp; 0
        }
    }); 
       
   
});
// router.delete('/:id', function (req, res, next) {

//     AASF.deleteAASF(req.params.id, function (err, count) {

//         if (err) {
//             res.json(err);
//         } else {
//             res.json(count);
//         }

//     });
// });
// router.put('/:id', function (req, res, next) {

//     AASF.updateAASF(req.params.id, req.body, function (err, rows) {

//         if (err) {
//             res.json(err);
//         } else {
//             res.json(rows);
//         }
//     });
// });
module.exports = router;