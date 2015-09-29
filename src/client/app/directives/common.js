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

                ctrl.$parsers.unshift(function (viewValue) {
                    var plainNumber = viewValue.replace(/[^0-9.]/g, "");
                    var places = decimalPlaces(plainNumber);
                    if(places > attrs.formatNumber){
                        places = attrs.formatNumber;
                    }
                    if(!(plainNumber.slice(-1) === '.')) {
                        elem.val($filter('number')(plainNumber, places));
                        plainNumber = $filter('number')(plainNumber, places);
                        plainNumber = plainNumber.replace(/[^0-9.]/g, "");
                    }
                    return plainNumber;
                });

                function decimalPlaces(num) {
                    var match = (''+num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
                    if (!match) { return 0; }
                    return Math.max(
                        0,
                        // Number of digits right of decimal point.
                        (match[1] ? match[1].length : 0)
                            // Adjust for scientific notation.
                        - (match[2] ? +match[2] : 0));
                }
            }
        };
    }
})();
