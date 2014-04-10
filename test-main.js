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

requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/base',

    // TODO: populate plugin list dynamically based on config.json
    paths: {
        "ejs": "./lib/ejs/ejs.min",
        "logManager": "common/LogManager",
        'plugin': 'node_modules/webgme/plugin',
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
        "mocks": "./src/mocks"
    },

    shim: {
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});
