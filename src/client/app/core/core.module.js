(function () {
    'use strict';

    angular
        .module('app.core', [
            'ngAnimate',
            'ngSanitize',
            'blocks.exception',
            'blocks.logger',
            'blocks.router',
            'blocks.forms',
            'blocks.modal',
            'ui.router',
            'duScroll',
            'toggle-switch'
            //, 'ngplus'
        ]);
})();
