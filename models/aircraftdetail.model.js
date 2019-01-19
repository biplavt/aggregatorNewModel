var db = require('../dbconnection'); //reference of dbconnection.js
var ac = {
      aircraftDetail: function (body, callback) {
        let ac = body.ac_TB;
        let siteID = body.siteID;
        let insertDate = new Date();
        
          simpleInsertFunction = function (ac, insertCallBack) { 
                  var post = {'MCRate':ac.MCRate,'coloroverride':ac.coloroverride,'database':ac.database,'ei_model':ac.ei_model,'ei_sn':ac.ei_sn,'fly':ac.fly,'migDate':ac.migDate,'phase_due':ac.phase_due,'pmd_hours':ac.pmd_hours,'remarks':ac.remarks,'remarksUpdatedBy':ac.remarksUpdatedBy,'remarksUpdatedLast':ac.remarksUpdatedLast,'status':ac.status,'uic':ac.uic,'workOrder':ac.workOrder,'siteID':siteID,'insertDate':insertDate}
                  return db.query('INSERT INTO ac_TB SET ?', post, insertCallBack);  
          },
          ac.forEach(element => {
                   // loop over each AC then insert it above in simpleInsertFunction
                  simpleInsertFunction(element, function (err, result, newCallBack) {
                      if(result && (result.affectedRows !== undefined && result.affectedRows !== null)) { 
                        var AASFACPost = {'acID':result.insertId,'siteID':siteID}
                            return db.query('INSERT INTO AASFac_TB SET ?', AASFACPost, newCallBack); 
                      }
                   
                    return result;
                  })
          })
      //  callback(insertCallBack);
      },
      getAllAC: function (callback) {
            db.query('SELECT * FROM ac_TB', 
              function(err, rows, fields) {
                callback(err, rows); 
              });
      },
      getAllACByAASF: function (callback) {
        const id = 'bla'
            db.query('SELECT * FROM ac_TB WHERE siteID = ?' [id], 
              function(err, rows, fields) {
                callback(err, rows); 
              });
       }
    }
module.exports = ac;










   // var totalMCRate=0;
                // var totalPMDhours=0;
                // var totalPhaseDue=0;
                // console.log(results);
                // for(i=0;i<results.length;i++){
                //     console.log('Results:',results[i].migDate);
                //     totalMCRate+=parseInt(results[i].MCRate);
                //     totalPMDhours+=parseInt(results[i].pmd_hours);
                //     totalPhaseDue+=parseInt(results[i].phase_due);
                // }
                // var avgMCRate=totalMCRate/results.length;
                // var avgPMDHours=totalPMDhours/results.length;
                // res.send({
                //     totalMCRate:totalMCRate,
                //     avgMCRate:avgMCRate,
                //     totalPMDhours:totalPMDhours,
                //     avgPMDHours:avgPMDHours,
                //     totalPhaseDue:totalPhaseDue
                // })