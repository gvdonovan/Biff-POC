(function() {
    'use strict';

    angular
        .module('app.core')
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper, forms, formlyConfig) {
        var otherwise = '/404';
        routerHelper.configureStates(getStates(), otherwise);
        forms.datePickerConfig(formlyConfig);
        forms.borrowerAliasConfig(formlyConfig);
        forms.panelWrapper(formlyConfig);
        forms.asyncSelectHandler(formlyConfig);
        formlyConfig.disableWarnings = true;
        apiCheck.globalConfig.disabled = true;
    }

    function getStates() {
        return [
            {
                state: '404',
                config: {
                    url: '/404',
                    templateUrl: 'app/core/404.html',
                    title: '404'
                }
            }
        ];
    }
})();
