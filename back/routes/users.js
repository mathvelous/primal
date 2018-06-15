const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const database = require('../services/database.js');

/* GET users listing. */
/*router.get('/', function(req, res, next) {
      database.sendQuery('SELECT * FROM users WHERE email LIKE', function (err, results) {
          if (err) {
            console.log(err)
          } else {
              res.user = results[0].id
              res.json(results)
          }
      })
});*/

router.post('/conn', function(req, res, next) {
    let sess = req.session
    database.sendQuery(`SELECT * FROM users WHERE email LIKE '${req.body.data.mail}'`, function (err, results) {
        if (err) {
            console.log(err)
        } else {
            bcrypt.compare(req.body.data.password, results[0].password).then(function(result) {
                if(result == true){
                    sess = results[0]
                    res.json('Connection réussi!')
                }else {
                    res.json('Erreur de connection')
                }
            });
        }
    })
    console.log(req.body)
});

router.post('/', function(req, res, next) {
    let sess = req.session
    bcrypt.hash(req.body.data.password, 10).then(function(hash){
        database.sendQuery(`INSERT INTO users (firstname, lastname, email, password, phone) VALUES ('${req.body.data.firstname}', '${req.body.data.lastname}', '${req.body.data.mail}', '${hash}', '${req.body.data.phone}')`, function (err, results) {
            if (err) {
                console.log(err)
            }
            else {
                sess.user = results.insertId
                database.sendQuery(`INSERT INTO addresses (street, city, zipcode, id_user) VALUES ('${req.body.address.street}', '${req.body.address.city}', '${req.body.address.zipcode}', ${results.insertId})`, function (err, results) {
                    if (err) {
                        console.log(err)
                    }
                    else {
                    }
                })
            }
        })
    })
});

module.exports = router;
