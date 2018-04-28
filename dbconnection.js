var mysql=require('mysql');
 var connection=mysql.createPool({
 
host:'35.194.2.165',
 user:'SA',
 password:'ziggy11!!',
 database:'aggregator'
 
});
 module.exports=connection;