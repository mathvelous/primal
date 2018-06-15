const express = require('express');
const router = express.Router();
const database = require('../services/database.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
      database.sendQuery('SELECT * FROM products', function (err, results) {
          if (err) {
            console.log(err)
          } else {
              res.json(results)
          }
      })
});

module.exports = router;