(function () {
    'use strict';

    angular
        .module('app.quickSearchConfig')
        .factory('quickSearchConfigService', QuickSearchConfigService);

    QuickSearchConfigService.$inject = ['$q', 'logger', '$http'];

    function QuickSearchConfigService($q, logger, $http) {
        var service = {
            getInputs: getInputs
        };
        return service;


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