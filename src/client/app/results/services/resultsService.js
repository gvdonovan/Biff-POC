(function () {
    'use strict';

    angular
        .module('app.results')
        .factory('resultsService', ResultsService);

    ResultsService.$inject = ['$http', '$q', 'API', 'logger'];

    function ResultsService($http, $q, API, logger) {
        var service = {
            getFormConfig: getFormConfig,
            getResults: getResults
        };
        
        return service;

        function getFormConfig() {
            var deferred = $q.defer();
            $http.get(API + '/results-form-config')
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
            $http.get(API + '/results-form-results')
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