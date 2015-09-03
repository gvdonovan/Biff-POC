/**
 * Created by jadams on 9/3/2015.
 */

(function () {
        'use strict';

        angular
            .module('app.quickSearchConfig')
            .controller('LoanOfficersController', LoanOfficersController);

        LoanOfficersController.$inject = ['logger', '$stateParams', '$state'];
        /* @ngInject */
        function LoanOfficersController(logger, $stateParams, $state) {
            var vm = this;
            vm.next = next;
            vm.previous = previous;

            function next() {
                $state.go('quickSearchConfigResults', {editMode: $stateParams.editMode});
            }

            function previous() {
                $state.go('quickSearchConfigProducts', {editMode: $stateParams.editMode});
            }
        }
    })();