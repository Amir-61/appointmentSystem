angular.module('appointmentApp')
  .controller('headerCtrl', function ($scope, $rootScope, $location, User) {

    $rootScope.$on( '$routeChangeSuccess', function(scope,current,previous){
      $scope.loginStatusUpdate();
    })
    //listening to login events
    $rootScope.$on('loginEvent', function (event, data) {
      $scope.loginStatusUpdate();
    });

    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
    //check if user logged in
    //and then redirect user to login page
    //and update the header
    $scope.loginStatusUpdate = function () {
      if (!User.isAuthenticated() || !User.getCurrentId()) {
        $location.path('/login');
        $scope.isLoggedIn = false;
      }
      else {
        $scope.isLoggedIn = true;
      }
    }

    $scope.logout = function () {
      User.logout({}, {},
        function successCb(res, headers) {
          $location.path('/');
          $rootScope.$emit('loginEvent', 'succesful login');
        });
    }

    $scope.init = function () {
      $scope.loginStatusUpdate();
    }

    $scope.init();
  });