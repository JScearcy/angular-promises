(function () {
    'use strict';

    angular.module('exampleApp')
        .service('gitHubService', gitHubService);
        
        gitHubService.$inject = ["$resource", "$http"];
        
        function gitHubService($resource, $http) {

            /* ************** $http ************** */
            this.getUserHttp = function (username) {
                return $http({
                    method: "GET",
                    url: "https://api.github.com/users/" + username
                });
            };

            this.postUserHttp = function (username, data) {
                return $http({
                    method: "POST",
                    url: "https://api.github.com/users/" + username,
                    data: data
                });
            };

            /* ************** transform ************** */
            this.transformHttp = function (username) {
                return $http({
                    method: "GET",
                    url: "https://api.github.com/users/" + username,
                    transformResponse: appendTransform($http.defaults.transformResponse, function (val) {
                        for (var key in val) {
                            if (val[key] && typeof val[key].toUpperCase === 'function') {
                                val[key] = val[key].toUpperCase();
                            }
                        }
                        return val;
                    })
                });
            }

            function appendTransform(defaults, transform) {
                // verify that the defaults are indeed an array
                defaults = angular.isArray(defaults) ? defaults : [defaults];
                
                return defaults.concat(transform);
            }

            /* ************** $resource ************** */
            this.User = $resource("https://api.github.com/users/:username", 
                {username: "@username"}, {
                    followers: { method: "GET", url: "https://api.github.com/users/:username/followers", params: { username: "@username" }, isArray: true },
                    following: { method: "GET", url: "https://api.github.com/users/:username/following", params: { username: "@username" }, isArray: true },
                    formatGet: { method: "GET", transformResponse: appendTransform($http.defaults.transformResponse, formatUser)}
                }
            );

            function formatUser(user) {
                return {
                    login: user.login,
                    created_at: user.created_at,
                    avatar_url: user.avatar_url
                };
            }

        }
    })();