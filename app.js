var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');


var app = express();

app.use(logger('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ limit: '50mb', extended: false }));
app.use(cookieParser());
app.use('/public',express.static(path.join(__dirname, 'public')));
app.use(cors());
const router =  require('./src/routes/routes');
app.use('/api/v1', router);
app.use('/', async (req, res, next) => {
    res.send('Hello')
})

module.exports = app;
