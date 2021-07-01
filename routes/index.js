const express = require('express');
const router = express.Router();

const s3 = require('../modules/s3');

/* GET home page. */
router.get('/', async (req, res, next) => {

    const result = await s3.getAllBuckets(req.session.creds);
    res.render('index', { pageTitle: 'S3 Access', result, listOf: 'Buckets' });
});

router.get('/bucket/:bucketName', async (req, res) => {

    let bucketName = req.params.bucketName;
    const result = await s3.getAllFiles(req.session.creds, bucketName);
    res.render('index', { pageTitle: 'S3 Access', result, listOf: 'files' });
})

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
