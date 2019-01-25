var express = require('express');
var router = express.Router();
var missionsModel = require('../models/missions.model');
var db = require('../dbconnection'); //reference of dbconnection.js
var moment=require('moment');


var calculateDays=function(timeGiven){
        var end=timeGiven;
        var now=moment(new Date());
        //console.log('now.year: ',now.year);
        //console.log('Current time: ',now);
        //console.log("matching timestamp: ",end);
        var duration=moment.duration(now.diff(end));
        var days=duration.asDays();
        console.log('days: ',days);
        return days;
}


function postMissions(req,res) {
    missionsModel.postMissions(req,res);
}

function getMissions(req,res) {
    console.log('yippieMission');
    //var q='SELECT * FROM AASF_TB;';
    var q='SELECT * FROM mission_TB;';
    db.query(q, function (error, results, fields) {
        if (error) throw error;
            //console.log(results[0].AASFID);
            //console.log(results);
            var tempMission=[];
            for(i=0;i<results.length;i++){
                console.log(i +"th Date: " + results[i].flightEventStart);
                var diffDays=calculateDays(results[i].flightEventStart);
                console.log("diff Days:",diffDays);
                if(diffDays<5 && diffDays>0)
                    tempMission.push(results[i]);
            }
           // var diffDays=calculateDays(results[0].flightEventStart);
            //console.log("Diff days:",diffDays);

           res.send(tempMission);
    });
    //console.log( db.query('SELECT * FROM AASF_TB;'));
    // return db.query('INSERT INTO aircraftType_TB SET ?', post, insertCallBack);
    console.log('yippieMission');   
}

module.exports = {
postMissions,
getMissions
}