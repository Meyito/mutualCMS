(function (module) {
    "use strict";

    module.controller("UpdateRssController", UpdateRssController);

    UpdateRssController.$inject = [
        'rssService',
        'blockUI',
        '$state',
        'selectedRss'
    ];

    function UpdateRssController(rssService, blockUI, $state, selectedRss) {

        var addRss = this;
        var blockedItem = blockUI.instances.get('blockUI');

        addRss.params = selectedRss;
        addRss.title = "Actualizar";
        addRss.content = "Formulario de Actualización de Recurso RSS";
        addRss.icon = "fa-edit";
        addRss.main = "Actualizar Recurso RSS";

        addRss.redirect = function () {
            $state.go("home.rss", {}, {reload: true});
        };

        /**
         * Stores a new rss by using the information contained in rss.params Object
         */
        addRss.save = function () {

            blockedItem.start();
            addRss.showErrors = false;

            rssService
                .update(addRss.params)
                .then(function () {
                    swal("Éxito!", "Se ha actualizado el Recurso RSS!", "success");
                    addRss.redirect();
                })
                .catch(function (error) {
                    if (error.status === 400) {
                        addRss.errors = error.data.errors;
                        addRss.showErrors = true;
                        $("html, body").animate({scrollTop: 0}, "slow");
                    }
                })
                .finally(function () {
                    blockedItem.stop();
                });
        };
    }

})(angular.module("app.rss"));