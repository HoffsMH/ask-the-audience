"use strict";

const express    = require('express');
const httpserver = require("./httpserver");
const app        = express();
const socketIo   = require('socket.io');
const setup      = require('./setup')(app);

app.use(express.static('public'));

const server = httpserver.start(app);
const io = socketIo(server);

io.on('connection', function (socket) {
  console.log('A user has connected.', io.engine.clientsCount);

  io.sockets.emit('usersConnected', io.engine.clientsCount);

  socket.on('disconnect', function () {
    console.log('A user has disconnected.', io.engine.clientsCount);
    io.sockets.emit('usersConnected', io.engine.clientsCount);
  });
});

module.exports = server;
