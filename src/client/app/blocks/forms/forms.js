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
            disclosureConfig: disclosureConfig,
            panelWrapper: panelWrapper,
            yesNoWrapper: yesNoWrapper
        };

        return service;

        function datePickerConfig(formlyConfig) {
            formlyConfig.setType({
                name: 'datepicker',
                templateUrl: 'app/blocks/forms/templates/datepicker.html',
                wrapper: ['bootstrapLabel', 'bootstrapHasError'],
                defaultOptions: {
                    templateOptions: {
                        addonRight: {
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

        function disclosureConfig(formlyConfig) {
            formlyConfig.setType({
                name: 'disclosure',
                templateUrl: 'app/blocks/forms/templates/disclosure.html'
            });
        }

        function yesNoWrapper(formlyConfig) {
            formlyConfig.setType({
                name: 'YesNoRadio',
                extends: 'radio',
                defaultOptions: {
                    className: 'col-xs-3 radio-horizontal',    // for horizontal radio buttons, add a class and style in CSS (see style.css)
                    templateOptions: {
                        label: "Yes/No Radio",
                        options: [
                            {
                                name: 'Yes',
                                value: 1
                            },
                            {
                                name: 'No',
                                value: 2
                            }
                        ]
                    }
                }
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
    }
})();