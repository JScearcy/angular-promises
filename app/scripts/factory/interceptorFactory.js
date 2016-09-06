(function (){
    'use strict';

    angular.module('exampleApp')
        .factory('gitHubInterceptor', GitHubInterceptor);

    function GitHubInterceptor() {
        return {
            'request': function request(config) {
                console.log('Intercept request: ', config);
                return config;
            },

            'response': function response(response) {
                console.log('Intercept response: ', response);
                return response;
            }
        }
    }

})();