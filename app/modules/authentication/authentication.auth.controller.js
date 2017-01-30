(function (module) {
    "use strict";

    module.controller("AuthController", AuthController);

    AuthController.$inject = [
        'authenticationService',
        '$state',
        'blockUI'
    ];

    function AuthController(authenticationService, $state, blockUI) {
        var auth = this;
        var blockedItem = blockUI.instances.get('blockUI');
        auth.credentials = {};

        if ($state.params.message) {
            auth.error = $state.params.message;
            auth.showErrors = true;
        }

        /**
         * Tries to authenticate an user if the credentials are correct and the
         * form is valid
         */
        auth.authenticate = function (formAuthenticateUser) {

            if (formAuthenticateUser.$invalid) {
                return;
            }

            blockedItem.start();
            auth.sending = true;
            auth.showErrors = false;

            authenticationService.authenticate(auth.credentials)
                .then(function () {
                    $state.go("home.users");
                })
                .catch(function (error) {
                    if (error.status === 400) {
                        auth.error = error.data.error;
                    }
                    else if (error.status === 401) {
                        swal("ERROR!", "El usuario y/o la contraseña no coinciden", "error");
                    }
                    else {
                        auth.error = "Error en el sistema. Contacte al administrador";
                    }
                    auth.showErrors = true;

                })
                .finally(function () {
                    formAuthenticateUser.$submitted = false;
                    auth.sending = false;
                    blockedItem.stop();
                });
        };
    }

})(angular.module('app.authentication'));