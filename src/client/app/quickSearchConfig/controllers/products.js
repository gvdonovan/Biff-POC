(function () {
        'use strict';

        angular
            .module('app.quickSearchConfig')
            .controller('ProductsController', ProductsController);

        ProductsController.$inject = ['logger', '$stateParams', '$state'];
        /* @ngInject */
        function ProductsController(logger, $stateParams, $state) {
            var vm = this;
            vm.next = next;
            vm.previous = previous;

            function next() {
                $state.go('quickSearchConfigLoanOfficers', {editMode: $stateParams.editMode});
            }

            function previous() {
                $state.go('quickSearchConfigDefaults', {editMode: $stateParams.editMode});
            }
        }
    })();