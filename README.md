# webgme-domain-tools #

Domain specific tools for WebGME.

* Install nodejs
* Install mongodb _if_ you use a local database (not always necessary)
* Clone the repository (requires some git client)
* Install dependencies `npm install` (requires nodejs)

After everything is setup. See running WebGME server and Executing plugin section.

## npm packages ##

* [webgme](http://webgme.org) - using [directly](https://github.com/webgme/webgme) from GitHub master branch
* requirejs - load modules on server and client side
* ejs - templating library to generate files or source code
* commander - command line argument parser
* node-fs-extra - ?
* walk - ?

Updating `webgme` only use `npm install webgme`

If the package.json changes then:

* Run `npm list`
* If there are any errors in the packages use `npm prune` then `npm update`
* If you are still experiencing problems: delete the `node_modules` directory and run `npm install`

## Running WebGME server ##

* Run webgme `npm start` or `node app.js`, goto [localhost:8888](http://localhost:8888)

## Executing plugin ##

`node node_modules\webgme\bin\run_plugin.js --help` gives detailed description about the available command line flags.

Example: `node node_modules\webgme\bin\run_plugin.js -c config.json -p Test -n ChildrenConfig`

## Testing, coverage, style and documentation ##

### Linux and Mac OSX ###

* Run all tests under `test` folder: `npm test`
* Run all tests with coverage report under `test` folder: `npm test --coverage`. The coverage report is generated to `./coverage/lcov-report/index.html`.
* Generate documentation for all source files in src directory `npm run jsdoc`

### Windows ###

* Run all tests under `test` folder: `npm run test_win`
* Run all tests with coverage report under `test` folder: `npm run test_win --coverage`. The coverage report is generated to `./coverage/lcov-report/index.html`.
* Generate documentation for all source files in src directory `npm run jsdoc`


### Run tests defined in java-script file. ###

* On Windows: `node_modules\.bin\mocha test/examples/jsbasic/test_baseclass.js`
* On Linux and Mac OSX: `node_modules/.bin/mocha test/examples/jsbasic/test_baseclass.js`


### Run same tests with coverage. ###

* On Windows: `node_modules\.bin\istanbul.cmd --hook-run-in-context cover node_modules\mocha\bin\_mocha -- -R spec test/mocks/CoreMock.js`
* On Linux and Mac OSX: `node_modules/.bin/istanbul --hook-run-in-context cover node_modules/.bin/_mocha -- -R spec test/mocks/CoreMock.js`


### Run JSLint on java-script files. ###

* On Windows: `node_modules\.bin\jslint src\examples\**\*.js`
* On Linux and Mac OSX: `node_modules/.bin/jslint src\examples\**\*.js`


## Configuring WebStorm ##

For detailed information please see WebStorm documentation, which should be your primary source of information.
Here we collected a few step by step instructions to get started.

* File - Settings - Appearance - UI Options - Theme - Dracula
* File - Settings - Editor - Appearance - Show line numbers

### Plugin ###

Run - Edit Configurations ... - Add new configuration (+) - Node.js

* Change the configuration name to `MyPlugin`
* Working directory should have a full path to this directory. (webgme-domain-tools)
* Javascript file: `node_modules\webgme\bin\run_plugin.js`
* Application parameters: `-c config.json -p Test -n MyPlugin`

For additional parameters and their meaning run `node node_modules\webgme\bin\run_plugin.js --help`

* Select the configuration from the drop down list top right corner in WebStorm
* Click on the green play button to run the configuration
* Click on the debug button to debug your plugin as it runs on server side

### Server side tests ###

Run - Edit Configurations ... - Add new configuration (+) - Mocha

* Change the configuration name to `All tests`
* Test directory - click on `...` - select the `test` directory in this project (full path has to be set.)
* Check include all subdirectories
* Create another configuration for `Unit tests` directory.
* Create another configuration for `Functional tests` directory.
* Select the configuration from the drop down list `All tests` top right corner in WebStorm
* Click on the green play button to run all tests
    * Once the tests ran, you can toggle to run tests automatically. It will rerun the tests as you save the files.
* Click on the debug button to debug your tests

### Client side tests ###

Run - Edit Configurations ... - Add new configuration (+) - Karma

* Change the configuration name to `All client side tests`
* Configuration file: `webgme-domain-tools\karma.conf.js` (full path has to be set.)
* Select the configuration from the drop down list `All client side tests` top right corner in WebStorm
* Click on the green play button to run all tests (open one or more browsers in the link indicated by Karma)
    * Once the tests ran, you can toggle to run tests automatically. It will rerun the tests as you save the files.
* Click on the debug button to debug your tests
* Click on the run with coverage button to run your tests and get code coverage
    * It runs your tests in the browser(s) and brings all test results and coverage to WebStorm.
    * Each file test and source will have indicators next to the line number with a color green or red.