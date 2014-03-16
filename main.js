'use strict';

var server = require('./server/server');
var myTestApp = require('./app/App');

server.start();
server.deploy(myTestApp.createApp());