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

var ac = {

  
  aircraftDetail: function (ac, callback) {
    let insertValues = ObjToArray(ac);
    console.log(insertValues);
      var sql = "INSERT INTO `ac_TB` (migDate,workOrder,remarksUpdatedBy,pmd_hours,remarks,MCRate,uic,status,phase_due,ei_sn, ei_model,remarksUpdatedLast, coloroverride) VALUES ?";
      return db.query(sql, [insertValues], callback)
  },
  insertJoin: function (siteID, aftpDataID, newcallback) {
      // let joininsertValues = [[aftpDataID, siteID]];
      // var joinsql = "INSERT INTO `AASFAFTP_TB` (aftpDataID, siteID) VALUES ?";
      // return db.query(joinsql, [joininsertValues], newcallback)
  }
}
module.exports = ac;

