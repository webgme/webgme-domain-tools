/*
 * Copyright (C) 2012 Vanderbilt University, All rights reserved.
 * 
 * Author: Dana Zhang
 */

// This helper file will create a Domain specific decorator directory from the template
// User can pass in their preferred decorator name as a command line argument

var main = function() {
    "use strict";

    var ejs = require('ejs'),
        fs = require('node-fs-extra'),
        walk = require('walk'),
        path = require('path'),
        readline = require('readline'),
        program = require('commander'),
        str;

    program
        .option('-q, --quiet')
        .option('-o, --overwrite')
        .parse(process.argv);

    var overwrite = program.overwrite,
        quiet = program.quiet,
        args = program.args;

    if (args.length > 1 && !overwrite && !quiet || args.length > 2) {

        console.warn("\tWarning: Only the first argument was accepted as the new domain name.");
        console.warn("\t-- make sure name argument does not contain any space or special characters.");
    }

    // test for illegal characters
    if(/^[a-zA-Z0-9_]+$/.test(args[0]) === false) {
        console.error('\tDomain name string contains illegal characters. Program terminated.');
        return;
    }

    // If no command line arguments passed, show a help message in console with an example
    if (args[0] === undefined) {

        console.warn("\tWarning: No argument was passed in -- output directory not created.");
        console.warn("\t[Help] -- Pass the desired decorator name string as one command line argument.");
        console.warn("\tExample: `node generateDecorator.js PetriNet`");
        console.warn('\tPlease make sure the argument is not separated by space or contain special characters.');
        return;
    }

    var decorator = { name: args[0] },
        ds_dir = decorator.name + 'Decorator',
        new_dir = path.join('..', '..', 'decorators', ds_dir),
        output_dir = path.join(__dirname, new_dir);
        // debugging directory
        //output_dir = path.join('C:','Users', 'zhangpn', 'Desktop', ds_dir);

    if (fs.existsSync(output_dir) && quiet) {
        console.log("Directory with the same name already exists.  Program terminated");
        return;
    }

    // if directory already exists, ask user if overwriting existing directory
    if (fs.existsSync(output_dir) && !overwrite) {

        var rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout
        });

        rl.question("Overwriting existing directory? Enter 'y' to overwrite: ", function(answer) {

            if (answer === 'y' || answer === 'Y') {
                var msg = "\tSuccess!  The existing directory has been overwritten: ";
                write_directory(msg);
            }
            rl.close();
            process.stdin.destroy();
        });

    } else {
        var msg = "\tSuccess! The decorator directory has been created at: ";
        if (overwrite) {
            msg = "\tSuccess!  The existing directory has been overwritten: ";
        }
        write_directory(msg);
    }

    function write_directory (msg) {

        fs.mkdir(output_dir, function(err){});

        // set root foler of the templates to be traversed
        var options = {
                followLinks: false
            };

        var walk_path = path.join(__dirname, 'TemplateDecorator');
        var walker = walk.walk(walk_path, options);

        // if directory, create an empty dir inside the new root folder to set up output directory structure
        walker.on("directory", function (cur_path, stat, next) {

            var new_path = path.join(output_dir, stat.name);
            fs.mkdir(new_path, function(err){});
            next();
        });

        // if file, use template to generate an output file
        walker.on('file', function (cur_path, stat, next) {

            // read template file
            str = fs.readFileSync(path.join(cur_path, stat.name), 'utf8');

            // do the name replacement business
            var ret = ejs.render(str, {
                                decorator: decorator,
                                filename: cur_path
                });

            // set output file name
            var ret_name = stat.name;
            ret_name = path.join(cur_path, ret_name.replace(".ejs", ""));
            ret_name = ret_name.replace(walk_path, output_dir);
            ret_name = ret_name.replace("Template", decorator.name);

            // write to output file
            fs.writeFileSync(ret_name, ret , 'utf8');

            next();
        });

        walker.on('end', function () {
            var META_dir = path.join(output_dir, "Core");
                console.log(msg + output_dir);
                console.log("\tPlease download the domain specific META.json file from WebGME client to: " + META_dir);
              });
    }
};

if (require.main === module) {
    main();
}