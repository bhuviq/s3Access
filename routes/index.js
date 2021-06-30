var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {

    res.render('index', { pageTitle: 'S3 Access' });
});

module.exports = router;
