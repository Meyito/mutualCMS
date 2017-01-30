(function (module) {
    'use strict';

    module.controller("HomeController", HomeController);

    HomeController.$inject = [
        'authenticationService',
        'AUTH_DEFAULTS',
        '$state',
        'blockUI',
        'currentUser'
    ];

    function HomeController(authenticationService, AUTH_DEFAULTS, $state, blockUI, currentUser) {
        /*jshint validthis: true */
        var home = this;
        home.user = currentUser;

        home.logout = function () {
            blockUI.start();
            authenticationService.logout().then(function (response) {
                authenticationService.destroyToken();
                $state.go(AUTH_DEFAULTS.LOGIN_STATE);
            }).finally(function () {
                blockUI.stop();
            });
        };
    }
})(angular.module("app"));