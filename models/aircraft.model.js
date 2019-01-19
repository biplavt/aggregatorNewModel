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
    upsertAircraft: function (aircraft, callback) {
        // statements above, calling below
        removeAircraftTypeBySiteID = function (siteID, removeCallback) {
            return db.query("DELETE FROM aircraftType_TB WHERE siteID=?", siteID,removeCallback)
        }
        insertACTypes = function (tempSiteID, tempAircraft, created, insertCallBack) {  
            var post = {'siteID':tempSiteID, 'aircraftType':tempAircraft, 'date':created}
            return db.query('INSERT INTO aircraftType_TB SET ?', post, insertCallBack);  
        }
         //    calling
        if (typeof aircraft.aircraftType_TB[0].siteID !== 'undefined' || aircraft.aircraftType_TB[0].siteID === null) {
              let newSiteID = aircraft.aircraftType_TB[0].siteID;
              let insertValues = ObjToArray(aircraft.aircraftType_TB);
              let created = new Date();
              // Remove all aircraft
              removeAircraftTypeBySiteID(newSiteID, function (err, result, fields) {
                    if(result && (result.affectedRows !== undefined && result.affectedRows !== null)) { 
                        insertValues.forEach(valueData => {
                        let tempSiteID = valueData[1];
                        let tempAircraft = valueData[0];
                            //  Insert all aircraft
                            insertACTypes(tempSiteID, tempAircraft, created, function (err, result, fields) {
                                callback(fields, 0);
                                return result;
                            })
                        })
                    }
              })
              
        
        }
       
    }
}
module.exports = aircraft;