(function () {
    'use strict';

    angular
        .module('blocks.forms')
        .factory('forms', forms);

    forms.$inject = [];

    /* @ngInject */
    function forms() {
        var service = {
            datePickerConfig: datePickerConfig,
            borrowerAliasConfig: borrowerAliasConfig,
            panelWrapper: panelWrapper,
            asyncSelectHandler: asyncSelectHandler
        };

        return service;

        function datePickerConfig(formlyConfig) {
            formlyConfig.setType({
                name: 'datepicker',
                templateUrl: 'app/blocks/forms/templates/datepicker.html',
                wrapper: ['bootstrapLabel', 'bootstrapHasError'],
                defaultOptions: {
                    templateOptions: {
                        addonLeft: {
                            class: 'glyphicon glyphicon-calendar'
                        }
                    }
                }
            });
        }

        function borrowerAliasConfig(formlyConfig) {
            formlyConfig.setType({
                name: 'alias',
                templateUrl: 'app/blocks/forms/templates/alias.html'
            });
        }

        function panelWrapper(formlyConfig) {

            formlyConfig.setType({
                name: 'nested',
                template: '<formly-form model="model[options.key]" fields="options.data.fields"></formly-form>'
            });

            formlyConfig.setWrapper({
                name: 'panel',
                types: ['nested'],
                templateUrl: 'app/blocks/forms/templates/panelWrapper.html'
            });
        }

        function asyncSelectHandler(formlyConfig) {
            formlyConfig.setType({
                name: 'asyncSelectHandler',
                extends: 'select',
                controller: asyncSelectHandlerController
            });
        }

        /* @ngInject */
        function asyncSelectHandlerController($scope, valuesService) {
            var valueToWatch = 'model.' +  $scope.to.keyToWatch;
            $scope.$watch(valueToWatch, function(newValue, oldValue){
                if(newValue !== oldValue){
                    if($scope.model[$scope.options.key] && oldValue) {
                        // reset this select
                        $scope.model[$scope.options.key] = '';
                    }

                    valuesService.getCounties('biff').then(function(data){
                       console.log('data');
                    });
                }
            })
        }
    }
})();