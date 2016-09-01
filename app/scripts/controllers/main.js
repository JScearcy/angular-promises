'use strict';

angular.module('exampleApp')
    .controller('MainCtrl', ['gitHubService', function (gitHubService) {
        var main = this;

        main.title = "Github Resource";
        main.username = "";
        main.currentUser = "";
        main.followers = [];
        main.following = [];
        main.resourceGet = resourceGet;
        main.httpGet = httpGet;

        function resourceGet() {
            main.currentUser = "";

            if (main.username.length > 0) {
                gitHubService.User.followers( 
                    { username: main.username },
                    function(res) { console.log(res) },
                    function(err) { console.error(err) }
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
                    .then(function(username) {
                        setUser(username);
                    }).catch(function(err) {
                        console.error(err);
                    });
            }
        }

        function setUser(user) {
            main.currentUser = user;
        }
    }]);
