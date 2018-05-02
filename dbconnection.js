var mysql = require('mysql');


// const Knex = require('knex');

// const knex = connection();


// const connections = require('knex')({
//     client: 'mysql',
//     connection: {
//         host:'35.225.249.162',
//         user:'SA',
//         password:'ziggy11!!',
//         database:'aggregator',
//         socketPath: '/cloudsql/projectName:zone:instance-name'
//     }
//   });

//  var connection = require('Knex')({
//     host:'35.225.249.162',
//     client: 'mysql',
//     user:'SA',
//     password:'ziggy11!!',
//     database:'aggregator'
    // connectTimeout: 30000
    // socketPath: "/cloudsql/projectName:zone:instance-name"
    // socketPath: '/cloudsql/projectName:zone:instance-name'

    
    var connection = mysql.createConnection({
        host     : '35.225.249.162',
        user     : 'SA',
        password : 'ziggy11!!',
        database : 'aggregator',
        // socketPath: '/cloudsql/asd-api-aggragator:us-central1:asd-aggragator'
    });
    module.exports = connection;