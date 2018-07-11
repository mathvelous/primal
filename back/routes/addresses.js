const express = require('express');
const router = express.Router();
const database = require('../services/database.js');

router.get('/:id', function (req, res, next) {
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
        } else {
            res.json(results)
        }
    })
});

router.post('/:id', function (req, res, next) {
    let id = req.params.id
    database.sendQuery(`SELECT * FROM addresses WHERE id_user = ${id}`, (err, results) => {
        if (err) {
            console.error(err)
            return
        } else {
            let check = 0
            for (let i = 0; i < results.length; i++) {
                let address = results[i]
                if (address.street == req.body.street) {
                    check = 1
                    break
                }
            }
            if (check == 0) {
                database.sendQuery(`INSERT INTO addresses (street, city, zipcode, id_user) VALUE ('${req.body.street}', '${req.body.city}', '${req.body.zipcode}', ${id})`, function (err, results) {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        res.json(results.insertId)
                    }
                })
            }else {
                res.json('ok')
            }
        }
    })
})

module.exports = router;
