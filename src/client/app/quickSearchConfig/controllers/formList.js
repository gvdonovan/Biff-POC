(function () {
    'use strict';

    angular
        .module('app.quickSearchConfig')
        .run(['$rootScope', '$state',
            function ($rootScope, $state) {
                $rootScope.$state = $state;
            }
        ])
        .controller('FormListController', FormListController);

    FormListController.$inject = ['$state', 'quickSearchConfigService'];
    /* @ngInject */
    function FormListController($state, quickSearchConfigService) {
        var vm = this;
        vm.add = add;
        vm.edit = edit;
        vm.forms = [];
        //    [
        //    {
        //        id: 1,
        //        name: 'form1',
        //        active: true
        //    },
        //    {
        //        id: 2,
        //        name: 'form2',
        //        active: false
        //    },
        //    {
        //        id: 3,
        //        name: 'form3',
        //        active: false
        //    }
        //];

        activate();

        function activate() {
            initialize();
        }

        function initialize() {
            quickSearchConfigService.getForms().then(function (data) {
                vm.forms = data;
            });
        }

        function add() {
            //TODO create form then pass id
            $state.go('quickSearchConfigInputs', {formId: 1});
        }

        function edit(id) {
            //Request then next page
            $state.go('quickSearchConfigInputs', {editMode: true, formId: id});
        }

    }
})();