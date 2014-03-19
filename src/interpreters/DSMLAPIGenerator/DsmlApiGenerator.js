define(['fs','ejs'], function (fs, ejs) {
    "use strict";

    var DsmlApiGenerator = function () {
    };

    DsmlApiGenerator.prototype.run = function (config, callback) {
        var logger = console;

        logger.info('Run started..');

        var rootNode = config.rootNode,
            selectedNode = config.selectedNode,
            core = config.core,
            project = config.project,
            META = config.META,
            result;

        result = {'commitHash': config.commitHash};

        var nameIDmap = {};

        for (var name in META) {
            if (META.hasOwnProperty(name)) {
                nameIDmap[core.getAttribute(META[name], 'name')] = core.getPath(META[name]);
            }
        }

        var DOMAIN_TEMPLATE = fs.readFileSync('interpreters/DsmlApiGenerator/DOMAIN.js.ejs', 'utf8');

        var ret = ejs.render(DOMAIN_TEMPLATE, {nameGUIDmap: JSON.stringify(nameIDmap, undefined, 2)});
        console.log(ret);

        fs.writeFileSync('interpreters/DsmlApiGenerator/' + 'CyPhyLight' + '.js', ret , 'utf8');

        console.log('done');
    };


    return DsmlApiGenerator;
});