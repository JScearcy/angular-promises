# Angular $http and $resource

## Promises
* Synchronous I/O -> Blocks everything until completed. Example: sync is the first to console log no matter the order
* Callback async handling -> Allows other work to be done and calls callback when completed
* Promise async handling -> (resolve, reject) allows other work to be done and a more readable pattern

## $q 
* A module for handling asynchronous operations
* Can be similar to Q/jQuery deferred, or like ES6 Promises
* using $q as a function provides a resolve and reject path to a function, just like a Promise
* $q.defer() returns a deferred object that in addition to resolve and reject has notify, which can provide updates prior to completion
* 

## $http
* Service for communication with remote http servers ... like AJAX
* Returns a Promise using the $q module
* Extensible -> 
    1. Custom headers
    2. transformRequest and transformResponse for pre and post data processing, defaults include serializing json preflight, and stripping common json, and deserializing the response.
    3. Caching is available with $cacheFactory:
        I. Only GET and JSONP requests are cached.
        II. The cache key is the request URL including search parameters; headers are not considered.
        III. Cached responses are returned asynchronously, in the same way as responses from the server.
        IV. If multiple identical requests are made using the same cache, which is not yet populated, one request will be made to the server and remaining requests will return the same response.
        V. A cache-control header on the response does not affect if or how responses are cached
    4. Interceptors can be provided with factories containing a `response`, `responseError`, `request`, `requestError` that take the config object and return that object, a new config object, or a promise that returns the config object


## $resource
* A factory that creates a resource object which abstracts away setting up singular $http calls for interacting with a RESTful api
* Underneath the covers each call is using an $http call with a transformResponse function to format the data
* By default the resource object contains { 'get':    {method:'GET'},
                                            'save':   {method:'POST'},
                                            'query':  {method:'GET', isArray:true},
                                            'remove': {method:'DELETE'},
                                            'delete': {method:'DELETE'} };
* Data returned contains additional methods prefixed with a $ - $save, $remove, $delete
* When a resource object method is called an empty object (or array) is returned and then updated upon completion. This sometimes eliminates the need for callbacks
* A resource method call can take a success and failure callback. Calling one or the other as neccessary
* A resource request is cancellable using $cancelRequest
* 

## http
* Simple implementation of http ->
* xmlHttp wraps an XmlHttpRequest in a Promise ->
* This request takes the options to be used and returns a new Promise ->
* The Promise wraps a successful request in the resolve handler ->
* The Promise wraps a failed http request or error in the reject handler ->
* http() -> formats the options and uses xmlHttp to send a request and returns the Promise
* http.get -> takes a url and a string or object and creates a query string, then gets the data and uses http() to complete the request
* http.post -> takes a url and an object, stringify-s the data and uses http() to complete the request

## resource 
* Resource leverages the http api to store the data for calls to the data source for easy implementation
* Resource function creates a config object and returns a new instance that holds the actions for getting related data
* The object returned contains each common REST action with most of the neccessary data to complete calls to the data source
* Custom actions are added to the object dynamically
* Resource updates the object on completion, if assigned, so all available properties from the data are available on that object