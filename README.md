webgme-domain-tools
===================

Domain specific tools for WebGME

* Run webgme `node app.js`, goto localhost:8888
* Run interpreter `node run_interpreter.js`

Close with `ctrl + C`

# Testing
## Running tests defined in java script file.
`mocha test/examples/jsbasic/test_baseclass.js`
## Running same tests with covarage
`mocha --require blanket -R html-cov > coverage.html test/examples/jsbasic/test_baseclass.js`