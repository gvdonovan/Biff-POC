//TODO: DH
(function () {
    'use strict';

    angular
        .module('app.quickSearchConfig')
        .controller('QuickSearchPreviewController', QuickSearchPreviewController);

    QuickSearchPreviewController.$inject = ['logger', '$stateParams', '$q', '$state', '$rootScope', 'quickSearchConfigService', 'qsResultsService', 'spaConfig'];
    /* @ngInject */
    function QuickSearchPreviewController(logger, $stateParams, $q, $state, $rootScope, quickSearchConfigService, qsResultsService, spaConfig) {
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
        vm.selectedOfficer = null;
        vm.loanOfficers = [
            {
                id: '1',
                name: 'Officer A'
            },
            {
                id: '2',
                name: 'Officer B'
            },
            {
                id: '3',
                name: 'Officer C'
            }
        ];

        vm.formFields;
        vm.formModel;

        vm.navigationUrl = navigationUrl;
        vm.wizardButtonsUrl = wizardButtonsUrl;

        activate();

        function activate() {
            vm.editMode = $stateParams.editMode;
            vm.formId = $stateParams.formId;
            vm.state = $state.current.name;

            initialize();
        }

        function initialize() {

            $q.all([
                    qsResultsService.getFormConfig()
                ]).then(function (data) {
                vm.data = data[0];
                vm.formFields = data[0].fields;

            })

            qsResultsService.getResults(true).then(function (data) {
                vm.searchResults = data;
                console.log(vm.searchResults);
            });


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

        function navigationUrl() {
            return spaConfig.spaFolder + 'app/quickSearchConfig/views/partials/navigation.html';
        }

        function wizardButtonsUrl() {
            return spaConfig.spaFolder + 'app/quickSearchConfig/views/partials/wizardButtons.html';
        }
    }
})();
