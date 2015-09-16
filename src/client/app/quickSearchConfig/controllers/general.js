//TODO: DH
(function () {
    'use strict';

    angular
        .module('app.quickSearchConfig')
        .controller('QSConfigGeneralController', QSConfigGeneralController);

    QSConfigGeneralController.$inject = ['logger', '$stateParams', '$state', 'modalService'];
    /* @ngInject */
    function QSConfigGeneralController(logger, $stateParams, $state, modalService) {
        var vm = this;
        vm.editMode = false;
        vm.formId = null;
        vm.state = '';
        vm.go = go;
        vm.next = next;
        vm.previous = previous;
        vm.isLastStep = true;

        vm.checkEdit = checkEdit;

        activate();

        function activate() {
            vm.editMode = $stateParams.editMode;
            vm.formId = $stateParams.formId;
            vm.state = $state.current.name;
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
    }
})();
