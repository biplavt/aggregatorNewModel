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
  
  getAASFById: function (id, callback) {
    return db.query("select * from AASF_TB where AASFID=?", [id], callback);
  },

  addAASF: function (AASF, callback) {
  var sendData = ObjToArray(AASF.AASF_TB);
  console.log(sendData);
  var sql = "INSERT INTO AASF_TB (locState,lng,locZip,locPocPhone,siteID,calendarID,clientID,locationName,locCity,locStreet,timezone,calendarAPIKey,lat,locPocEmail) VALUES ?";
    return db.query(sql, [sendData], callback);
  },

  deleteAASF: function (id, callback) {
    return db.query("delete from AASF_TB where AASFID=?", [id], callback);
  },

  updateAASF: function (id, Task, callback) {
    return db.query("update AASF_TB Title=?,Status=? where Id=?", [Task.Title, Task.Status, id], callback);
  }

};
module.exports = AASF;
