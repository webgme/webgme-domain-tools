/*
 * Copyright (C) 2014 Vanderbilt University, All rights reserved.
 *
 * Author: Zsolt Lattmann
 */

// TODO: implement a tool that generates this file since it has dynamic content

var tests = [];
for (var file in window.__karma__.files) {
    if (/Spec\.js$/.test(file)) {
        tests.push(file);
    }
}

//var CONFIG = requirejs('./config.json');
//console.log(CONFIG);

requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/base',


    paths: {
        // plugin base classes
        "plugin": "node_modules/webgme/plugin",

        // plugins
        // TODO: populate plugin list dynamically based on config.json
        "plugin/Children.Dsml": "./src/plugins/CyPhyLight",
        "plugin/CyPhyLight": "./src/plugins/CyPhyLight",
        "plugin/ModelicaImporter": "./src/plugins/CyPhyLight",
        "plugin/ModelicaImporter.Dsml": "./src/plugins/CyPhyLight",
        "plugin/Children": "./src/plugins/Examples",
        "plugin/ChildrenConfig": "./src/plugins/Examples",
        "plugin/ChildrenSaveArtifacts": "./src/plugins/Examples",
        "plugin/DuplicateActiveNode": "./src/plugins/Examples",
        "plugin/UsingTemplates": "./src/plugins/Examples",
        "plugin/DSMLAPIGenerator": "./src/plugins/META",
        "plugin/GetPrintAllObjects": "./src/plugins/FMU",
        "plugin/ImportFMUs": "./src/plugins/FMU",
        "plugin/PetriNetExporter": "./src/plugins/PetriNet",
        "plugin/CoreExamples": "./src/plugins/TestCore",

        // external libraries used by plugins
        "ejs": "./lib/ejs/ejs.min",

        // modules used by test cases
        "mocks": "./src/mocks"
    },

    shim: {
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});
