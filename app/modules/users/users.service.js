(function (module) {
    "use strict";

    module.service('usersService', usersService);

    usersService.$inject = [
        'Restangular'
    ];

    function usersService(Restangular) {
        /*jshint validthis: true */
        var users = this;
        users.resource = "admin-accounts";

        users.create = function (newUser) {
            return Restangular.all(users.resource).post(newUser);
        };

        users.recoverPassword = function (email) {
            return Restangular.all(users.resource).customPOST({email: email}, 'recover-password');
        };

        users.getToken = function (params) {
            return Restangular.all(users.resource).customGET('token', params);
        };

        users.activate = function (token) {
            return Restangular.all(users.resource).customPOST({token: token}, 'activate');
        };

        users.changePassword = function (params) {
            return Restangular.all(users.resource).customPOST(params, 'change-password');
            //return Restangular.one(users.resource,params.user).customPOST(params,'change-password');
        };

        users.updatePassword = function (data) {
            return Restangular.all(users.resource).customPUT(data, 'update-password');
        };
        
        /**
         * Gets the list of registered users
         * @returns promise
         */
        users.all = function (params) {
            return Restangular.one(users.resource).get(params);
        };

        users.find = function (id, params) {
            return Restangular.one(users.resource, id).get(params);
        };

        users.update = function (user) {
            return Restangular.one(users.resource, user.id).customPUT(user);
        };

        users.delete = function (id) {
            return Restangular.one(users.resource, id).customDELETE();
        };

        return users;
    }

})(angular.module("app.users"));