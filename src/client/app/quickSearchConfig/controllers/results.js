//TODO: DH
(function () {
    'use strict';

    angular
        .module('app.quickSearchConfig')
        .controller('QSConfigResultsController', QSConfigResultsController);

    QSConfigResultsController.$inject = ['logger', '$stateParams', '$state', '$rootScope', 'quickSearchConfigService', 'qsResultsService'];
    /* @ngInject */
    function QSConfigResultsController(logger, $stateParams, $state, $rootScope, quickSearchConfigService, qsResultsService) {
        var vm = this;
        vm.editMode = false;
        vm.formId = null;
        vm.state = '';
        vm.resetForm = resetForm;
        vm.go = go;
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
                vm.data = data;
                vm.formFields = data.fields.$values;
                _.each(vm.formFields, function (field) {
                    if (field.type === 'select') {
                        field.templateOptions.options = field.templateOptions.options.$values;
                    }
                });
            });

            qsResultsService.getResults(true).then(function (data) {
                vm.searchResults = data;
                console.log(vm.searchResults);
            });
        }

        function resetForm() {
            _.each(vm.formFields, function (item) {
                item.templateOptions.label = item.templateOptions.defaultLabel;
                item.templateOptions.visible = true;
                item.templateOptions.isDirty = true;
            });
            $rootScope.isDirty = true;
        }

        function go(state) {
            if (vm.editMode.toLowerCase() == 'true') {
                $state.go(state, {
                    editMode: vm.editMode,
                    formId: vm.formId
                });
            }
        }

        function cancel() {
            initialize();
            $rootScope.isDirty = false;
        }

        function save() {
            quickSearchConfigService.postResults(vm.data).then(function (data) {
                $rootScope.isDirty = false;
            });
        }
    }
})();
