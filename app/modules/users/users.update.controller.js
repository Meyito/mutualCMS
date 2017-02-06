(function (module) {
    "use strict";

    module.controller("UpdateUserController", AddUserController);

    AddUserController.$inject = [
        'usersService',
        'blockUI',
        '$state',
        'selectedUser'
    ];

    function AddUserController(usersService, blockUI, $state, selectedUser) {

        var addUser = this;
        var blockedItem = blockUI.instances.get('blockUI');

        addUser.params = selectedUser;
        addUser.title = "Actualizar";
        addUser.content = "Formulario de Actualización de Usuarios";
        addUser.icon = "fa-edit";
        addUser.main = "Actualizar Usuario";
        addUser.isUpdate = true;
        addUser.updatingUser = $state.current.name !== "home.profile";

        addUser.redirect = function () {
            if (addUser.updatingUser) {
                $state.go("home.users", {}, {reload: true});
            }
        };

        /**
         * Stores a new user by using the information contained in register.params Object
         */
        addUser.save = function () {

            blockedItem.start();
            addUser.showErrors = false;

            usersService
                .update(addUser.params)
                .then(function () {
                    swal("Éxito!", "Se ha actualizado el Usuario!", "success");
                    addUser.redirect();
                })
                .catch(function (error) {
                    if (error.status === 400) {
                        addUser.errors = error.data.errors;
                        addUser.showErrors = true;
                        $("html, body").animate({scrollTop: 0}, "slow");
                    }
                })
                .finally(function () {
                    blockedItem.stop();
                });
        };
    }

})(angular.module("app.users"));