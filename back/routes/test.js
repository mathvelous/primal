var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    /*res.json([{
        title: 'text'
    }, {
        title: 'test2'
    }])*/
    res.render('test')
});

router.post('/', function(req, res, next) {
    res.json(req.body)

});

module.exports = router;