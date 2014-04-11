var express = require('express');
var fs = require('fs');
var BlobFS = require('./BlobFS');
var app = express();

var blobStorage = new BlobFS();

console.log(blobStorage.getHashes());

app.get('/hello.txt', function(req, res){
    res.send('Hello World');
});

app.get('/blob/index.json', function(req, res){
    res.sendfile('./blob-storage/index.json');
});

app.get('/blob/:shaHash', function(req, res){
    //res.sendfile('./blob-storage/' + req.params.file);

    // TODO: graceful error handling
    var data = blobStorage.getContent(req.params.shaHash);

    res.contentType(blobStorage.getInfo(req.params.shaHash).type);
    res.send(data);
    res.end();
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});