const express = require('express');
const router = express.Router();
const database = require('../services/database.js');

router.get('/:id', function(req, res, next) {
    let id = req.params.id
    database.sendQuery(`SELECT * FROM users WHERE id = ${id}`, function (err, results) {
        if (err) {
            console.log(err)
        } else {
            let userInfo = results[0]
            res.user = userInfo.id
            database.sendQuery(`SELECT * FROM addresses WHERE id_user = ${id}`, function (err, results) {
                if (err) {
                    console.log(err)
                } else {
                    let userAddresses = results
                    res.json({
                        info: userInfo,
                        addresses: userAddresses
                    })
                }
            })
        }
    })
});

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
