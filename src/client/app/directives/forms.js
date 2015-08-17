(function () {
    'use strict';

    angular
        .module('app')
        .directive('formsAlias', formsAlias)

    function formsAlias() {
        var directive = {
            restrict: 'E',
            replace: true,
            scope:{
                datasource: '='
            },
            controller: aliasController,
            templateUrl: ''
        };

        return directive;
    }


    function aliasController($scope){
        var vm = {

        };

        $scope.vm = vm;

    }
})();