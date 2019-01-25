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

var insertAftpsPromise =function(aftps){
  aftps.AFTPData_TB.pop(); //removes siteID
  let insertValues = ObjToArray(aftps.AFTPData_TB);
  var sql = "INSERT INTO `AFTPData_TB` (date,aftpLoggedNumber,aftpTimeliness,aftpUnPaidCost,aftpUnPaidNumber,aftpTotalPaidCost,aftpTotalPaidNumber,aftpLoggedCost,aftpUnCertifiedCost,aftpUnCertifiedNumber) VALUES ?";
  
  return new Promise(function(resolve,reject){
    db.query(sql, [insertValues], function(err,count){
      if(err)
        reject(err);
      else{
        // console.log('insertAFTP Promise:',count);
        resolve(count);
      }
    })
  })
}


var insertJoinPromise= function(siteID,aftpDataID){
  let joininsertValues = [[aftpDataID, siteID]];
  var joinsql = "INSERT INTO `AASFAFTP_TB` (aftpDataID, siteID) VALUES ?";
  return new Promise(function(resolve,reject){
    db.query(joinsql, [joininsertValues],function(err,result){
      if(err){
        reject(err);
      }else{
        resolve(result);
      }

    })
  })
}
   

var postAftps = function(req,res){
    let siteID;
    console.log(req.body)
    req.body.AFTPData_TB.forEach(element => {
        if (element['siteID']){
             siteID = element['siteID']
        }
    });

    insertAftpsPromise(req.body).then((result)=>{
      // console.log('result*:',result);
      return result;
    }).then(function(result){
      insertJoinPromise(siteID,result.insertId).then((result)=>{
        console.log('worked');
        res.json(result);
      })
    }).catch(err =>  res.send(err))
  
  
}
module.exports = {postAftps};

       