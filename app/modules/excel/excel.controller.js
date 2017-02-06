(function (module) {
    "use strict";

    module.controller("ExcelController", ExcelController);

    ExcelController.$inject = [
        "blockUI",
        "events",
        "reportsService",
        "$http",
        "APP_DEFAULTS"
    ];

    function ExcelController(blockUI, events, reportsService, $http, APP_DEFAULTS) {

        var blockedItem = blockUI.instances.get('blockUI');
        var excel = this;

        excel.filters = [
            {}
        ];

        excel.events = _.map(events.data, function (value) {
            return value;
        });

        excel.addFilter = function () {
            excel.filters.push({});
        };

        excel.removeFilter = function (filter) {
            var index = excel.filters.indexOf(filter);
            excel.filters.splice(index, 1);
        };

        excel.checkFilter = function (filter) {

            filter.value = filter.group = filter.selectedOperator = undefined;

            if (filter.selectedField &&
                filter.selectedField.type.name === "reference" &&
                filter.selectedField.type.operators.length && !filter.selectedField.references) {
                blockedItem.start();
                $http({
                    method: "GET",
                    url: APP_DEFAULTS.ENDPOINT + filter.selectedField.endpoint
                }).then(function (response) {
                    filter.selectedField.references = response.data.map(function (item) {
                        item.name = item.name || item.label;
                        return item;
                    });
                }).finally(function () {
                    blockedItem.stop();
                });
            }
        };

        excel.export = function () {

            excel.result = undefined;
            var data = getData();

            reportsService.export(data);
        };

        excel.clearFilters = function () {
            excel.filters = [
                {}
            ];
        };

        function getData() {

            return excel.filters.map(function (filter) {
                return {
                    eventName: filter.selectedEvent.name,
                    filter: [
                        {
                            field: filter.selectedField.name,
                            operator: filter.selectedOperator,
                            value: filter.selectedField.type.name == "date" ? new Date(filter.value) :
                                filter.selectedField.type.name == "reference" ? filter.value.id : filter.value,
                            label_value: filter.selectedField.type.name == "date" ? new Date(filter.value) :
                                filter.selectedField.type.name == "reference" ? filter.value.name : filter.value,
                            group: filter.group
                        }
                    ]
                };
            });
        }

    }
})(angular.module('app.reports'));