(function () {
    'use strict';

    angular
        .module('app.search')
        .controller('SearchController', SearchController);

    SearchController.$inject = ['$rootScope', '$stateParams', '$q', 'logger', '$timeout', 'quickSearchService', '$window'];
    /* @ngInject */
    function SearchController($rootScope, $stateParams, $q, logger, $timeout, quickSearch, $window) {

        var vm = this;
        if ($stateParams.embedded === 'true') {
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

            if ($stateParams.mode == 'results') {

                var biffObj = getUrlVars();
                // TODO GD: This log should work once we append the query string in the API
                console.log("Results query string: " + biffObj.firstName);
                //TODO JA: update vm.formModel using "biff"

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

                    //TODO JA: Bind variables from "biff"

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
            if (inIframe) {
                console.log("iframe args: " + iframeArgs.quoteUrl + "?biff=rox");

                var biff = {firstName: "Biff", lastName: "Tanner"};
                //TODO:  add biff to quoteUrl
                var qStr = $.param(biff);

                window.open(iframeArgs.quoteUrl + "?" + qStr);
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
      
        function getUrlVars() {
          if (!window.location.search) {
              return({});   // return empty object
          }
          var parms = {};
          var temp;
          var items = window.location.search.slice(1).split("&");   // remove leading ? and split
          for (var i = 0; i < items.length; i++) {
              temp = items[i].split("=");
              if (temp[0]) {
                  if (temp.length < 2) {
                      temp.push("");
                  }
                  parms[decodeURIComponent(temp[0])] = decodeURIComponent(temp[1]);        
              }
          }
          console.log("API URL for app in iFrame: " + window.location);
          return(parms);
      };
    }
})();