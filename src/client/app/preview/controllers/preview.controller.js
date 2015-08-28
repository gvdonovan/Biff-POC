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
        
        vm.setPreview = setPreview;
        vm.moveRowUp = moveRowUp;
        vm.moveRowDown = moveRowDown;
        
        vm.configModel = {};
        vm.configFields = [];
        
        vm.previewModel = {};
        vm.previewFields = [];

        activate();

        function activate() {
            logger.info('Activated preview View');

            preview.getFormConfig().then(function (data) {
                vm.data = data;
                vm.formFields = data.fields;
                for(var item in vm.formFields) {
                    var index = vm.formFields.indexOf(vm.formFields[item]);
                    var formObj = {
                        "index": index,
                        "label": vm.formFields[item].templateOptions.label,
                        "visible": true
                    }
                    vm.configFields.push(formObj);
                    console.log(index);
                }
            });
        }
        
        function setPreview(index, order) {
            console.log("Index: "+index+", Order:"+order);
            
        }
        
        function moveRowUp(index, order) {
            console.log("UP: Index: "+index);
            var cf = vm.configFields;
            var item = cf.slice(0)[index];
            if(index != 0) {
                cf.splice(index, 1);
                cf.splice(index-1, 0, item);
            } else {
                cf.shift();
                cf.push(item);
            }
            updateOrders();
        }
        
        function moveRowDown(index, order) {
            console.log("DOWN: Index: "+index);
            var cf = vm.configFields;
            var item = cf.slice(0)[index];
            if(index+1 != vm.configFields.length) {
                cf.splice(index, 1);
                cf.splice(index+1, 0, item);
            } else {
                cf.pop();
                cf.unshift(item);
            }
            updateOrders();
        }
        
        function updateOrders() {
            for(var i=0; i<vm.configFields.length; i++) {
                vm.configFields[i].index = i;
            }
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