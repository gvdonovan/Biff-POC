//TODO: DH
(function () {
    'use strict';

    angular
        .module('app.quickSearchConfig')
        .controller('QSConfigResultsController', QSConfigResultsController);

    QSConfigResultsController.$inject = ['logger', '$stateParams', '$state', '$rootScope', '$q', 'quickSearchConfigService', 'qsResultsService'];
    /* @ngInject */
    function QSConfigResultsController(logger, $stateParams, $state, $rootScope, $q, quickSearchConfigService, qsResultsService) {
        var vm = this;
        vm.editMode = false;
        vm.formId = null;
        vm.clientId = null;

        vm.state = '';
        vm.updateApplyNow = updateApplyNow;
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
            var promises = [
                quickSearchConfigService.getResults(vm.clientId, vm.formId),
                qsResultsService.getResults(true)
            ];

            $q.all(promises).then(function (data) {
                vm.data = data[0];
                vm.formFields = data[0].form.pages.$values[0].fields.$values;
                _.each(vm.formFields, function (field) {
                    if (field.type === 'select') {
                        field.templateOptions.options = field.templateOptions.options.$values;
                    }
                });
                vm.searchResults = data[1];
                updateApplyNow();
            });

            //quickSearchConfigService.getResults().then(function (data) {
            //    vm.data = data;
            //    vm.formFields = data.form.pages.$values[0].fields.$values;
            //    _.each(vm.formFields, function (field) {
            //        if (field.type === 'select') {
            //            field.templateOptions.options = field.templateOptions.options.$values;
            //        }
            //    });
            //});
            //
            //qsResultsService.getResults(true).then(function (data) {
            //    vm.searchResults = data;
            //    updateApplyNow();
            //});
        }

        function updateApplyNow() {
            _.each(vm.searchResults, function (result) {
                _.each(result.items, function (item) {
                    item.apply = vm.data.form.applyNowText;
                });
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
