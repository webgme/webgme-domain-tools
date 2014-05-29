# webgme-domain-tools #

Domain specific tools for WebGME.

* Install nodejs.
* Install mongodb _if_ you use a local database (not always necessary)
* Clone the repository (requires some git client)
* Install dependencies `npm install` (requires nodejs)

After everything is setup. See running WebGME server and Executing plugin section.

## npm packages ##

* [webgme](http://webgme.org) - using [directly](https://github.com/webgme/webgme) from GitHub master branch
* requirejs - load modules on server and client side

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