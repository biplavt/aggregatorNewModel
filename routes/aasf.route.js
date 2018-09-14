var express = require('express');
var router = express.Router();
var AASF = require('../models/aasf.model');
router.post('/', function (req, res, next) {
    
    AASF.upsertAASFAndState(req.body, function (err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(count.insertId); //or return count for 1 &amp;amp;amp; 0
        }
    }); 
    
}),
router.get('/', function (req, res, next) {
    console.log('yippie');
    //var q='SELECT * FROM AASF_TB;';
    var q='SELECT * FROM ac_TB;';
    db.query(q, function (error, results, fields) {
        if (error) throw error;
            console.log(results[0].AASFID);
            console.log(results);
    });
    //console.log( db.query('SELECT * FROM AASF_TB;'));
    // return db.query('INSERT INTO aircraftType_TB SET ?', post, insertCallBack);  

    
    console.log('activated');
    
    AASF.getAASFs(function (err, count) {
        console.log('yippie');
        
    });
    

})
module.exports = router;