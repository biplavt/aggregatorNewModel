var express = require('express');
var router = express.Router();
var ac = require('../models/aircraftdetail.model');
router.post('/', function (req, res, next) {
    let siteID = req.body.siteID
    ac.aircraftDetail(req.body.ac_TB, function (err, result) {
        if (err) {
            // res.json(err);
            console.log(err)
        } else {
            for (var OkPacket in result) {
                if(OkPacket == 'insertId'){
                    if (result[OkPacket] > 0) {
                        // console.log(result[OkPacket]);
                            ac.insertJoin(siteID, result[OkPacket], function (err, extra) {
                                if (err) {
                                    // res.json(err);
                                    console(err);
                                } else {
                                    console.log('worked')
                                    // res.json(extra); //or return count for 1 &amp;amp;amp; 0
                                }
                            })
                    // insertAASFMission(result[i][OkPacket], siteID, function (error, insertResult) {
                    // })
                  }
                }
            } 
            // let newIDs = Array(count.affectedRows).fill(count.insertId).map((x, y) => x + y);
            //  console.log(newIDs);
            
           
        }
    }); 
});

module.exports = router;