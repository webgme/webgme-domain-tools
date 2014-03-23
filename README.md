# webgme-domain-tools #

Domain specific tools for WebGME.

* Install nodejs
* Install mongodb if you use a local database
* Clone the repository
* Install dependent packages `npm install`
* Run webgme `npm start` or `node app.js`, goto localhost:8888
* Run interpreter `node run_interpreter.js`

## npm packages ##

* webgme - using GitHub master branch https://github.com/webgme/webgme
* ...

TODO - explain other packages and their purpose

Updating `webgme` only use `npm update webgme`


If the package.json changes then:

* Run `npm list`
* If there are any errors in the packages use `npm prune` then `npm update`
* If you are still experiencing problems: delete the `node_modules` directory and run `npm install`

## Testing, coverage, style and documentation ##

### Linux and Mac OSX ###

* Run all tests under `test` folder: `npm test`
* Run all tests with coverage report under `test` folder: `npm test --coverage`. The coverage report is generated to `./coverage/lcov-report/index.html`.
* Generate documentation for all source files in src directory `npm run jsdoc`


### Windows ###

TODO ...


### Run tests defined in java-script file. ###

* On Windows: `node_modules\.bin\mocha test/examples/jsbasic/test_baseclass.js`
* On Linux and Mac OSX: `node_modules/.bin/mocha test/examples/jsbasic/test_baseclass.js`


### Run same tests with coverage. ###

* On Windows: `node_modules\.bin\istanbul.cmd --hook-run-in-context cover node_modules\mocha\bin\_mocha -- -R spec test/mocks/CoreMock.js`
* On Linux and Mac OSX: `node_modules/.bin/istanbul --hook-run-in-context cover node_modules/.bin/_mocha -- -R spec test/mocks/CoreMock.js`


### Generate documentation. ###

* On Windows: `node_modules\.bin\bfdocs bfdocs.manifest.json`
* On Linux and Mac OSX: `node_modules/.bin/bfdocs bfdocs.manifest.json`


### Run JSLint on java-script files. ###

* On Windows: `node_modules\.bin\jslint src\examples\**\*.js`
* On Linux and Mac OSX: `node_modules/.bin/jslint src\examples\**\*.js`
