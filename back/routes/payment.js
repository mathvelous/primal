const express = require('express');
const router = express.Router();
const database = require('../services/database.js');
const stripe = require('stripe')(`${process.env.STRIPE_KEY}`)

router.post('/:id', function(req, res, next) {
    let id = req.params.id
    let customer = null
    let total = 0

    database.sendQuery(`SELECT * FROM users WHERE id = ${id}`, function (err, results) {
        if (err){
            console.log(err)
        }else{
            customer = results[0].id_customer
        }
    })

    for(let i = 0; i<req.body.cart.length; i++){
        let product = req.body.cart[i]
        console.log(product)
        total += (parseFloat(product.price)*parseFloat(product.quantity))
    }

    if(customer == null){
        stripe.customers.create({
            description: 'create toto'
        }).then((customer) => {
            // todo : send en base le customer id
            return stripe.customers.createSource(customer.id, {
                source: req.body.token
            })
        }).then(source => {
            console.log('source', source)
            stripe.charges.create({
                // amount: req.body.totalPrice.split(".").join(''),
                amount:  total*100,
                currency: 'eur',
                description: 'Example charge',
                customer: source.customer
            });
            res.json({
                customer: source.customer
            })
        }).catch(function (err) {
            console.log(err)
            res.json({
                message: err
            })
            // Deal with an error
        });
    }else{
        stripe.charges.create({
            amount: total*100,
            currency: 'eur',
            description: 'Example charge',
            customer: customer
        });
        res.json({
            customer: customer
        })
    }
})

module.exports = router;