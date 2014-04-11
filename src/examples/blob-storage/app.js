var express = require('express');
var fs = require('fs');
var BlobFS = require('./BlobFS');

var app = express();

var blobStorage = new BlobFS();

console.log(blobStorage.getHashes());

app.configure(function(){
    app.use(express.methodOverride());
    app.use(express.multipart({defer: true}));
});

app.get('/', function(req, res){
    res.sendfile('index.html');
});



app.get('/rest/blob/index.json', function(req, res){
    res.sendfile('./blob-storage/index.json');
});

app.post('/rest/blob/create', function(req, res) {
    var uploadedFile = {};
    req.form.parse(req, function(err, fields, files) {
        if (err) {
//            res.writeHead(400, {'content-type': 'text/plain'});
//            res.end("invalid request: " + err.message);
        } else {
            //res.writeHead(200, {'content-type': 'text/plain'});
            //res.write('received fields:\n\n ' + JSON.stringify(fields));
            //res.write('\n\n');
            //res.end('received files:\n\n ' + JSON.stringify(files));
//            res.send({
//                hash:'sssssss'
//            });

            var uploadedFileIDs = Object.keys(files);
            if (uploadedFileIDs.length === 0) {
                // TODO: nothing to store
            } else {
                // FIXME: take the first one ONLY!
                var uploadedFileID = uploadedFileIDs[0];

                var hash = blobStorage.addBlob(files[uploadedFileID].originalFilename, fs.readFileSync(files[uploadedFileID].path));
                uploadedFile[hash] = blobStorage.getInfo(hash);

                console.log(uploadedFile);
            }

        }
    });

    req.form.on('close', function() {
        res.send(uploadedFile);
    });
});

app.get('/rest/blob/:shaHash/download', function(req, res) {
    res.download(blobStorage.getObjectLocation(req.params.shaHash), blobStorage.getInfo(req.params.shaHash).filename, function (err) {
        if (err) {
            // handle error, keep in mind the response may be partially-sent
            // so check res.headerSent
        } else {
            // decrement a download credit etc
        }
    });
});

app.get('/rest/blob/:shaHash', function(req, res){
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