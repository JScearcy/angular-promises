(function () {
    'use strict';

    angular.module('exampleApp')
        .controller('MainCtrl', MainCtrl);
    
    MainCtrl.$inject = ['gitHubService'];
    
    function MainCtrl (gitHubService) {
        var main = this;

        main.title = "Examples: https://github.com/JScearcy/angular-promises";
        main.username = "";
        main.currentUser = {};
        main.resourceGet = resourceGet;
        main.resourceTransform = resourceTransform;
        main.httpGet = httpGet;
        main.httpTransformGet = httpTransformGet;

        function resourceGet() {
            main.currentUser = {};
            
            if (main.username.length > 0) {
                main.currentUser = gitHubService.User.get(
                    {username: main.username},
                    console.log,
                    console.error
                );
            }
        }

        function resourceTransform() {
            main.currentUser = {};

            if (main.username.length > 0) {
                main.currentUser = gitHubService.User.formatGet(
                    {username: main.username},
                    console.log,
                    console.error
                );
            }
        }

        function httpGet() {
            main.currentUser = {};

            if (main.username.length > 0) {
                gitHubService.getUserHttp(main.username)
                    .then(setUser)
                    .catch(console.error);
            }
        }

        function httpTransformGet() {
            main.currentUser = {};
            
            if (main.username.length > 0) {
                gitHubService.transformHttp(main.username)
                    .then(setUser)
                    .catch(console.error);
            }
        }

        function setUser(user) {
            main.currentUser = user;
        }
    }
})();
