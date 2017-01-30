(function (module) {
    "use strict";

    module.controller("AddRssController", AddRssController);

    AddRssController.$inject = [
        'rssService',
        'blockUI',
        '$state'
    ];

    function AddRssController(rssService, blockUI, $state) {

        var addRss = this;
        var blockedItem = blockUI.instances.get('blockUI');

        addRss.params = {};
        addRss.title = "Agregar";
        addRss.content = "Formulario de Registro de Recurso RSS";
        addRss.icon = "fa-plus";
        addRss.main = "Agregar Recurso RSS";

        addRss.redirect = function () {
            $state.go("home.rss", {}, {reload: true});
        };

        /**
         * Stores a new rss by using the information contained in addRss.params Object
         */
        addRss.save = function () {

            blockedItem.start();
            addRss.showErrors = false;

            rssService
                .create(addRss.params)
                .then(function () {
                    swal("Éxito!", "Se ha guardado el Recurso RSS!", "success");
                    addRss.redirect();
                })
                .catch(function (error) {
                    if (error.status === 400) {
                        addRss.errors = error.data.errors;
                        addRss.showErrors = true;
                    }
                })
                .finally(function () {
                    blockedItem.stop();
                });
        };
    }

})(angular.module("app.rss"));