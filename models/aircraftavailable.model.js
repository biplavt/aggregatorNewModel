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
var aircraft = {
    insertAircraftAvailable: function (aircraft, callback) {
        aircraft.aircraftData_TB.pop();
        let insertValues = ObjToArray(aircraft.aircraftData_TB);
        var sql = "INSERT INTO aircraftAvailable_TB (total, date, down, category, up) VALUES ?";
        return db.query(sql, insertValues, callback)
    },
    insertJoin: function (siteID, aircraftDataID, newcallback) {
        let joininsertValues = [[aircraftDataID, siteID]];
        var joinsql = "INSERT INTO AASFAircraftData_TB (aircraftDataID, siteID) VALUES ?";
        return db.query(joinsql, [joininsertValues], newcallback)
    }
}
module.exports = aircraft;