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
var missions = {
  upsertMissions: function (mission, callback) {
        upsertFunction = function (mission, insertCallBack) {  
            var insertValues = ObjToArray(mission);
            var valueData = mission;
            var sql = "SET @update_id := 0;"+
                "INSERT INTO mission_TB (date, flightEventID, flightApprovedBy, flightEventEstHours, flightEventStart, category,flightEventEnd,flightMissionNumber,aggMissionNumber,flightEventTitle,flightEventText,flightApproved) VALUES ?" +
                "ON DUPLICATE KEY UPDATE ?"
            var updateSql = { "date":valueData.date, "flightEventID":valueData.flightEventID, "flightApprovedBy":valueData.flightApprovedBy, "flightEventEstHours":valueData.flightEventEstHours, "flightEventStart":valueData.flightEventStart, "category":valueData.category, "flightEventEnd":valueData.flightEventEnd, "flightMissionNumber":valueData.flightMissionNumber, "flightEventTitle":valueData.flightEventTitle, "flightEventText":valueData.flightEventText, "flightApproved":valueData.flightApprove}
          return db.query(sql, [[insertValues], updateSql], insertCallBack);
        }
        insertAASFMission = function (missionID, siteID, AASFMissionCallBAck) {  
            var insertValues = [missionID, siteID];
            var sql = "SET @update_id := 0;"+
            "INSERT INTO AASFMission_TB (missionID, siteID) VALUES ?" +
            "ON DUPLICATE KEY UPDATE ?"
            var updateSql = {'missionID':missionID, 'siteID':siteID}
          return db.query(sql, [[insertValues], updateSql], AASFMissionCallBAck)
        }
        mission.forEach(element => {
          let siteID = element.aggMissionNumber.split("_").shift();
              upsertFunction(element, function (err, result, fields) {
                  for (var i = 0; i < result.length; i++) {
                      for (var OkPacket in result[i]) {
                          if(OkPacket == 'insertId'){
                            if (result[i][OkPacket] > 0) {
                              insertAASFMission(result[i][OkPacket], siteID, function (error, insertResult) {
                              })
                            }
                          }
                      } 
                  } 
                  return result;
                })
                callback(callback);
          })
   }
};
module.exports = missions;