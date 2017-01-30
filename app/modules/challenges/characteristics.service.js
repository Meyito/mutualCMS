(function (module) {
    "use strict";

    module.service('characteristicsService', characteristicsService);

    characteristicsService.$inject = [
        'Restangular'
    ];

    function characteristicsService(Restangular) {
        /*jshint validthis: true */
        var characteristics = this;
        characteristics.resource = "characteristics";

        /**
         * Gets the list of registered characteristics
         * @returns promise
         */
        characteristics.all = function (params) {
            return Restangular.one(characteristics.resource).get(params);
        };

        characteristics.find = function (id, params) {
            return Restangular.one(characteristics.resource, id).get(params);
        };

        return characteristics;
    }

})(angular.module("app.challenges"));