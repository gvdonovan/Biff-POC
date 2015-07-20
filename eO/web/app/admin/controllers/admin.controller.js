(function () {
    'use strict';

    angular
        .module('app.admin')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['logger','$state', 'routerHelper'];
    /* @ngInject */
    function AdminController(logger, $state, routerHelper) {
        var vm = this;
        vm.title = 'Admin';

        activate();

        function activate() {
            logger.info('Activated Admin View');        
        }
    }
})();
