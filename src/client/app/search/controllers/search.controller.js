(function () {
    'use strict';

    angular
        .module('app.search')
        .controller('SearchController', SearchController);

    SearchController.$inject = ['logger', '$timeout', 'quickSearchService'];
    /* @ngInject */
    function SearchController(logger, $timeout, quickSearch) {
        var vm = this;
        vm.title = 'Quick Search';
        vm.submit = submit;
        vm.isLoading = false;
        vm.showJson = false;
        vm.json = "";
        vm.searchResults = [];
        vm.underScoreJson = "";
        vm.schema = [];
        vm.form = [];
        vm.criteria = {};

        activate();

        function activate() {
            logger.info('Activated search View');

            quickSearch.getFormConfig().then(function (data) {
                vm.data = data;
                vm.criteria = {};

                // configurations of the form
                vm.schema = vm.data.schema;
                //How form is presented
                vm.form = vm.data.form;
            });
        }

        function submit() {
            vm.isLoading = true;
            return quickSearch.getResults(vm.criteria).then(function (data) {
                vm.searchResults = data;
                vm.json = JSON.stringify(vm.criteria, null, 4);
                vm.showJson = true;
                vm.underScoreJson = underScoreFilter();
                $timeout(function () {
                    vm.isLoading = false;
                }, 500);
            });
        }

        function underScoreFilter() {
            var biff = _.pluck(vm.searchResults, 'items');
            var flat = _.flatten(biff);
            var x = _.filter(flat, function (item) {
                return item.rebate >= 500;
            });
            return x;
        }
    }
})();