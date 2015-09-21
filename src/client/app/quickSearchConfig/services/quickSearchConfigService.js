(function () {
    'use strict';

    angular
        .module('app.quickSearchConfig')
        .factory('quickSearchConfigService', QuickSearchConfigService);

    QuickSearchConfigService.$inject = ['$q', 'logger', '$http'];

    function QuickSearchConfigService($q, logger, $http) {
        var service = {
            getForms: getForms,
            getInputs: getInputs,
            postInputs: postInputs,
            getDefaults: getDefaults,
            getResults: getResults
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
            var formId = 1;

            var url = '//localhost:63312/api/config/search/Inputs/' + entityId + '/' + formId;
            return $http.get(url)
                .then(function (response) {

                    //if purchase
                    var purchasePrice = _.findWhere(response.data.fields.$values, {key: 'purchasePrice'});
                    purchasePrice['hideExpression'] = "model.loanPurpose === '2' || model.loanPurpose === '3'";
                    var downPayment = _.findWhere(response.data.fields.$values, {key: 'downPayment'});
                    downPayment['hideExpression'] = "model.loanPurpose === '2' || model.loanPurpose === '3'";

                    //if not purchase
                    var loanAmount = _.findWhere(response.data.fields.$values, {key: 'loanAmount'});
                    loanAmount['expressionProperties'] = {
                        'hide': function ($viewValue, $modelValue, scope) {
                            return scope.model.loanPurpose === '1' || !scope.model.loanPurpose
                        }
                    };
                    var estimatedValue = _.findWhere(response.data.fields.$values, {key: 'estimatedValue'});
                    estimatedValue['expressionProperties'] = {
                        'hide': function ($viewValue, $modelValue, scope) {
                            return scope.model.loanPurpose === '1' || !scope.model.loanPurpose
                        }
                    };

                    return response.data;
                }, function (response) {
                    console.warn('error' + response);
                });
        }

        function postInputs(data) {
            var entityId = 1;
            var formId = 1;
            var url = '//localhost:63312/api/config/search/inputs/save';// + entityId + '/' + formId;
            return $http.post(url, angular.toJson(data))
                .then(function (response) {
                    return response;
                }, function (response) {
                    console.warn('error' + response);
                });
        }

        function getDefaults() {
            var entityId = 1;
            var formId = 1;

            var url = '//localhost:63312/api/config/search/defaults/' + entityId + '/' + formId;
            return $http.get(url)
                .then(function (response) {
                    return response.data.pages[0];
                }, function (response) {
                    console.warn('error' + response);
                });
        }

        function getResults() {
            var entityId = 1;
            var formId = 1;

            var url = '//localhost:63312/api/config/search/results/' + entityId + '/' + formId;
            return $http.get(url)
                .then(function (response) {
                    return response.data.pages[0];
                }, function (response) {
                    console.warn('error' + response);
                });
        }
    }
})();