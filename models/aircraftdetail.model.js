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
    ac.forEach(element => {
      let insertValues = ObjToArray(element);
      // console.log(insertValues);
        var sql = "INSERT INTO ac_TB (migDate,workOrder,remarksUpdatedBy,pmd_hours,remarks,MCRate,uic,status,phase_due,ei_sn, ei_model,remarksUpdatedLast, coloroverride) VALUES ?";
        return db.query(sql, [[insertValues]], callback)
    });
  },
  insertJoin: function (siteID, acID, newcallback) {
    console.log(siteID);
    console.log(acID);
      let joininsertValues = [acID, siteID];
      var joinsql = "INSERT INTO AASFac_TB (acID, siteID) VALUES ?";
      return db.query(joinsql, [[joininsertValues]], newcallback)
  }
}
module.exports = ac;

