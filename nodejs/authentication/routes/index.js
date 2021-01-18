var express = require('express');
var router = express.Router();
var middleware = require('../middleware');

/* GET home page. */
router.get('/', middleware(''), function(req, res, next) {
  res.send('<p>HTML Data</p>');
});

module.exports = router;
