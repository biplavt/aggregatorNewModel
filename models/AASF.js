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

  getAllAASF: function (callback) {
    return db.query("Select * from AASF_TB", callback);
  },
  
  getAASFByLocation: function (location, locState, callback) {
    return db.query("select * from AASF_TB where locationName=? AND  locState=? ", [location, locState], callback);
  },
  
  getAASFBySiteId: function (id, callback) {
    return db.query("select * from AASF_TB where siteID=?", [id], callback);
  },

  upsertAASFAndState: function (AASF, callback) {
    var insertValues = ObjToArray(AASF.AASF_TB);
    var valueData = AASF.AASF_TB[0];
    var state = {stateName:valueData.locState}
    
    
    var sql = "INSERT INTO AASF_TB (locState,lng,locZip,locPocPhone,siteID,calendarID,clientID,locationName,locCity,locStreet,timezone,calendarAPIKey,lat,locPocEmail) VALUES ?" +
    " ON DUPLICATE KEY UPDATE ?"
  
    
    // db.query("SELECT LAST_INSERT_ID()"



    // SET @update_id := 0;
    // UPDATE some_table SET column_name = 'value', id = (SELECT @update_id := id)
    // WHERE some_other_column = 'blah' LIMIT 1; 
    // SELECT @update_id;

    // If a table contains an AUTO_INCREMENT column and INSERT ... 
    // UPDATE inserts a row, the LAST_INSERT_ID() function returns the AUTO_INCREMENT value.
    //  If the statement updates a row instead, LAST_INSERT_ID() is not meaningful. 
    // However, you can work around this by using LAST_INSERT_ID(expr). Suppose that id is the AUTO_INCREMENT column. To make LAST_INSERT_ID() meaningful for updates, insert rows as follows:




    var updateSql = {"locState":valueData.locState, "lng":valueData.lng, "locZip":valueData.locZip, "locPOCphone":valueData.locPOCphone, "siteID":valueData.siteID, "clientID":valueData.clientID, "calendarID":valueData.calendarID, "locationName":valueData.locationName, "locCity":valueData.locCity, "locStreet":valueData.locStreet, "timezone":valueData.timezone, "calendarAPIKey":valueData.calendarAPIKey, "lat":valueData.lat, "locPOCEmail":valueData.locPOCEmail}
   
       var upsertState = function (state, newCallback){
          var updatedState = {"stateName":state}
          var insertedSQL = 
           "SET @update_id := 0;"+
           "INSERT INTO state_tb SET ?" +
           " ON DUPLICATE KEY UPDATE ?"
          return db.query(insertedSQL,[{stateName:state}, updatedState], newCallback)
        }

        upsertState(valueData.locState, function (err, item) {
          console.log(item);
        })


    return db.query(sql, [insertValues, updateSql] , callback);
  },

  // upsertState: function (AASF, callback) {
  //   var insertValues = ObjToArray(AASF.AASF_TB);
  //   var valueData = AASF.AASF_TB[0];
  //   console.log(valueData);
  //   var sql = "INSERT INTO state_tb (stateName) VALUES ?" +
  //   " ON DUPLICATE KEY UPDATE ?"

  //   var updateSql = {"stateName":valueData.locState}
      
  //   return db.query(sql, [valueData.locState, updateSql] , callback);
  // },


  deleteAASF: function (id, callback) {
    return db.query("delete from AASF_TB where AASFID=?", [id], callback);
  },

  updateAASF: function (siteID, AASF, callback) {
    console.log(siteID);
    // console.log(AASF);
    // return db.query("update AASF_TB Title=?,Status=? where Id=?", [Task.Title, Task.Status, id], callback);
    
    

    return db.query("update AASF_TB locState=?,lng=?,locZip=?,locPocPhone=?,siteID=?,calendarID=?,clientID=?,locationName=?,locCity=?,locStreet=?,timezone=?,calendarAPIKey=?,lat=?,locPocEmail=? where siteID=?", [AASF.locState, AASF.lng, AASF.locZip, AASF.locPocPhone, AASF.siteID, AASF.calendarID, AASF.clientID, AASF.locationName, AASF.locCity, AASF.locStreet, AASF.timezone, AASF.calendarAPIKey, AASF.lat, AASF.locPocEmail, siteID], callback);
  }

};
module.exports = AASF;