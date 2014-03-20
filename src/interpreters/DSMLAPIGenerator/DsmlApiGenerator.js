define(['fs','ejs'], function (fs, ejs) {
    "use strict";

    var DsmlApiGenerator = function () {
    };

    DsmlApiGenerator.prototype.doGUIConfig = function (preconfig, callback) {
        callback({});
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

        var metaTypes = [];

        for (var name in META) {
            if (META.hasOwnProperty(name)) {
                var metaType = {};
                metaType.name = core.getAttribute(META[name], 'name');
                metaType.srcEndPoints = [];
                metaType.dstEndpoints = [];
                metaType.children = [];
                metaType.ID = core.getPath(META[name]);
                metaType.GUID = core.getGuid(META[name]);

                metaTypes.push(metaType);
            }
        }

        metaTypes.sort(function (a, b) { return a.name.localeCompare(b.name); });

        var DOMAIN_TEMPLATE = fs.readFileSync('src/interpreters/DsmlApiGenerator/DOMAIN.js.ejs', 'utf8');

        var ret = ejs.render(DOMAIN_TEMPLATE, {
            projectName: 'CyPhyLight',
            metaTypes: metaTypes

//            nameGUIDmap: JSON.stringify(nameIDmap, undefined, 2)
        });

        console.log(ret);

        fs.writeFileSync('src/interpreters/DsmlApiGenerator/' + 'CyPhyLight' + '.Dsml.js', ret , 'utf8');

        console.log('done');
    };


    return DsmlApiGenerator;
});