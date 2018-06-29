var express = require('express');
var router = express.Router();
var path = require('path');

var database = require('../services/database');

router.get('/', function(req, res, next) {
    res.sendFile(path.resolve(__dirname + '/../public/app/index.html'))
})

module.exports = router;
