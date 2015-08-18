(function () {
    'use strict';

    angular
        .module('app.search')
        .controller('SearchController', SearchController);

    SearchController.$inject = ['$rootScope', '$stateParams', '$q', 'logger', '$timeout', 'quickSearchService', '$window'];
    /* @ngInject */
    function SearchController($rootScope, $stateParams, $q, logger, $timeout, quickSearch, $window) {

        var vm = this;
        if ($stateParams.embedded === 'true'){
            $rootScope.hideChrome = true;
        } else {
            $rootScope.hideChrome = false;
        }

        //$rootScope.hideChrome = $stateParams.embedded;
        vm.title = 'Quick Search';
        vm.submit = submit;
        vm.isLoading = false;
        vm.showJson = false;
        vm.json = "";
        vm.searchResults = [];
        vm.underScoreJson = "";
        vm.formModel = {};
        vm.formFields = [];

        activate();

        function activate() {
            logger.info('Activated search View', $stateParams.embedded);

            if($stateParams.mode == 'results'){
                $q.all([
                    quickSearch.getFormConfig(),
                    quickSearch.getResults(vm.formModel)
                ]).then(function (data) {
                    vm.data = data[0];
                    vm.formFields = data[0].fields;

                    vm.searchResults = data[1];
                    vm.json = JSON.stringify(vm.formModel, null, 4);
                    vm.showJson = true;
                    vm.underScoreJson = underScoreFilter();
                })
            }
            else {
                quickSearch.getFormConfig().then(function (data) {
                    vm.data = data;
                    vm.formFields = data.fields;
                });
            }
        }

        function submit() {
          
            // Widget example, go to results view in new page
            if(inIframe) {
              console.log("iframe args: "+iframeArgs.quoteUrl);
              window.open(iframeArgs.quoteUrl);              
            } else {
              vm.isLoading = true;
              return quickSearch.getResults(vm.formModel).then(function (data) {
                  vm.searchResults = data;
                  vm.json = JSON.stringify(vm.formModel, null, 4);
                  vm.showJson = true;
                  vm.underScoreJson = underScoreFilter();
                  $timeout(function () {
                      vm.isLoading = false;
                  }, 500);
              });
            }
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