// constants.js

(function() {
    'use strict';

    angular
        .module('app')
        /* The below is a mocked backend.
        * TODO: replace with actual API*/
        .constant('API', 'http://ob-backend-test.azurewebsites.net');
})();