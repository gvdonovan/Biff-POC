(function () {
    'use strict';

    angular
        .module('app')
        .directive('loadingspinner', loadingspinner)

    .directive('obdatepicker', obDatepicker)

    .directive('formatNumber', formatNumber);

    /* @ngInject */
    function loadingspinner() {
        var directive = {
            restrict: 'E',
            template: '<div id="loading"><i class="fa fa-cog fa-3x fa-spin vertical-center icon-orange"></i></div>',
            replace: true
        };

        return directive;
    }

    function obDatepicker() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModelCtrl) {
                $(function () {
                    element.datetimepicker({
                        timepicker: false,
                        format: 'm-d-y',
                        closeOnDateSelect: true,
                        onSelectDate: function (date) {
                            var dateString = moment(date).format("MM-DD-YY");
                            ngModelCtrl.$setViewValue(dateString);
                            scope.$apply();
                        }
                    });
                });
            }
        }
    }

    function formatNumber($filter) {
        return {
            require: '?ngModel',
            link: function (scope, elem, attrs, ctrl) {
                if (!ctrl) return;

                ctrl.$formatters.unshift(function (a) {
                    return $filter('number')(ctrl.$modelValue);
                });

                ctrl.$parsers.unshift(function (viewValue) {
                    var plainNumber = viewValue.replace(/[^\d|\-+|\.+]/g, '');
                    elem.val($filter('number')(plainNumber));
                    return plainNumber;
                });
            }
        };
    }


})();
