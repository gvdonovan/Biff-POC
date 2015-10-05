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
        formlyConfig.disableWarnings = true;
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
