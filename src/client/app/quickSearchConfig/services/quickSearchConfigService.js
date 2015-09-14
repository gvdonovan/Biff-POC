(function () {
    'use strict';

    angular
        .module('app.quickSearchConfig')
        .factory('quickSearchConfigService', QuickSearchConfigService);

    QuickSearchConfigService.$inject = ['$q', 'logger', '$http'];

    function QuickSearchConfigService($q, logger, $http) {
        var service = {
            getForms: getForms,
            getInputs: getInputs
        };
        return service;

        function getForms() {
            var entityId = 1;

            var url = '//localhost:63312/api/config/search/Forms/' + entityId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                }, function (response) {
                    console.warn('error' + response);
                });
        }

        function getInputs() {
            var entityId = 1;
            var userId = 1;
            var formId = 2;

            var url = '//localhost:63312/api/config/search/Inputs/' + entityId + '/' + formId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                }, function (response) {
                    console.warn('error' + response);
                });
        }
    }
})();