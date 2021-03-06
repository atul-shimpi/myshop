'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
//routes definitons
const categories = require('./product-categories/routes');
//==================================================================================

// enable cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

// middle wares
app.use(bodyParser.json()); 

//routes mapping
app.use('/categories', categories);

app.get('/', function (req, res) {
   res.send('Welcome to myShop Backend');
})

// start the server
var server = app.listen(3000, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Server running", host, port);
});