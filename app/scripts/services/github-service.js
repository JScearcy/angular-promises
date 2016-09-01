'use strict';

angular.module('exampleApp')
    .service('gitHubService', ["$resource", "$http", function($resource, $http) {
        this.User = $resource("https://api.github.com/users/:username", 
            {username: "@username"}, {
                followers: { method: "GET", url: "https://api.github.com/users/:username/followers", params: { username: "@username" }, isArray: true },
                following: { method: "GET", url: "https://api.github.com/users/:username/following", params: { username: "@username" }, isArray: true }
            }
        );

        this.getUserHttp = function (username) {
            return $http({
                method: "GET",
                url: "https://api.github.com/users/" + username
            });
        };

        this.postUserHttp = function (username) {
            return $http({
                method: "POST",
                url: "https://api.github.com/users/" + username,
                data: {}
            });
        }
    }]);