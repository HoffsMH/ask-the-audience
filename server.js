"use strict";

const express    = require('express');
const httpserver = require("./httpserver");
const app        = express();
const socketIo   = require('socket.io');
const setup      = require('./setup')(app);

app.use(express.static('public'));
app.locals.votes = {};

const server = httpserver.start(app);
const io = socketIo(server);

io.on('connection', function (socket) {
  console.log('A user has connected.', io.engine.clientsCount);

  io.sockets.emit('usersConnected', io.engine.clientsCount);

  socket.on('disconnect', function () {
    console.log('A user has disconnected.', io.engine.clientsCount);
    delete app.locals.votes[socket.id];
    console.log(app.locals.votes);
    io.sockets.emit('usersConnected', io.engine.clientsCount);
  });

  socket.on('message', function (channel, message) {
    if (channel === 'voteCast') {
      app.locals.votes[socket.id] = message;
      io.sockets.emit('voteCount', countVotes(app.locals.votes));
    }
  });
});


function countVotes(votes) {
var voteCount = {
    A: 0,
    B: 0,
    C: 0,
    D: 0
};
  for (var vote in votes) {
    voteCount[votes[vote]]++;
  }
  return voteCount;
}

module.exports = server;
