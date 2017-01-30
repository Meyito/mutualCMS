(function (module) {
    "use strict";

    module.service('categoriesService', categoriesService);

    categoriesService.$inject = [
        'Restangular'
    ];

    function categoriesService(Restangular) {
        /*jshint validthis: true */
        var categories = this;
        categories.resource = "categories";

        categories.create = function (newCategory) {
            return Restangular.all(categories.resource).post(newCategory);
        };

        /**
         * Gets the list of registered categories
         * @returns promise
         */
        categories.all = function (params) {
            return Restangular.one(categories.resource).get(params);
        };

        categories.find = function (id, params) {
            return Restangular.one(categories.resource, id).get(params);
        };

        categories.update = function (category) {
            return Restangular.one(categories.resource, category.id).customPUT(category);
        };

        categories.delete = function (id) {
            return Restangular.one(categories.resource, id).customDELETE();
        };

        return categories;
    }

})(angular.module("app.challenges"));