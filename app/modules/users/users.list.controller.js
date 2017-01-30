(function (module) {
    "use strict";

    module.controller("ListUsersController", ListUsersController);

    ListUsersController.$inject = [
        "blockUI",
        'NgTableParams',
        'usersService',
        'usersList',
        'currentUser'
    ];

    function ListUsersController(blockUI, NgTableParams, usersService, usersList, currentUser) {

        var blockedItem = blockUI.instances.get('blockUI');
        var users = this;
        var currentAppUser = currentUser;

        users.tableParams = new NgTableParams({}, {
            dataset: usersList
        });

        users.delete = function (user) {
            blockedItem.start();
            usersService.delete(user.id).then(function () {
                swal("Éxito!", "Se ha eliminado el usuario satisfactoriamente!", "success");
                usersService.all().then(function (response) {
                    usersList = response;
                    users.tableParams = new NgTableParams({}, {
                        dataset: usersList
                    });
                    users.tableParams.reload();
                });
            }).finally(function () {
                blockedItem.stop();
            });
        };

        users.confirmDelete = function (user) {

            if (user.id === currentAppUser.id) {
                swal("Error!", "No puede eliminar el usuario actual", "error");
                return;
            }

            swal({
                title: "¿Está seguro?",
                text: "Está seguro que desea eliminar el usuario: " + user.name,
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3c8dbc",
                confirmButtonText: "Si, estoy seguro!",
                cancelButtonText: "No",
                closeOnConfirm: true
            }, function () {
                users.delete(user);
            });
        };
    }
})(angular.module('app.users'));