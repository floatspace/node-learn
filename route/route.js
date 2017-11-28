function route(handle, pathname, res, req) {
    if(typeof handle[pathname] === 'function') {
        handle[pathname](res, req);
    } else {
        console.log('No request handler for ' + pathname);
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not found");
        response.end();
    }
}
module.exports = route;