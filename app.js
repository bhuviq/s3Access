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
app.set('views', __dirname + '/views')
app.set('view engine', 'es6')

app.use('/', indexRouter);

module.exports = app;
