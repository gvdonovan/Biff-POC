(function () {
    'use strict';

    angular
        .module('blocks.modal')
        .controller('confirmModalController', ConfirmModalController);

    ConfirmModalController.$inject = ['logger', '$modalInstance', 'items'];
    /* @ngInject */
    function ConfirmModalController(logger, $modalInstance, items) {
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
