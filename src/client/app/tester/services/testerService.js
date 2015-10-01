(function () {
    'use strict';

    angular
        .module('app.tester')
        .factory('testerService', TesterService);

    TesterService.$inject = ['logger', '$http'];

    function TesterService(logger, $http) {
        var service = {
            getSection: getSection,
        };
        return service;

        function getSection(formId, toggle) {
            //clientId = 3431303331;
            //formId = 31;

            var url = '//localhost:51639/api/form/GetFormData/' + formId + '/' + toggle;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                }, function (response) {
                    console.warn('error' + response);
                });
        }

    }
})();