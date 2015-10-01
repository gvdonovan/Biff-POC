(function () {
    'use strict';

    angular
        .module('app.quickSearchConfig')
        .factory('quickSearchConfigService', QuickSearchConfigService);

    QuickSearchConfigService.$inject = ['logger', '$http'];

    function QuickSearchConfigService(logger, $http) {
        var service = {
            newForm: newForm,
            cloneForm: cloneForm,
            getForms: getForms,
            getInputs: getInputs,
            postInputs: postInputs,
            getDefaults: getDefaults,
            postDefaults: postDefaults,
            getResults: getResults,
            postResults: postResults,
            getFilters: getFilters,
            postFilters: postFilters,
            getLoanOfficers: getLoanOfficers,
            postLoanOfficers: postLoanOfficers
        };
        return service;

        function newForm(clientId, formName){
            var url = '//localhost:63312/api/config/search/Forms/New/' + clientId + '/' + formName;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                }, function (response) {
                    console.warn('error' + response);
                });
        }

        function cloneForm(clientId, formId, formName){
            var url = '//localhost:63312/api/config/search/Forms/Clone/' + clientId + '/' + formId + '/' + formName;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                }, function (response) {
                    console.warn('error' + response);
                });
        }

        function getForms(clientId) {
            clientId = 3431303331;

            var url = '//localhost:63312/api/config/search/Forms/' + clientId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                }, function (response) {
                    console.warn('error' + response);
                });
        }

        function getInputs(clientId, formId) {
            clientId = 3431303331;
            formId = 31;

            var url = '//localhost:63312/api/config/search/Inputs/' + clientId + '/' + formId;
            return $http.get(url)
                .then(function (response) {

                    //if purchase
                    var purchasePrice = _.findWhere(response.data.form.pages.$values[0].fields.$values, {key: 'purchasePrice'});
                    purchasePrice['hideExpression'] = "model.loanPurpose === '2' || model.loanPurpose === '3'";
                    var downPayment = _.findWhere(response.data.form.pages.$values[0].fields.$values, {key: 'downPayment'});
                    downPayment['hideExpression'] = "model.loanPurpose === '2' || model.loanPurpose === '3'";

                    //if not purchase
                    var loanAmount = _.findWhere(response.data.form.pages.$values[0].fields.$values, {key: 'loanAmount'});
                    loanAmount['expressionProperties'] = {
                        'hide': function ($viewValue, $modelValue, scope) {
                            return scope.model.loanPurpose === '1' || !scope.model.loanPurpose
                        }
                    };
                    var estimatedValue = _.findWhere(response.data.form.pages.$values[0].fields.$values, {key: 'estimatedValue'});
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
            var url = '//localhost:63312/api/config/search/inputs/save';
            return $http.post(url, angular.toJson(data))
                .then(function (response) {
                    return response;
                }, function (response) {
                    console.warn('error' + response);
                });
        }

        function getDefaults(clientId, formId) {
            clientId = 3431303331;
            formId = 31;

            var url = '//localhost:63312/api/config/search/defaults/' + clientId + '/' + formId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                }, function (response) {
                    console.warn('error' + response);
                });
        }

        function postDefaults(clientId, formId, data) {
            var url = '//localhost:63312/api/config/search/defaults/save';
            return $http.post(url, angular.toJson({clientId: clientId, formId: formId, data: data}))
                .then(function (response) {
                    return response;
                }, function (response) {
                    console.warn('error' + response);
                });
        }

        function getFilters(clientId, formId) {
            clientId = 3431303331;
            formId = 31;

            var url = '//localhost:63312/api/config/search/filters/' + clientId + '/' + formId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                }, function (response) {
                    console.warn('error' + response);
                });
        }

        function postFilters(data) {
            var url = '//localhost:63312/api/config/search/filters/save';
            return $http.post(url, angular.toJson(data))
                .then(function (response) {
                    return response;
                }, function (response) {
                    console.warn('error' + response);
                });
        }

        function getLoanOfficers(clientId, formId) {
            clientId = 3431303331;
            formId = 31;

            var url = '//localhost:63312/api/config/search/loanOfficers/' + clientId + '/' + formId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                }, function (response) {
                    console.warn('error' + response);
                });
        }

        function postLoanOfficers(data) {
            var url = '//localhost:63312/api/config/search/loanOfficers/save';
            return $http.post(url, angular.toJson(data))
                .then(function (response) {
                    return response;
                }, function (response) {
                    console.warn('error' + response);
                });
        }

        function getResults(clientId, formId) {
            clientId = 3431303331;
            formId = 31;

            var url = '//localhost:63312/api/config/search/results/' + clientId + '/' + formId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                }, function (response) {
                    console.warn('error' + response);
                });
        }

        function postResults(data){

            var url = '//localhost:63312/api/config/search/results/save';
            return $http.post(url, angular.toJson(data))
                .then(function (response) {
                    return response;
                }, function (response) {
                    console.warn('error' + response);
                });
        }
    }
})();