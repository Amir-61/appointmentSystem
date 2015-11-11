'use strict';

/**
 * @ngdoc function
 * @name appointmentApp.controller:PatientCtrl
 * @description
 * # AboutCtrl
 * Controller of the appointmentApp
 */
angular.module('appointmentApp')
        .controller('PatientCtrl', function ($scope, $location, Patient) {
          $scope.patients = Patient.find();
          $scope.submit = function () {
            var param = {
              name: $scope.patientName
            };
            Patient.create(param, function (value, res) {
              $scope.patients = Patient.find();
              $location.path('/patients');
            });
          };
        });
