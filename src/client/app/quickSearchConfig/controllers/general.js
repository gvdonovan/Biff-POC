//TODO: DH
(function () {
    'use strict';

    angular
        .module('app.quickSearchConfig')
        .controller('QSConfigGeneralController', QSConfigGeneralController);

    QSConfigGeneralController.$inject = ['logger', '$stateParams', '$state', '$rootScope', 'quickSearchConfigService'];
    /* @ngInject */
    function QSConfigGeneralController(logger, $stateParams, $state, $rootScope, quickSearchConfigService) {
        var vm = this;
        vm.clientId = null;
        vm.editMode = false;
        vm.formId = null;
        vm.state = '';
        vm.go = go;
        vm.cancel = cancel;
        vm.save = save;

        activate();

        function activate() {
            vm.editMode = $stateParams.editMode;
            vm.formId = $stateParams.formId;
            vm.state = $state.current.name;
            initialize();
        }

        function initialize(){
            quickSearchConfigService.getSettings(vm.clientId, vm.formId).then(function (data) {
                vm.data = data;
            });
        }

        function go(state) {
            if (vm.editMode.toLowerCase() == 'true') {
                $state.go(state, {editMode: vm.editMode, formId: vm.formId});
            }
        }

        function cancel() {
            $rootScope.isDirty = false;
        }

        function save() {
            quickSearchConfigService.postSettings(vm.data).then(function (data) {
                $rootScope.isDirty = false;
            });
        }
    }
})();
