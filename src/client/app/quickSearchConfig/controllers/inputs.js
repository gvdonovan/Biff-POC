//TODO: DH
(function () {
        'use strict';

        angular
            .module('app.quickSearchConfig')
            .controller('InputsController', InputsController);

        InputsController.$inject = ['logger', '$stateParams', '$state'];
        /* @ngInject */
        function InputsController(logger, $stateParams, $state) {
            var vm = this;
            vm.next = next;
            vm.previous = previous;

            function next() {
                $state.go('quickSearchConfigDefaults', {editMode: $stateParams.editMode});
            }

            function previous() {
                $state.go('quickSearchConfig');
            }
        }
    })();