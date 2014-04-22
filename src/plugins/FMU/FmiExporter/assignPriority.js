// Test method to assign priority to FMUs in FMI Model Exchange

//var file = "C:\\Users\\J\\Downloads\\ModelExchangeConfig\\flat_model_config.js",
var file = "C:\\Users\\J\\Downloads\\ModelExchangeConfig\\model_exchange_config.json",
    fs = require('fs'),
    fileData,
    fmuMap,
    connMap,
    fmuList = [];

fs.readFile(file, 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }

    fileData = JSON.parse(data);
    fmuMap = fileData.FMUs;
    connMap = fileData.Connections;

    var fmuMapKeys = Object.keys(fmuMap),
        i,
        j,
        fmuList;

    for (i = 0; i < fmuMapKeys.length; i += 1) {
        var fmuKey = fmuMapKeys[i],
            fmu = fmuMap[fmuKey],
            srcPriority = fmu.Priority;

        if (srcPriority === 1) {
            followConnections(fmuKey, fmu);
            fmuList.push(fmu);
        }
    }

});

followConnections = function (srcFmuId, srcFmu) {
    var outputs = srcFmu['Outputs'],
        outputIds = Object.keys(outputs),
        srcPriority = srcFmu.Priority,
        dstPriority = srcPriority + 1,
        numberOutputs = outputIds.length,
        j;

    if (numberOutputs === 0) {
        return;
    }

    for (j = 0; j < outputIds.length; j += 1) {
        var connMapKey = srcFmuId + '.' + outputIds[j];

        if (!connMap.hasOwnProperty(connMapKey)) {
            return;
        }

        var connectedInput = connMap[connMapKey].split('.'),
            dstFmuId = connectedInput[0],
            dstFmu = fmuMap[dstFmuId];

        if (dstFmu.Priority < dstPriority) {
            dstFmu.Priority = dstPriority;
        }

        fmuList.push(dstFmu);

        followConnections(dstFmuId, dstFmu);


        //fmuMap[dstFmuId] = dstFmu;
    }
};

