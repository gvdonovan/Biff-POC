//TODO: DH
(function () {
        'use strict';

        angular
            .module('app.quickSearchConfig')
            .controller('ResultsController', ResultsController);

        ResultsController.$inject = ['logger', '$stateParams', '$state'];
        /* @ngInject */
        function ResultsController(logger, $stateParams, $state) {
            var vm = this;
            vm.next = next;
            vm.previous = previous;

            function next() {
            }

            function previous() {
                $state.go('quickSearchConfigLoanOfficers', {editMode: $stateParams.editMode});
            }
        }
    })();