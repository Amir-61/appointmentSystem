'use strict';

/**
 * @ngdoc function
 * @name appointmentApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the appointmentApp
 */
angular.module('appointmentApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
