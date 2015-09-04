//TODO: DH
(function () {
    'use strict';

    angular
        .module('app.quickSearchConfig')
        .controller('QSConfigResultsController', QSConfigResultsController);

    QSConfigResultsController.$inject = ['logger', '$stateParams', '$state'];
    /* @ngInject */
    function QSConfigResultsController(logger, $stateParams, $state) {
        var vm = this;
        vm.next = next;
        vm.previous = previous;
        vm.isLastStep = true;

        function next() {
            return null;
        }

        function previous() {
            $state.go('quickSearchConfigLoanOfficers', {editMode: $stateParams.editMode});
        }
    }
})();