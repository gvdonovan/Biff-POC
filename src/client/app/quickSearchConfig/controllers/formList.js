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
        vm.forms = [
            {
                id: 1,
                name: 'form1',
                active: true
            },
            {
                id: 2,
                name: 'form2',
                active: false
            },
            {
                id: 3,
                name: 'form3',
                active: false
            }
        ];

        function add() {
            //Request then next page
            $state.go('quickSearchConfigInputs', {});
        }

    }
})();