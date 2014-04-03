/**
 * Created by pmeijer on 4/2/2014.
 */
'use strict';
if (typeof window === 'undefined') {

    // server-side setup
    var requirejs = require("requirejs");
    requirejs.config({
        baseUrl: '.',
        // TODO: populate plugin list dynamically based on config.json
        paths: {
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
            "plugin/PetriNetExporter": "./src/plugins/PetriNet"
        },
        nodeRequire: require
    });

    var chai = require('chai'),
        should = chai.should(),
        assert = chai.assert,
        expect = chai.expect;
}

// /^v?((\d+)\.(\d+)\.(\d+))(?:-([\dA-Za-z\-]+(?:\.[\dA-Za-z\-]+)*))?(?:\+([\dA-Za-z\-]+(?:\.[\dA-Za-z\-]+)*))?$/
var semanticVersionPattern = /^\d+\.\d+\.\d+$/;

var pluginList = [
    'plugin/Children/Children/Children',
    'plugin/ChildrenConfig/ChildrenConfig/ChildrenConfig'];

describe("Test PluginBase API", function() {

    var PluginBase;
    before(function(done){

        requirejs(['plugin/PluginBase'], function(PluginBase_){
            PluginBase = PluginBase_;
            done();
        });
    });

    afterEach(function() {

    });

    it ('getVersion', function() {
        var pluginBase = new PluginBase();
        expect(semanticVersionPattern.test(pluginBase.getVersion())).to.be.true;
    });

    it ('getDescription', function() {
        var pluginBase = new PluginBase(),
            description = pluginBase.getDescription();
        expect(typeof description === 'string' || description instanceof String).to.be.true;
    });

    it ('getName', function() {
        var pluginBase = new PluginBase();
        (function () {
            pluginBase.getName()
        }).should.throw(Error);
    });
});

// TODO: Generate these on the fly based on pluginList.

describe("Test PluginBase API on instances 0", function() {
    var PluginBase;
    before(function(done){
        requirejs([pluginList[0]], function(Plugin){
            PluginBase = Plugin;
            done();
        });
    });

    afterEach(function() {

    });

    it ('getVersion', function() {
        var pluginBase = new PluginBase();
        expect(semanticVersionPattern.test(pluginBase.getVersion())).to.be.true;
    });

    it ('getDescription', function() {
        var pluginBase = new PluginBase(),
            description = pluginBase.getDescription();
        expect(typeof description === 'string' || description instanceof String).to.be.true;
    });

    it ('getName', function() {
        var pluginBase = new PluginBase(),
            name = pluginBase.getName();
        expect(typeof name === 'string' || name instanceof String).to.be.true;
    });
});

describe("Test PluginBase API on instances 1", function() {
    var PluginBase;
        before(function(done){
            requirejs([pluginList[1]], function(Plugin){
                PluginBase = Plugin;
                done();
            });
        });

    afterEach(function() {

    });

    it ('getVersion', function() {
        var pluginBase = new PluginBase();
        expect(semanticVersionPattern.test(pluginBase.getVersion())).to.be.true;
    });

    it ('getDescription', function() {
        var pluginBase = new PluginBase(),
            description = pluginBase.getDescription();
        expect(typeof description === 'string' || description instanceof String).to.be.true;
    });

    it ('getName', function() {
        var pluginBase = new PluginBase(),
            name = pluginBase.getName();
        expect(typeof name === 'string' || name instanceof String).to.be.true;
    });
});