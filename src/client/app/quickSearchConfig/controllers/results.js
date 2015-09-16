//TODO: DH
(function () {
    'use strict';

    angular
        .module('app.quickSearchConfig')
        .controller('QSConfigResultsController', QSConfigResultsController);

    QSConfigResultsController.$inject = ['logger', '$scope', '$stateParams', '$state', 'qsResultsService'];
    /* @ngInject */
    function QSConfigResultsController(logger, $scope, $stateParams, $state, qsResultsService) {
        var vm = this;
        vm.editMode = false;
        vm.formId = null;
        vm.state = '';
        vm.go = go;
        vm.next = next;
        vm.previous = previous;
        vm.isLastStep = true;


        vm.setPreview = setPreview;
        vm.updatePreview = updatePreview;
        vm.searchResults = {};

        vm.formState = {
            inputsForm: {}
        };

        vm.cancel = cancel;
        vm.save = save;

        activate();

        $scope.$watch('vm.formState.resultsForm.$dirty', function (newVal, oldVal) {
            if (!_.isUndefined(newVal)) {
                if (newVal) {
                    vm.isDirty = true;
                }
            }
        });

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

        function setPreview(index) {
            vm.formFields[index].visible = !vm.formFields[index].visible;
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

        function cancel() {
            initialize();
            vm.formState.inputsForm.$setPristine(true);
            vm.isDirty = false;
        }

        function save() {
            //TODO post vm.data
            vm.formState.inputsForm.$setPristine(true);
            vm.isDirty = false;
        }
    }
})();
