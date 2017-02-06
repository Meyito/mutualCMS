(function () {
    'use strict';

    angular.module('app', [
        'app.constants',
        'app.users',
        'app.rss',
        'app.reports',
        'app.authentication',
        'app.challenges',
        'app.excel',
        'ngAnimate',
        'ui.bootstrap',
        'anim-in-out',
        'restangular',
        'blockUI',
        'inform',
        'angularMoment'
    ]).config(routeConfig);

    routeConfig.$inject = [
        '$urlRouterProvider',
        'stateHelperProvider',
        '$compileProvider'
    ];

    function routeConfig($urlRouterProvider, stateHelperProvider, $compileProvider) {

        $urlRouterProvider.otherwise("/login");

        stateHelperProvider
            .state({
                name: 'home',
                url: '/home',
                abstract: true,
                templateUrl: 'app/modules/home/home.html',
                controller: 'HomeController as home',
                resolve: {
                    currentUser: ['usersService', 'authenticationService', function (usersService, authenticationService) {
                        var token = authenticationService.getToken();
                        return usersService.find(token.userId);
                    }]
                },
                children: [
                    {
                        name: 'profile',
                        url: '/profile',
                        templateUrl: 'app/modules/users/users.add.html',
                        controller: 'UpdateUserController as addUser',
                        data: {label: 'Actualizar Perfil'},
                        resolve: {
                            selectedUser: ['usersService', 'authenticationService',
                                function (usersService, authenticationService) {
                                    var token = authenticationService.getToken();
                                    return usersService.find(token.userId);
                                }]
                        }
                    }
                ]
            });

        $compileProvider.debugInfoEnabled(ENABLE_ANGULAR_DEBUG); // jshint ignore:line
    }

})();