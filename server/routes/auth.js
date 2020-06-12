var express = require('express');
var router = express.Router();
var DBConnection = require('../helpers/db');
var { registerValidation } = require('../middleware/validation');


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

    res.send("Elo");

});

module.exports = router;