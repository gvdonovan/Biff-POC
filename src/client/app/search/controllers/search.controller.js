(function () {
    'use strict';

    angular
        .module('app.search')
        .controller('SearchController', SearchController);

    SearchController.$inject = ['logger', '$scope', '$timeout', 'quickSearchService'];
    /* @ngInject */
    function SearchController(logger, $scope, $timeout, quickSearch) {
        var vm = {
            title: 'Quick Search',
            submit: submit,
            isLoading: false,
            showJson: false,
            json: "",
            searchResults: [],
            underScoreJson: ""
        };
        $scope.vm = vm;

        activate();

        function activate() {
            logger.info('Activated search View');

            quickSearch.getFormConfig().then(function (data) {
                $scope.data = data;
                $scope.criteria = {};

                // configurations of the form
                $scope.schema = $scope.data.schema;
                //How form is presented
                $scope.form = $scope.data.form;
            });
        }

        function submit() {
            vm.isLoading = true;
            return quickSearch.getResults($scope.criteria).then(function (data) {
                vm.searchResults = data;
                vm.json = JSON.stringify($scope.criteria, null, 4);
                vm.showJson = true;
                vm.underScoreJson = underScoreFilter();
                $timeout(function () {
                    vm.isLoading = false;
                }, 500);
            });
        }

        function underScoreFilter(){
            var biff =  _.pluck(vm.searchResults, 'items');
            var flat = _.flatten(biff);
            var x =  _.filter(flat, function(item){
                return item.rebate >= 500;
            });
            return x;
        }
    }
})();