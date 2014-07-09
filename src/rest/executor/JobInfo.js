define([], function() {
    var JobInfo = function (parameters) {
        this.hash = parameters.hash;
        this.resultHashes = parameters.resultHashes || [];
        this.resultSuperSet = parameters.resultSuperSet || null;
        this.userId = parameters.userId || [];
        this.status = parameters.status || 'CREATED'; // TODO: define a constant for this
        this.startTime = parameters.startTime || null;
        this.finishTime = parameters.finishTime || null;
    };

    JobInfo.finishedStatuses = [ 'SUCCESS', 'ANALYSIS_FAILED' ];
    JobInfo.isFinishedStatus = function(status)
    {
        return JobInfo.finishedStatuses.indexOf(status) !== -1;
    }

    return JobInfo;
});