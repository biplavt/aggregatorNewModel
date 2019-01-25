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

removeFunctionPromise=function(siteID){

  // console.log('siteId remove:',siteID);
  return new Promise(function(resolve,reject){

    db.query("DELETE FROM aircraftType_TB WHERE siteID=?", siteID, function(err,rows,fields){

      if(err){

        return reject(err);

    }

    // console.log('fields remove:',fields);

    // console.log('inside remove function: rows/results:', rows);
   
    resolve(rows);

    })

  })

}

insertACPromise = function (tempSiteID, tempAircraft, created) {  

    var post = {'siteID':tempSiteID, 'aircraftType':tempAircraft, 'date':created}

    return new Promise((resolve, reject)=>{
    
        db.query('INSERT INTO aircraftType_TB SET ?', post, function(err,rows,fields){

            if(err){

                return reject(err);

            }


            // console.log('inside insert function: rows/results:', rows);
            // console.log('inside insert function: fields:', fields);

            resolve({rows,fields});

        })    
    })
}




var postGivenAircraft = function(req,res){

  var aircraft= req.body;

  if (typeof aircraft.aircraftType_TB[0].siteID !== 'undefined' || aircraft.aircraftType_TB[0].siteID === null) {
    
    let newSiteID = aircraft.aircraftType_TB[0].siteID;
    let insertValues = ObjToArray(aircraft.aircraftType_TB);
    let created = new Date();

    removeFunctionPromise(newSiteID).then((result)=>{

      if (result && (result.affectedRows !== undefined && result.affectedRows !== null)) {
          
          insertValues.forEach(valueData => {

              let tempSiteID = valueData[1];
              let tempAircraft = valueData[0];
              
              insertACPromise(tempSiteID, tempAircraft,created).then((result)=>{

                // res.send(result);
                  
              },(err)=>{
              
                res.json(err);
              
              })
          })
      }
    })
  }
  res.send("Done");

}
module.exports = {
  postGivenAircraft
};