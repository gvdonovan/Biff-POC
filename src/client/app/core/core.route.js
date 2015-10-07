(function () {
    'use strict';

    angular
        .module('app.core')
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper, forms, formlyConfig, spaConfig) {
        var otherwise = '/quickSearchConfig';
        routerHelper.configureStates(getStates(spaConfig), otherwise);
        forms.datePickerConfig(formlyConfig);
        forms.borrowerAliasConfig(formlyConfig);
        forms.panelWrapper(formlyConfig);
        forms.asyncSelectHandler(formlyConfig);
        forms.yesNoWrapper(formlyConfig);
        forms.disclosureConfig(formlyConfig);
        formlyConfig.disableWarnings = true;

        formlyConfig.templateManipulators.preWrapper.push(function(template, options, scope) {
            // checking to see if type radio
            if (options.type === "radio"){
                return template.replace('ng-repeat="(key, option) in to.options"',
                    'ng-repeat="(key, option) in to.options.$values"');
            }

            // checking to see if type select
            if (options.type === "select"){
                return template.replace('"option[to.valueProp || \'value\'] as option[to.labelProp || \'name\'] group by option[to.groupProp || \'group\'] for option in to.options"',
                    '"option as option.name for option in to.options.$values"');
            }

            return template;
        });



        apiCheck.globalConfig.disabled = true;
    }

    function getStates(spaConfig) {
        return [
            {
                state: '404',
                config: {
                    url: '/404',
                    templateUrl: spaConfig.spaFolder + 'app/core/404.html',
                    title: '404'
                }
            }
        ];
    }
})();
