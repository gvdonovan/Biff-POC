(function () {
    'use strict';

    angular
        .module('app.loanApplication')
        .controller('applicationController', ApplicationController);

    ApplicationController.$inject = ['logger','$state'];
    /* @ngInject */
    function ApplicationController(logger, $state) {
        var vm = this;
        vm.title = '1003 Loan App';
        vm.page1 = 'This is Page 1';
        vm.page2 = 'This is Page 2';
        vm.page3 = 'This is Page 3';

        activate();

        function activate() {
            logger.info('Activated Application View');
            $state.go('loanApplication.page1');
        }
    }
})();
