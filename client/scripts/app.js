'use strict';

/**
 * @ngdoc overview
 * @name appointmentApp
 * @description
 * # appointmentApp
 *
 * Main module of the application.
 */
angular
        .module('appointmentApp', [
            'ngResource',
            'ngRoute',
            'lbServices'
        ])
        .config(function ($routeProvider) {
            $routeProvider
                    .when('/login', {
                        templateUrl: 'views/login.html',
                        controller: 'LoginCtrl'
                    })
                    .when('/main', {
                        templateUrl: 'views/main.html',
                        controller: 'MainCtrl'
                    })
                    .when('/about', {
                        templateUrl: 'views/about.html',
                        controller: 'AboutCtrl'
                    })
                    .when('/patients', {
                        templateUrl: 'views/patient.html',
                        controller: 'PatientCtrl'
                    })
                    .when('/appointment/:id', {
                        templateUrl: 'views/appointment.html',
                        controller: 'appointmentCtrl'
                    })
                    .when('/book/:id', {
                        templateUrl: 'views/book.html',
                        controller: 'BookCtrl'
                    })
                    .otherwise({
                        redirectTo: '/main'
                    });
        });
