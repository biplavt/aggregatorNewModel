var mysql = require('mysql');
    // Dev
    var connection = mysql.createConnection({
        host     : '35.225.249.162', //comment this out on deploy
        user     : 'SA',
        password : 'ziggy11!!',
        database : 'aggregator',
        multipleStatements: true,
        // socketPath: '/cloudsql/asd-api-aggragator:us-central1:asd-aggragator'
    });
    // PROD
    
    // var connection = mysql.createConnection({
    //     host     : '104.154.22.71', //keep when deploying
    //     user     : 'SA',
    //     password : 'ziggy11!!',
    //     database : 'aggregator',
    //     multipleStatements: true,
    //     // socketPath: '/cloudsql/asdapi-prod:us-central1:asd-aggragator'
    // });
    module.exports = connection;