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
                vm.data = data;
                vm.forms = data.$values;
            });
        }

        function add() {
            //TODO create form then pass id
            $state.go('quickSearchConfigInputs', {formId: 1});
        }

        function clone(id){
            //TODO call clone
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

            modalService.openConfirmModal(template, controller, null, title, message, null)
                .then(function (isConfirmed) {
                    if (!isConfirmed) {
                        vm.forms[index].isActive = !form.isActive;
                    }
                });
        }

    }
})();