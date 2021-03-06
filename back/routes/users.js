const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const database = require('../services/database.js');

/* GET users listing. */
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
                      database.sendQuery(`SELECT * FROM orders WHERE id_user = ${id}`, function (err, results) {
                          if(err){
                              console.log(err)
                          } else{
                              let userOrders = results
                              res.json({
                                  info: userInfo,
                                  addresses: userAddresses,
                                  orders: userOrders
                              })
                          }
                      })
                  }
              })

          }
      })
});

router.post('/conn', function(req, res, next) {
    let sess = req.session
    database.sendQuery(`SELECT * FROM users WHERE email LIKE '${req.body.data.mail}'`, function (err, results) {
        if (err) {
            console.log(err)
        } else {
            bcrypt.compare(req.body.data.password, results[0].password).then(function(result) {
                if(result == true){
                    sess.user = results[0].id
                    res.json(sess.user)
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
                        res.json(sess.user)
                    }
                })
            }
        })
    })
});

router.post('/address/:id', function(req, res, next) {
    let id = req.params.id
    database.sendQuery(`INSERT INTO addresses (street, city, zipcode, id_user) VALUES ('${req.body.address.street}', '${req.body.address.city}', '${req.body.address.zipcode}', ${id})`,function (err, results) {
        if (err) {
            console.log(err)
        }
        else {
            database.sendQuery(`SELECT * FROM addresses WHERE id_user = ${id}`, (err, results) => {
                if (err) {
                    console.log(err)
                }else {
                    res.json(results)
                }
            })
        }
    })
});

router.post('/update/:id', function (req, res, next) {
    let id = req.params.id
    database.sendQuery(`UPDATE users SET firstname='${req.body.data.info.firstname}', lastname='${req.body.data.info.lastname}', email='${req.body.data.info.email}', phone='${req.body.data.info.phone}' WHERE id = ${id}`, (err, results) => {
        if (err) {
            console.log('error in updating user', err)
            return
        }
        res.json('Success')
    })
});

router.post('/orders/update/:id', function (req, res, next) {
    let id = req.params.id
    database.sendQuery(`UPDATE orders SET state='${req.body.data}' WHERE id = ${id}`, (err, results) => {
        if (err) {
            console.log('error in updating user', err)
            return
        }
        res.json('Success')
    })
});




module.exports = router;
