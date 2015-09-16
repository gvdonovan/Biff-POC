//TODO: DH
(function () {
    'use strict';

    angular
        .module('app.quickSearchConfig')
        .controller('QSConfigGeneralController', QSConfigGeneralController);

    QSConfigGeneralController.$inject = ['logger', '$stateParams', '$state', '$rootScope'];
    /* @ngInject */
    function QSConfigGeneralController(logger, $stateParams, $state, $rootScope) {
        var vm = this;
        vm.editMode = false;
        vm.formId = null;
        vm.state = '';
        vm.go = go;
        vm.next = next;
        vm.previous = previous;
        vm.cancel = cancel;
        vm.save = save;

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
            $state.go('quickSearchConfigInputs', {
                editMode: vm.editMode,
                formId: vm.formId
            });
        }

        function previous() {
            $state.go('quickSearchConfig', {
                editMode: vm.editMode,
                formId: vm.formId
            });
        }

        function cancel() {
            $rootScope.isDirty = false;
        }

        function save() {
            //TODO post vm.data
            $rootScope.isDirty = false;
        }
    }
})();
