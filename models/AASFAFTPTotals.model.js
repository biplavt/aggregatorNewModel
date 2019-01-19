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
var AASFAFTPTotal = {
  AFTPUpsert: function (aftps, callback) {
      upsertFunction = function (aftps, insertCallBack) {  
            let alphabeticalOrder = Object.keys(aftps).sort().reduce((accumulator, currentValue) => {
              accumulator[currentValue] = aftps[currentValue];
              return accumulator;
            }, {});
            var insertValues = ObjToArray(alphabeticalOrder); 
            var valueData = aftps;
            var sql = "SET @update_id := 0;"+
              "INSERT INTO AASFAFTPTotalsByUser_TB (aftpflighttime,banktime,fly,fname,fy,lname,nofly,siteid,totalcertifiedaftps,totalpaidaftps, uniqueid) VALUES ?" +
              "ON DUPLICATE KEY UPDATE ?"
            var updateSql = {"aftpflighttime":valueData.aftpflighttime, "banktime":valueData.banktime, "uniqueid":valueData.uniqueid, "fly":valueData.fly, "fname":valueData.fname, "fy":valueData.fy, "lname":valueData.lname, "nofly":valueData.nofly, "siteid":valueData.siteid, "totalcertifiedaftps":valueData.totalcertifiedaftps, "totalpaidaftps":valueData.totalpaidaftps}
        return db.query(sql, [[insertValues], updateSql], insertCallBack);
      }
     aftps.forEach(element => {
    // loop over each aftps then insert it above in upsertFunction
            upsertFunction(element, function (err, result) {
              return result;
            })
      })
        callback(callback);
  },
}
module.exports = AASFAFTPTotal;

   