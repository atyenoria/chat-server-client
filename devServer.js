'use strict';

var express = require('express');
var path = require('path');
var app = express();
var http = require('http').Server(app);
var mongoose = require('mongoose');
var session = require('express-session');
var cors = require('cors');
var webpack = require('webpack');
var config = require('./webpack.config.dev');
var app = express();
var compiler = webpack(config);

var passport = require('passport');
require('./config/passport')(passport);

var User = require('./server/models/User');
//set env vars
process.env.MONGOLAB_URI = process.env.MONGOLAB_URI || 'mongodb://localhost/chat_dev';
process.env.PORT = process.env.PORT || 3000;

console.log("pass")
// connect our DB
mongoose.connect(process.env.MONGOLAB_URI);
process.on('uncaughtException', function (err) {
  console.log(err);
});

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));


app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});
