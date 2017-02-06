(function () {
    'use strict';

    angular
        .module('app.excel', [
            'ui.router',
            'ui.router.stateHelper'
        ])
        .config(routeConfig);

    routeConfig.$inject = [
        'stateHelperProvider'
    ];

    function routeConfig(stateHelperProvider) {

        stateHelperProvider.state({
            name: 'home.excel',
            url: '/exportar',
            templateUrl: 'app/modules/excel/excel.html',
            controller: 'ExcelController as excel',
            data: {label: "Exportar a Excel"},
            resolve: {
                events: ['reportsService', function (reportsService) {
                    return reportsService.getEvents();
                }]
            }
        });
    }

})();