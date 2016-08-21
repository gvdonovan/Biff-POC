(function () {
    'use strict';

    angular
        .module('app.quickSearchConfig')
        .factory('inputsService', InputsService);

    InputsService.$inject = ['$http', '$q', 'API', 'logger'];

    function InputsService($http, $q, API, logger) {
        var service = {
            getFormConfig: getFormConfig,
            getResults: getResults
        };

        return service;

        function getFormConfig() {
            var deferred = $q.defer();
            $http.get(API + '/input-form-config')
                .success(function (data, status){
                    deferred.resolve(data);
                })
                .error(function(){
                    deferred.reject();
                });
                
            return deferred.promise;
        }
    
        function getResults(criteria) {
            var deferred = $q.defer();
            $http.get(API + '/input-form-results')
                .success(function (data, status){
                    deferred.resolve(data);
                })
                .error(function(){
                    deferred.reject();
                });
            return deferred.promise;
        }
    }
})();
