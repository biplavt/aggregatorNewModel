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

var insertAircraftAvailable= function (aircraft) {
  
  aircraft.aircraftData_TB.pop(); //removes siteID
  let insertValues = ObjToArray(aircraft.aircraftData_TB);
  insertValues = [].concat.apply([], insertValues);//removes outer []'s
  
  return new Promise(function(resolve,reject){
  
    var sql = "INSERT INTO aircraftAvailable_TB (total, date, down, category, up) VALUES ?";
  
    db.query(sql, [insertValues], function(err,count){

      if(err)
      {
        reject(err);
      }
      resolve(count);
    })
  
  });

}

var insertJoin=function(siteID,aircraftDataID){
  
  let joininsertValues = [[aircraftDataID, siteID]];
  var joinsql = "INSERT INTO AASFAircraftData_TB (aircraftDataID, siteID) VALUES ?";
  
  return new Promise(function(resolve,reject){

    db.query(joinsql, [joininsertValues], function(err, count){
    
      if(err){
    
        reject(err);
    
      }
    
      console.log('worked');    
      resolve(count);
    
    })
  
  })     

}


var aircraft = function(req,res){

  let siteID;

  req.body.aircraftData_TB.forEach(element => {
      if (element['siteID']){
           siteID = element['siteID']
      }
  });

  insertAircraftAvailable(req.body).then(function(result){

    return result;

  }).then(function(result){

    insertJoin(siteID,result.insertId).then(function(result){
      console.log('worked');
      res.json(result);
    })

  }).catch(err =>  res.send(err));
}


module.exports = {
  aircraft
}
