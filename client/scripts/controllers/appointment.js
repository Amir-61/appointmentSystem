'use strict';

/**
 * @ngdoc function
 * @name appointmentApp.controller:DetailsCtrl
 * @description
 * # DetailsCtrl
 * Controller of the appointmentApp
 */
angular.module('appointmentApp')
        .controller('appointmentCtrl', function ($scope, $routeParams, Physician, Appointment) {            
            var PhysicianId = $routeParams.id;
            $scope.physiciansInfo = Physician.find({
                filter: {where: {id: PhysicianId}}
            })
            $scope.appointments = Appointment.find({
                filter: {where: {physicianId: $routeParams.id}, "include": ["patient"]}
            });
        });
