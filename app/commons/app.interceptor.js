(function (module) {

    module.config(config);

    config.$inject = [
        "$httpProvider",
        "$provide"
    ];

    function config($httpProvider, $provide) {

        // register the interceptor as a service
        $provide.factory('myHttpInterceptor', myHttpInterceptor);

        myHttpInterceptor.$inject = [
            "$q",
            "MyStore",
            "AUTH_DEFAULTS",
            "$injector",
            'blockUI'
        ];

        function myHttpInterceptor($q, MyStore, AUTH_DEFAULTS, $injector, blockUI) {
            return {

                // optional method
                'request': function (config) {
                    var token = MyStore.get(AUTH_DEFAULTS.TOKEN_NAME);
                    if (token) {
                        config.headers.Authorization = token.id;
                    }
                    return config;
                },

                // optional method
                'responseError': function (rejection) {
                    if (rejection.status === 401 || rejection.status === 403) {
                        MyStore.remove(AUTH_DEFAULTS.TOKEN_NAME);
                        $injector.get('$state').transitionTo(AUTH_DEFAULTS.LOGIN_STATE);
                        blockUI.stop();
                    }
                    return $q.reject(rejection);
                }
            };
        }

        $httpProvider.interceptors.push('myHttpInterceptor');

    }


})(angular.module('app'));