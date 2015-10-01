(function () {
    'use strict';

    angular
        .module('app.quickSearchConfig')
        .run(['$rootScope', '$state',
            function ($rootScope, $state) {
                $rootScope.$state = $state;
            }
        ])
        .controller('FormListController', FormListController);

    FormListController.$inject = ['$state', 'modalService', 'quickSearchConfigService'];
    /* @ngInject */
    function FormListController($state, modalService, quickSearchConfigService) {
        var vm = this;
        vm.clientId = null;
        vm.add = add;
        vm.clone = clone;
        vm.edit = edit;
        vm.forms = [];
        vm.toggle = toggle;

        activate();

        function activate() {
            initialize();
        }

        function initialize() {
            quickSearchConfigService.getForms().then(function (data) {
                vm.clientId = data.clientId;
                vm.data = data;
                vm.forms = data.forms.$values;
            });
        }

        function add() {
            var template = 'app/quickSearchConfig/views/partials/cloneQuickSearchForm.html';
            var controller = 'cloneQuickSearchFormController';
            var title = 'Create New Quick Search Form';
            var message = null;//'Navigating away from this page will discard your current changes. Do you wish to proceed?';

            modalService.openModal(template, controller, null, title, message, null)
                .then(function (formData) {
                    if (formData) {
                        quickSearchConfigService.newForm(vm.clientId, formData.name).then(function (data) {
                            initialize();
                        });
                    }
                });
        }

        function clone(form){
            var template = 'app/quickSearchConfig/views/partials/cloneQuickSearchForm.html';
            var controller = 'cloneQuickSearchFormController';
            var title = 'Clone Quick Search Form';
            var message = null;//'Navigating away from this page will discard your current changes. Do you wish to proceed?';

            modalService.openModal(template, controller, null, title, message, {form: form})
                .then(function (formData) {
                    if (formData) {
                        quickSearchConfigService.cloneForm(vm.clientId,formData.id, formData.name).then(function (data) {
                            initialize();
                        });
                    }
                });
        }

        function edit(id) {
            //Request then next page
            $state.go('quickSearchConfigInputs', {editMode: true, formId: id});
        }

        function toggle(index) {
            var form = vm.forms[index];

            var m = form.isActive ? 'Activate ' : 'Deactivate ';

            var template = 'app/blocks/modal/templates/confirm.html';
            var controller = 'confirmModalController';
            var title = 'Confirm';
            var message = 'Do you wish to ' + m + '[' + form.name + ']' + '?';

            modalService.openConfirmModal(template, controller, null, title, message, {})
                .then(function (isConfirmed) {
                    if (!isConfirmed) {
                        vm.forms[index].isActive = !form.isActive;
                    }
                });
        }

    }
})();