//TODO: DH
(function () {
    'use strict';

    angular
        .module('app.quickSearchConfig')
        .controller('QSConfigResultsController', QSConfigResultsController);

    QSConfigResultsController.$inject = ['logger', '$stateParams', '$state', 'qsResultsService'];
    /* @ngInject */
    function QSConfigResultsController(logger, $stateParams, $state, qsResultsService) {
        var vm = this;
        vm.editMode = false;
        vm.formId = null;
        vm.state = '';
        vm.go = go;
        vm.next = next;
        vm.previous = previous;
        vm.isLastStep = true;

        vm.updatePreview = updatePreview;
        vm.searchResults = {};

        activate();

        function activate() {
            vm.editMode = $stateParams.editMode;
            vm.formId = $stateParams.formId;
            vm.state = $state.current.name;


            qsResultsService.getFormConfig().then(function (data) {
                vm.data = data;
                vm.formFields = jQuery.extend(true, [], data.fields);

                vm.updatePreview();
            });

            qsResultsService.getResults(true).then(function (data) {
                vm.searchResults = data;
                console.log(vm.searchResults);
            });
        }

        function updatePreview() {

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
    }
})();
