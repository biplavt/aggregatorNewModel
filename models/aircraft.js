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


  addAircraft: function (aircraft, callback) {
  var responseJson = ObjToArray(aircraft.tasks);
  var sql = "INSERT INTO aircraft (tailNumber, status) VALUES ?";
    return db.query(sql, [responseJson], callback);
  },
 
  

};
module.exports = Task;