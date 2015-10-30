/*jshint node: true*/
/**
 * @author lattmann / https://github.com/lattmann
 */

var config = require('webgme/config/config.default');
var path = require('path');
config.server.port = 8888;

config.mongo.uri = 'mongodb://129.59.105.224/multi';

config.plugin.basePaths = config.plugin.basePaths.concat([
    './src/plugins/Examples',
    './src/plugins/META',
    './src/plugins/FMU',
    './src/plugins/PetriNet',
    './src/plugins/LogicGates',
    './src/plugins/TestCore',
    './src/plugins/PortHamiltonianSystem',
    './src/plugins/Layout']);

config.requirejsPaths = {
    panels: './src/panels',
    widgets: './src/widgets',
    json2xml: './lib/json2xml',
    xmljsonconverter: './lib/xmljsonconverter',
    sax: './support/sax/sax',
    ejs: './support/ejs/ejs.min'
};

config.visualization.decoratorPaths.push('./src/decorators');
//config.client.usedDecorators = config.client.usedDecorators.concat(["PetriNetDecorator",
//                                                                    "LogicGatesDecorator",
//                                                                    "FunctionalFlowBlockDiagramDecorator",
//                                                                    "ActivityDiagramDecorator",
//                                                                    "BusinessProcessModelingDecorator"]);
config.visualization.visualizerDescriptors.push('./Visualizers.json');

config.executor.enable = true;

module.exports = config;