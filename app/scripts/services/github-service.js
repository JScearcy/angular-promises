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

        this.getUserAjax = function (username) {
            return $.ajax({
                    method: "GET",
                    url: "https://api.github.com/users/" + username
                });
        }

        this.fakeGetPromise = function (username) {
            return new Promise(function(resolve, reject) {
                setInterval(function() {
                    resolve("{\"login\":\"JScearcy\",\"id\":12852633,\"avatar_url\":\"https://avatars.githubusercontent.com/u/12852633?v=3\",\"gravatar_id\":\"\",\"url\":\"https://api.github.com/users/JScearcy\",\"html_url\":\"https://github.com/JScearcy\",\"followers_url\":\"https://api.github.com/users/JScearcy/followers\",\"following_url\":\"https://api.github.com/users/JScearcy/following{/other_user}\",\"gists_url\":\"https://api.github.com/users/JScearcy/gists{/gist_id}\",\"starred_url\":\"https://api.github.com/users/JScearcy/starred{/owner}{/repo}\",\"subscriptions_url\":\"https://api.github.com/users/JScearcy/subscriptions\",\"organizations_url\":\"https://api.github.com/users/JScearcy/orgs\",\"repos_url\":\"https://api.github.com/users/JScearcy/repos\",\"events_url\":\"https://api.github.com/users/JScearcy/events{/privacy}\",\"received_events_url\":\"https://api.github.com/users/JScearcy/received_events\",\"type\":\"User\",\"site_admin\":false,\"name\":\"JakeS\",\"company\":null,\"blog\":null,\"location\":null,\"email\":null,\"hireable\":null,\"bio\":null,\"public_repos\":48,\"public_gists\":3,\"followers\":13,\"following\":20,\"created_at\":\"2015-06-11T23:21:09Z\",\"updated_at\":\"2016-06-24T00:14:28Z\"}")
                }, 5000);
            });
        }
    }]);