(function (module) {
    "use strict";

    module.service('reportsService', reportsService);

    reportsService.$inject = [
        'Restangular',
        '$http',
        "APP_DEFAULTS",
        "authenticationService",
        "$window"
    ];

    function reportsService(Restangular, $http, APP_DEFAULTS, authenticationService, $window) {
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

        reports.export = function (data) {

            var token = authenticationService.getToken();
            var events = encodeURIComponent(JSON.stringify(data));
            var url = APP_DEFAULTS.ENDPOINT + "/stats/exec-queries-to-file?events=" + events +
                "&access_token=" + token.id;
            $window.open(url);
        };

        return reports;
    }

})(angular.module("app.reports"));