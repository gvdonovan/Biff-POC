(function () {
        'use strict';

        angular
            .module('app.quickSearchConfig')
            .controller('FormListController', FormListController);

        FormListController.$inject = ['logger', '$stateParams', '$state'];
        /* @ngInject */
        function FormListController(logger, $stateParams, $state) {
            var vm = this;
            vm.add = add;

            function add() {
                //Request then next page
                $state.go('quickSearchConfigInputs', {});
            }

        }
    })();