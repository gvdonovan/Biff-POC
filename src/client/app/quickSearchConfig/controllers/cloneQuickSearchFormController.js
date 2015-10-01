(function () {
    'use strict';

    angular
        .module('blocks.modal')
        .controller('cloneQuickSearchFormController', CloneQuickSearchFormController);

    CloneQuickSearchFormController.$inject = ['logger', '$modalInstance', 'items'];
    /* @ngInject */
    function CloneQuickSearchFormController(logger, $modalInstance, items) {
        var vm = this;
        vm.title = '';
        vm.message = '';
        vm.create = create;
        vm.cancel = cancel;
        vm.form = {
            id: null,
            name: ''
        };

        activate();

        function activate(){
            vm.title = items.title;
            vm.message = items.message;
            if(!_.isNull(items.params)) {
                if (!_.isUndefined(items.params.form)) {
                    vm.form.name = _.clone(items.params.form.name) + ' - Copy';
                    vm.title = vm.title + ' - ' + items.params.form.name;
                    vm.form.id = items.params.form.id;
                }
            }
        }

        function create() {
            $modalInstance.close(vm.form);
        }

        function cancel() {
            $modalInstance.dismiss('cancel');
        }
    }
})();
