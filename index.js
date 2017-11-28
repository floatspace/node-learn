var server = require('./server');
var route = require('./route/route');
var reqHandler = require('./route/reqHandler');

var handle = {};
handle['/'] = reqHandler.start;
handle['/index'] = reqHandler.start;
handle['/upload'] = reqHandler.upload;
handle['/show'] = reqHandler.show;

server.start(route, handle);