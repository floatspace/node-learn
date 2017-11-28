var http = require('http');
var url = require('url');
var PORT = 3000;

function start(route, handle) {
    function onRequest(req, res) {
        var postData = '';
        var reqUrl = req.url;
        var pathname = url.parse(reqUrl).pathname;
        if(pathname === '/favicon.ico') return;

        route(handle, pathname, res, req);
    }

    http.createServer(onRequest).listen(PORT);
    console.log('server stated at port: ' + PORT);
}

exports.start = start;