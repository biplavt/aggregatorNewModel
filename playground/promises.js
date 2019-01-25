var db = require('./../dbconnection'); //reference of dbconnection.js

removeFunctionPromise=function(siteID){

  return new Promise(function(resolve,reject){

    db.query("DELETE FROM aircraftType_TB WHERE siteID=?", siteID,function(err,rows,fields){

      if(err){

        return reject(err);

    }

    console.log('fields remove:',fields);

    console.log('inside remove function: rows/results:', rows);
   
    resolve(rows);

    })

  })

}


insertACFunction=function(tempSiteID, tempAircraft, created){

    console.log('inside insertAC: result', result);
    // tempSiteID=result.newSiteID;
    // tempAircraft=result.tempAircraft;
    // created=result.created;
    var post = {'siteID':tempSiteID, 'aircraftType':tempAircraft, 'date':created}
    console.log('post:',post);
    return new Promise(function(resolve,reject){

        db.query('INSERT INTO aircraftType_TB SET ?', post, function(err,rows,fields){

            if(err){

                return reject(err);

            }

            console.log('inside insert function: rows/results:', rows);

            resolve(rows);

        })

    })

}

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


var aircraft={"aircraftType_TB":[{"aircraftType":"UH-60","siteID":"CAAASF3"},{"aircraftType":"UH-72A","siteID":"CAAASF3"},{"aircraftType":"HH-60","siteID":"CAAASF3"}]};
let insertValues = ObjToArray(aircraft.aircraftType_TB);
let created = new Date();



removeFunctionPromise('CAAAaaSF3').then((result)=>{

    console.log('result *',result);

    if (result && (result.affectedRows !== undefined && result.affectedRows !== null)) {
        
        insertValues.forEach(valueData => {
            let tempSiteID = valueData[1];
            let tempAircraft = valueData[0];
            
            console.log('tempSiteID:',tempSiteID, 'tempAircraft:',tempAircraft);

            // var res={
                //     newSiteID:newSiteID,
                //     insertValues:insertValues,
                //     created:created
                // }

                // console.log('res',res);
            
                // insertACTypes(tempSiteID, tempAircraft, created,function (err, result, fields) {
                //                     //callback(fields, 0);
                //                     console.log('fields:',fields);
                //                     console.log('result:',result);
                //                     return result;

                // })

            insertACPromise(tempSiteID, tempAircraft,created).then((result)=>{

                console.log('insertId:',result.)
                
            },(err)=>{
            
                res.json(err);
            
            })
        })
    }
})

insertACPromise = function (tempSiteID, tempAircraft, created) {  

    var post = {'siteID':tempSiteID, 'aircraftType':tempAircraft, 'date':created}

    return new Promise((resolve, reject)=>{
    
        db.query('INSERT INTO aircraftType_TB SET ?', post, function(err,rows,fields){

            if(err){

                return reject(err);

            }


            console.log('inside insert function: rows/results:', rows);
            console.log('inside insert function: fields:', fields);

            resolve({rows,fields});

        })    
    })
}

insertACTypes = function (tempSiteID, tempAircraft, created, insertCallBack) {  
            var post = {'siteID':tempSiteID, 'aircraftType':tempAircraft, 'date':created}
            return db.query('INSERT INTO aircraftType_TB SET ?', post,insertCallBack);  
        }
