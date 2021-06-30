var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {

    res.render('index', { pageTitle: 'S3 Access' });
});

router.get('/auth', (req, res, next) => {

    if (req.session.creds) {

        return res.redirect('/');
    }

    res.render('auth', { pageTitle: 'S3 Access' });
});

router.post('/auth', (req, res, next) => {

    req.session.creds = {
        key: req.body.key,
        secret: req.body.secret
    };
    req.session.save();

    res.redirect('/');
});

router.get('/logout', (req, res) => {

    req.session.destroy((err) => {

        res.redirect('/auth');
    })
})

module.exports = router;
