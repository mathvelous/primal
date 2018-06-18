const express = require('express');
const router = express.Router();
const database = require('../services/database.js');

/* GET users listing. */
router.get('/:category', function(req, res, next) {
    let category = req.params.category
      database.sendQuery(`SELECT * FROM products WHERE category LIKE '${category}'`, function (err, results) {
          if (err) {
            console.log(err)
          } else {
              res.json(results)
          }
      })
});

module.exports = router;