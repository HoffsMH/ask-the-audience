"use strict";

const http = require('http');
const express = require('express');

const app = express();

app.use(function(req, res, next){
  console.log("hi");
  res.send({taco: "nowss"});
  next();
});
// app.use(express.static('public'));


let server = http.createServer(app);
let port = process.env.PORT || 3000;

server.listen(port, function () {
  console.log('Listening on port ' + port + '.');
});
