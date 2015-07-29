(function () {
    'use strict';

    angular
        .module('app.obui')
        .controller('obuiController', ObuiController);

    ObuiController.$inject = ['logger','$state', 'routerHelper'];
    /* @ngInject */
    function ObuiController(logger, $state, routerHelper) {
        var vm = this;
        vm.title = 'OBUI';
        vm.desc = 'Using AngularUI Bootstrap.'; 

        activate();

        function activate() {
            logger.info('Activated OB UI View');

            // do UI stuff
        }
    }
})();
