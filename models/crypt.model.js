var db = require('../dbconnection'); //reference of dbconnection.js

var cryptModel = {
    apiKeySelect: function (siteID, callback) {
        
        // console.log(siteID);
        // let sql = "SELECT apiKey from crypto_TB where siteID ?";
        // return db.query(sql, siteID, callback)
        
        return callback('WTq8zYcZfaWVvMncigHqwQ==')
        
    },
    
    
}
module.exports = cryptModel;

// var encrypted = req.headers['api'];
// var apiKey = 'WTq8zYcZfaWVvMncigHqwQ==';
// var apiKeyBinary = new Buffer(apiKey, "base64");
// // var encrypted = 'C43E1179C15CD962373A6E28486D6F4ADB12FBB6731EF99C9212474E18D51C70'
// var crypto = require('crypto');
// var decipher = crypto.createDecipher('aes-128-ecb', apiKeyBinary );
// var decrypted = decipher.update(encrypted, 'hex', 'utf8');
// decrypted += decipher.final('utf8');
// console.log(decrypted);

// res.json(apiKeyBinary); //or return count for 1 &amp;amp;amp; 0