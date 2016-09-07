(function () {
    'use strict';

    angular
        .module('exampleApp', [
            'ngRoute',
            'ngResource'
        ])
        .config(Routes)
        .config(Interceptors);

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

        function Interceptors($httpProvider) {
            $httpProvider.interceptors.push('gitHubInterceptor');
        }
    })();
