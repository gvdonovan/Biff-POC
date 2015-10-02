(function () {
    'use strict';

    angular
        .module('app.core')
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper, forms, formlyConfig, spaFolder) {
        var otherwise = '/quickSearchConfig';
        routerHelper.configureStates(getStates(spaFolder), otherwise);
        forms.datePickerConfig(formlyConfig);
        forms.borrowerAliasConfig(formlyConfig);
        forms.panelWrapper(formlyConfig);
        formlyConfig.disableWarnings = true;
        apiCheck.globalConfig.disabled = true;
    }

    function getStates(spaFolder) {
        return [
            {
                state: '404',
                config: {
                    url: '/404',
                    templateUrl: spaFolder + 'app/core/404.html',
                    title: '404'
                }
            }
        ];
    }
})();
