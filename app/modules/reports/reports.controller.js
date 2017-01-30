(function (module) {
    "use strict";

    module.controller("ReportController", ReportController);

    ReportController.$inject = [
        "blockUI",
        "events",
        "reportsService",
        "$http",
        "APP_DEFAULTS"
    ];

    function ReportController(blockUI, events, reportsService, $http, APP_DEFAULTS) {

        var blockedItem = blockUI.instances.get('blockUI');
        var report = this;

        report.filters = [
            {}
        ];

        report.events = _.map(events.data, function (value) {
            return value;
        });

        report.addFilter = function () {
            report.filters.push({});
        };

        report.removeFilter = function (filter) {
            var index = report.filters.indexOf(filter);
            report.filters.splice(index, 1);
        };

        report.checkFilter = function (filter) {

            filter.value = filter.group = filter.selectedOperator = undefined;

            if (filter.selectedField &&
                filter.selectedField.type.name === "reference" &&
                filter.selectedField.type.operators.length &&
                !filter.selectedField.references) {
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

        report.query = function () {

            blockedItem.start();

            report.result = undefined;
            var data = {
                eventName: report.selectedEvent.name,
                filter: getFilters()
            };

            reportsService.execQuery(data).then(function (response) {
                report.result = response;
            }).finally(function () {
                blockedItem.stop();
            });
        };

        report.clearFilters = function () {
            report.filters = [
                {}
            ];
        };

        function getFilters() {

            return report.filters.map(function (filter) {
                return {
                    field: filter.selectedField.name,
                    operator: filter.selectedOperator,
                    value: filter.selectedField.type.name == "date" ? new Date(filter.value) : filter.value,
                    group: filter.group
                };
            });
        }

    }
})(angular.module('app.reports'));