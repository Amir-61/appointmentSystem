'use strict';

/**
 * @ngdoc function
 * @name appointmentApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the appointmentApp
 */
angular.module('appointmentApp')
        .controller('MainCtrl', function ($scope, Physician, $location) {
          $scope.physicians = Physician.find();
          $scope.submit = function () {
            var param = {
              name: $scope.physicianName
            };
            Physician.create(param, function (value, res) {
              $scope.physicians = Physician.find();
              $location.path('/main');
            });
          };
        });
