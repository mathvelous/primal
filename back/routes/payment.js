const express = require('express');
const router = express.Router();
const database = require('../services/database.js');
const stripe = require('stripe')('sk_test_jgGXQ4aFjyIl1XhxobBu3j4G')

router.post('/:id', function (req, res, next) {
    let id = req.params.id
    let customer = null
    let total = 0

    for (let i = 0; i < req.body.cart.length; i++) {
        let product = req.body.cart[i]
        console.log(product)
        total += (parseFloat(product.price) * parseFloat(product.quantity))
    }

    database.sendQuery(`SELECT * FROM users WHERE id = ${id}`, function (err, results) {
        if (err) {
            console.log(err)
        } else {
            customer = results[0].id_customer
            if (customer == null) {
                stripe.customers.create({
                    description: 'create toto'
                }).then((customer) => {
                    database.sendQuery(`UPDATE users SET id_customer = '${customer.id}' WHERE id = ${id}`, (err, results) => {
                        if (err) {
                            console.log(err)
                            return
                        }
                    })
                    return stripe.customers.createSource(customer.id, {
                        source: req.body.token
                    })
                }).then(source => {
                    console.log('source', source)
                    stripe.charges.create({
                        amount: total * 100,
                        currency: 'eur',
                        description: 'Example charge',
                        customer: source.customer
                    }).then(charge => {
                        database.sendQuery(`INSERT INTO orders (price, state, id_user, id_address) VALUES (${total}, 'en attente de validation', ${id}, ${req.body.id_address})`, (err, results) => {
                            if(err){
                                console.log(err)
                            }
                            res.json({
                                charge: charge.status,
                                id: results.insertId
                            })
                        })
                    }).catch(e => {
                        console.error(e)
                    })
                }).catch(function (err) {
                    console.log(err)
                    res.json({
                        message: err
                    })
                });
            } else {
                stripe.customers.createSource(customer, {
                    source: req.body.token
                }).then(source => {
                    stripe.charges.create({
                        amount: total * 100,
                        currency: 'eur',
                        description: 'Example charge',
                        customer: customer
                    }).then(charge => {
                        if (charge.status == 'succeeded') {
                            database.sendQuery(`INSERT INTO orders (price, state, id_user, id_address) VALUES (${total}, 'en attente de validation', ${id}, ${req.body.id_address})`, (err, results) => {
                                if(err){
                                    console.log(err)
                                }
                                res.json({
                                    charge: charge.status,
                                    id: results.insertId
                                })
                            })
                        } else {
                            res.json({
                                charge: charge.status
                            })
                        }
                    }).catch(e => {
                        console.error(e)
                    })
                })

            }
        }
    })


})

module.exports = router;