(function (module) {
    'use strict';

    module.run(run);

    run.$inject = [
        '$rootScope',
        'blockUI'
    ];

    function run($rootScope, blockUI) {

        /*UI Router behaviors*/
        $rootScope.$on('$stateChangeStart',
            function (event, toState, toParams, fromState, fromParams, options) {
                if (fromState.name !== toState.name) {
                    blockUI.start();
                }
            });

        $rootScope.$on('$stateChangeSuccess',
            function (event, toState, toParams, fromState, fromParams) {
                $rootScope.stateTitle = toState.data.label ? " - " + toState.data.label : "";
                blockUI.stop();
                blockUI.stop(); //Because if either token not found or invalid token, it's necessary call it twice
            });

        $rootScope.$on('$stateChangeError',
            function (event, toState, toParams, fromState, fromParams, error) {
                blockUI.stop();
            });

        $rootScope.$on('$stateNotFound',
            function (event, unfoundState, fromState, fromParams) {
                blockUI.stop();
            });
    }

})(angular.module("app"));