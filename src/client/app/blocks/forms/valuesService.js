(function () {
    'use strict';

    angular
        .module('blocks.forms')
        .factory('valuesService', ValuesService);

    ValuesService.$inject = ['logger', '$http'];

    function ValuesService(logger, $http) {
        var service = {
            getCounties: getCounties
        }
        return service;

        function getCounties(state){
            var url = '//localhost:63312/api/config/values/counties/' + state;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                }, function (response) {
                    console.warn('error' + response);
                });
        }
    }
})();