var exec = require('child_process').exec;
var fs = require('fs');
var querystring = require('querystring');
var formidable = require('formidable');

function start(res) {
    console.log('request handler start was called');

    var body = '<html>'+
        '<head>'+
        '<meta http-equiv="Content-Type" content="text/html; '+
        'charset=UTF-8" />'+
        '</head>'+
        '<body>'+
        '<form action="/upload" enctype="multipart/form-data" method="post">'+
        '<input type="file" name="upload">'+
        '<input type="submit" value="Upload" />'+
        '</form>'+
        '</body>'+
        '</html>';

    exec('ls -lah', function(error, stdout, stderr) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write(body);
        res.end();
    });
}

function upload(res, req) {
    console.log('request handler upload was called');    

    var form = new formidable.IncomingForm();
    form.uploadDir = 'temp';
    form.parse(req, function(err, fields, files) {
        fs.renameSync(files.upload.path, './temp/test.jpg');
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write('recieved image:<br/>');
        res.write('<img src="/show"/>');
        res.end();
    });
}

function show(res) {
    console.log('request handler show was called');
    fs.readFile('./temp/test.jpg', 'binary', function(err, file) {
        if(err) {
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.write(err + '\n');
            res.end();
        } else {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write(file, 'binary');
            res.end();
        }
    });
}

exports.start = start;
exports.upload = upload;
exports.show = show;