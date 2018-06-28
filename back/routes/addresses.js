const express = require('express');
const router = express.Router();
const database = require('../services/database.js');


router.delete('/:id', function (req, res, next) {
    let id = req.params.id
    database.sendQuery(`DELETE FROM addresses WHERE id = ${id}`, (err, results) => {
        if (err) {
            console.error('error in deleting address', err)
            return
        }else {
            res.json(results)
        }
    })
})

module.exports = router;
