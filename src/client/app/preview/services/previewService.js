(function () {
    'use strict';

    angular
        .module('app.preview')
        .factory('previewService', PreviewService);

    PreviewService.$inject = ['$http', '$q', 'API', 'logger'];

    function PreviewService($http, $q, API, logger) {
        var service = {
            getFormConfig: getFormConfig,
            getResults: getResults
        };

        return service;

        function getFormConfig() {
            var deferred = $q.defer();
            $http.get(API + '/preview-form-config')
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
            $http.get(API + '/preview-form-results')
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