(function (module) {
    "use strict";

    module.controller("ListRssController", ListRssController);

    ListRssController.$inject = [
        "blockUI",
        'NgTableParams',
        'rssService',
        'rssList'
    ];

    function ListRssController(blockUI, NgTableParams, rssService, rssList) {

        var blockedItem = blockUI.instances.get('blockUI');
        var rss = this;

        rss.tableParams = new NgTableParams({}, {
            dataset: rssList
        });

        rss.delete = function (rssItem) {
            blockedItem.start();
            rssService.delete(rssItem.id).then(function () {
                swal("Éxito!", "Se ha eliminado el Recurso RSS satisfactoriamente!", "success");
                rssService.all().then(function (response) {
                    rssList = response;
                    rss.tableParams = new NgTableParams({}, {
                        dataset: rssList
                    });
                    rss.tableParams.reload();
                });
            }).finally(function () {
                blockedItem.stop();
            });
        };

        rss.confirmDelete = function (rssItem) {
            swal({
                title: "¿Está seguro?",
                text: "Está seguro que desea eliminar el Recurso RSS : " + rssItem.name,
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3c8dbc",
                confirmButtonText: "Si, estoy seguro!",
                cancelButtonText: "No",
                closeOnConfirm: true
            }, function () {
                rss.delete(rssItem);
            });
        };
    }
})(angular.module('app.rss'));