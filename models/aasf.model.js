var db = require('../dbconnection'); //reference of dbconnection.js



var upsertState = function (state,siteID ){
  var insertStateValues = [[state,siteID]];
  var updatedState = {"stateName":state, "siteID":siteID}
  console.log('updatedState:',updatedState);
  var insertedSQL = 
    "SET @update_id := 0;"+
    "INSERT INTO state_TB (stateName, siteID) VALUES ?" +
    " ON DUPLICATE KEY UPDATE ?"
  console.log('[insertStateValues, updatedState]',[insertStateValues, updatedState]);
  return db.query(insertedSQL,[insertStateValues, updatedState] )
 
}

function upsertAASFAndState(AASFValueArray, AASFObj) {

    var siteID = AASFObj.siteID;
    var stateData = AASFObj.locState;
    console.log('stateData:',stateData);

    var sql = "INSERT INTO AASF_TB (locState,lng,locZip,locPocPhone,siteID,calendarID,clientID,"+
      "locationName,locCity,locStreet,timezone,calendarAPIKey,lat,locPocEmail) VALUES ?" +
      " ON DUPLICATE KEY UPDATE ?";

    var updateSql = {
      "locState":AASFObj.locState, "lng":AASFObj.lng,
      "locZip":AASFObj.locZip, "locPOCphone":AASFObj.locPOCphone,
      "siteID":AASFObj.siteID, "clientID":AASFObj.clientID,
      "calendarID":AASFObj.calendarID, "locationName":AASFObj.locationName,
      "locCity":AASFObj.locCity, "locStreet":AASFObj.locStreet,
      "timezone":AASFObj.timezone, "calendarAPIKey":AASFObj.calendarAPIKey,
      "lat":AASFObj.lat, "locPOCEmail":AASFObj.locPOCEmail
    } 

    return new Promise((resolve,reject)=>{
      upsertState(stateData,siteID);
      resolve(db.query(sql, [AASFValueArray, updateSql]));
    })
    
}
  
function getAASFs() {
    var q='SELECT * FROM ac_TB;';
    return new Promise(function(resolve,reject){
      db.query(q, function (error, results, fields) {
        if (error) reject(error);
        resolve (results);
      });
    })   
}

module.exports = {
  upsertAASFAndState,
  getAASFs
};