(function (module) {
    "use strict";

    module.service('reportsService', reportsService);

    reportsService.$inject = [
        'Restangular',
        '$http',
        "APP_DEFAULTS"
    ];

    function reportsService(Restangular, $http, APP_DEFAULTS) {
        /*jshint validthis: true */
        var reports = this;

        reports.getEvents = function () {

            return $http({
                url: APP_DEFAULTS.ENDPOINT + "/stats/event-types",
                method: 'GET'
            });
        };

        reports.execQuery = function (data) {
            return Restangular.all('stats').customPOST(data, 'exec-query');
        };

        return reports;
    }

})(angular.module("app.reports"));