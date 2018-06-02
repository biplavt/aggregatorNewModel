var express = require('express');
var router = express.Router();
var ac = require('../models/aircraftdetail.model');
router.post('/', function (req, res, next) {
    let siteID = req.body.siteID
    let arrayLength = req.body.ac_TB.length;
    let counter = 0
    ac.aircraftDetail(req.body.ac_TB, function (err, result) { // insert ac detail data to Db
        if (err) {
            console.log(err)
        } else {
            for (var OkPacket of Object.keys(result)) {
                    if(OkPacket == 'insertId'){
                        if (result[OkPacket] > 0) { // if ad detail insert went ok.
                            ac.insertJoin(siteID, result[OkPacket], function (err, extra) { // insert to join table
                                if (err) {
                                    console(err);
                                } else {
                                    console.log(extra)
                                    if (extra.session) {
                                        res.json({session: extra.session});
                                        // res.json('done'); //or return count for 1 &amp;amp;amp; 0
                                    }
                                }
                            })
                        }
                    }
            }
        }
        counter++   
        if(counter == arrayLength){
            res.json('done'); //or return count for 1 &amp;amp;amp; 0
        }
    }); 
});
module.exports = router;