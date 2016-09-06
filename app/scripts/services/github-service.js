(function() {
    'use strict';

    angular.module('exampleApp')
        .service('gitHubService', gitHubService);
        
        gitHubService.$inject = ["$resource", "$http"];
        
        function gitHubService($resource, $http) {
            this.User = $resource("https://api.github.com/users/:username", 
                {username: "@username"}, {
                    followers: { method: "GET", url: "https://api.github.com/users/:username/followers", params: { username: "@username" }, isArray: true },
                    following: { method: "GET", url: "https://api.github.com/users/:username/following", params: { username: "@username" }, isArray: true },
                    formatGet: { method: "GET", transformResponse: appendTransform($http.defaults.transformResponse, formatUser)}
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
            };

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
                // angular doesn't guarantee an array
                defaults = angular.isArray(defaults) ? defaults : [defaults];
                // Append the new transformation to the defaults
                return defaults.concat(transform);
            }


            function formatUser(user) {
                return {
                    login: user.login,
                    created_at: user.created_at,
                    avatar_url: user.avatar_url
                };
            }

        }
    })();