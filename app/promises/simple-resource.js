
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
    if(!config.params) config.params = {};
    if(config.actions) {
        for (var key in config.actions) {
            allActions[key] = function(params, success, fail) {
                var updatedConfig = config.actions[key],
                    data = {};
                updatedConfig.params = params
                var promise = http(updatedConfig)
                    .then(function(res) {
                            updateData(data, res);
                            if(success) success(res);
                    })
                    .catch(fail);
                return data;
            };
        }
    }
    allActions.get = get;
    allActions.post = post;

    return allActions;

    function get(params, success, fail) {
        var formattedUrl = formatUrl(config.url, params),
            data = {};
        params = params || config.params;

        var promise = http.get(formattedUrl, params)
            .then(function(res) {
                updateData(data, res);
                if(success) success(res);
            })
            .catch(fail);
        return data;
    }

    function post(params, data, success, fail) {
        var formattedUrl = formatUrl(config.url, params),
            data = {};
        params = params || config.params;

        var promise = http.get(formattedUrl, params)
            .then(function(res) {
                updateData(data, res);
                if(success) success(res);
            })
            .catch(fail);
        return data;
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
        
        return url;
    }

    function updateData(data, resData) {
        var parsedRes =  JSON.parse(resData);
        for (var key in parsedRes) {
            data[key] = parsedRes[key];
        }
        return data;
    }
}