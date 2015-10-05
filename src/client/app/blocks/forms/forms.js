(function () {
    'use strict';

    angular
        .module('blocks.forms')
        .factory('forms', forms);

    forms.$inject = ['spaConfig'];

    /* @ngInject */
    function forms(spaConfig) {
        var service = {
            datePickerConfig: datePickerConfig,
            borrowerAliasConfig: borrowerAliasConfig,
            panelWrapper: panelWrapper
        };

        return service;

        function datePickerConfig(formlyConfig) {
            formlyConfig.setType({
                name: 'datepicker',
                templateUrl: spaConfig.spaFolder + 'app/blocks/forms/templates/datepicker.html',
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
                templateUrl: spaConfig.spaFolder + 'app/blocks/forms/templates/alias.html'
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
                templateUrl: spaConfig.spaFolder + 'app/blocks/forms/templates/panelWrapper.html'
            });
        }
    }
})();
