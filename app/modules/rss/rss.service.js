(function (module) {
    "use strict";

    module.service('rssService', rssService);

    rssService.$inject = [
        'Restangular'
    ];

    function rssService(Restangular) {
        /*jshint validthis: true */
        var rss = this;
        rss.resource = "rss-resources";

        rss.create = function (newUser) {
            return Restangular.all(rss.resource).post(newUser);
        };
        
        /**
         * Gets the list of registered rss
         * @returns promise
         */
        rss.all = function (params) {
            return Restangular.one(rss.resource).get(params);
        };

        rss.find = function (id, params) {
            return Restangular.one(rss.resource, id).get(params);
        };

        rss.update = function (rssData) {
            return Restangular.one(rss.resource, rssData.id).customPUT(rssData);
        };

        rss.delete = function (id) {
            return Restangular.one(rss.resource, id).customDELETE();
        };

        return rss;
    }

})(angular.module("app.rss"));