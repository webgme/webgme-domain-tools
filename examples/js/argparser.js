/**
 * Created by pmeijer on 3/13/14.
 *
 * This script illustrates how you can pass arguments and options to a script.
 * This is a refactoring with some additions to Dana Zhang's script.
 *
 * This script is no module and only makes sense to execute from the command-line.
 * To see it in action you need to experiment on your own by passing values.
 * See some examples at the bottom.
 * For more options;
 * https://github.com/visionmedia/commander.js/
 * Or the Readmd.md after installing it.
 */

'use strict';
// We need the external library 'commander' for this script.
var program = require('commander');
// Add a simple true/false flag. (Will be undefined if not passed which translates to false in if-clauses.)
program.option('-v, --verbose', 'Do a lot of printing.');
// Add an option that takes a value and stores it. If not defined it will be undefined.
program.option('-s, --studentName <name>', 'Add a student name');
// Add an option that takes a value and stores it, and if not defined will get a default value.
program.option('-f, --fileName <name>', 'Add a file with given name. [info.txt]', 'info.txt');
// You can automatically get the parsed floats/integers. Note that dash in name translated in to camel-case.
// N.B. if not parseable parseable null will be returned. parseInt rounds to float.
program.option('-r, --a-float <value>', 'Pass a float.', parseFloat);
program.option('-n, --an-integer <value>', 'Pass an integer.', parseInt);
// You can pass any function as action.
function list(value){
    return value.split(';')
}
// Be careful when you pass spaces, add quotes to fix this potential issue.
program.option('-p, --paths <items>', 'Paths, (separated by semicolons), to some resources.', list);

// Parsing of the arguments.
program.parse(process.argv);

console.log('verbose     : (%j, %j)', program.verbose, typeof program.verbose);
console.log('studentName : (%j, %j)', program.studentName, typeof program.studentName);
console.log('fileName    : (%j, %j)', program.fileName, typeof program.fileName);
console.log('aFloat      : (%j, %j)', program.aFloat, typeof program.aFloat);
console.log('anInteger   : (%j, %j)', program.anInteger, typeof program.anInteger);
console.log('paths       : (%j, %j)', program.paths, typeof program.paths);
// args contains all other arguments that are not an argument of a flag
console.log('Arguments  :: (%j, %j)', program.args, typeof program.args);

// commander has a built-in flag -h or --help that lists all the available options that can be set
// > node argparser.js -h
// > node argparser.js -v
// > node argparser.js -s olle
// > node argparser.js -r 3.14
// > node argparser.js -n 3.14
// > node argparser.js -n three
// > node argparser.js -p "C:\folder w sp\trk.txt;C:\file.txt"
// > node argparser.js -p C:\folder w sp\trk.txt;C:\file.txt