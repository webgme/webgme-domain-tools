/*
 * Copyright (C) 2014 Vanderbilt University, All rights reserved.
 *
 * Author: Zsolt Lattmann
 * node src\tools\combine_templates.js -t src\plugins\Examples\UsingTemplates\Templates
 */

var main = function () {
    var fs = require('fs');
    var path = require('path');
    var walk = require('walk');
    var program = require('commander');

    program.option('-t, --templateDirectory <name>', 'Directory of ejs templates');
    program.parse(process.argv);

    if (!program.templateDirectory) {
        program.help();
    }

    var templateDirectory = path.resolve(program.templateDirectory);

    if (!fs.existsSync(templateDirectory)) {
        console.error('Given path does not exist: ' + templateDirectory);
        return false;
    }

    var walker  = walk.walk(program.templateDirectory, { followLinks: false });
    var files = {};
    var content = {};

    walker.on('file', function(root, stat, next) {
        // Add this file to the list of files
        if (path.extname(stat.name) === '.ejs') {
            files[stat.name] = root + '/' + stat.name;
            content[stat.name] = fs.readFileSync(root + '/' + stat.name, {'encoding':'utf-8'});
        }
        next();
    });

    walker.on('end', function() {
        console.log(files);
        console.log(content);

        // FIXME: use ejs template for this one too.
        var templateContent = '';
        templateContent += '/* Generated file based on ejs templates */\r\n';
        templateContent += 'define([], function() {\r\n';
        templateContent += '    return ' + JSON.stringify(content, null, 4);
        templateContent += '});';



        fs.writeFileSync(path.join(templateDirectory, 'Templates.js'), templateContent);

    });
};

if (require.main === module) {
    main();
}