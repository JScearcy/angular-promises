(function () {
  'use strict';

  angular
    .module('exampleApp', [
      'ngRoute',
      'ngResource'
    ])
    .config(Routes);

    Routes.$inject = ['$routeProvider'];
    
    function Routes($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/main.html',
          controller: 'MainCtrl',
          controllerAs: 'main'
        })
        .otherwise({
          redirectTo: '/'
        });
    }
  })();
