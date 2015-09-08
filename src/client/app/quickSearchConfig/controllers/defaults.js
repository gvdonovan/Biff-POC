//TODO: DH
(function () {
    'use strict';

    angular
        .module('app.quickSearchConfig')
        .controller('DefaultsController', DefaultsController);

    DefaultsController.$inject = ['logger', '$stateParams', '$state'];
    /* @ngInject */
    function DefaultsController(logger, $stateParams, $state) {
        var vm = this;
        vm.editMode = false;
        vm.formId = null;
        vm.state = '';
        vm.go = go;
        vm.next = next;
        vm.previous = previous;

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
            $state.go('quickSearchConfigProducts', {editMode: vm.editMode, formId: vm.formId});
        }

        function previous() {
            $state.go('quickSearchConfigInputs', {editMode: vm.editMode, formId: vm.formId});
        }
    }
})();