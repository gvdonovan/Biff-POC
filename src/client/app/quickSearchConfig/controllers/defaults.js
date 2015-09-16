//TODO: DH
(function () {
    'use strict';

    angular
        .module('app.quickSearchConfig')
        .controller('DefaultsController', DefaultsController);

    DefaultsController.$inject = ['$scope', '$stateParams', '$state', 'modalService', 'quickSearchConfigService'];
    /* @ngInject */
    function DefaultsController($scope, $stateParams, $state, modalService, quickSearchConfigService) {
        var vm = this;
        vm.editMode = false;
        vm.formId = null;
        vm.state = '';
        vm.go = go;
        vm.next = next;
        vm.previous = previous;
        vm.save = save;
        vm.cancel = cancel;
        vm.isLoading = false;
        vm.isDirty = false;
        vm.formState = {
            defaultsForm: {}
        };

        vm.toggleSections = toggleSections;
        vm.sectionsOpen = false;

        vm.model = {};

        vm.fields = [];

        activate();

        $scope.$watch('vm.formState.defaultsForm.$dirty', function (newVal, oldVal) {
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
            initialize();
        }

        function initialize() {
            quickSearchConfigService.getDefaults().then(function (data) {
                vm.fields = data.fields;
            });
        }

        function toggleSections() {
            vm.sectionsOpen = !vm.sectionsOpen;
            _.each(vm.fields, function (field) {
                field.templateOptions.open = vm.sectionsOpen;
            });
        }

        function go(state) {
            if (vm.editMode.toLowerCase() == 'true') {
                if (vm.isDirty) {
                    var template = 'app/blocks/modal/templates/confirm.html';
                    var controller = 'confirmModalController';
                    var title = 'Confirm';
                    var message = 'Navigating away from this page will discard your current changes. Do you wish to proceed?';

                    modalService.openConfirmModal(template, controller, null, title, message, null)
                        .then(function (isConfirmed) {
                            if (isConfirmed) {
                                $state.go(state, {editMode: vm.editMode, formId: vm.formId});
                            }
                        });
                } else {
                    $state.go(state, {editMode: vm.editMode, formId: vm.formId});
                }
            }
        }

        function next() {
            $state.go('quickSearchConfigProducts', {editMode: vm.editMode, formId: vm.formId});
        }

        function previous() {
            $state.go('quickSearchConfigInputs', {editMode: vm.editMode, formId: vm.formId});
        }

        function cancel() {
            initialize();
            vm.formState.defaultsForm.$setPristine(true);
            vm.isDirty = false;
        }

        function save() {
            //TODO post vm.data
            vm.formState.defaultsForm.$setPristine(true);
            vm.isDirty = false;
        }
    }
})();