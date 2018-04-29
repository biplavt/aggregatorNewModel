var mysql = require('mysql');
 var connection = mysql.createPool({
    host:'35.194.2.165',
    user:'SA',
    password:'ziggy11!!',
    database:'aggregator',
    connectTimeout: 30000
    // socketPath: "/cloudsql/projectName:zone:instance-name"
    // socketPath: '/cloudsql/projectName:zone:instance-name'
});
 module.exports=connection;

//  var connection = mysql.createConnection({
//     host     : 'ip_address',
//     user     : 'root',
//     password : 'password',
//     database : 'database_name'
//     socketPath: “/cloudsql/projectName:zone:instance-name”
// });