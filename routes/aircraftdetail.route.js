var express = require('express');
var router = express.Router();
var ac = require('../models/aircraftdetail.model');
var db = require('../dbconnection'); //reference of dbconnection.js

router.post('/', function (req, res, next) {
    //console.log("req.body",req.body.ac_TB);
    //var tempObj=JSON.parse(req.body);
    // console.log("tempObj:",tempObj);
    let siteID = req.body.siteID;
    //console.log("siteID:",siteID);
    let arrayLength = req.body.ac_TB.length;
    //console.log("arrayLength:",arrayLength);
    let counter = 0;
    ac.aircraftDetail(req.body.ac_TB, function (err, result) { // insert ac detail data to Db
        if (err) {
            console.log(err)
        } else {
            //console.log('********************');
            //console.log("results:",result);
            //console.log("**************************");
            for (var OkPacket of Object.keys(result)) {
                //console.log('OkPacket:',OkPacket);
                    if(OkPacket == 'insertId'){
                        if (result[OkPacket] > 0) { // if ad detail insert went ok.
                            ac.insertJoin(siteID, result[OkPacket], function (err, extra) { // insert to join table
                                if (err) {
                                    console.log("$");
                                    console(err);
                                } else {
                                    console.log("*");
                                    console.log(extra);
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
            res.json('1done'); //or return count for 1 &amp;amp;amp; 0
        }
    }); 
}),
router.get('/',function(req,res,next){
    console.log("aircraft detail get!");
    var q='SELECT * FROM ac_TB;';
    db.query(q, function (error, results, fields) {
        if (error) throw error;
            var totalMCRate=0;
            var totalPMDhours=0;
            var totalPhaseDue=0;
            console.log(results);
            for(i=0;i<results.length;i++){
                //console.log('Results:',results[i].migDate);
                totalMCRate+=parseInt(results[i].MCRate);
                totalPMDhours+=parseInt(results[i].pmd_hours);
                totalPhaseDue+=parseInt(results[i].phase_due);
            }
            var avgMCRate=totalMCRate/results.length;
            var avgPMDHours=totalPMDhours/results.length;
            res.send({
                totalMCRate:totalMCRate,
                avgMCRate:avgMCRate,
                totalPMDhours:totalPMDhours,
                avgPMDHours:avgPMDHours,
                totalPhaseDue:totalPhaseDue
            })
            
    });
});


module.exports = router;