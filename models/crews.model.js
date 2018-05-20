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

var crews = {
  insertCrewsAvailable: function (crews, callback) {
    crews.crewData_TB.pop(); //removes siteID
      let insertValues = ObjToArray(crews.crewData_TB);
      // insertValues = [].concat.apply([], insertValues);//removes outer []'s
      console.log(insertValues);
      var sql = "INSERT INTO crewData_TB (date, ce, mo, pc, category, pi, fe) VALUES ?";
      return db.query(sql, [insertValues], callback)
  },
  
  insertJoin: function (siteID, crewDataID, newcallback) {
      let joininsertValues = [[crewDataID, siteID]];
      var joinsql = "INSERT INTO `AASFCrewData_TB` (crewDataID, siteID) VALUES ?";
      return db.query(joinsql, [joininsertValues], newcallback)
  }
}
module.exports = crews;