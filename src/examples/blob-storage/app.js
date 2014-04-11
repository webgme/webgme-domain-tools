var express = require('express');
var fs = require('fs');
var app = express();

app.get('/hello.txt', function(req, res){
    res.send('Hello World');
});

app.get('/blob/index.json', function(req, res){
    res.sendfile('./blob-storage/index.json');
});

app.get('/blob/:file', function(req, res){
    //res.sendfile('./blob-storage/' + req.params.file);

    fs.readFile('./blob-storage/' + req.params.file, function(err, data) {
        if(err) {
            res.send("Oops! Couldn't find that file.");
        } else {
            // set the content type based on the file
            var indexes = require('./blob-storage/index.json');
            res.contentType(indexes[req.params.file].type);
            res.send(data);
        }
        res.end();
    });
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});