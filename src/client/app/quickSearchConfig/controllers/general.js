//TODO: DH
(function () {
    'use strict';

    angular
        .module('app.quickSearchConfig')
        .controller('QSConfigGeneralController', QSConfigGeneralController);

    QSConfigGeneralController.$inject = ['logger', '$stateParams', '$state', '$rootScope', 'spaFolder'];
    /* @ngInject */
    function QSConfigGeneralController(logger, $stateParams, $state, $rootScope, spaFolder) {
        var vm = this;
        vm.clientId = null;
        vm.editMode = false;
        vm.formId = null;
        vm.state = '';
        vm.go = go;
        vm.cancel = cancel;
        vm.save = save;

        vm.navigationUrl = navigationUrl;
        vm.wizardButtonsUrl = wizardButtonsUrl;

        activate();

        function activate() {
            vm.editMode = $stateParams.editMode;
            vm.formId = $stateParams.formId;
            vm.state = $state.current.name;
            initialize();
        }

        function initialize() {
            quickSearchConfigService.getSettings(vm.clientId, vm.formId).then(function (data) {
                vm.data = data;
            });
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
            $rootScope.isDirty = false;
        }

        function save() {
            $rootScope.isDirty = false;
        }

        function navigationUrl() {
            return spaFolder + 'app/quickSearchConfig/views/partials/navigation.html';
        }

        function wizardButtonsUrl() {
            return spaFolder + 'app/quickSearchConfig/views/partials/wizardButtons.html';
        }
    }
})();
