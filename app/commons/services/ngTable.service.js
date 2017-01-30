(function (module) {
    "use strict";

    module.factory("NgTableService", NgTableService);

    NgTableService.$inject = [];

    function NgTableService() {
        var ngTable = this;

        ngTable.getParams = function (params) {

            var requestParams = params.url();
            requestParams.items = params.count();
            requestParams.count = true;
            requestParams.orderBy = params.sorting();
            var column, orderDirection;

            for (var key in params.sorting()) {
                column = key;
                orderDirection = params.sorting()[key];
            }

            return {
                items: params.count(),
                count: true,
                orderBy: column,
                orderDirection: orderDirection,
                page: params.page()
            };
        };

        return ngTable;

    }

})(angular.module('app'));