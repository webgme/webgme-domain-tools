define([], function () {
    var ClientRequest = function(parameters) {
        this.clientId = parameters.clientId || undefined;
        this.availableProcesses = parameters.availableProcesses || 0;
        this.runningJobs = parameters.runningJobs || [];
    }

    var ServerResponse = function(parameters) {
        this.jobsToStart = parameters.jobsToStart || [];
        this.refreshPeriod = parameters.refreshPeriod || 30 * 1000;
    };

    return { ClientRequest: ClientRequest, ServerResponse: ServerResponse };
});

