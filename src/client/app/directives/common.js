(function () {
    'use strict';

    angular
        .module('app')
        .directive('loadingspinner', loadingspinner);

    /* @ngInject */
    function loadingspinner() {
        var directive = {
            restrict: 'E',
            template: '<div id="loading"><i class="fa fa-cog fa-3x fa-spin vertical-center icon-orange"></i></div>',
            replace: true
        };

        return directive;
    }
})();