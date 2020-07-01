var express = require('express');
var router = express.Router();
var DBConnection = require('../helpers/db');
var { registerValidation } = require('../middleware/validation');
var bcrypt = require('bcrypt');

var conn = DBConnection();


/* GET users listing. */
router.get('/register', registerValidation, async function(req, res, next) {
    var conn;
    try {
        conn = await DBConnection();
    }catch(err) {
        return next(err);
    }

    if (req.error) {
        console.log(req.error);
        return next(req.error);
    }

    var first_name = req.query.first_name ?? "";
    var last_name = req.query.last_name ?? "";
    var email = req.query.email ?? "";
    var password = req.query.password ?? "";

    let hashed_password = bcrypt.hashSync(password, 10);

    const query = `
        INSERT INTO users 
            (first_name, last_name, email, password)
        VALUES
            (?, ?, ?, ?)`;

    

    res.send(hashed_password);

});

module.exports = router;