(function (module) {
    "use strict";

    module.controller("AddUserController", AddUserController);

    AddUserController.$inject = [
        'AUTH_DEFAULTS',
        'usersService',
        'blockUI',
        '$state'
    ];

    function AddUserController(AUTH_DEFAULTS, usersService, blockUI, $state) {

        var addUser = this;
        var blockedItem = blockUI.instances.get('blockUI');

        addUser.params = {};
        addUser.title = "Agregar";
        addUser.content = "Formulario de Registro de Usuarios";
        addUser.icon = "fa-plus";
        addUser.main = "Agregar Usuario";

        addUser.redirect = function () {
            $state.go("home.users", {}, {reload: true});
        };

        /**
         * Stores a new user by using the information contained in register.params Object
         */
        addUser.save = function () {

            blockedItem.start();
            addUser.showErrors = false;

            usersService
                .create(addUser.params)
                .then(function () {
                    swal("Éxito!", "Se ha guardado el Usuario!", "success");
                    addUser.redirect();
                })
                .catch(function (error) {
                    if (error.status === 400) {
                        addUser.errors = error.data.errors;
                        addUser.showErrors = true;
                    }
                })
                .finally(function () {
                    blockedItem.stop();
                });
        };
    }

})(angular.module("app.users"));