(function () {
    angular.module('app', ['app.core'])
})();

(function () {

    angular
        .module('app.core', ['LocalStorageModule'])

})();

/**
 * Created by dd on 12/26/15.
 */
(function () {
    angular
        .module('app.core')
        .factory('Core', ['localStorageService', '$http', '$q', Core]);

    function Core(localStorageService, $http, $q) {
        // var URL = "http://localhost:3000/v1";
        // var URL = "http://121.43.150.28/v1";
        var URL = "http://localhost:9999";
        return {
            get: get,
            set: set,
            setToken: setToken,
            Api: api(),
            URL: URL,
            arrayUnique: array_unique,
        };

        function get(key) {
            return localStorageService.get(key);
        }

        function set(key, val) {
            return localStorageService.set(key, val);
        }

        function setToken(token) {
            return set("token", token);
        }

        function array_unique(inputArr) {
            //  discuss at: http://phpjs.org/functions/array_unique/
            // original by: Carlos R. L. Rodrigues (http://www.jsfromhell.com)
            //    input by: duncan
            //    input by: Brett Zamir (http://brett-zamir.me)
            // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // bugfixed by: Nate
            // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // bugfixed by: Brett Zamir (http://brett-zamir.me)
            // improved by: Michael Grier
            //        note: The second argument, sort_flags is not implemented;
            //        note: also should be sorted (asort?) first according to docs
            //   example 1: array_unique(['Kevin','Kevin','van','Zonneveld','Kevin']);
            //   returns 1: {0: 'Kevin', 2: 'van', 3: 'Zonneveld'}
            //   example 2: array_unique({'a': 'green', 0: 'red', 'b': 'green', 1: 'blue', 2: 'red'});
            //   returns 2: {a: 'green', 0: 'red', 1: 'blue'}

            var key = '',
                tmp_arr2 = {},
                val = '';

            var __array_search = function(needle, haystack) {
                var fkey = '';
                for (fkey in haystack) {
                    if (haystack.hasOwnProperty(fkey)) {
                        if ((haystack[fkey] + '') === (needle + '')) {
                            return fkey;
                        }
                    }
                }
                return false;
            };

            for (key in inputArr) {
                if (inputArr.hasOwnProperty(key)) {
                    val = inputArr[key];
                    if (false === __array_search(val, tmp_arr2)) {
                        tmp_arr2[key] = val;
                    }
                }
            }

            return tmp_arr2;
        }

        function api() {
            var apiList = {
                Test: {
                    getTypeList: ['api/list'],
                    login: ['user/login', 'username', 'password']
                }

            };

            var api = {};
            for (var moduleKey in apiList) {
                var moduleApiList = apiList[moduleKey];
                api[moduleKey] = {};
                for (var functionName in moduleApiList) {
                    var config = moduleApiList[functionName];
                    api[moduleKey][functionName] = (function (config) {
                        return function () {
                            var action = config[0];
                            var data = {};
                            if (config.length > 1) {
                                for (var i = 1; i < config.length; i++) {
                                    var key = config[i];
                                    var value = arguments[i - 1];
                                    if (value === undefined) {
                                        continue;
                                    }
                                    data[key] = value;
                                }
                            }
                            return post(action, data);
                        };
                    })(config);
                }
            }


            api.getUrl = getUrl;
            api.post = post;
            return api;


            function transformObjectToUrlencodedData(obj) {
                var p = [];
                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        p.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
                    }
                }
                return p.join('&');
            }

            function getConfigFile() {
                return $http({
                    method: 'GET',
                    url: './config.json'
                }).then(function(response) {
                    if (response.status == 200)
                    {
                        return response.data;
                    }
                    else
                    {
                        return $q.reject(response);
                    }
                })
            }

            function getApiUrlByName() {
                return getConfigFile().then(
                    function (responseData) {
                        var apiName = getParameterByName('api');
                        console.log(responseData);

                        return $q.resolve(responseData[apiName]);
                    },
                    function (error) {
                        return $q.reject(error);
                    }
                );
            }

            function post(api, data) {

                return getApiUrlByName().then(function (responseData) {
                    var netPointUrl = responseData ? responseData : URL;

                    var token = localStorageService.get("token");
                    var url = netPointUrl + '/' + api + '?token=' + token + '&';
                    console.log(url + transformObjectToUrlencodedData(data));
                    return $http({
                        method: 'POST',
                        url: url,
                        data: transformObjectToUrlencodedData(data),
                        headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
                    }).then(function (response) {

                        if (response.data.code == 0) {
                            if (response.data.data) {
                                return response.data.data;
                            }
                            return response.data;
                        }

                        if (response.data.hasOwnProperty('code')) {
                            return $q.reject({
                                code: response.data.code,
                                message: response.data.message
                            })
                        }

                        return $q.reject({
                            code: -10000,
                            response: response
                        });
                    }, function (reason) {
                        return {
                            code: -10000,
                            reason: reason
                        }
                    });
                });
            }

            function getUrl(api, data) {
                var token = get("token");
                var url = URL + '/' + api + '?token=' + token + '&client=' + 1 + '&version=' + 1 + '&';
                url = url + transformObjectToUrlencodedData(data);
                return url;
            }

            function getParameterByName(name, url) {
                if (!url) url = window.location.href;
                url = url.toLowerCase(); // This is just to avoid case sensitiveness
                name = name.replace(/[\[\]]/g, "\\$&").toLowerCase(); // This is just to avoid case sensitiveness for query parameter name
                var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                    results = regex.exec(url);
                if (!results) return null;
                if (!results[2]) return '';
                return decodeURIComponent(results[2].replace(/\+/g, " "));
            }
        }

    }
})();