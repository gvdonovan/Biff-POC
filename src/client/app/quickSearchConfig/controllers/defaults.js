//TODO: DH
(function () {
        'use strict';

        angular
            .module('app.quickSearchConfig')
            .controller('DefaultsController', DefaultsController);

        DefaultsController.$inject = ['logger', '$stateParams', '$state'];
        /* @ngInject */
        function DefaultsController(logger, $stateParams, $state) {
            var vm = this;
            vm.next = next;
            vm.previous = previous;

            function next() {
                $state.go('quickSearchConfigProducts', {editMode: $stateParams.editMode});
            }

            function previous() {
                $state.go('quickSearchConfigInputs', {editMode: $stateParams.editMode});
            }
        }
    })();