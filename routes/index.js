const express = require('express');
const router = express.Router();
const controller = require('../controller');

/* GET home page. */
router.get('/', async (req, res, next) => {

    let data = await controller.bucketList(req.session.creds);

    res.render('index', data);
});

router.get('/bucket/:bucketName', async (req, res) => {

    let bucketName = req.params.bucketName;
    let {q: prefix} = req.query;

    let data = await controller.getIndexData(req.session.creds, bucketName, prefix);

    res.render('index', data);
})

router.get('/download/:bucketName', async (req, res) => {

    let {bucketName} = req.params;
    let {q: filePath} = req.query;

    let link = await controller.getFileLink(req.session.creds, bucketName, filePath);

    res.redirect(link);

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

    let redirectPath = req.session.redirectPath || '/';
    res.redirect(redirectPath);

});

router.get('/logout', (req, res) => {

    req.session.destroy((err) => {

        res.redirect('/auth');
    })
})

module.exports = router;
