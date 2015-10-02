(function () {
    'use strict';

    angular
        .module('app')
        .directive('formsAlias', formsAlias);

    formsAlias.$inject = ['spaFolder'];

    function formsAlias(spaFolder) {
        var directive = {
            restrict: 'A',
            scope: {
                datasource: '='
            },
            templateUrl: spaFolder + 'app/directives/templates/alias.html',
            controller: aliasController
        };

        return directive;
    }

    function aliasController($scope) {
        var vm = {
            addAlias: addAlias,
            removeAlias: removeAlias,
        };

        $scope.vm = vm;

        function addAlias() {
            console.warn($scope);
            $scope.datasource.push({
                firstName: '',
                lastName: ''
            });
        }

        function removeAlias(index) {
            $scope.datasource.splice(index, 1)
        }
    }

})
();
