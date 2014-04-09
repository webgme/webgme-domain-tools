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

TODO: ...

### Plugin ###

TODO: ...

### Server side tests ###

TODO: ...

### Client side tests ###

TODO: ...