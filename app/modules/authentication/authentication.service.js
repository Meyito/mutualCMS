(function (module) {
    "use strict";

    module.service('authenticationService', authenticationService);

    authenticationService.$inject = [
        'Restangular',
        'MyStore',
        'AUTH_DEFAULTS',
        '$http',
        'APP_DEFAULTS',
        '$q',
        '$state'
    ];

    function authenticationService(Restangular, MyStore, AUTH_DEFAULTS, $http, APP_DEFAULTS, $q, $state) {
        /*jshint validthis: true */
        var auth = this;
        auth.resource = "authentication";

        auth.getToken = function () {
            return MyStore.get(AUTH_DEFAULTS.TOKEN_NAME);
        };

        auth.isTokenExpired = function () {
            var token = auth.getToken();
            return false;
        };

        auth.destroyToken = function () {
            return MyStore.remove(AUTH_DEFAULTS.TOKEN_NAME);
        };

        /**
         * Retrieves current authenticated user
         */
        auth.getUser = function () {

            var user = {};
            return user;
        };

        /**
         * Tries to authenticate an user
         * @param credentials user information for authentication
         * @returns {promise}
         */
        auth.authenticate = function (credentials) {

            var deferred = $q.defer();

            $http({
                url: APP_DEFAULTS.ENDPOINT + "/admin-accounts/login",
                method: 'POST',
                data: credentials
            }).then(function (response) {
                auth.setToken(response.data);
                deferred.resolve(auth.getUser());
            }, function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        };

        auth.logout = function () {
            return Restangular.all('admin-accounts').customPOST(undefined, 'logout');
        };

        /**
         * Saves the user in the local storage
         * @param token the user information
         */
        auth.setToken = function (token) {
            MyStore.set(AUTH_DEFAULTS.TOKEN_NAME, token);
        };

        return auth;
    }

})(angular.module('app.authentication'));