/**
 * Created by gdonovan on 7/15/2015.
 */
// create the module and name it eo
var eo = angular.module('eo', ['ngRoute']);

// configure our routes
eo.config(function ($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl: 'app/views/home.html',
            controller: 'mainController'
        })

        // route for the about page
        .when('/about', {
            templateUrl: 'app/views/about.html',
            controller: 'aboutController'
        })

        // route for the contact page
        .when('/contact', {
            templateUrl: 'app/views/contact.html',
            controller: 'contactController'
        })

        .when('/dynamicForm', {
            templateUrl: 'app/views/dynamicForm.html',
            controller: 'dynamicFormController'
        })

        .when('/quickSearch', {
            templateUrl: 'app/views/quickSearch.html',
            controller: 'quickSearchController'
        });
});

eo.factory('sampleService', function() {

    var service = {
        sayHello: sayHello
    }
    return service;

    function sayHello(name) {
        return 'Hi ' + name + '!';
    }
});

eo.service('quickSearchDataService', function ($scope, $timeout) {
    var service ={
        submitSearch: submitSearch
    };

    return service;

    function submitSearch(criteria) {
        var data = 'hello';
        $timeout(function () {
            return null;
        }, 1000);
        return data;
    }
});

// create the controller and inject Angular's $scope
eo.controller('mainController', function ($scope) {
    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';
});

eo.controller('aboutController', function ($scope) {
    $scope.message = 'Look! I am an about page.';
});

eo.controller('contactController', function ($scope, sampleService) {
    $scope.message = sampleService.sayHello('Greg');
});

eo.controller('dynamicFormController', function ($scope) {
    // create a message to display in our view
    $scope.message = 'Dynamic Form!';
});

eo.controller('quickSearchController', function ($scope, $timeout) {
    // create a message to display in our view
    var vm = {
        isLoading: false,
        occupancies: ['Owner Occupied', 'Other', 'Biff'],
        propertyTypes: ['Single Family', 'PUD', 'Multi-Family', 'Manufactured / Single Wide', 'Manufactured / Double Wide', 'Timeshare', 'Condotel', 'Non-warrantable condo', 'Modular'],
        creditRanges: ['619 or lower', '620-659', '660-739', '740-779', '780+'],
        search: {
            occupancy: null,
            propertyType: null,
            loanPurpose: null,
            purchasePrice: null,
            downPayment: null,
            zip: null,
            creditScore: null
        },
        submit: submit
    };

    $scope.vm = vm;

    initialize();

    function initialize() {
        vm.search.occupancy = vm.occupancies[0];
        vm.search.propertyType = vm.propertyTypes[0];
        vm.search.creditScore = vm.creditRanges[3];
    };

    function submit() {
        console.log("Submit Clicked" + vm.search);
        vm.isLoading = true;
        $timeout( function(){ vm.isLoading = false; }, 1000);
        //quickSearchDataService.submitSearch(vm.search).then(function (data) {
        //    console.log(data);
        //});
    }


    $scope.message = 'Quick Search!';
});

eo.directive('loadingspinner', [function () {

    var directive = {
        restrict: 'E',
        template: '<div id="loading"><i class="fa fa-cog fa-3x fa-spin vertical-center icon-orange"></i></div>',
        replace: true
    };

    return directive;
}]);
