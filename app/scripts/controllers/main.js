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
        main.ajaxGet = ajaxGet;

        function resourceGet() {
            main.currentUser = "";

            if (main.username.length > 0) {
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

        function ajaxGet() {
            main.currentUser = "";

            if (main.username.length > 0) {
                gitHubService.getUserAjax(main.username)
                    .then(function(username) {
                        setUser(username);
                    }).catch(function(err) {
                        console.error(err);
                    });
            }
        }

        function fakeGetPromise() {
            main.currentUser = "";

            gitHubService.fakeGetPromise(main.username)
                .then(function(user) {
                    setUser(user);
                }).catch(function(err) {
                    console.err(err);
                })
        }

        function setUser(user) {
            main.currentUser = user;
        }
    }]);
