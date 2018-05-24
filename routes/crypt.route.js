var express = require('express');
var router = express.Router();
router.post('/', function (req, res, next) {
    var encrypted = req.headers['api'];
    var password = 'WTq8zYcZfaWVvMncigHqwQ==';
    var passwordBinary = new Buffer(password, "base64");
    // var encrypted = 'C43E1179C15CD962373A6E28486D6F4ADB12FBB6731EF99C9212474E18D51C70'
    var crypto = require('crypto');
    var decipher = crypto.createDecipher('aes-128-ecb', passwordBinary );
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    console.log(decrypted);
})

module.exports = router;