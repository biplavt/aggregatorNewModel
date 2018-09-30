var db = require('../dbconnection'); //reference of dbconnection.js

function ObjToArray(obj) {
  var arr = obj instanceof Array;
  console.log('arr',arr);
  var newArray=[];
  Object.keys(obj).map(function(i) {
        //console.log('i',i);
        if (i==='migDate'){
            newArray[0]=obj[i];
        }
        else if(i==='workOrder'){
            newArray[1]=obj[i];
        }
        else if(i==='remarksUpdatedBy'){
          newArray[2]=obj[i];
        }
        else if(i==='pmd_hours'){
          newArray[3]=obj[i];
        }
        else if(i==='remarks'){
          newArray[4]=obj[i];
        }
        else if(i==='MCRate'){
          newArray[5]=obj[i];
        }
        else if(i==='uic'){
          newArray[6]=obj[i];
        }
        else if(i==='status'){
          newArray[7]=obj[i];
        }
        else if(i==='phase_due'){
          newArray[8]=obj[i];
        }
        else if(i==='ei_sn'){
          newArray[9]=obj[i];
        }
        else if(i==='ei_model'){
          newArray[10]=obj[i];
        }
        else if(i==='remarksUpdatedLast'){
          newArray[11]=obj[i];
        
        }else if(i==='coloroverride'){
          newArray[12]=obj[i];
        }else{ 
          console.log("invalid data entry!!")
            }
    //   console.log('i',i);
    // var val = arr ? i : obj[i];
    // console.log('val:',val);
    // if (typeof val === 'object')
    //   return ObjToArray(val);
    // else
    //   return val;
  });
 //console.log('newArray',newArray);
  return newArray;
}

var ac = {
  aircraftDetail: function (ac, callback) {
    ac.forEach(element => {
      //console.log("element:",element);
      let insertValues = ObjToArray(element);
     
      //console.log('insertValues:',insertValues);
        var sql = "INSERT INTO ac_TB (migDate,workOrder,remarksUpdatedBy,pmd_hours,remarks,MCRate,uic,status,phase_due,ei_sn, ei_model,remarksUpdatedLast, coloroverride) VALUES ?";
        return db.query(sql, [[insertValues]], callback)
    });
  },
  insertJoin: function (siteID, acID, newcallback) {
      let joininsertValues = [acID, siteID];
      var joinsql = "INSERT INTO AASFac_TB (acID, siteID) VALUES ?";
      return db.query(joinsql, [[joininsertValues]], newcallback)
  }
}
module.exports = ac;

