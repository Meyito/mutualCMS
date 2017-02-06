(function (module) {
    "use strict";

    module.constant("AUTH_DEFAULTS", {
        TOKEN_NAME: "token",
        LOGIN_STATE: "login",
        LANDING_PAGE: "home.reports",
        FORBIDDEN_STATE: "home.forbidden",
        DATE_FORMAT: "yyyy-MM-dd" //FIXME: Where should this constant be placed?
    });
})(angular.module('app.authentication'));