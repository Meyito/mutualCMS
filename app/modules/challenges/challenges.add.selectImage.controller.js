(function (module) {
    "use strict";

    module.controller("SelectImageController", SelectImageController);

    SelectImageController.$inject = [
        "$uibModalInstance",
        "imageList",
        "APP_DEFAULTS"
    ];

    function SelectImageController($uibModalInstance, imageList, APP_DEFAULTS) {
        var images = this;

        images.imageList = imageList.map(function (item) {
            item.savePath = "/files/images/download/" + item.name;
            item.url = APP_DEFAULTS.ENDPOINT + item.savePath;
            return item;
        });

        images.ok = function () {
            $uibModalInstance.close(images.selectedImage);
        };

        images.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})(angular.module("app.challenges"));
