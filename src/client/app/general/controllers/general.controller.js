(function () {
    'use strict';

    angular
        .module('app.general')
        .controller('GeneralController', GeneralController);

    GeneralController.$inject = ['$rootScope', '$stateParams', '$q', 'logger', '$timeout', 'generalService', '$window'];
    /* @ngInject */
    function GeneralController($rootScope, $stateParams, $q, logger, $timeout, general, $window) {

        var vm = this;
        

        //$rootScope.hideChrome = $stateParams.embedded;
        vm.title = 'General';
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
            logger.info('Activated general View');

            
            
        }
        function submit() {
            vm.isLoading = true;
            
            return general.getResults(vm.formModel).then(function (data) {
                vm.searchResults = data;
                vm.json = JSON.stringify(vm.formModel, null, 4);
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