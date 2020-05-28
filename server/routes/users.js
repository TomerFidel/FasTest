var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  throw new Error("Thisi s error");
  next("abc");

});

module.exports = router;
