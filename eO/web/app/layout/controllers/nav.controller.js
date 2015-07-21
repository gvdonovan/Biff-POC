(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('NavController', NavController);

    NavController.$inject = ['$rootScope', '$timeout', 'config', 'logger'];
    /* @ngInject */
    function NavController($rootScope, $timeout, config, logger) {
        var vm = this;

        activate();

        function activate() {
            logger.log("NavController loaded");
        }


    }
})();
