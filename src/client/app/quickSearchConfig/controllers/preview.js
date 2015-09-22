//TODO: DH
(function () {
    'use strict';

    angular
        .module('app.quickSearchConfig')
        .controller('QuickSearchPreviewController', QuickSearchPreviewController);

    QuickSearchPreviewController.$inject = ['logger', '$stateParams', '$state', '$rootScope', 'quickSearchConfigService', 'qsResultsService'];
    /* @ngInject */
    function QuickSearchPreviewController(logger, $stateParams, $state, $rootScope, quickSearchConfigService, qsResultsService) {
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
        
        }

        function resetForm() {
        
        }

        function go(state) {
            if (vm.editMode.toLowerCase() == 'true') {
                $state.go(state, {
                    editMode: vm.editMode,
                    formId: vm.formId
                });
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
