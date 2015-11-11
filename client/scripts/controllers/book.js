'use strict';

/**
 * @ngdoc function
 * @name appointmentApp.controller:ReviewCtrl
 * @description
 * # ReviewCtrl
 * Controller of the appointmentApp
 */
angular.module('appointmentApp')
        .controller('BookCtrl', function ($scope, $routeParams, $location, Appointment, Patient) {
            $scope.physicianId = $routeParams.id;            
            $scope.appointmentDate = new Date();
            Patient.find()
              .$promise
              .then(function(patients) {
                $scope.patients = patients;
                $scope.patient = patients[0];
              });            
            $scope.submit = function () {
                var param = {
                    physicianId: $scope.physicianId,
                    appointmentDate: $scope.appointmentDate,
                    patientId: $scope.patient.id
                };
                Appointment.create(param, function (err, data) {
                    $location.path('/appointment/' + $scope.physicianId);
                });
            };
        });
