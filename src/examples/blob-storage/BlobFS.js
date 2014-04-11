/**
 * Created by zsolt on 4/10/14.
 */


var fs = require('fs');
var path = require('path');

// setup storage
var blobDir = 'blob-storage';

if (fs.existsSync(blobDir) === false) {
    fs.mkdirSync(blobDir);
}

var addFile = function (filename, callback) {
    var crypto = require('crypto');
    var shasum = crypto.createHash('sha1');

    var tempFilename = blobDir + '/tmp' + crypto.randomBytes(4).readUInt32LE(0); // TODO: make this unique

    var s = fs.ReadStream(filename);
    var ws = fs.createWriteStream(tempFilename);
    s.on('data', function (d) {
        shasum.update(d);
        ws.write(d);
    });

    s.on('end', function () {
        var d = shasum.digest('hex');
        console.log(d + '  ' + filename);
        ws.end();
        ws.on('finish', function () {
            fs.renameSync(tempFilename, blobDir + '/' + d);
            callback(d, filename);
        });

    });
};

var sourceFiles = fs.readdirSync('source_files');
var indexedFiles = {};

if (fs.existsSync(blobDir + '/index.json')) {
    indexedFiles = require('./' + blobDir + '/index.json');
}

var remainingFiles = sourceFiles.length;

for (var i = 0; i < sourceFiles.length; i += 1) {
    addFile('source_files/' + sourceFiles[i], function (hash, filename) {
        indexedFiles[hash] = {
            filename: filename,
            type: path.extname(filename),
            created: (new Date()).toISOString()
        };

        remainingFiles -= 1;
        if (remainingFiles === 0) {
            fs.writeFileSync(blobDir + '/index.json', JSON.stringify(indexedFiles, null, 4));
        }
    });
}