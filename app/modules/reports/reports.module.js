(function () {
    'use strict';

    angular
        .module('app.reports', [
            'ui.router',
            'ui.router.stateHelper',
            'frapontillo.bootstrap-switch',
            'ngTable'
        ])
        .config(routeConfig);

    routeConfig.$inject = [
        'stateHelperProvider'
    ];

    function routeConfig(stateHelperProvider) {

        stateHelperProvider.state({
            name: 'home.reports',
            url: '/reportes',
            templateUrl: 'app/modules/reports/reports.html',
            controller: 'ReportController as report',
            data: {label: "Reportes"},
            resolve: {
                events: ['reportsService', function (reportsService) {
                    return reportsService.getEvents();
                }]
            }
        });
    }

})();