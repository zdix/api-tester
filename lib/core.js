(function () {
    angular.module('app', ['app.core'])
})();

(function(){

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
        var URL = "http://localhost:3000/v1";
        return {
            get: get,
            set: set,
            setToken: setToken,
            Api: api(),
            URL: URL,
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

        function api() {
            var apiList = {
                Test: {
                    getTypeList: ['all/get-api-list'],
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

            function post(api, data) {
                var token = localStorageService.get("token");
                var url = URL + '/' + api + '?token=' + token + '&';
                console.log(url + transformObjectToUrlencodedData(data));
                return $http({
                    method: 'POST',
                    url: url,
                    data: transformObjectToUrlencodedData(data),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
                }).then(function (response) {

                    if (response.data.code == 0) {
                        return response.data.data;
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
            }

            function getUrl(api, data) {
                var token = get("token");
                var url = URL + '/' + api + '?token=' + token + '&client=' + 1 + '&version=' + 1 + '&';
                url = url + transformObjectToUrlencodedData(data);
                return url;
            }

        }

    }
})();