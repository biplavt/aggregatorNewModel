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

var AASF = {
  upsertAASFAndState: function (AASF, callback) {
    var insertValues = ObjToArray(AASF.AASF_TB);
    var valueData = AASF.AASF_TB[0];
    var siteID = valueData.siteID;
    var stateData = valueData.locState;
    var sql = "INSERT INTO AASF_TB (locState,lng,locZip,locPocPhone,siteID,calendarID,clientID,locationName,locCity,locStreet,timezone,calendarAPIKey,lat,locPocEmail) VALUES ?" +
    " ON DUPLICATE KEY UPDATE ?"
    var updateSql = {"locState":valueData.locState, "lng":valueData.lng, "locZip":valueData.locZip, "locPOCphone":valueData.locPOCphone, "siteID":valueData.siteID, "clientID":valueData.clientID, "calendarID":valueData.calendarID, "locationName":valueData.locationName, "locCity":valueData.locCity, "locStreet":valueData.locStreet, "timezone":valueData.timezone, "calendarAPIKey":valueData.calendarAPIKey, "lat":valueData.lat, "locPOCEmail":valueData.locPOCEmail}
          var upsertState = function (state, newCallback){
              var insertStateValues = [[stateData,siteID]];
              var updatedState = {"stateName":stateData, "siteID":siteID}
              var insertedSQL = 
              "SET @update_id := 0;"+
              "INSERT INTO state_TB (stateName, siteID) VALUES ?" +
              " ON DUPLICATE KEY UPDATE ?"
              return db.query(insertedSQL,[insertStateValues, updatedState], newCallback)
          }
        upsertState(stateData, function (err, item) {
        })
      return db.query(sql, [insertValues, updateSql] , callback);
    },
   getAASFs: function (callback) {
      console.log(AASF);
      return callback;
   },
};
module.exports = AASF;