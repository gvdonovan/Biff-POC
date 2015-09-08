(function () {
    'use strict';

    angular
        .module('app.quickSearchConfig')
        .controller('ProductsController', ProductsController);

    ProductsController.$inject = ['logger', '$stateParams', '$state'];
    /* @ngInject */
    function ProductsController(logger, $stateParams, $state) {
        var vm = this;
        vm.editMode = false;
        vm.formId = null;
        vm.next = next;
        vm.previous = previous;

        activate();

        function activate() {
            vm.editMode = $stateParams.editMode;
            vm.formId = $stateParams.formId;
        }

        function next() {
            $state.go('quickSearchConfigLoanOfficers', {editMode: vm.editMode, formId: vm.formId});
        }

        function previous() {
            $state.go('quickSearchConfigDefaults', {editMode: vm.editMode, formId: vm.formId});
        }
    }
})();