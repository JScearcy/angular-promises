(function () {
    'use strict';

    angular.module('exampleApp')
        .controller('MainCtrl', MainCtrl);
    
    MainCtrl.$inject = ['gitHubService'];
    
    function MainCtrl (gitHubService) {
        var main = this;

        main.title = "Github Resource";
        main.username = "";
        main.currentUser = "";
        main.resourceGet = resourceGet;
        main.httpGet = httpGet;

        function resourceGet() {
            main.currentUser = "";

            if (main.username.length > 0) {
                gitHubService.User.followers( 
                    { username: main.username },
                    console.log,
                    console.error
                 );
                gitHubService.User.get(
                    {username: main.username}, 
                    setUser,
                    console.error
                );
            }
        }

        function httpGet() {
            main.currentUser = "";

            if (main.username.length > 0) {
                gitHubService.getUserHttp(main.username)
                    .then(setUser)
                    .catch(console.error);
            }
        }

        function setUser(user) {
            main.currentUser = user;
        }
    }
})();
