angular
    .module('app.authentication')
    .directive('passwordMatch', passwordMatch)
    .directive('icheck', icheck);

/**
 * Matches two password fields
 */
function passwordMatch() {
    return {
        restrict: 'A',
        scope: true,
        require: 'ngModel',
        link: function (scope, elem, attrs, control) {
            var checker = function () {
                //get the value of the first password
                var e1 = scope.$eval(attrs.ngModel);

                //get the value of the other password
                var e2 = scope.$eval(attrs.passwordMatch);
                return e1 == e2;
            };
            scope.$watch(checker, function (n) {

                //set the form control to valid if both
                //passwords are the same, else invalid
                control.$setValidity("passwordMatch", n);
            });
        }
    };
}


icheck.$inject = [
    '$timeout',
    '$parse'
];

/**
 * Directive for icheck component
 */
function icheck($timeout, $parse) {
    return {
        compile: function (element, $attrs) {
            var icheckOptions = {
                checkboxClass: 'icheckbox_flat-aero',
                radioClass: 'iradio_flat-aero'
            };

            var modelAccessor = $parse($attrs.ngModel);
            return function ($scope, element, $attrs, controller) {

                var modelChanged = function (event) {
                    $scope.$apply(function () {
                        modelAccessor.assign($scope, event.target.checked);
                    });
                };

                $scope.$watch(modelAccessor, function (val) {
                    var action = val ? 'check' : 'uncheck';
                    element.iCheck(icheckOptions, action).on('ifChanged', modelChanged);
                });
            };
        }
    };
}