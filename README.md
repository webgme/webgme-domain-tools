# webgme-domain-tools #

Domain specific tools for WebGME.

* Run webgme `node app.js`, goto localhost:8888
* Run interpreter `node run_interpreter.js`

## Testing, coverage, style and documentation on Windows ##


### Run tests defined in java-script file. ###

`node_modules\.bin\mocha test/examples/jsbasic/test_baseclass.js`



### Run same tests with coverage. ###

`node_modules\.bin\mocha --require blanket -R html-cov > coverage.html test/examples/jsbasic/test_baseclass.js`


### Generate documentation. ###

`node_modules\.bin\bfdocs bfdocs.manifest.json`


### Run JSLint on java-script files.
`node_modules\.bin\jslint src\examples\**\*.js`
