(function () {
    'use strict';

    angular
        .module('app.authentication', [
            'ui.router',
            'ui.router.stateHelper',
            'angular-storage',
            'ui.bootstrap',
            'ngMessages',
            'ngSanitize',
            'ui.select',
            'angular-storage',
            'app.constants',
            'blockUI'
        ])
        .config(routeConfig)
        .run(run)
        //Setting the namespace
        .factory('MyStore', ['store', function (store) {
            return store.getNamespacedStore(STORAGE_NAMESPACE); // jshint ignore:line
        }]);

    routeConfig.$inject = [
        'stateHelperProvider'
    ];

    function routeConfig(stateHelperProvider) {

        stateHelperProvider
            .state({
                name: 'login',
                url: '/login',
                templateUrl: 'app/modules/authentication/authentication.auth.html',
                controller: 'AuthController as auth',
                data: {label: "Acceder", loginNotRequired: true}
            });
    }

    run.$inject = [
        '$rootScope',
        '$state',
        'authenticationService',
        'AUTH_DEFAULTS',
        'blockUI'
    ];

    function run($rootScope, $state, authenticationService, AUTH_DEFAULTS, blockUI) {

        $rootScope.$on('$stateChangeStart', function (evt, to) {
            if ((to.data && !to.data.loginNotRequired) || !to.data) {
                if (!authenticationService.getToken()) {
                    evt.preventDefault();
                    blockUI.stop();
                    $state.go(AUTH_DEFAULTS.LOGIN_STATE,
                        {
                            message: "Debe iniciar sesión"
                        },
                        {
                            reload: true
                        });
                }
                else if (authenticationService.isTokenExpired()) {
                    evt.preventDefault();
                    blockUI.stop();
                    $state.go(AUTH_DEFAULTS.LOGIN_STATE,
                        {
                            message: "Debe iniciar sesión"
                        },
                        {
                            reload: true
                        });
                }
            } else if (authenticationService.getToken() && !authenticationService.isTokenExpired() &&
                to.name === AUTH_DEFAULTS.LOGIN_STATE) {
                evt.preventDefault();
                $state.go(AUTH_DEFAULTS.LANDING_PAGE);
            }
        });
    }

})();