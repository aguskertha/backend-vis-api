var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const router =  require('./src/routes/routes');
app.use('/api/v1', router);
app.use('/', async (req, res, next) => {
    res.send('Hello')
})

module.exports = app;
