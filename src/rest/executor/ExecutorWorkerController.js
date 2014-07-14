/**
 * Created by kevin on 7/14/2014.
 */

define([], function () {
    var ExecutorWorkerController = function ($scope, worker) {
        this.$scope = $scope;
        this.$scope.jobs = { };
        this.worker = worker;

        this.initialize();
    };

    ExecutorWorkerController.prototype.update = function () {
        if (!this.$scope.$$phase) {
            this.$scope.$apply();
        }
    };

    ExecutorWorkerController.prototype.initialize = function () {
        var self = this;
        if (self.worker) {
            self.worker.on('jobUpdate', function (jobInfo) {
                self.$scope.jobs[jobInfo.hash] = jobInfo;
                self.update();
            });
        } else {
            self.initTestData();
        }
    };

    ExecutorWorkerController.prototype.initTestData = function () {
        var self = this;
        self.$scope.jobs = { job1: { status: 'asdf' },
            job2: { status: 'asdf' }};
    };

    return ExecutorWorkerController;
});
