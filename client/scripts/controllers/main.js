'use strict';

/**
 * @ngdoc function
 * @name appointmentApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the appointmentApp
 */
angular.module('appointmentApp')
        .controller('MainCtrl', function ($scope, Physician) {
          $scope.physicians = Physician.find();
        });
