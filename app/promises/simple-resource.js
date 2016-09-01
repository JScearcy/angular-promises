
function resource(url, paramDefaults, actions) {
    var config = {
        url: url,
        params: paramDefaults,
        actions: actions
    }
    return new resourceInstance(config);
}

function resourceInstance(config) {
    var allActions = {};
    if(config.params) {

    }
    if(config.actions) {
        for (var key in config.actions) {
            allActions[key] = function(params, success, fail) {
                var updatedConfig = config.actions[key];
                updatedConfig.params = params
                http(updatedConfig)
                    .then(success)
                    .catch(fail);
            };
        }
    }
    allActions.get = get;
    allActions.post = post;

    return allActions;

    function get(params, success, fail) {
        var formattedUrl = formatUrl(config.url, params);

        http.get(formattedUrl, params)
            .then(success)
            .catch(fail);
    }

    function post(params, data, success, fail) {
        var formattedUrl = formatUrl(config.url, params);

        http.post(formattedUrl, data)
            .then(success)
            .catch(fail);
    }

    function formatUrl(url, params) {
        if (!params) {
            params = config.params;
        }
        if (params) {
            for (var key in params) {
                url = url.replace(":" + key, params[key]);
            }
        }
        console.log(url);
        return url;
    }
}