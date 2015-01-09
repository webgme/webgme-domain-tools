/***
 * Initial test file, will be updated or removed!
 */

var requirejs = require('requirejs'),
    fs = require('fs'),
    CoreMock = requirejs('./CoreMock_v2'),
    core,
    fileName = 'flat_ADMEditor_b2.json',
    model,
    modelString;

modelString = fs.readFileSync(fileName, 'utf8');
model = JSON.parse(modelString);
core = CoreMock(model, {});

core.loadRoot(function(err, rootNode) {
    console.log(core.getAttribute(rootNode, 'name'));
    core.loadChildren(rootNode, function (err, children) {
        var i;
        for (i = 0; i < children.length; i += 1) {
            console.log(core.getAttribute(children[i], 'name'));
        }
    });
});

