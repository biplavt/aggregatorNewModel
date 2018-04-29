var mysql=require('mysql');
 var connection=mysql.createPool({
 
host:'api-project-347754878770:us-central1:asdagggc',
 user:'SA',
 password:'ziggy11!!',
 database:'aggregator'
 
});
 module.exports=connection;