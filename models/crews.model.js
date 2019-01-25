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

function insertCrewsAvailable(crews){
      crews.crewData_TB.pop(); //removes siteID
      let insertValues = ObjToArray(crews.crewData_TB);
      console.log(insertValues);
      var sql = "INSERT INTO crewData_TB (date, ce, mo, pc, category, pi, fe) VALUES ?";
      return new Promise(function(resolve,reject){
        db.query(sql, [insertValues],function(err,count){
            if(err){
                reject(err);
                if (err.code === 'ETIMEDOUT') {
                console.log('My  error: ', util.inspect(err, { showHidden: true, depth: 2 }));
                }
            }else{
                resolve(count);
            }
        })
      })
}


function insertJoin (siteID, crewDataID, newcallback) {
    
    let joininsertValues = [[crewDataID, siteID]];
    var joinsql = "INSERT INTO `AASFCrewData_TB` (crewDataID, siteID) VALUES ?";
    return new Promise(function(resolve, reject){
        db.query(joinsql, [joininsertValues], function(err,count){
            if(err)
                reject(err);
            else{
                console.log('worked');
                resolve(count);
            }
        })

    })

}

var postCrews = function(req,res) {

    let siteID;
    req.body.crewData_TB.forEach(element => {
        if (element['siteID']){
             siteID = element['siteID']
        }
    });

      insertCrewsAvailable(req.body).then((result)=>{
        return result;
      }).then(function(result){
        insertJoin(siteID,result.insertId).then(function(result){
            console.log('worked');
            res.json(result);
        },(error)=>{
            res.json(err);
        })
      })
}
module.exports ={ postCrews}