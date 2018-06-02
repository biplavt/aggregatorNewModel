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

var aftps = {
  insertAftps: function (aftps, callback) {
    aftps.AFTPData_TB.pop(); //removes siteID
      let insertValues = ObjToArray(aftps.AFTPData_TB);
      var sql = "INSERT INTO `AFTPData_TB` (date,aftpLoggedNumber,aftpTimeliness,aftpUnPaidCost,aftpUnPaidNumber,aftpTotalPaidCost,aftpTotalPaidNumber,aftpLoggedCost,aftpUnCertifiedCost,aftpUnCertifiedNumber) VALUES ?";
      return db.query(sql, [insertValues], callback)
  },
  insertJoin: function (siteID, aftpDataID, newcallback) {
      let joininsertValues = [[aftpDataID, siteID]];
      var joinsql = "INSERT INTO `AASFAFTP_TB` (aftpDataID, siteID) VALUES ?";
      return db.query(joinsql, [joininsertValues], newcallback)
  }
}
module.exports = aftps;

       