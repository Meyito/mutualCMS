(function () {
    'use strict';

    angular
        .module('app.rss', [
            'ui.router',
            'ui.router.stateHelper',
            'ngTable'
        ])
        .config(routeConfig);

    routeConfig.$inject = [
        'stateHelperProvider'
    ];

    function routeConfig(stateHelperProvider) {

        stateHelperProvider.state({
            name: 'home.rss',
            url: '/rss',
            templateUrl: 'app/modules/rss/rss.list.html',
            controller: 'ListRssController as rss',
            data: {label: "Recursos RSS"},
            resolve: {
                rssList: ['rssService', function (rssService) {
                    return rssService.all();
                }]
            },
            children: [
                {
                    name: 'add',
                    url: '/agregar',
                    views: {
                        '@home': {
                            templateUrl: 'app/modules/rss/rss.add.html',
                            controller: 'AddRssController as addRss',
                        }
                    },
                    data: {label: "Agregar Recurso RSS"}
                },
                {
                    name: 'update',
                    url: '/:rssID',
                    views: {
                        '@home': {
                            templateUrl: 'app/modules/rss/rss.add.html',
                            controller: 'UpdateRssController as addRss',
                        }
                    },
                    data: {label: "Actualizar Recurso RSS"},
                    resolve: {
                        selectedRss: ['rssService', '$stateParams', function (rssService, $stateParams) {
                            return rssService.find($stateParams.rssID);
                        }]
                    }
                }
            ]
        });
    }

})();