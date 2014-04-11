/**
 * Created by zsolt on 4/10/14.
 */

var fs = require('fs');
var path = require('path');
var crypto = require('crypto');

var BlobFS = function() {
    this.blobDir = 'blob-local-storage';
    this.indexFile = path.join(this.blobDir, 'index.json');
    this.shaMethod = 'sha1';

    if (fs.existsSync(this.blobDir) === false) {
        fs.mkdirSync(this.blobDir);
    }

    this.indexedFiles = {};

    if (fs.existsSync(this.indexFile)) {
        this.indexedFiles = require('./' + this.indexFile);
    }
};

BlobFS.prototype.addBlob = function(name, content) {
    var shasum = crypto.createHash(this.shaMethod);

    shasum.update(content);

    var hash = shasum.digest('hex');

    var objectFilename = path.join(this.blobDir, this._getObjectRelativeLocation(hash));

    if (fs.existsSync(path.dirname(objectFilename)) === false) {
        fs.mkdirSync(path.dirname(objectFilename));
    }

    fs.writeFileSync(objectFilename, content);

    this.indexedFiles[hash] = {
        fullPath: name,
        filename: path.basename(name),
        type: path.extname(name),
        created: (new Date()).toISOString()
    };

    fs.writeFileSync(this.indexFile, JSON.stringify(this.indexedFiles, null, 4));

    return hash;
};

BlobFS.prototype._getObjectRelativeLocation = function (hash) {
    return hash.slice(0, 2) + '/' + hash.slice(2);
};

BlobFS.prototype.getObjectLocation = function (hash) {
    return path.join(this.blobDir, this._getObjectRelativeLocation(hash));
};

BlobFS.prototype.getInfo = function(hash) {
    return this.indexedFiles[hash];
};

BlobFS.prototype.getHashes = function() {
    return Object.keys(this.indexedFiles);
};

BlobFS.prototype.getContent = function(hash) {
    return fs.readFileSync(path.join(this.blobDir, this._getObjectRelativeLocation(hash)));
};

module.exports = BlobFS;

if (require.main === module) {
    // Example for usage
    var sourceFiles = fs.readdirSync('source_files');

    var blobFS = new BlobFS();

    for (var i = 0; i < sourceFiles.length; i += 1) {
        var filename = path.join('source_files', sourceFiles[i]);
        blobFS.addBlob(filename, fs.readFileSync(filename));
    }

    var hashes = blobFS.getHashes();

    console.log(hashes);

    for (var i = 0; i < hashes.length; i += 1) {
        var info = blobFS.getInfo(hashes[i]);
        var buffer = blobFS.getContent(hashes[i]);
        console.log("====== INFO ========");
        console.log(info);
        console.log("----- CONTENT ------");
        console.log(buffer.toString());
    }
}

