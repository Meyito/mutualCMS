(function (module) {
    'use strict';

    module.filter('moment', function () {
        return function (dateString, format) {
            if (dateString) {
                return moment(dateString).format(format);
            }
            return "No definida";
        };
    });

    module.filter('dateToISO', function() {
        return function(input) {
            return new Date(input).toISOString();
        };
    });

})(angular.module("app"));