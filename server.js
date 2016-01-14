"use strict";

const http = require('http');
const express = require('express');

const app = express();

app.use(express.static('public'));

app.use(function(req, res, next){
  console.log("hi");
  res.send({taco: "now"});
  next();
});


let server = http.createServer(app);
let port = process.env.PORT || 3000;

server.listen(port, function () {
  console.log('Listening on port ' + port + '.');
});
