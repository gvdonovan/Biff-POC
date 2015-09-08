(function () {
    'use strict';

    angular
        .module('app.quickSearchConfig')
        .controller('LoanOfficersController', LoanOfficersController);

    LoanOfficersController.$inject = ['logger', '$stateParams', '$state'];
    /* @ngInject */
    function LoanOfficersController(logger, $stateParams, $state) {
        var vm = this;
        vm.editMode = false;
        vm.formId = null;
        vm.go = go;
        vm.next = next;
        vm.previous = previous;
        vm.state = '';

        activate();

        function activate() {
            vm.editMode = $stateParams.editMode;
            vm.formId = $stateParams.formId;
            vm.state = $state.current.name;
        }

        function go(state) {
            if (vm.editMode.toLowerCase() == 'true') {
                $state.go(state, {editMode: vm.editMode, formId: vm.formId});
            }
        }

        function next() {
            $state.go('quickSearchConfigResults', {editMode: vm.editMode, formId: vm.formId});
        }

        function previous() {
            $state.go('quickSearchConfigProducts', {editMode: vm.editMode, formId: vm.formId});
        }
    }
})();