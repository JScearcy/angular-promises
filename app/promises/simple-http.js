'use strict';
function http(options) {
    var options = options || http.defaultOptions;
    options.headers = options.headers || []
    switch (options.method) {
        case "POST":
        case "PUT":
            options.headers.push({ key: "Content-Type", value: "application/json" });
    }

    if (options.data) {
        var data = http.validateJson(options.data);
        if (data && data.valid) {
            options.data = data.payload;
        }
    } else if (options.params && typeof options.params == 'object') {
        for (var key in options.params) {
            options.url = options.url.replace(":" + key, options.params[key]);
        }
    }

    return http.xmlHttp(options)    
}

http.get = function httpGet(url, params) {
    var options = this.defaultOptions;
    if (params && typeof params == 'object') {
        options.data = Object.keys(params).map(function (key) {
            return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
        }).join('&');
    } else if (params && typeof params == 'string') {
        options.data = params;
    }
    options.url = url;
    //return the request's promise
    return this.xmlHttp(options);
}

http.post = function httpPost(url, body) {
    var options = this.defaultOptions;
    options.method = "POST";
    options.url = url;
    options.headers.push({key: "Content-Type", value: "application/json"});
    if (body) {
        var data = this.validateJson(body);
        if (data && data.valid) {
            options.data = data.payload;
        }
    }
    // return the request's promise
    return this.xmlHttp(options);
}

http.xmlHttp = function xmlHttp(options) {
    // return new Promise
    return new Promise(function(resolve, reject) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open(options.method, options.url, true);
        options.headers.map(function (header) {
            xmlhttp.setRequestHeader(header.key, header.value);
        });

        xmlhttp.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                // on success resolve with the data
                resolve(xmlhttp.response); 
            } else {
                // if it isn't a success status reject with the status and message
                reject({
                status: this.status,
                statusText: xmlhttp.statusText
                });
            }
        }
        // if there's an error, reject with the status and message
        xmlhttp.onerror = function () {
            reject({
            status: this.status,
            statusText: xmlhttp.statusText
            });
        }
        xmlhttp.send(options.data);
    });
}

http.defaultOptions = {
    method: "GET",
    headers: [ { key: "Accept", value: "application/json, text/plain, * / *" } ],
    url: ""
}

http.validateJson = function (object) {
    var jsonObject = { valid: true };
    try { 
        jsonObject.payload = JSON.stringify(object);
    } catch  (e) {
        jsonObject.valid = false;
    }
    return jsonObject;
}
