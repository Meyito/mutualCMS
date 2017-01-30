(function () {
    'use strict';

    angular
        .module('app.users', [
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
            name: 'home.users',
            url: '/usuarios',
            templateUrl: 'app/modules/users/users.list.html',
            controller: 'ListUsersController as users',
            data: {label: "Usuarios"},
            resolve: {
                usersList: ['usersService', function (usersService) {
                    return usersService.all();
                }]
            },
            children: [
                {
                    name: 'add',
                    url: '/agregar',
                    views: {
                        '@home': {
                            templateUrl: 'app/modules/users/users.add.html',
                            controller: 'AddUserController as addUser',
                        }
                    },
                    data: {label: "Agregar Usuario"}
                },
                {
                    name: 'update',
                    url: '/:userID',
                    views: {
                        '@home': {
                            templateUrl: 'app/modules/users/users.add.html',
                            controller: 'UpdateUserController as addUser',
                        }
                    },
                    data: {label: "Actualizar Usuario"},
                    resolve: {
                        selectedUser: ['usersService', '$stateParams', function (usersService, $stateParams) {
                            return usersService.find($stateParams.userID);
                        }]
                    }
                }
            ]
        });
    }

})();