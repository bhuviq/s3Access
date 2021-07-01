var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const viewEngine = (new require("es6views").viewEngine)(app)
console.log(__dirname + '/views');
app.set('views', __dirname + '/views');
app.set('view engine', 'es6');

const session 		= require('express-session');

app.use(session({
    secret: `86869e7e72761a0360960e2273c2fbed`,
    resave: true,
    saveUninitialized: true
}));

app.get('/auth', indexRouter);
app.post('/auth', indexRouter);

/**
 * Middleware to authenticate if session already exist or not
 */
app.use((req, res, next) => {

    try {


        if(!req.session.hasOwnProperty("creds")) {
        	return res.redirect('/auth');
        }

        next();

    }
    catch (error) {

    }
});


app.get('/', indexRouter);
app.get('/bucket/:bucketName', indexRouter);
app.get('/logout', indexRouter);

module.exports = app;
