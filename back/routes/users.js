var express = require('express');
var router = express.Router();

var database = require('../services/database');

/* GET users listing. */
router.get('/', function(req, res, next) {
  database.sendQuery('SELECT firstname FROM user', function (err, results) {
      if (err) {
        console.log(err)
      } else {
          res.json(results)
      }
  })
});

module.exports = router;
