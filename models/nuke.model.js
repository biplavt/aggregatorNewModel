var db = require('../dbconnection'); //reference of dbconnection.js
function ObjToArray(obj) {
  var arr = obj instanceof Array;
  return (arr ? obj : Object.keys(obj)).map(function(i) {
    var val = arr ? i : obj[i];
    if(typeof val === 'object')
      return ObjToArray(val);
    else
      return val;
  });
}
var nuke = {
    stateTable: function (callback) {
        let sql = "TRUNCATE TABLE state_TB";
        return db.query(sql, callback)
    },
    aasfTable: function (callback) {
        let sql = "TRUNCATE TABLE AASF_TB";
        return db.query(sql, callback)
    },
    aircraftAvailable: function (callback) {
        let sql = "TRUNCATE TABLE aircraftAvailable_TB";
        return db.query(sql, callback)
    },
    aircraftType: function (callback) {
        let sql = "TRUNCATE TABLE aircraftType_TB";
        return db.query(sql, callback)
    },
    AASFAircraft: function (callback) {
        let sql = "TRUNCATE TABLE AASFAircraftData_TB";
        return db.query(sql, callback)
    },
    crewData: function (callback) {
        let sql = "TRUNCATE TABLE crewData_TB";
        return db.query(sql, callback)
    },
    AASFcrewData: function (callback) {
        let sql = "TRUNCATE TABLE AASFCrewData_TB";
        return db.query(sql, callback)
    },
    aftpData: function (callback) {
        let sql = "TRUNCATE TABLE AFTPData_TB";
        return db.query(sql, callback)
    },
    AASFaftpData: function (callback) {
        let sql = "TRUNCATE TABLE AASFAFTP_TB";
        return db.query(sql, callback)
    },
    
}
module.exports = nuke;