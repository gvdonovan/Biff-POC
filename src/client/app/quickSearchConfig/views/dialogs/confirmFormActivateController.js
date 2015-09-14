(function () {
    'use strict';

    angular
        .module('app.quickSearchConfig')
        .controller('confirmFormActivateController', ConfirmFormActivateController);

    ConfirmFormActivateController.$inject = ['logger', '$modalInstance', 'items'];
    /* @ngInject */
    function ConfirmFormActivateController(logger, $modalInstance, items) {
        var vm = this;
        vm.title = '';
        vm.message = '';
        vm.ok = ok;
        vm.cancel = cancel;

        activate();

        function activate(){
            vm.title = items.title;
            vm.message = items.message;
        }

        function ok() {
            $modalInstance.close();
        }

        function cancel() {
            $modalInstance.dismiss('cancel');
        }
    }
})();
