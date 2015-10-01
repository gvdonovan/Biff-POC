(function () {
    'use strict';

    angular
        .module('blocks.modal')
        .factory('modalService', ModalService);

    ModalService.$inject = ['$modal', '$q'];

    /* @ngInject */
    function ModalService($modal, $q) {
        var service = {
            openConfirmModal: openConfirmModal,
            openModal: openModal
        };

        return service;

        function openConfirmModal(template, controller, size, title, message, params) {

            var deferred = $q.defer();

            var modalInstance = $modal.open({
                animation: true,
                templateUrl: template,
                controller: controller,
                controllerAs: 'vm',
                size: size,
                resolve: {
                    items: function () {
                        return {
                            title: title,
                            message: message,
                            params: params
                        };
                    }
                }
            });

            deferred.resolve(
                modalInstance.result.then(function () {
                    return true;
                }, function () {
                    return false;
                }));
            return deferred.promise;
        }

        function openModal(template, controller, size, title, message, params) {

            var deferred = $q.defer();

            var modalInstance = $modal.open({
                animation: true,
                templateUrl: template,
                controller: controller,
                controllerAs: 'vm',
                size: size,
                resolve: {
                    items: function () {
                        return {
                            title: title,
                            message: message,
                            params: params
                        };
                    }
                }
            });

            deferred.resolve(
                modalInstance.result.then(function (data) {
                    return data;
                }, function () {
                    return null;
                }));
            return deferred.promise;
        }
    }
})();
