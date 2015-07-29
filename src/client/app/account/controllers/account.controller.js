(function () {
    'use strict';

    angular
        .module('app.account')
        .controller('accountController', AccountController);

    AccountController.$inject = ['logger','$state', 'routerHelper', 'accountService'];
    /* @ngInject */
    function AccountController(logger, $state, routerHelper, accountService) {
        var vm = this;
        vm.title = 'Account';
        vm.account = {};

        activate();

        function activate() {
            logger.info('Activated Account View');

            accountService.getTransformedAccount().then(function(data){
                vm.account = data;
                vm.account.validate();
                console.warn(data);
            })
        }
    }
})();
