(function () {
    'use strict';

    angular
        .module('app.preview')
        .controller('PreviewController', PreviewController);

    PreviewController.$inject = ['$rootScope', '$stateParams', '$q', 'logger', '$timeout', 'previewService', '$window'];
    /* @ngInject */
    function PreviewController($rootScope, $stateParams, $q, logger, $timeout, preview, $window) {

        var vm = this;
        

        //$rootScope.hideChrome = $stateParams.embedded;
        vm.title = 'Preview';
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
            logger.info('Activated preview View', $stateParams.embedded);

            preview.getFormConfig().then(function (data) {
                vm.data = data;
                vm.formFields = data.fields;
            });
        }

        function submit() {
            vm.isLoading = true;
            return preview.getResults(vm.formModel).then(function (data) {
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