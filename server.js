"use strict";

const express    = require('express');
const httpserver = require("./httpserver");
const app        = express();
const socketIo   = require('socket.io');
const setup      = require('./setup')(app);

app.use(express.static('public'));

const server = httpserver.start(app);
const io = socketIo(server);

module.exports = server;
