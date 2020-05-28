var express = require('express');
var router = express.Router();
var DBConnection = require('../helpers/db');

/* GET users listing. */
router.get('/register', async function(req, res, next) {
    try {
        var conn = await DBConnection();
    }catch(err) {
        return next(err);
    }
  next("abc");

});

module.exports = router;