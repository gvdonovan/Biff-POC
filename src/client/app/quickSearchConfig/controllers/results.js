//TODO: DH
(function () {
    'use strict';

    angular
        .module('app.quickSearchConfig')
        .controller('QSConfigResultsController', QSConfigResultsController);

    QSConfigResultsController.$inject = ['logger', '$stateParams', '$state'];
    /* @ngInject */
    function QSConfigResultsController(logger, $stateParams, $state) {
        var vm = this;
        vm.editMode = false;
        vm.formId = null;
        vm.state = '';
        vm.go = go;
        vm.next = next;
        vm.previous = previous;
        vm.isLastStep = true;

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
            return null;
        }

        function previous() {
            $state.go('quickSearchConfigLoanOfficers', {editMode: vm.editMode, formId: vm.formId});
        }
    }
})();