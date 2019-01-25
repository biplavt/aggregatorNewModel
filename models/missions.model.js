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

upsertFunction = function (mission) {  
          // because the insert is an array, order maters, so alphabetisize  
      var alphabeticalOrder = Object.keys(mission).sort().reduce((accumulator, currentValue) => {
          accumulator[currentValue] = mission[currentValue];
          return accumulator;
      }, {});
      

      var insertValues = ObjToArray(alphabeticalOrder); 

      // console.log('insertValues:',insertValues);


      var valueData = mission;
      var sql = "SET @update_id := 0;"+
                "INSERT INTO mission_TB (aggMissionNumber,canceledWhy,category,date,flightApproved,flightApprovedBy,"+
                "flightEventEnd,flightEventEstHours,flightEventID,flightEventStart,flightEventText,flightEventTitle,"+
                "flightMissionNumber,tailnumber) VALUES ?" +
                "ON DUPLICATE KEY UPDATE ?"
            var updateSql = { "date":valueData.date, 
            "flightEventID":valueData.flightEventID, "flightApprovedBy":valueData.flightApprovedBy, 
            "flightEventEstHours":valueData.flightEventEstHours, "flightEventStart":valueData.flightEventStart, 
            "category":valueData.category, "flightEventEnd":valueData.flightEventEnd, 
            "flightMissionNumber":valueData.flightMissionNumber, "flightEventTitle":valueData.flightEventTitle, 
            "flightEventText":valueData.flightEventText, "flightApproved":valueData.flightApprove, 
            "tailnumber":valueData.tailnumber, "canceledWhy":valueData.canceledWhy}
      
      // console.log('all values:',[[insertValues],updateSql]);

      return new Promise(function(resolve,reject){
        db.query(sql, [[insertValues], updateSql], function(err,result,field){
          if(err){
          reject (err);
        }else{
          // console.log(result);
          resolve(result);
        }
        });
      })
    }

insertAASFMission = function (missionID, siteID ) {  
            var insertValues = [missionID, siteID];
            var sql = "SET @update_id := 0;"+
            "INSERT INTO AASFMission_TB (missionID, siteID) VALUES ?" +
            "ON DUPLICATE KEY UPDATE ?"
            var updateSql = {'missionID':missionID, 'siteID':siteID}

            return new Promise(function(resolve,reject){
              db.query(sql, [[insertValues], updateSql],function(error,insertResult){
                if(err){
                  reject(err)
                }else{
                  // console.log('insertResult',insertResult)
                  resolve(insertResult);
                }
              })
            })
        }


var postMissions = function (req,res){
    if(req.body.mission_TB!=" "){    
        
      req.body.mission_TB.forEach(element => {
          // loop over each mission then insert it above in upsertFunction
            let siteID = element.aggMissionNumber.split("_").shift();

            upsertFunction(element).then(function(result){
        
              for (var i = 0; i < result.length; i++) {
        
                    for (var OkPacket in result[i]) {
        
                        if(OkPacket == 'insertId'){
        
                          if (result[i][OkPacket] > 0) {
        
                            insertAASFMission(result[i][OkPacket], siteID).then((result)=>{
                              // console.log('result:',result);
                            },function(error){
                              
                            })         
                            
                          }
                        }
                    } 
                } 

            }).catch((err)=>{
              console.log(err);
            })
        })
    }
    res.send('done');
}

module.exports = {postMissions};