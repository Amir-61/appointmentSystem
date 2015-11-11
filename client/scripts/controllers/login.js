'use strict';

/**
 * @name appointmentApp.controller:MainCtrl
 * @description
 * # LoginCtrl
 * Controller of the appointmentApp
 */
angular.module('appointmentApp').controller('LoginCtrl', function ($scope, User, $location, $rootScope) {
    $scope.submit = function () {
        User.login(
                {},
                $scope.data,
                function onSuccess(res, headers) {
                    //logged in
                    $location.path('/main');
                },
                function onError(res, headers) {
                    //failed to login
                    $scope.unAuthorized = true;
                })
    };
});
