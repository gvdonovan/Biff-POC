//TODO: DH
(function () {
    'use strict';

    angular
        .module('app.quickSearchConfig')
        .controller('QSConfigResultsController', QSConfigResultsController);

    QSConfigResultsController.$inject = ['logger', '$stateParams', '$state', '$rootScope', 'quickSearchConfigService'];
    /* @ngInject */
    function QSConfigResultsController(logger, $stateParams, $state, $rootScope, quickSearchConfigService) {
        var vm = this;
        vm.editMode = false;
        vm.formId = null;
        vm.state = '';
        vm.resetForm = resetForm;
        vm.go = go;
        vm.next = next;
        vm.previous = previous;
        vm.isLastStep = true;
        vm.searchResults = {};

        vm.cancel = cancel;
        vm.save = save;

        activate();

        function activate() {
            vm.editMode = $stateParams.editMode;
            vm.formId = $stateParams.formId;
            vm.state = $state.current.name;

            initialize();
        }

        function initialize() {
            quickSearchConfigService.getResults().then(function (data) {
                vm.formFields = data.fields;
            });
        }

        function resetForm() {
            _.each(vm.formFields, function (item) {
                item.templateOptions.label = item.templateOptions.defaultLabel;
                item.templateOptions.visible = true;
            });

            $rootScope.isDirty = true;
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
            $state.go('quickSearchConfigLoanOfficers', {
                editMode: vm.editMode,
                formId: vm.formId
            });
        }

        function cancel() {
            initialize();
            $rootScope.isDirty = false;
        }

        function save() {
            //TODO post vm.data
            $rootScope.isDirty = false;
        }
    }
})();
