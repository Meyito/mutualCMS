(function (module) {
    'use strict';

    module.controller("ModalController", ModalController);

    ModalController.$inject = [
        '$uibModalInstance'
    ];

    function ModalController($uibModalInstance) {
        var modal = this;
        modal.message = "hoa";

        modal.ok = function () {
            $uibModalInstance.close();
        };

        modal.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})(angular.module("app"));