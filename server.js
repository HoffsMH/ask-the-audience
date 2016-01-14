"use strict";

const express = require('express');
const server = require("./httpserver");
const app = express();

app.use(express.static('public'));

server.start(app);
