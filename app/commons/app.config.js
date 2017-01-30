(function (module) {
    'use strict';

    module.config(appConfig);

    appConfig.$inject = [
        'uibDatepickerConfig',
        'uibDatepickerPopupConfig',
        'RestangularProvider',
        'blockUIConfig',
        'APP_DEFAULTS'
    ];

    function appConfig(uibDatepickerConfig, uibDatepickerPopupConfig, RestangularProvider, blockUIConfig,
                       APP_DEFAULTS) {

        /* Datepicker Settings */
        uibDatepickerConfig.startingDay = 1;
        uibDatepickerConfig.showWeeks = false;
        uibDatepickerPopupConfig.currentText = "Hoy";
        uibDatepickerPopupConfig.clearText = "Limpiar";
        uibDatepickerPopupConfig.closeText = "Cerrar";

        /* Restangular Settings */
        RestangularProvider.setBaseUrl(APP_DEFAULTS.ENDPOINT);

        /* Block UI Settings*/
        blockUIConfig.autoBlock = false;
        blockUIConfig.templateUrl = "app/commons/ui-blocker/state-change-blocker.tmpl.html";
    }

})(angular.module("app"));