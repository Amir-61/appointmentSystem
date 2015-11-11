'use strict';

/**
 * @ngdoc function
 * @name appointmentApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the appointmentApp
 */
angular.module('appointmentApp').controller('LogoutCtrl', function ($scope, User, $location, $rootScope) {
    User.logout(function (err) {
        console.error("logout, err:", err);
    });
    $rootScope.loggedInUser = null;
});
