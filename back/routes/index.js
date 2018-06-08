var express = require('express');
var router = express.Router();

var database = require('../services/database');

router.get('/', function(req, res, next) {
    
    /*database.sendQuery('SELECT * FROM ...', function (err, results) {
        if (err) {

        } else {
            res.json(results)
        }
    })*/
    
    /*var sess = req.session

    if (sess.page_views) {
        sess.page_views++
        res.send("You visited this page" + req.session.page_views)
    } else {
        sess.page_views = 1
        res.send('welcome to the session demo. refresh!')
    }*/
})

module.exports = router;
