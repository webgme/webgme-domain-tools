var ejs = require('ejs')
  , fs = require('fs')
  , walk = require('walk')
  , walker
  , path = __dirname + '/TemplateDecorator'
  ;



options = {
    followLinks: false
  };

//fs.writeFileSync(__dirname + '/' + decorator.name + '.js', ret , 'utf8')

// traverse root foler
var count = 0;
var files = 0;
walker = walk.walk(path, options);
// if directory go inside
// if file, writeFileSync, rename file, and remove duplicate files

walker.on("directory", function (path, stat, next) {
  next();
}); 

walker.on('file', function (path, stat, next) {
    fs.rename(path + '/' + stat.name, path + '/' + stat.name.concat(".ejs"), function(err){});
    files++;
    next();
});

walker.on('end', function () {
      });
