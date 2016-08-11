/**
 * Created by dd on 12/25/15.
 */

(function(){
    angular
        .module('app.core', ['LocalStorageModule', 'ui-notification']);

    angular
        .module('app.core')
        .config(['NotificationProvider', configNotification]);

    function configNotification(NotificationProvider) {
        NotificationProvider.setOptions({
            delay: 2000,
            startTop: 20,
            startRight: 10,
            verticalSpacing: 20,
            horizontalSpacing: 20,
            positionX: 'right',
            positionY: 'top'
        });
    }
    
})();


(function(){
    angular
        .module('app.core.component', []);
})();


/**
 * Created by dd on 12/26/15.
 */
(function () {
    angular
        .module('app.core')
        .factory('Config', ['Const', Config]);

    function Config(Const) {

        var Core = {
            LOG_LEVEL: Const.SYSTEM.LOG_LEVEL_DEBUG,

            DateFormatNoTime: 'Y.m.d',
            DateFormatNoYear: 'm-d H:i',

            ROUTE_LIST_GUEST_CAN_VISIT: ['hello', 'home#login', 'home#wx'],
            LOGIN_ROUTE: 'demo#login',

            DATA: {
                KEY_USER_TYPE: 'user-type',
                KEY_USER: 'user',
                KEY_APP_LAUNCH_INIT_ID: 'app-launch-init-id',
                APP_USER_TYPE: {
                    APP_USER_TYPE_ADMIN: 1,
                    APP_USER_TYPE_USER: 2,
                    APP_USER_TYPE_EXPRESS: 3,
                }
            },

            isInDebug: isInDebug,

        };
        return Core;

        function isInDebug() {
            return Core.LOG_LEVEL == Const.SYSTEM.LOG_LEVEL_DEBUG;
        }

    }
})();
/**
 * Created by dd on 12/26/15.
 */
(function(){
    angular
        .module('app.core')
        .factory('Core', ['$rootScope', '$window', '$document', '$q', '$timeout', '$interval', '$state', '$filter', 'localStorageService', 'Notification', 'Config', 'Const', 'Log', 'Util', 'Data', 'Api', '$uibModal', Core]);

    function Core($rootScope, $window, $document, $q, $timeout, $interval, $state, $filter, localStorageService, Notification, Config, Const, Log, Util, Data, Api, $uibModal) {
        var Core = {
            init: init,
            on: on,
            publish: publish,
            go: go,
            isIE: isIE,


            $window: $window,
            $document: $document,
            $q: $q,
            $timeout: $timeout,
            $interval: $interval,
            $state: $state,
            $filter: $filter,
            $uibModal: $uibModal,
            Notify: Notification,

            Config: Config,
            Const: Const,
            Log: Log,
            Util: Util,
            Data: Data,
            Api: Api,
            localStorageService: localStorageService
        };

        $window.Core = Core;

        return Core;

        function init()
        {
            if (Data.isGuest() && !Util.canGuestVisit())
            {
                Data.clearAuthData();
                Core.go('login');
            }
        }

        function go(state) {
            $state.go(state);
        }

        function on(eventName, callback)
        {
            return $rootScope.$on(eventName, callback);
        }

        function publish(eventName, data)
        {
            return $rootScope.$broadcast(eventName, data);
        }

        function isIE() {
            var isIE = false;
            if (!!navigator.userAgent.match(/MSIE/i))
            {
                var v = navigator.userAgent.match(/MSIE ([^;]+)/)[1];
                isIE = parseFloat(v.substring(0, v.indexOf(".")))
            }

            if (angular.isNumber(isIE) && isIE <= 9)
            {
                return true;
            }
            
            return false;
        }
    }
})();
/**
 * Created by dd on 12/26/15.
 */
(function () {
    angular
        .module('app.core')
        .factory('Data', ['$q', 'localStorageService', 'Const', 'Config', 'Util',Data]);

    function Data($q, localStorageService, Const, Config, Util) {

        return {
            isGuest: isGuest,
            getToken: getToken,
            setToken: setToken,
            getUser: getUser,
            setUser: setUser,
            getUserType: getUserType,
            setUserType: setUserType,
            get: get,
            set: set,
            getName: getName,
            getAvatar: getAvatar,
            clearAuthData: clearAuthData
        };

        function getName(name)
        {
            return name?name:'未命名';
        }

        function getAvatar(img)
        {
            return img? Util.getImgUrl(img) : Const.APP.DEFAULT_AVATOR;
        }

        function isGuest()
        {
            var token = getToken();
            return !token;
        }

        function getKey(key) {
            return Const.DATA.KEY_PREFIX + key;
        }

        function get(key) {
            key = getKey(key);
            return localStorageService.get(key);
        }

        function set(key, val) {
            key = getKey(key);
            // console.log('key: ' + key);
            return localStorageService.set(key, val);
        }

        function getToken() {
            var key = Const.DATA.KEY_TOKEN;
            return get(key);
        }

        function setToken(token) {
            var key = Const.DATA.KEY_TOKEN;
            return set(key, token);
        }

        function getUser() {
            var key = Const.DATA.KEY_USER;
            return get(key);
        }

        function setUser(user) {
            var key = Config.DATA.KEY_USER;
            return set(key, user);
        }

        function getUserType()
        {
            var key = Config.DATA.KEY_USER_TYPE;
            return get(key);
        }

        function setUserType(useType)
        {
            var key = Config.DATA.KEY_USER_TYPE;
            return set(key, useType);
        }

        function clearAuthData() {
            setToken('');
            setUser('');
        }
    }

})();
(function(){
    /**
     * INSPINIA - Responsive Admin Theme
     *
     * Main directives.js file
     * Define directives for used plugin
     *
     *
     * Functions (directives)
     *  - sideNavigation
     *  - iboxTools
     *  - minimalizaSidebar
     *  - vectorMap
     *  - sparkline
     *  - icheck
     *  - ionRangeSlider
     *  - dropZone
     *  - responsiveVideo
     *  - chatSlimScroll
     *  - customValid
     *  - fullScroll
     *  - closeOffCanvas
     *  - clockPicker
     *  - landingScrollspy
     *  - fitHeight
     *  - iboxToolsFullScreen
     *  - slimScroll
     *  - truncate
     *  - touchSpin
     *  - markdownEditor
     *  - resizeable
     *
     */


    /**
     * pageTitle - Directive for set Page title - mata title
     */
    function pageTitle($rootScope, $timeout) {
        return {
            link: function(scope, element) {
                var listener = function(event, toState, toParams, fromState, fromParams) {
                    // Default title - load on Dashboard 1
                    var title = 'INSPINIA | Responsive Admin Theme';
                    // Create your own title pattern
                    if (toState.data && toState.data.pageTitle) title = 'INSPINIA | ' + toState.data.pageTitle;
                    $timeout(function() {
                        element.text(title);
                    });
                };
                $rootScope.$on('$stateChangeStart', listener);
            }
        }
    };

    /**
     * sideNavigation - Directive for run metsiMenu on sidebar navigation
     */
    function sideNavigation($timeout) {
        return {
            restrict: 'A',
            link: function(scope, element) {
                // Call the metsiMenu plugin and plug it to sidebar navigation
                $timeout(function(){
                    element.metisMenu();

                });
            }
        };
    };

    /**
     * responsibleVideo - Directive for responsive video
     */
    function responsiveVideo() {
        return {
            restrict: 'A',
            link:  function(scope, element) {
                var figure = element;
                var video = element.children();
                video
                    .attr('data-aspectRatio', video.height() / video.width())
                    .removeAttr('height')
                    .removeAttr('width')

                //We can use $watch on $window.innerWidth also.
                $(window).resize(function() {
                    var newWidth = figure.width();
                    video
                        .width(newWidth)
                        .height(newWidth * video.attr('data-aspectRatio'));
                }).resize();
            }
        }
    }

    /**
     * iboxTools - Directive for iBox tools elements in right corner of ibox
     */
    function iboxTools($timeout) {
        return {
            restrict: 'A',
            scope: true,
            templateUrl: 'core/template/ibox_tools.html',
            controller: function ($scope, $element) {
                // Function for collapse ibox
                $scope.showhide = function () {
                    var ibox = $element.closest('div.ibox');
                    var icon = $element.find('i:first');
                    var content = ibox.find('div.ibox-content');
                    content.slideToggle(200);
                    // Toggle icon from up to down
                    icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
                    ibox.toggleClass('').toggleClass('border-bottom');
                    $timeout(function () {
                        ibox.resize();
                        ibox.find('[id^=map-]').resize();
                    }, 50);
                };
                // Function for close ibox
                $scope.closebox = function () {
                    var ibox = $element.closest('div.ibox');
                    ibox.remove();
                }
            }
        };
    }

    /**
     * iboxTools with full screen - Directive for iBox tools elements in right corner of ibox with full screen option
     */
    function iboxToolsFullScreen($timeout) {
        return {
            restrict: 'A',
            scope: true,
            templateUrl: 'core/template/ibox_tools_full_screen.html',
            controller: function ($scope, $element) {
                // Function for collapse ibox
                $scope.showhide = function () {
                    var ibox = $element.closest('div.ibox');
                    var icon = $element.find('i:first');
                    var content = ibox.find('div.ibox-content');
                    content.slideToggle(200);
                    // Toggle icon from up to down
                    icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
                    ibox.toggleClass('').toggleClass('border-bottom');
                    $timeout(function () {
                        ibox.resize();
                        ibox.find('[id^=map-]').resize();
                    }, 50);
                };
                // Function for close ibox
                $scope.closebox = function () {
                    var ibox = $element.closest('div.ibox');
                    ibox.remove();
                };
                // Function for full screen
                $scope.fullscreen = function () {
                    var ibox = $element.closest('div.ibox');
                    var button = $element.find('i.fa-expand');
                    $('body').toggleClass('fullscreen-ibox-mode');
                    button.toggleClass('fa-expand').toggleClass('fa-compress');
                    ibox.toggleClass('fullscreen');
                    setTimeout(function() {
                        $(window).trigger('resize');
                    }, 100);
                }
            }
        };
    }

    /**
     * minimalizaSidebar - Directive for minimalize sidebar
     */
    function minimalizaSidebar($timeout) {
        return {
            restrict: 'A',
            template: '<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="" ng-click="minimalize()"><i class="fa fa-bars"></i></a>',
            controller: function ($scope, $element) {
                $scope.minimalize = function () {
                    $("body").toggleClass("mini-navbar");
                    if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
                        // Hide menu in order to smoothly turn on when maximize menu
                        $('#side-menu').hide();
                        // For smoothly turn on menu
                        setTimeout(
                            function () {
                                $('#side-menu').fadeIn(400);
                            }, 200);
                    } else if ($('body').hasClass('fixed-sidebar')){
                        $('#side-menu').hide();
                        setTimeout(
                            function () {
                                $('#side-menu').fadeIn(400);
                            }, 100);
                    } else {
                        // Remove all inline style from jquery fadeIn function to reset menu state
                        $('#side-menu').removeAttr('style');
                    }
                }
            }
        };
    };


    function closeOffCanvas() {
        return {
            restrict: 'A',
            template: '<a class="close-canvas-menu" ng-click="closeOffCanvas()"><i class="fa fa-times"></i></a>',
            controller: function ($scope, $element) {
                $scope.closeOffCanvas = function () {
                    $("body").toggleClass("mini-navbar");
                }
            }
        };
    }

    /**
     * vectorMap - Directive for Vector map plugin
     */
    function vectorMap() {
        return {
            restrict: 'A',
            scope: {
                myMapData: '=',
            },
            link: function (scope, element, attrs) {
                var map = element.vectorMap({
                    map: 'world_mill_en',
                    backgroundColor: "transparent",
                    regionStyle: {
                        initial: {
                            fill: '#e4e4e4',
                            "fill-opacity": 0.9,
                            stroke: 'none',
                            "stroke-width": 0,
                            "stroke-opacity": 0
                        }
                    },
                    series: {
                        regions: [
                            {
                                values: scope.myMapData,
                                scale: ["#1ab394", "#22d6b1"],
                                normalizeFunction: 'polynomial'
                            }
                        ]
                    },
                });
                var destroyMap = function(){
                    element.remove();
                };
                scope.$on('$destroy', function() {
                    destroyMap();
                });
            }
        }
    }


    /**
     * sparkline - Directive for Sparkline chart
     */
    function sparkline() {
        return {
            restrict: 'A',
            scope: {
                sparkData: '=',
                sparkOptions: '=',
            },
            link: function (scope, element, attrs) {
                scope.$watch(scope.sparkData, function () {
                    render();
                });
                scope.$watch(scope.sparkOptions, function(){
                    render();
                });
                var render = function () {
                    $(element).sparkline(scope.sparkData, scope.sparkOptions);
                };
            }
        }
    };

    /**
     * icheck - Directive for custom checkbox icheck
     */
    function icheck($timeout) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function($scope, element, $attrs, ngModel) {
                return $timeout(function() {
                    var value;
                    value = $attrs['value'];

                    $scope.$watch($attrs['ngModel'], function(newValue){
                        $(element).iCheck('update');
                    })

                    return $(element).iCheck({
                        checkboxClass: 'icheckbox_square-green',
                        radioClass: 'iradio_square-green'

                    }).on('ifChanged', function(event) {
                        if ($(element).attr('type') === 'checkbox' && $attrs['ngModel']) {
                            $scope.$apply(function() {
                                return ngModel.$setViewValue(event.target.checked);
                            });
                        }
                        if ($(element).attr('type') === 'radio' && $attrs['ngModel']) {
                            return $scope.$apply(function() {
                                return ngModel.$setViewValue(value);
                            });
                        }
                    });
                });
            }
        };
    }

    /**
     * ionRangeSlider - Directive for Ion Range Slider
     */
    function ionRangeSlider() {
        return {
            restrict: 'A',
            scope: {
                rangeOptions: '='
            },
            link: function (scope, elem, attrs) {
                elem.ionRangeSlider(scope.rangeOptions);
            }
        }
    }

    /**
     * dropZone - Directive for Drag and drop zone file upload plugin
     */
    function dropZone() {
        return {
            restrict: 'C',
            link: function(scope, element, attrs) {

                var config = {
                    url: 'http://localhost:8080/upload',
                    maxFilesize: 100,
                    paramName: "uploadfile",
                    maxThumbnailFilesize: 10,
                    parallelUploads: 1,
                    autoProcessQueue: false
                };

                var eventHandlers = {
                    'addedfile': function(file) {
                        scope.file = file;
                        if (this.files[1]!=null) {
                            this.removeFile(this.files[0]);
                        }
                        scope.$apply(function() {
                            scope.fileAdded = true;
                        });
                    },

                    'success': function (file, response) {
                    }

                };

                dropzone = new Dropzone(element[0], config);

                angular.forEach(eventHandlers, function(handler, event) {
                    dropzone.on(event, handler);
                });

                scope.processDropzone = function() {
                    dropzone.processQueue();
                };

                scope.resetDropzone = function() {
                    dropzone.removeAllFiles();
                }
            }
        }
    }

    /**
     * chatSlimScroll - Directive for slim scroll for small chat
     */
    function chatSlimScroll($timeout) {
        return {
            restrict: 'A',
            link: function(scope, element) {
                $timeout(function(){
                    element.slimscroll({
                        height: '234px',
                        railOpacity: 0.4
                    });

                });
            }
        };
    }

    /**
     * customValid - Directive for custom validation example
     */
    function customValid(){
        return {
            require: 'ngModel',
            link: function(scope, ele, attrs, c) {
                scope.$watch(attrs.ngModel, function() {

                    // You can call a $http method here
                    // Or create custom validation

                    var validText = "Inspinia";

                    if(scope.extras == validText) {
                        c.$setValidity('cvalid', true);
                    } else {
                        c.$setValidity('cvalid', false);
                    }

                });
            }
        }
    }


    /**
     * fullScroll - Directive for slimScroll with 100%
     */
    function fullScroll($timeout){
        return {
            restrict: 'A',
            link: function(scope, element) {
                $timeout(function(){
                    element.slimscroll({
                        height: '100%',
                        railOpacity: 0.9
                    });

                });
            }
        };
    }

    /**
     * slimScroll - Directive for slimScroll with custom height
     */
    function slimScroll($timeout){
        return {
            restrict: 'A',
            scope: {
                boxHeight: '@'
            },
            link: function(scope, element) {
                $timeout(function(){
                    element.slimscroll({
                        height: scope.boxHeight,
                        railOpacity: 0.9
                    });

                });
            }
        };
    }

    /**
     * clockPicker - Directive for clock picker plugin
     */
    function clockPicker() {
        return {
            restrict: 'A',
            link: function(scope, element) {
                element.clockpicker();
            }
        };
    };


    /**
     * landingScrollspy - Directive for scrollspy in landing page
     */
    function landingScrollspy(){
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.scrollspy({
                    target: '.navbar-fixed-top',
                    offset: 80
                });
            }
        }
    }

    /**
     * fitHeight - Directive for set height fit to window height
     */
    function fitHeight(){
        return {
            restrict: 'A',
            link: function(scope, element) {
                element.css("height", $(window).height() + "px");
                element.css("min-height", $(window).height() + "px");
            }
        };
    }

    /**
     * truncate - Directive for truncate string
     */
    function truncate($timeout){
        return {
            restrict: 'A',
            scope: {
                truncateOptions: '='
            },
            link: function(scope, element) {
                $timeout(function(){
                    element.dotdotdot(scope.truncateOptions);

                });
            }
        };
    }


    /**
     * touchSpin - Directive for Bootstrap TouchSpin
     */
    function touchSpin() {
        return {
            restrict: 'A',
            scope: {
                spinOptions: '='
            },
            link: function (scope, element, attrs) {
                scope.$watch(scope.spinOptions, function(){
                    render();
                });
                var render = function () {
                    $(element).TouchSpin(scope.spinOptions);
                };
            }
        }
    };

    /**
     * markdownEditor - Directive for Bootstrap Markdown
     */
    function markdownEditor() {
        return {
            restrict: "A",
            require:  'ngModel',
            link:     function (scope, element, attrs, ngModel) {
                $(element).markdown({
                    savable:false,
                    onChange: function(e){
                        ngModel.$setViewValue(e.getContent());
                    }
                });
            }
        }
    };

    // function sideNavi() {
    //     return {
    //         restrict: 'A',
    //         templateUrl: 'core/template/navigation.html'
    //     }
    // }

    function topNavBar() {
        return {
            restrict: 'A',
            templateUrl: 'core/template/topnavbar.html'
        }
    }
    

    /**
     *
     * Pass all functions into module
     */
    angular
        .module('app.core')
        .directive('pageTitle', pageTitle)
        .directive('sideNavigation', sideNavigation)
        .directive('iboxTools', iboxTools)
        .directive('minimalizaSidebar', minimalizaSidebar)
        .directive('vectorMap', vectorMap)
        .directive('sparkline', sparkline)
        .directive('icheck', icheck)
        .directive('ionRangeSlider', ionRangeSlider)
        .directive('dropZone', dropZone)
        .directive('responsiveVideo', responsiveVideo)
        .directive('chatSlimScroll', chatSlimScroll)
        .directive('customValid', customValid)
        .directive('fullScroll', fullScroll)
        .directive('closeOffCanvas', closeOffCanvas)
        .directive('clockPicker', clockPicker)
        .directive('landingScrollspy', landingScrollspy)
        .directive('fitHeight', fitHeight)
        .directive('iboxToolsFullScreen', iboxToolsFullScreen)
        .directive('slimScroll', slimScroll)
        .directive('truncate', truncate)
        .directive('touchSpin', touchSpin)
        .directive('markdownEditor', markdownEditor)
        // .directive('sideNavi', sideNavi)
        .directive('topNavBar', topNavBar)

})();
/**
 * Created by dd on 12/26/15.
 */
(function(){
    angular
        .module('app.core')
        .factory('Log', ['Config', 'Const', Log]);

    function Log(Config, Const) {
        const LevelMap = {
            error: Const.SYSTEM.LOG_LEVEL_ERROR,
            warn: Const.SYSTEM.LOG_LEVEL_WARN,
            info: Const.SYSTEM.LOG_LEVEL_INFO,
            trace: Const.SYSTEM.LOG_LEVEL_TRACE,
            debug: Const.SYSTEM.LOG_LEVEL_DEBUG
        };

        return {
            debug: debug,
            d: debug,

            info: info,
            i: info,

            warn: warn,
            w: warn,

            error: error,
            e: error,

            trace: trace,
            t: trace
        };

        function getLevelName(level)
        {
            for (var i in LevelMap)
            {
                if (LevelMap.hasOwnProperty(i))
                {
                    var l = LevelMap[i];
                    if (l == level)
                    {
                        return i;
                    }
                }
            }

            return '';
        }

        function rawLog()
        {
            var args = Array.prototype.slice.call(arguments);
            var level = args.shift();
            var levelName = getLevelName(level);

            if (level > Config.LOG_LEVEL)
            {
                return;
            }

            args.unshift('[' + levelName.toUpperCase() + ']');
            args.unshift(new Date().toString());
            console.log.apply(console, args);
        }

        function debug(){
            var args = Array.prototype.slice.call(arguments);
            args.unshift(Const.SYSTEM.LOG_LEVEL_DEBUG);
            rawLog.apply(null, args);
        }

        function trace(){
            var args = Array.prototype.slice.call(arguments);
            args.unshift(Const.SYSTEM.LOG_LEVEL_TRACE);
            rawLog.apply(null, args);
        }

        function info(){
            var args = Array.prototype.slice.call(arguments);
            args.unshift(Const.SYSTEM.LOG_LEVEL_INFO);
            rawLog.apply(null, args);
        }

        function warn(){
            var args = Array.prototype.slice.call(arguments);
            args.unshift(Const.SYSTEM.LOG_LEVEL_WARN);
            rawLog.apply(null, args);
        }

        function error(){
            var args = Array.prototype.slice.call(arguments);
            args.unshift(Const.SYSTEM.LOG_LEVEL_ERROR);
            rawLog.apply(null, args);
        }
    }

})();
/**
 * Created by whis on 5/28/16.
 */
(function () {
    angular
        .module('app.core')
        .factory('RegionControl', ['$rootScope', RegionControl]);

    function RegionControl($rootScope) {
        return {
            init: init
        };

        function init() {
            return {
                "10000": {
                    "name": "北京市",
                    "city": {
                        "10100": {
                            "name": "市辖区",
                            "county": {
                                "10101": "东城区",
                                "10102": "西城区",
                                "10103": "崇文区",
                                "10104": "宣武区",
                                "10105": "朝阳区",
                                "10106": "丰台区",
                                "10107": "石景山区",
                                "10108": "海淀区",
                                "10109": "门头沟区",
                                "10110": "房山区",
                                "10111": "通州区",
                                "10112": "顺义区",
                                "10113": "昌平区",
                                "10114": "大兴区",
                                "10115": "怀柔区",
                                "10116": "平谷区"
                            }
                        }, "10200": {"name": "北京周边", "county": {"10201": "密云县", "10202": "延庆县"}}
                    }
                },
                "20000": {
                    "name": "天津市",
                    "city": {
                        "20100": {
                            "name": "市辖区",
                            "county": {
                                "20101": "和平区",
                                "20102": "河东区",
                                "20103": "河西区",
                                "20104": "南开区",
                                "20105": "河北区",
                                "20106": "红桥区",
                                "20107": "塘沽区",
                                "20108": "汉沽区",
                                "20109": "大港区",
                                "20110": "东丽区",
                                "20111": "西青区",
                                "20112": "津南区",
                                "20113": "北辰区",
                                "20114": "武清区",
                                "20115": "宝坻区"
                            }
                        }, "20200": {"name": "天津周边", "county": {"20201": "宁河县", "20202": "静海县", "20203": "蓟县"}}
                    }
                },
                "30000": {
                    "name": "河北省",
                    "city": {
                        "30100": {
                            "name": "石家庄市",
                            "county": {
                                "30101": "长安区",
                                "30102": "桥东区",
                                "30103": "桥西区",
                                "30104": "新华区",
                                "30105": "井陉矿区",
                                "30106": "裕华区",
                                "30107": "井陉县",
                                "30108": "正定县",
                                "30109": "栾城县",
                                "30110": "行唐县",
                                "30111": "灵寿县",
                                "30112": "高邑县",
                                "30113": "深泽县",
                                "30114": "赞皇县",
                                "30115": "无极县",
                                "30116": "平山县",
                                "30117": "元氏县",
                                "30118": "赵县",
                                "30119": "辛集市",
                                "30120": "藁城市",
                                "30121": "晋州市",
                                "30122": "新乐市",
                                "30123": "鹿泉市"
                            }
                        },
                        "30200": {
                            "name": "唐山市",
                            "county": {
                                "30201": "路南区",
                                "30202": "路北区",
                                "30203": "古冶区",
                                "30204": "开平区",
                                "30205": "丰南区",
                                "30206": "丰润区",
                                "30207": "滦县",
                                "30208": "滦南县",
                                "30209": "乐亭县",
                                "30210": "迁西县",
                                "30211": "玉田县",
                                "30212": "唐海县",
                                "30213": "遵化市",
                                "30214": "迁安市"
                            }
                        },
                        "30300": {
                            "name": "秦皇岛市",
                            "county": {
                                "30301": "海港区",
                                "30302": "山海关区",
                                "30303": "北戴河区",
                                "30304": "青龙满族自治县",
                                "30305": "昌黎县",
                                "30306": "抚宁县",
                                "30307": "卢龙县"
                            }
                        },
                        "30400": {
                            "name": "邯郸市",
                            "county": {
                                "30401": "邯山区",
                                "30402": "丛台区",
                                "30403": "复兴区",
                                "30404": "峰峰矿区",
                                "30405": "邯郸县",
                                "30406": "临漳县",
                                "30407": "成安县",
                                "30408": "大名县",
                                "30409": "涉县",
                                "30410": "磁县",
                                "30411": "肥乡县",
                                "30412": "永年县",
                                "30413": "邱县",
                                "30414": "鸡泽县",
                                "30415": "广平县",
                                "30416": "馆陶县",
                                "30417": "魏县",
                                "30418": "曲周县",
                                "30419": "武安市"
                            }
                        },
                        "30500": {
                            "name": "邢台市",
                            "county": {
                                "30501": "桥东区",
                                "30502": "桥西区",
                                "30503": "邢台县",
                                "30504": "临城县",
                                "30505": "内丘县",
                                "30506": "柏乡县",
                                "30507": "隆尧县",
                                "30508": "任县",
                                "30509": "南和县",
                                "30510": "宁晋县",
                                "30511": "巨鹿县",
                                "30512": "新河县",
                                "30513": "广宗县",
                                "30514": "平乡县",
                                "30515": "威县",
                                "30516": "清河县",
                                "30517": "临西县",
                                "30518": "南宫市",
                                "30519": "沙河市"
                            }
                        },
                        "30600": {
                            "name": "保定市",
                            "county": {
                                "30601": "新市区",
                                "30602": "北市区",
                                "30603": "南市区",
                                "30604": "满城县",
                                "30605": "清苑县",
                                "30606": "涞水县",
                                "30607": "阜平县",
                                "30608": "徐水县",
                                "30609": "定兴县",
                                "30610": "唐县",
                                "30611": "高阳县",
                                "30612": "容城县",
                                "30613": "涞源县",
                                "30614": "望都县",
                                "30615": "安新县",
                                "30616": "易县",
                                "30617": "曲阳县",
                                "30618": "蠡县",
                                "30619": "顺平县",
                                "30620": "博野县",
                                "30621": "雄县",
                                "30622": "涿州市",
                                "30623": "定州市",
                                "30624": "安国市",
                                "30625": "高碑店市"
                            }
                        },
                        "30700": {
                            "name": "张家口市",
                            "county": {
                                "30701": "桥东区",
                                "30702": "桥西区",
                                "30703": "宣化区",
                                "30704": "下花园区",
                                "30705": "宣化县",
                                "30706": "张北县",
                                "30707": "康保县",
                                "30708": "沽源县",
                                "30709": "尚义县",
                                "30710": "蔚县",
                                "30711": "阳原县",
                                "30712": "怀安县",
                                "30713": "万全县",
                                "30714": "怀来县",
                                "30715": "涿鹿县",
                                "30716": "赤城县",
                                "30717": "崇礼县"
                            }
                        },
                        "30800": {
                            "name": "承德市",
                            "county": {
                                "30801": "双桥区",
                                "30802": "双滦区",
                                "30803": "鹰手营子矿区",
                                "30804": "承德县",
                                "30805": "兴隆县",
                                "30806": "平泉县",
                                "30807": "滦平县",
                                "30808": "隆化县",
                                "30809": "丰宁满族自治县",
                                "30810": "宽城满族自治县",
                                "30811": "围场满族蒙古族自治县"
                            }
                        },
                        "30900": {
                            "name": "沧州市",
                            "county": {
                                "30901": "新华区",
                                "30902": "运河区",
                                "30903": "沧县",
                                "30904": "青县",
                                "30905": "东光县",
                                "30906": "海兴县",
                                "30907": "盐山县",
                                "30908": "肃宁县",
                                "30909": "南皮县",
                                "30910": "吴桥县",
                                "30911": "献县",
                                "30912": "孟村回族自治县",
                                "30913": "泊头市",
                                "30914": "任丘市",
                                "30915": "黄骅市",
                                "30916": "河间市"
                            }
                        },
                        "31000": {
                            "name": "廊坊市",
                            "county": {
                                "31001": "安次区",
                                "31002": "广阳区",
                                "31003": "固安县",
                                "31004": "永清县",
                                "31005": "香河县",
                                "31006": "大城县",
                                "31007": "文安县",
                                "31008": "大厂回族自治县",
                                "31009": "霸州市",
                                "31010": "三河市"
                            }
                        },
                        "31100": {
                            "name": "衡水市",
                            "county": {
                                "31101": "桃城区",
                                "31102": "枣强县",
                                "31103": "武邑县",
                                "31104": "武强县",
                                "31105": "饶阳县",
                                "31106": "安平县",
                                "31107": "故城县",
                                "31108": "景县",
                                "31109": "阜城县",
                                "31110": "冀州市",
                                "31111": "深州市"
                            }
                        }
                    }
                },
                "40000": {
                    "name": "山西省",
                    "city": {
                        "40100": {
                            "name": "太原市",
                            "county": {
                                "40101": "小店区",
                                "40102": "迎泽区",
                                "40103": "杏花岭区",
                                "40104": "尖草坪区",
                                "40105": "万柏林区",
                                "40106": "晋源区",
                                "40107": "清徐县",
                                "40108": "阳曲县",
                                "40109": "娄烦县",
                                "40110": "古交市"
                            }
                        },
                        "40200": {
                            "name": "大同市",
                            "county": {
                                "40201": "城区",
                                "40202": "矿区",
                                "40203": "南郊区",
                                "40204": "新荣区",
                                "40205": "阳高县",
                                "40206": "天镇县",
                                "40207": "广灵县",
                                "40208": "灵丘县",
                                "40209": "浑源县",
                                "40210": "左云县",
                                "40211": "大同县"
                            }
                        },
                        "40300": {
                            "name": "阳泉市",
                            "county": {"40301": "城区", "40302": "矿区", "40303": "郊区", "40304": "平定县", "40305": "盂县"}
                        },
                        "40400": {
                            "name": "长治市",
                            "county": {
                                "40401": "城区",
                                "40402": "郊区",
                                "40403": "长治县",
                                "40404": "襄垣县",
                                "40405": "屯留县",
                                "40406": "平顺县",
                                "40407": "黎城县",
                                "40408": "壶关县",
                                "40409": "长子县",
                                "40410": "武乡县",
                                "40411": "沁县",
                                "40412": "沁源县",
                                "40413": "潞城市"
                            }
                        },
                        "40500": {
                            "name": "晋城市",
                            "county": {
                                "40501": "城区",
                                "40502": "沁水县",
                                "40503": "阳城县",
                                "40504": "陵川县",
                                "40505": "泽州县",
                                "40506": "高平市"
                            }
                        },
                        "40600": {
                            "name": "朔州市",
                            "county": {
                                "40601": "朔城区",
                                "40602": "平鲁区",
                                "40603": "山阴县",
                                "40604": "应县",
                                "40605": "右玉县",
                                "40606": "怀仁县"
                            }
                        },
                        "40700": {
                            "name": "晋中市",
                            "county": {
                                "40701": "榆次区",
                                "40702": "榆社县",
                                "40703": "左权县",
                                "40704": "和顺县",
                                "40705": "昔阳县",
                                "40706": "寿阳县",
                                "40707": "太谷县",
                                "40708": "祁县",
                                "40709": "平遥县",
                                "40710": "灵石县",
                                "40711": "介休市"
                            }
                        },
                        "40800": {
                            "name": "运城市",
                            "county": {
                                "40801": "盐湖区",
                                "40802": "临猗县",
                                "40803": "万荣县",
                                "40804": "闻喜县",
                                "40805": "稷山县",
                                "40806": "新绛县",
                                "40807": "绛县",
                                "40808": "垣曲县",
                                "40809": "夏县",
                                "40810": "平陆县",
                                "40811": "芮城县",
                                "40812": "永济市",
                                "40813": "河津市"
                            }
                        },
                        "40900": {
                            "name": "忻州市",
                            "county": {
                                "40901": "忻府区",
                                "40902": "定襄县",
                                "40903": "五台县",
                                "40904": "代县",
                                "40905": "繁峙县",
                                "40906": "宁武县",
                                "40907": "静乐县",
                                "40908": "神池县",
                                "40909": "五寨县",
                                "40910": "岢岚县",
                                "40911": "河曲县",
                                "40912": "保德县",
                                "40913": "偏关县",
                                "40914": "原平市"
                            }
                        },
                        "41000": {
                            "name": "临汾市",
                            "county": {
                                "41001": "尧都区",
                                "41002": "曲沃县",
                                "41003": "翼城县",
                                "41004": "襄汾县",
                                "41005": "洪洞县",
                                "41006": "古县",
                                "41007": "安泽县",
                                "41008": "浮山县",
                                "41009": "吉县",
                                "41010": "乡宁县",
                                "41011": "大宁县",
                                "41012": "隰县",
                                "41013": "永和县",
                                "41014": "蒲县",
                                "41015": "汾西县",
                                "41016": "侯马市",
                                "41017": "霍州市"
                            }
                        },
                        "41100": {
                            "name": "吕梁市",
                            "county": {
                                "41101": "离石区",
                                "41102": "文水县",
                                "41103": "交城县",
                                "41104": "兴县",
                                "41105": "临县",
                                "41106": "柳林县",
                                "41107": "石楼县",
                                "41108": "岚县",
                                "41109": "方山县",
                                "41110": "中阳县",
                                "41111": "交口县",
                                "41112": "孝义市",
                                "41113": "汾阳市"
                            }
                        }
                    }
                },
                "50000": {
                    "name": "内蒙古自治区",
                    "city": {
                        "50100": {
                            "name": "呼和浩特市",
                            "county": {
                                "50101": "新城区",
                                "50102": "回民区",
                                "50103": "玉泉区",
                                "50104": "赛罕区",
                                "50105": "土默特左旗",
                                "50106": "托克托县",
                                "50107": "和林格尔县",
                                "50108": "清水河县",
                                "50109": "武川县"
                            }
                        },
                        "50200": {
                            "name": "包头市",
                            "county": {
                                "50201": "东河区",
                                "50202": "昆都仑区",
                                "50203": "青山区",
                                "50204": "石拐区",
                                "50205": "白云矿区",
                                "50206": "九原区",
                                "50207": "土默特右旗",
                                "50208": "固阳县",
                                "50209": "达尔罕茂明安联合旗"
                            }
                        },
                        "50300": {"name": "乌海市", "county": {"50301": "海勃湾区", "50302": "海南区", "50303": "乌达区"}},
                        "50400": {
                            "name": "赤峰市",
                            "county": {
                                "50401": "红山区",
                                "50402": "元宝山区",
                                "50403": "松山区",
                                "50404": "阿鲁科尔沁旗",
                                "50405": "巴林左旗",
                                "50406": "巴林右旗",
                                "50407": "林西县",
                                "50408": "克什克腾旗",
                                "50409": "翁牛特旗",
                                "50410": "喀喇沁旗",
                                "50411": "宁城县",
                                "50412": "敖汉旗"
                            }
                        },
                        "50500": {
                            "name": "通辽市",
                            "county": {
                                "50501": "科尔沁区",
                                "50502": "科尔沁左翼中旗",
                                "50503": "科尔沁左翼后旗",
                                "50504": "开鲁县",
                                "50505": "库伦旗",
                                "50506": "奈曼旗",
                                "50507": "扎鲁特旗",
                                "50508": "霍林郭勒市"
                            }
                        },
                        "50600": {
                            "name": "鄂尔多斯市",
                            "county": {
                                "50601": "东胜区",
                                "50602": "达拉特旗",
                                "50603": "准格尔旗",
                                "50604": "鄂托克前旗",
                                "50605": "鄂托克旗",
                                "50606": "杭锦旗",
                                "50607": "乌审旗",
                                "50608": "伊金霍洛旗"
                            }
                        },
                        "50700": {
                            "name": "呼伦贝尔市",
                            "county": {
                                "50701": "海拉尔区",
                                "50702": "阿荣旗",
                                "50703": "莫力达瓦达斡尔族自治旗",
                                "50704": "鄂伦春自治旗",
                                "50705": "鄂温克族自治旗",
                                "50706": "陈巴尔虎旗",
                                "50707": "新巴尔虎左旗",
                                "50708": "新巴尔虎右旗",
                                "50709": "满洲里市",
                                "50710": "牙克石市",
                                "50711": "扎兰屯市",
                                "50712": "额尔古纳市",
                                "50713": "根河市"
                            }
                        },
                        "50800": {
                            "name": "巴彦淖尔市",
                            "county": {
                                "50801": "临河区",
                                "50802": "五原县",
                                "50803": "磴口县",
                                "50804": "乌拉特前旗",
                                "50805": "乌拉特中旗",
                                "50806": "乌拉特后旗",
                                "50807": "杭锦后旗"
                            }
                        },
                        "50900": {
                            "name": "乌兰察布市",
                            "county": {
                                "50901": "集宁区",
                                "50902": "卓资县",
                                "50903": "化德县",
                                "50904": "商都县",
                                "50905": "兴和县",
                                "50906": "凉城县",
                                "50907": "察哈尔右翼前旗",
                                "50908": "察哈尔右翼中旗",
                                "50909": "察哈尔右翼后旗",
                                "50910": "四子王旗",
                                "50911": "丰镇市"
                            }
                        },
                        "51000": {
                            "name": "兴安盟",
                            "county": {
                                "51001": "乌兰浩特市",
                                "51002": "阿尔山市",
                                "51003": "科尔沁右翼前旗",
                                "51004": "科尔沁右翼中旗",
                                "51005": "扎赉特旗",
                                "51006": "突泉县"
                            }
                        },
                        "51100": {
                            "name": "锡林郭勒盟",
                            "county": {
                                "51101": "二连浩特市",
                                "51102": "锡林浩特市",
                                "51103": "阿巴嘎旗",
                                "51104": "苏尼特左旗",
                                "51105": "苏尼特右旗",
                                "51106": "东乌珠穆沁旗",
                                "51107": "西乌珠穆沁旗",
                                "51108": "太仆寺旗",
                                "51109": "镶黄旗",
                                "51110": "正镶白旗",
                                "51111": "正蓝旗",
                                "51112": "多伦县"
                            }
                        },
                        "51200": {"name": "阿拉善盟", "county": {"51201": "阿拉善左旗", "51202": "阿拉善右旗", "51203": "额济纳旗"}}
                    }
                },
                "60000": {
                    "name": "辽宁省",
                    "city": {
                        "60100": {
                            "name": "沈阳市",
                            "county": {
                                "60101": "和平区",
                                "60102": "沈河区",
                                "60103": "大东区",
                                "60104": "皇姑区",
                                "60105": "铁西区",
                                "60106": "苏家屯区",
                                "60107": "东陵区",
                                "60108": "新城子区",
                                "60109": "于洪区",
                                "60110": "辽中县",
                                "60111": "康平县",
                                "60112": "法库县",
                                "60113": "新民市"
                            }
                        },
                        "60200": {
                            "name": "大连市",
                            "county": {
                                "60201": "中山区",
                                "60202": "西岗区",
                                "60203": "沙河口区",
                                "60204": "甘井子区",
                                "60205": "旅顺口区",
                                "60206": "金州区",
                                "60207": "长海县",
                                "60208": "瓦房店市",
                                "60209": "普兰店市",
                                "60210": "庄河市"
                            }
                        },
                        "60300": {
                            "name": "鞍山市",
                            "county": {
                                "60301": "铁东区",
                                "60302": "铁西区",
                                "60303": "立山区",
                                "60304": "千山区",
                                "60305": "台安县",
                                "60306": "岫岩满族自治县",
                                "60307": "海城市"
                            }
                        },
                        "60400": {
                            "name": "抚顺市",
                            "county": {
                                "60401": "新抚区",
                                "60402": "东洲区",
                                "60403": "望花区",
                                "60404": "顺城区",
                                "60405": "抚顺县",
                                "60406": "新宾满族自治县",
                                "60407": "清原满族自治县"
                            }
                        },
                        "60500": {
                            "name": "本溪市",
                            "county": {
                                "60501": "平山区",
                                "60502": "溪湖区",
                                "60503": "明山区",
                                "60504": "南芬区",
                                "60505": "本溪满族自治县",
                                "60506": "桓仁满族自治县"
                            }
                        },
                        "60600": {
                            "name": "丹东市",
                            "county": {
                                "60601": "元宝区",
                                "60602": "振兴区",
                                "60603": "振安区",
                                "60604": "宽甸满族自治县",
                                "60605": "东港市",
                                "60606": "凤城市"
                            }
                        },
                        "60700": {
                            "name": "锦州市",
                            "county": {
                                "60701": "古塔区",
                                "60702": "凌河区",
                                "60703": "太和区",
                                "60704": "黑山县",
                                "60705": "义县",
                                "60706": "凌海市",
                                "60707": "北宁市"
                            }
                        },
                        "60800": {
                            "name": "营口市",
                            "county": {
                                "60801": "站前区",
                                "60802": "西市区",
                                "60803": "鲅鱼圈区",
                                "60804": "老边区",
                                "60805": "盖州市",
                                "60806": "大石桥市"
                            }
                        },
                        "60900": {
                            "name": "阜新市",
                            "county": {
                                "60901": "海州区",
                                "60902": "新邱区",
                                "60903": "太平区",
                                "60904": "清河门区",
                                "60905": "细河区",
                                "60906": "阜新蒙古族自治县",
                                "60907": "彰武县"
                            }
                        },
                        "61000": {
                            "name": "辽阳市",
                            "county": {
                                "61001": "白塔区",
                                "61002": "文圣区",
                                "61003": "宏伟区",
                                "61004": "弓长岭区",
                                "61005": "太子河区",
                                "61006": "辽阳县",
                                "61007": "灯塔市"
                            }
                        },
                        "61100": {
                            "name": "盘锦市",
                            "county": {"61101": "双台子区", "61102": "兴隆台区", "61103": "大洼县", "61104": "盘山县"}
                        },
                        "61200": {
                            "name": "铁岭市",
                            "county": {
                                "61201": "银州区",
                                "61202": "清河区",
                                "61203": "铁岭县",
                                "61204": "西丰县",
                                "61205": "昌图县",
                                "61206": "调兵山市",
                                "61207": "开原市"
                            }
                        },
                        "61300": {
                            "name": "朝阳市",
                            "county": {
                                "61301": "双塔区",
                                "61302": "龙城区",
                                "61303": "朝阳县",
                                "61304": "建平县",
                                "61305": "喀喇沁左翼蒙古族自治县",
                                "61306": "北票市",
                                "61307": "凌源市"
                            }
                        },
                        "61400": {
                            "name": "葫芦岛市",
                            "county": {
                                "61401": "连山区",
                                "61402": "龙港区",
                                "61403": "南票区",
                                "61404": "绥中县",
                                "61405": "建昌县",
                                "61406": "兴城市"
                            }
                        }
                    }
                },
                "70000": {
                    "name": "吉林省",
                    "city": {
                        "70100": {
                            "name": "长春市",
                            "county": {
                                "70101": "南关区",
                                "70102": "宽城区",
                                "70103": "朝阳区",
                                "70104": "二道区",
                                "70105": "绿园区",
                                "70106": "双阳区",
                                "70107": "农安县",
                                "70108": "九台市",
                                "70109": "榆树市",
                                "70110": "德惠市"
                            }
                        },
                        "70200": {
                            "name": "吉林市",
                            "county": {
                                "70201": "昌邑区",
                                "70202": "龙潭区",
                                "70203": "船营区",
                                "70204": "丰满区",
                                "70205": "永吉县",
                                "70206": "蛟河市",
                                "70207": "桦甸市",
                                "70208": "舒兰市",
                                "70209": "磐石市"
                            }
                        },
                        "70300": {
                            "name": "四平市",
                            "county": {
                                "70301": "铁西区",
                                "70302": "铁东区",
                                "70303": "梨树县",
                                "70304": "伊通满族自治县",
                                "70305": "公主岭市",
                                "70306": "双辽市"
                            }
                        },
                        "70400": {
                            "name": "辽源市",
                            "county": {"70401": "龙山区", "70402": "西安区", "70403": "东丰县", "70404": "东辽县"}
                        },
                        "70500": {
                            "name": "通化市",
                            "county": {
                                "70501": "东昌区",
                                "70502": "二道江区",
                                "70503": "通化县",
                                "70504": "辉南县",
                                "70505": "柳河县",
                                "70506": "梅河口市",
                                "70507": "集安市"
                            }
                        },
                        "70600": {
                            "name": "白山市",
                            "county": {
                                "70601": "八道江区",
                                "70602": "抚松县",
                                "70603": "靖宇县",
                                "70604": "长白朝鲜族自治县",
                                "70605": "江源县",
                                "70606": "临江市"
                            }
                        },
                        "70700": {
                            "name": "松原市",
                            "county": {
                                "70701": "宁江区",
                                "70702": "前郭尔罗斯蒙古族自治县",
                                "70703": "长岭县",
                                "70704": "乾安县",
                                "70705": "扶余县"
                            }
                        },
                        "70800": {
                            "name": "白城市",
                            "county": {"70801": "洮北区", "70802": "镇赉县", "70803": "通榆县", "70804": "洮南市", "70805": "大安市"}
                        },
                        "70900": {
                            "name": "延边朝鲜族自治州",
                            "county": {
                                "70901": "延吉市",
                                "70902": "图们市",
                                "70903": "敦化市",
                                "70904": "珲春市",
                                "70905": "龙井市",
                                "70906": "和龙市",
                                "70907": "汪清县",
                                "70908": "安图县"
                            }
                        }
                    }
                },
                "80000": {
                    "name": "黑龙江省",
                    "city": {
                        "80100": {
                            "name": "哈尔滨市",
                            "county": {
                                "80101": "道里区",
                                "80102": "南岗区",
                                "80103": "道外区",
                                "80104": "香坊区",
                                "80105": "动力区",
                                "80106": "平房区",
                                "80107": "松北区",
                                "80108": "呼兰区",
                                "80109": "依兰县",
                                "80110": "方正县",
                                "80111": "宾县",
                                "80112": "巴彦县",
                                "80113": "木兰县",
                                "80114": "通河县",
                                "80115": "延寿县",
                                "80116": "阿城市",
                                "80117": "双城市",
                                "80118": "尚志市",
                                "80119": "五常市"
                            }
                        },
                        "80200": {
                            "name": "齐齐哈尔市",
                            "county": {
                                "80201": "龙沙区",
                                "80202": "建华区",
                                "80203": "铁锋区",
                                "80204": "昂昂溪区",
                                "80205": "富拉尔基区",
                                "80206": "碾子山区",
                                "80207": "梅里斯达斡尔族区",
                                "80208": "龙江县",
                                "80209": "依安县",
                                "80210": "泰来县",
                                "80211": "甘南县",
                                "80212": "富裕县",
                                "80213": "克山县",
                                "80214": "克东县",
                                "80215": "拜泉县",
                                "80216": "讷河市"
                            }
                        },
                        "80300": {
                            "name": "鸡西市",
                            "county": {
                                "80301": "鸡冠区",
                                "80302": "恒山区",
                                "80303": "滴道区",
                                "80304": "梨树区",
                                "80305": "城子河区",
                                "80306": "麻山区",
                                "80307": "鸡东县",
                                "80308": "虎林市",
                                "80309": "密山市"
                            }
                        },
                        "80400": {
                            "name": "鹤岗市",
                            "county": {
                                "80401": "向阳区",
                                "80402": "工农区",
                                "80403": "南山区",
                                "80404": "兴安区",
                                "80405": "东山区",
                                "80406": "兴山区",
                                "80407": "萝北县",
                                "80408": "绥滨县"
                            }
                        },
                        "80500": {
                            "name": "双鸭山市",
                            "county": {
                                "80501": "尖山区",
                                "80502": "岭东区",
                                "80503": "四方台区",
                                "80504": "宝山区",
                                "80505": "集贤县",
                                "80506": "友谊县",
                                "80507": "宝清县",
                                "80508": "饶河县"
                            }
                        },
                        "80600": {
                            "name": "大庆市",
                            "county": {
                                "80601": "萨尔图区",
                                "80602": "龙凤区",
                                "80603": "让胡路区",
                                "80604": "红岗区",
                                "80605": "大同区",
                                "80606": "肇州县",
                                "80607": "肇源县",
                                "80608": "林甸县",
                                "80609": "杜尔伯特蒙古族自治县"
                            }
                        },
                        "80700": {
                            "name": "伊春市",
                            "county": {
                                "80701": "伊春区",
                                "80702": "南岔区",
                                "80703": "友好区",
                                "80704": "西林区",
                                "80705": "翠峦区",
                                "80706": "新青区",
                                "80707": "美溪区",
                                "80708": "金山屯区",
                                "80709": "五营区",
                                "80710": "乌马河区",
                                "80711": "汤旺河区",
                                "80712": "带岭区",
                                "80713": "乌伊岭区",
                                "80714": "红星区",
                                "80715": "上甘岭区",
                                "80716": "嘉荫县",
                                "80717": "铁力市"
                            }
                        },
                        "80800": {
                            "name": "佳木斯市",
                            "county": {
                                "80801": "永红区",
                                "80802": "向阳区",
                                "80803": "前进区",
                                "80804": "东风区",
                                "80805": "郊区",
                                "80806": "桦南县",
                                "80807": "桦川县",
                                "80808": "汤原县",
                                "80809": "抚远县",
                                "80810": "同江市",
                                "80811": "富锦市"
                            }
                        },
                        "80900": {
                            "name": "七台河市",
                            "county": {"80901": "新兴区", "80902": "桃山区", "80903": "茄子河区", "80904": "勃利县"}
                        },
                        "81000": {
                            "name": "牡丹江市",
                            "county": {
                                "81001": "东安区",
                                "81002": "阳明区",
                                "81003": "爱民区",
                                "81004": "西安区",
                                "81005": "东宁县",
                                "81006": "林口县",
                                "81007": "绥芬河市",
                                "81008": "海林市",
                                "81009": "宁安市",
                                "81010": "穆棱市"
                            }
                        },
                        "81100": {
                            "name": "黑河市",
                            "county": {
                                "81101": "爱辉区",
                                "81102": "嫩江县",
                                "81103": "逊克县",
                                "81104": "孙吴县",
                                "81105": "北安市",
                                "81106": "五大连池市"
                            }
                        },
                        "81200": {
                            "name": "绥化市",
                            "county": {
                                "81201": "北林区",
                                "81202": "望奎县",
                                "81203": "兰西县",
                                "81204": "青冈县",
                                "81205": "庆安县",
                                "81206": "明水县",
                                "81207": "绥棱县",
                                "81208": "安达市",
                                "81209": "肇东市",
                                "81210": "海伦市"
                            }
                        },
                        "81300": {"name": "大兴安岭地区", "county": {"81301": "呼玛县", "81302": "塔河县", "81303": "漠河县"}}
                    }
                },
                "90000": {
                    "name": "上海市",
                    "city": {
                        "90100": {
                            "name": "市辖区",
                            "county": {
                                "90101": "黄浦区",
                                "90102": "卢湾区",
                                "90103": "徐汇区",
                                "90104": "长宁区",
                                "90105": "静安区",
                                "90106": "普陀区",
                                "90107": "闸北区",
                                "90108": "虹口区",
                                "90109": "杨浦区",
                                "90110": "闵行区",
                                "90111": "宝山区",
                                "90112": "嘉定区",
                                "90113": "浦东新区",
                                "90114": "金山区",
                                "90115": "松江区",
                                "90116": "青浦区",
                                "90117": "南汇区",
                                "90118": "奉贤区"
                            }
                        }, "90200": {"name": "上海周边", "county": {"90201": "崇明县"}}
                    }
                },
                "100000": {
                    "name": "江苏省",
                    "city": {
                        "100100": {
                            "name": "南京市",
                            "county": {
                                "100101": "玄武区",
                                "100102": "白下区",
                                "100103": "秦淮区",
                                "100104": "建邺区",
                                "100105": "鼓楼区",
                                "100106": "下关区",
                                "100107": "浦口区",
                                "100108": "栖霞区",
                                "100109": "雨花台区",
                                "100110": "江宁区",
                                "100111": "六合区",
                                "100112": "溧水县",
                                "100113": "高淳县"
                            }
                        },
                        "100200": {
                            "name": "无锡市",
                            "county": {
                                "100201": "崇安区",
                                "100202": "南长区",
                                "100203": "北塘区",
                                "100204": "锡山区",
                                "100205": "惠山区",
                                "100206": "滨湖区",
                                "100207": "江阴市",
                                "100208": "宜兴市"
                            }
                        },
                        "100300": {
                            "name": "徐州市",
                            "county": {
                                "100301": "鼓楼区",
                                "100302": "云龙区",
                                "100303": "九里区",
                                "100304": "贾汪区",
                                "100305": "泉山区",
                                "100306": "丰县",
                                "100307": "沛县",
                                "100308": "铜山县",
                                "100309": "睢宁县",
                                "100310": "新沂市",
                                "100311": "邳州市"
                            }
                        },
                        "100400": {
                            "name": "常州市",
                            "county": {
                                "100401": "天宁区",
                                "100402": "钟楼区",
                                "100403": "戚墅堰区",
                                "100404": "新北区",
                                "100405": "武进区",
                                "100406": "溧阳市",
                                "100407": "金坛市"
                            }
                        },
                        "100500": {
                            "name": "苏州市",
                            "county": {
                                "100501": "沧浪区",
                                "100502": "平江区",
                                "100503": "金阊区",
                                "100504": "虎丘区",
                                "100505": "吴中区",
                                "100506": "相城区",
                                "100507": "常熟市",
                                "100508": "张家港市",
                                "100509": "昆山市",
                                "100510": "吴江市",
                                "100511": "太仓市"
                            }
                        },
                        "100600": {
                            "name": "南通市",
                            "county": {
                                "100601": "崇川区",
                                "100602": "港闸区",
                                "100603": "海安县",
                                "100604": "如东县",
                                "100605": "启东市",
                                "100606": "如皋市",
                                "100607": "通州市",
                                "100608": "海门市"
                            }
                        },
                        "100700": {
                            "name": "连云港市",
                            "county": {
                                "100701": "连云区",
                                "100702": "新浦区",
                                "100703": "海州区",
                                "100704": "赣榆县",
                                "100705": "东海县",
                                "100706": "灌云县",
                                "100707": "灌南县"
                            }
                        },
                        "100800": {
                            "name": "淮安市",
                            "county": {
                                "100801": "清河区",
                                "100802": "楚州区",
                                "100803": "淮阴区",
                                "100804": "清浦区",
                                "100805": "涟水县",
                                "100806": "洪泽县",
                                "100807": "盱眙县",
                                "100808": "金湖县"
                            }
                        },
                        "100900": {
                            "name": "盐城市",
                            "county": {
                                "100901": "亭湖区",
                                "100902": "盐都区",
                                "100903": "响水县",
                                "100904": "滨海县",
                                "100905": "阜宁县",
                                "100906": "射阳县",
                                "100907": "建湖县",
                                "100908": "东台市",
                                "100909": "大丰市"
                            }
                        },
                        "101000": {
                            "name": "扬州市",
                            "county": {
                                "101001": "广陵区",
                                "101002": "邗江区",
                                "101003": "郊区",
                                "101004": "宝应县",
                                "101005": "仪征市",
                                "101006": "高邮市",
                                "101007": "江都市"
                            }
                        },
                        "101100": {
                            "name": "镇江市",
                            "county": {
                                "101101": "京口区",
                                "101102": "润州区",
                                "101103": "丹徒区",
                                "101104": "丹阳市",
                                "101105": "扬中市",
                                "101106": "句容市"
                            }
                        },
                        "101200": {
                            "name": "泰州市",
                            "county": {
                                "101201": "海陵区",
                                "101202": "高港区",
                                "101203": "兴化市",
                                "101204": "靖江市",
                                "101205": "泰兴市",
                                "101206": "姜堰市"
                            }
                        },
                        "101300": {
                            "name": "宿迁市",
                            "county": {
                                "101301": "宿城区",
                                "101302": "宿豫区",
                                "101303": "沭阳县",
                                "101304": "泗阳县",
                                "101305": "泗洪县"
                            }
                        }
                    }
                },
                "110000": {
                    "name": "浙江省",
                    "city": {
                        "110100": {
                            "name": "杭州市",
                            "county": {
                                "110101": "上城区",
                                "110102": "下城区",
                                "110103": "江干区",
                                "110104": "拱墅区",
                                "110105": "西湖区",
                                "110106": "滨江区",
                                "110107": "萧山区",
                                "110108": "余杭区",
                                "110109": "桐庐县",
                                "110110": "淳安县",
                                "110111": "建德市",
                                "110112": "富阳市",
                                "110113": "临安市"
                            }
                        },
                        "110200": {
                            "name": "宁波市",
                            "county": {
                                "110201": "海曙区",
                                "110202": "江东区",
                                "110203": "江北区",
                                "110204": "北仑区",
                                "110205": "镇海区",
                                "110206": "鄞州区",
                                "110207": "象山县",
                                "110208": "宁海县",
                                "110209": "余姚市",
                                "110210": "慈溪市",
                                "110211": "奉化市"
                            }
                        },
                        "110300": {
                            "name": "温州市",
                            "county": {
                                "110301": "鹿城区",
                                "110302": "龙湾区",
                                "110303": "瓯海区",
                                "110304": "洞头县",
                                "110305": "永嘉县",
                                "110306": "平阳县",
                                "110307": "苍南县",
                                "110308": "文成县",
                                "110309": "泰顺县",
                                "110310": "瑞安市",
                                "110311": "乐清市"
                            }
                        },
                        "110400": {
                            "name": "嘉兴市",
                            "county": {
                                "110401": "秀城区",
                                "110402": "秀洲区",
                                "110403": "嘉善县",
                                "110404": "海盐县",
                                "110405": "海宁市",
                                "110406": "平湖市",
                                "110407": "桐乡市"
                            }
                        },
                        "110500": {
                            "name": "湖州市",
                            "county": {
                                "110501": "吴兴区",
                                "110502": "南浔区",
                                "110503": "德清县",
                                "110504": "长兴县",
                                "110505": "安吉县"
                            }
                        },
                        "110600": {
                            "name": "绍兴市",
                            "county": {
                                "110601": "越城区",
                                "110602": "绍兴县",
                                "110603": "新昌县",
                                "110604": "诸暨市",
                                "110605": "上虞市",
                                "110606": "嵊州市"
                            }
                        },
                        "110700": {
                            "name": "金华市",
                            "county": {
                                "110701": "婺城区",
                                "110702": "金东区",
                                "110703": "武义县",
                                "110704": "浦江县",
                                "110705": "磐安县",
                                "110706": "兰溪市",
                                "110707": "义乌市",
                                "110708": "东阳市",
                                "110709": "永康市"
                            }
                        },
                        "110800": {
                            "name": "衢州市",
                            "county": {
                                "110801": "柯城区",
                                "110802": "衢江区",
                                "110803": "常山县",
                                "110804": "开化县",
                                "110805": "龙游县",
                                "110806": "江山市"
                            }
                        },
                        "110900": {
                            "name": "舟山市",
                            "county": {"110901": "定海区", "110902": "普陀区", "110903": "岱山县", "110904": "嵊泗县"}
                        },
                        "111000": {
                            "name": "台州市",
                            "county": {
                                "111001": "椒江区",
                                "111002": "黄岩区",
                                "111003": "路桥区",
                                "111004": "玉环县",
                                "111005": "三门县",
                                "111006": "天台县",
                                "111007": "仙居县",
                                "111008": "温岭市",
                                "111009": "临海市"
                            }
                        },
                        "111100": {
                            "name": "丽水市",
                            "county": {
                                "111101": "莲都区",
                                "111102": "青田县",
                                "111103": "缙云县",
                                "111104": "遂昌县",
                                "111105": "松阳县",
                                "111106": "云和县",
                                "111107": "庆元县",
                                "111108": "景宁畲族自治县",
                                "111109": "龙泉市"
                            }
                        }
                    }
                },
                "120000": {
                    "name": "安徽省",
                    "city": {
                        "120100": {
                            "name": "合肥市",
                            "county": {
                                "120101": "瑶海区",
                                "120102": "庐阳区",
                                "120103": "蜀山区",
                                "120104": "包河区",
                                "120105": "长丰县",
                                "120106": "肥东县",
                                "120107": "肥西县"
                            }
                        },
                        "120200": {
                            "name": "芜湖市",
                            "county": {
                                "120201": "镜湖区",
                                "120202": "马塘区",
                                "120203": "新芜区",
                                "120204": "鸠江区",
                                "120205": "芜湖县",
                                "120206": "繁昌县",
                                "120207": "南陵县"
                            }
                        },
                        "120300": {
                            "name": "蚌埠市",
                            "county": {
                                "120301": "龙子湖区",
                                "120302": "蚌山区",
                                "120303": "禹会区",
                                "120304": "淮上区",
                                "120305": "怀远县",
                                "120306": "五河县",
                                "120307": "固镇县"
                            }
                        },
                        "120400": {
                            "name": "淮南市",
                            "county": {
                                "120401": "大通区",
                                "120402": "田家庵区",
                                "120403": "谢家集区",
                                "120404": "八公山区",
                                "120405": "潘集区",
                                "120406": "凤台县"
                            }
                        },
                        "120500": {
                            "name": "马鞍山市",
                            "county": {"120501": "金家庄区", "120502": "花山区", "120503": "雨山区", "120504": "当涂县"}
                        },
                        "120600": {
                            "name": "淮北市",
                            "county": {"120601": "杜集区", "120602": "相山区", "120603": "烈山区", "120604": "濉溪县"}
                        },
                        "120700": {
                            "name": "铜陵市",
                            "county": {"120701": "铜官山区", "120702": "狮子山区", "120703": "郊区", "120704": "铜陵县"}
                        },
                        "120800": {
                            "name": "安庆市",
                            "county": {
                                "120801": "迎江区",
                                "120802": "大观区",
                                "120803": "郊区",
                                "120804": "怀宁县",
                                "120805": "枞阳县",
                                "120806": "潜山县",
                                "120807": "太湖县",
                                "120808": "宿松县",
                                "120809": "望江县",
                                "120810": "岳西县",
                                "120811": "桐城市"
                            }
                        },
                        "120900": {
                            "name": "黄山市",
                            "county": {
                                "120901": "屯溪区",
                                "120902": "黄山区",
                                "120903": "徽州区",
                                "120904": "歙县",
                                "120905": "休宁县",
                                "120906": "黟县",
                                "120907": "祁门县"
                            }
                        },
                        "121000": {
                            "name": "滁州市",
                            "county": {
                                "121001": "琅琊区",
                                "121002": "南谯区",
                                "121003": "来安县",
                                "121004": "全椒县",
                                "121005": "定远县",
                                "121006": "凤阳县",
                                "121007": "天长市",
                                "121008": "明光市"
                            }
                        },
                        "121100": {
                            "name": "阜阳市",
                            "county": {
                                "121101": "颍州区",
                                "121102": "颍东区",
                                "121103": "颍泉区",
                                "121104": "临泉县",
                                "121105": "太和县",
                                "121106": "阜南县",
                                "121107": "颍上县",
                                "121108": "界首市"
                            }
                        },
                        "121200": {
                            "name": "宿州市",
                            "county": {
                                "121201": "墉桥区",
                                "121202": "砀山县",
                                "121203": "萧县",
                                "121204": "灵璧县",
                                "121205": "泗县"
                            }
                        },
                        "121300": {
                            "name": "巢湖市",
                            "county": {
                                "121301": "居巢区",
                                "121302": "庐江县",
                                "121303": "无为县",
                                "121304": "含山县",
                                "121305": "和县"
                            }
                        },
                        "121400": {
                            "name": "六安市",
                            "county": {
                                "121401": "金安区",
                                "121402": "裕安区",
                                "121403": "寿县",
                                "121404": "霍邱县",
                                "121405": "舒城县",
                                "121406": "金寨县",
                                "121407": "霍山县"
                            }
                        },
                        "121500": {
                            "name": "亳州市",
                            "county": {"121501": "谯城区", "121502": "涡阳县", "121503": "蒙城县", "121504": "利辛县"}
                        },
                        "121600": {
                            "name": "池州市",
                            "county": {"121601": "贵池区", "121602": "东至县", "121603": "石台县", "121604": "青阳县"}
                        },
                        "121700": {
                            "name": "宣城市",
                            "county": {
                                "121701": "宣州区",
                                "121702": "郎溪县",
                                "121703": "广德县",
                                "121704": "泾县",
                                "121705": "绩溪县",
                                "121706": "旌德县",
                                "121707": "宁国市"
                            }
                        }
                    }
                },
                "130000": {
                    "name": "福建省",
                    "city": {
                        "130100": {
                            "name": "福州市",
                            "county": {
                                "130101": "鼓楼区",
                                "130102": "台江区",
                                "130103": "仓山区",
                                "130104": "马尾区",
                                "130105": "晋安区",
                                "130106": "闽侯县",
                                "130107": "连江县",
                                "130108": "罗源县",
                                "130109": "闽清县",
                                "130110": "永泰县",
                                "130111": "平潭县",
                                "130112": "福清市",
                                "130113": "长乐市"
                            }
                        },
                        "130200": {
                            "name": "厦门市",
                            "county": {
                                "130201": "思明区",
                                "130202": "海沧区",
                                "130203": "湖里区",
                                "130204": "集美区",
                                "130205": "同安区",
                                "130206": "翔安区"
                            }
                        },
                        "130300": {
                            "name": "莆田市",
                            "county": {
                                "130301": "城厢区",
                                "130302": "涵江区",
                                "130303": "荔城区",
                                "130304": "秀屿区",
                                "130305": "仙游县"
                            }
                        },
                        "130400": {
                            "name": "三明市",
                            "county": {
                                "130401": "梅列区",
                                "130402": "三元区",
                                "130403": "明溪县",
                                "130404": "清流县",
                                "130405": "宁化县",
                                "130406": "大田县",
                                "130407": "尤溪县",
                                "130408": "沙县",
                                "130409": "将乐县",
                                "130410": "泰宁县",
                                "130411": "建宁县",
                                "130412": "永安市"
                            }
                        },
                        "130500": {
                            "name": "泉州市",
                            "county": {
                                "130501": "鲤城区",
                                "130502": "丰泽区",
                                "130503": "洛江区",
                                "130504": "泉港区",
                                "130505": "惠安县",
                                "130506": "安溪县",
                                "130507": "永春县",
                                "130508": "德化县",
                                "130509": "金门县",
                                "130510": "石狮市",
                                "130511": "晋江市",
                                "130512": "南安市"
                            }
                        },
                        "130600": {
                            "name": "漳州市",
                            "county": {
                                "130601": "芗城区",
                                "130602": "龙文区",
                                "130603": "云霄县",
                                "130604": "漳浦县",
                                "130605": "诏安县",
                                "130606": "长泰县",
                                "130607": "东山县",
                                "130608": "南靖县",
                                "130609": "平和县",
                                "130610": "华安县",
                                "130611": "龙海市"
                            }
                        },
                        "130700": {
                            "name": "南平市",
                            "county": {
                                "130701": "延平区",
                                "130702": "顺昌县",
                                "130703": "浦城县",
                                "130704": "光泽县",
                                "130705": "松溪县",
                                "130706": "政和县",
                                "130707": "邵武市",
                                "130708": "武夷山市",
                                "130709": "建瓯市",
                                "130710": "建阳市"
                            }
                        },
                        "130800": {
                            "name": "龙岩市",
                            "county": {
                                "130801": "新罗区",
                                "130802": "长汀县",
                                "130803": "永定县",
                                "130804": "上杭县",
                                "130805": "武平县",
                                "130806": "连城县",
                                "130807": "漳平市"
                            }
                        },
                        "130900": {
                            "name": "宁德市",
                            "county": {
                                "130901": "蕉城区",
                                "130902": "霞浦县",
                                "130903": "古田县",
                                "130904": "屏南县",
                                "130905": "寿宁县",
                                "130906": "周宁县",
                                "130907": "柘荣县",
                                "130908": "福安市",
                                "130909": "福鼎市"
                            }
                        }
                    }
                },
                "140000": {
                    "name": "江西省",
                    "city": {
                        "140100": {
                            "name": "南昌市",
                            "county": {
                                "140101": "东湖区",
                                "140102": "西湖区",
                                "140103": "青云谱区",
                                "140104": "湾里区",
                                "140105": "青山湖区",
                                "140106": "南昌县",
                                "140107": "新建县",
                                "140108": "安义县",
                                "140109": "进贤县"
                            }
                        },
                        "140200": {
                            "name": "景德镇市",
                            "county": {"140201": "昌江区", "140202": "珠山区", "140203": "浮梁县", "140204": "乐平市"}
                        },
                        "140300": {
                            "name": "萍乡市",
                            "county": {
                                "140301": "安源区",
                                "140302": "湘东区",
                                "140303": "莲花县",
                                "140304": "上栗县",
                                "140305": "芦溪县"
                            }
                        },
                        "140400": {
                            "name": "九江市",
                            "county": {
                                "140401": "庐山区",
                                "140402": "浔阳区",
                                "140403": "九江县",
                                "140404": "武宁县",
                                "140405": "修水县",
                                "140406": "永修县",
                                "140407": "德安县",
                                "140408": "星子县",
                                "140409": "都昌县",
                                "140410": "湖口县",
                                "140411": "彭泽县",
                                "140412": "瑞昌市"
                            }
                        },
                        "140500": {"name": "新余市", "county": {"140501": "渝水区", "140502": "分宜县"}},
                        "140600": {"name": "鹰潭市", "county": {"140601": "月湖区", "140602": "余江县", "140603": "贵溪市"}},
                        "140700": {
                            "name": "赣州市",
                            "county": {
                                "140701": "章贡区",
                                "140702": "赣县",
                                "140703": "信丰县",
                                "140704": "大余县",
                                "140705": "上犹县",
                                "140706": "崇义县",
                                "140707": "安远县",
                                "140708": "龙南县",
                                "140709": "定南县",
                                "140710": "全南县",
                                "140711": "宁都县",
                                "140712": "于都县",
                                "140713": "兴国县",
                                "140714": "会昌县",
                                "140715": "寻乌县",
                                "140716": "石城县",
                                "140717": "瑞金市",
                                "140718": "南康市"
                            }
                        },
                        "140800": {
                            "name": "吉安市",
                            "county": {
                                "140801": "吉州区",
                                "140802": "青原区",
                                "140803": "吉安县",
                                "140804": "吉水县",
                                "140805": "峡江县",
                                "140806": "新干县",
                                "140807": "永丰县",
                                "140808": "泰和县",
                                "140809": "遂川县",
                                "140810": "万安县",
                                "140811": "安福县",
                                "140812": "永新县",
                                "140813": "井冈山市"
                            }
                        },
                        "140900": {
                            "name": "宜春市",
                            "county": {
                                "140901": "袁州区",
                                "140902": "奉新县",
                                "140903": "万载县",
                                "140904": "上高县",
                                "140905": "宜丰县",
                                "140906": "靖安县",
                                "140907": "铜鼓县",
                                "140908": "丰城市",
                                "140909": "樟树市",
                                "140910": "高安市"
                            }
                        },
                        "141000": {
                            "name": "抚州市",
                            "county": {
                                "141001": "临川区",
                                "141002": "南城县",
                                "141003": "黎川县",
                                "141004": "南丰县",
                                "141005": "崇仁县",
                                "141006": "乐安县",
                                "141007": "宜黄县",
                                "141008": "金溪县",
                                "141009": "资溪县",
                                "141010": "东乡县",
                                "141011": "广昌县"
                            }
                        },
                        "141100": {
                            "name": "上饶市",
                            "county": {
                                "141101": "信州区",
                                "141102": "上饶县",
                                "141103": "广丰县",
                                "141104": "玉山县",
                                "141105": "铅山县",
                                "141106": "横峰县",
                                "141107": "弋阳县",
                                "141108": "余干县",
                                "141109": "鄱阳县",
                                "141110": "万年县",
                                "141111": "婺源县",
                                "141112": "德兴市"
                            }
                        }
                    }
                },
                "150000": {
                    "name": "山东省",
                    "city": {
                        "150100": {
                            "name": "济南市",
                            "county": {
                                "150101": "历下区",
                                "150102": "市中区",
                                "150103": "槐荫区",
                                "150104": "天桥区",
                                "150105": "历城区",
                                "150106": "长清区",
                                "150107": "平阴县",
                                "150108": "济阳县",
                                "150109": "商河县",
                                "150110": "章丘市"
                            }
                        },
                        "150200": {
                            "name": "青岛市",
                            "county": {
                                "150201": "市南区",
                                "150202": "市北区",
                                "150203": "四方区",
                                "150204": "黄岛区",
                                "150205": "崂山区",
                                "150206": "李沧区",
                                "150207": "城阳区",
                                "150208": "胶州市",
                                "150209": "即墨市",
                                "150210": "平度市",
                                "150211": "胶南市",
                                "150212": "莱西市"
                            }
                        },
                        "150300": {
                            "name": "淄博市",
                            "county": {
                                "150301": "淄川区",
                                "150302": "张店区",
                                "150303": "博山区",
                                "150304": "临淄区",
                                "150305": "周村区",
                                "150306": "桓台县",
                                "150307": "高青县",
                                "150308": "沂源县"
                            }
                        },
                        "150400": {
                            "name": "枣庄市",
                            "county": {
                                "150401": "市中区",
                                "150402": "薛城区",
                                "150403": "峄城区",
                                "150404": "台儿庄区",
                                "150405": "山亭区",
                                "150406": "滕州市"
                            }
                        },
                        "150500": {
                            "name": "东营市",
                            "county": {
                                "150501": "东营区",
                                "150502": "河口区",
                                "150503": "垦利县",
                                "150504": "利津县",
                                "150505": "广饶县"
                            }
                        },
                        "150600": {
                            "name": "烟台市",
                            "county": {
                                "150601": "芝罘区",
                                "150602": "福山区",
                                "150603": "牟平区",
                                "150604": "莱山区",
                                "150605": "长岛县",
                                "150606": "龙口市",
                                "150607": "莱阳市",
                                "150608": "莱州市",
                                "150609": "蓬莱市",
                                "150610": "招远市",
                                "150611": "栖霞市",
                                "150612": "海阳市"
                            }
                        },
                        "150700": {
                            "name": "潍坊市",
                            "county": {
                                "150701": "潍城区",
                                "150702": "寒亭区",
                                "150703": "坊子区",
                                "150704": "奎文区",
                                "150705": "临朐县",
                                "150706": "昌乐县",
                                "150707": "青州市",
                                "150708": "诸城市",
                                "150709": "寿光市",
                                "150710": "安丘市",
                                "150711": "高密市",
                                "150712": "昌邑市"
                            }
                        },
                        "150800": {
                            "name": "济宁市",
                            "county": {
                                "150801": "市中区",
                                "150802": "任城区",
                                "150803": "微山县",
                                "150804": "鱼台县",
                                "150805": "金乡县",
                                "150806": "嘉祥县",
                                "150807": "汶上县",
                                "150808": "泗水县",
                                "150809": "梁山县",
                                "150810": "曲阜市",
                                "150811": "兖州市",
                                "150812": "邹城市"
                            }
                        },
                        "150900": {
                            "name": "泰安市",
                            "county": {
                                "150901": "泰山区",
                                "150902": "岱岳区",
                                "150903": "宁阳县",
                                "150904": "东平县",
                                "150905": "新泰市",
                                "150906": "肥城市"
                            }
                        },
                        "151000": {
                            "name": "威海市",
                            "county": {"151001": "环翠区", "151002": "文登市", "151003": "荣成市", "151004": "乳山市"}
                        },
                        "151100": {
                            "name": "日照市",
                            "county": {"151101": "东港区", "151102": "岚山区", "151103": "五莲县", "151104": "莒县"}
                        },
                        "151200": {"name": "莱芜市", "county": {"151201": "莱城区", "151202": "钢城区"}},
                        "151300": {
                            "name": "临沂市",
                            "county": {
                                "151301": "兰山区",
                                "151302": "罗庄区",
                                "151303": "河东区",
                                "151304": "沂南县",
                                "151305": "郯城县",
                                "151306": "沂水县",
                                "151307": "苍山县",
                                "151308": "费县",
                                "151309": "平邑县",
                                "151310": "莒南县",
                                "151311": "蒙阴县",
                                "151312": "临沭县"
                            }
                        },
                        "151400": {
                            "name": "德州市",
                            "county": {
                                "151401": "德城区",
                                "151402": "陵县",
                                "151403": "宁津县",
                                "151404": "庆云县",
                                "151405": "临邑县",
                                "151406": "齐河县",
                                "151407": "平原县",
                                "151408": "夏津县",
                                "151409": "武城县",
                                "151410": "乐陵市",
                                "151411": "禹城市"
                            }
                        },
                        "151500": {
                            "name": "聊城市",
                            "county": {
                                "151501": "东昌府区",
                                "151502": "阳谷县",
                                "151503": "莘县",
                                "151504": "茌平县",
                                "151505": "东阿县",
                                "151506": "冠县",
                                "151507": "高唐县",
                                "151508": "临清市"
                            }
                        },
                        "151600": {
                            "name": "滨州市",
                            "county": {
                                "151601": "滨城区",
                                "151602": "惠民县",
                                "151603": "阳信县",
                                "151604": "无棣县",
                                "151605": "沾化县",
                                "151606": "博兴县",
                                "151607": "邹平县"
                            }
                        },
                        "151700": {
                            "name": "荷泽市",
                            "county": {
                                "151701": "牡丹区",
                                "151702": "曹县",
                                "151703": "单县",
                                "151704": "成武县",
                                "151705": "巨野县",
                                "151706": "郓城县",
                                "151707": "鄄城县",
                                "151708": "定陶县",
                                "151709": "东明县"
                            }
                        }
                    }
                },
                "160000": {
                    "name": "河南省",
                    "city": {
                        "160100": {
                            "name": "郑州市",
                            "county": {
                                "160101": "中原区",
                                "160102": "二七区",
                                "160103": "管城回族区",
                                "160104": "金水区",
                                "160105": "上街区",
                                "160106": "邙山区",
                                "160107": "中牟县",
                                "160108": "巩义市",
                                "160109": "荥阳市",
                                "160110": "新密市",
                                "160111": "新郑市",
                                "160112": "登封市"
                            }
                        },
                        "160200": {
                            "name": "开封市",
                            "county": {
                                "160201": "龙亭区",
                                "160202": "顺河回族区",
                                "160203": "鼓楼区",
                                "160204": "南关区",
                                "160205": "郊区",
                                "160206": "杞县",
                                "160207": "通许县",
                                "160208": "尉氏县",
                                "160209": "开封县",
                                "160210": "兰考县"
                            }
                        },
                        "160300": {
                            "name": "洛阳市",
                            "county": {
                                "160301": "老城区",
                                "160302": "西工区",
                                "160303": "廛河回族区",
                                "160304": "涧西区",
                                "160305": "吉利区",
                                "160306": "洛龙区",
                                "160307": "孟津县",
                                "160308": "新安县",
                                "160309": "栾川县",
                                "160310": "嵩县",
                                "160311": "汝阳县",
                                "160312": "宜阳县",
                                "160313": "洛宁县",
                                "160314": "伊川县",
                                "160315": "偃师市"
                            }
                        },
                        "160400": {
                            "name": "平顶山市",
                            "county": {
                                "160401": "新华区",
                                "160402": "卫东区",
                                "160403": "石龙区",
                                "160404": "湛河区",
                                "160405": "宝丰县",
                                "160406": "叶县",
                                "160407": "鲁山县",
                                "160408": "郏县",
                                "160409": "舞钢市",
                                "160410": "汝州市"
                            }
                        },
                        "160500": {
                            "name": "安阳市",
                            "county": {
                                "160501": "文峰区",
                                "160502": "北关区",
                                "160503": "殷都区",
                                "160504": "龙安区",
                                "160505": "安阳县",
                                "160506": "汤阴县",
                                "160507": "滑县",
                                "160508": "内黄县",
                                "160509": "林州市"
                            }
                        },
                        "160600": {
                            "name": "鹤壁市",
                            "county": {
                                "160601": "鹤山区",
                                "160602": "山城区",
                                "160603": "淇滨区",
                                "160604": "浚县",
                                "160605": "淇县"
                            }
                        },
                        "160700": {
                            "name": "新乡市",
                            "county": {
                                "160701": "红旗区",
                                "160702": "卫滨区",
                                "160703": "凤泉区",
                                "160704": "牧野区",
                                "160705": "新乡县",
                                "160706": "获嘉县",
                                "160707": "原阳县",
                                "160708": "延津县",
                                "160709": "封丘县",
                                "160710": "长垣县",
                                "160711": "卫辉市",
                                "160712": "辉县市"
                            }
                        },
                        "160800": {
                            "name": "焦作市",
                            "county": {
                                "160801": "解放区",
                                "160802": "中站区",
                                "160803": "马村区",
                                "160804": "山阳区",
                                "160805": "修武县",
                                "160806": "博爱县",
                                "160807": "武陟县",
                                "160808": "温县",
                                "160809": "济源市",
                                "160810": "沁阳市",
                                "160811": "孟州市"
                            }
                        },
                        "160900": {
                            "name": "濮阳市",
                            "county": {
                                "160901": "华龙区",
                                "160902": "清丰县",
                                "160903": "南乐县",
                                "160904": "范县",
                                "160905": "台前县",
                                "160906": "濮阳县"
                            }
                        },
                        "161000": {
                            "name": "许昌市",
                            "county": {
                                "161001": "魏都区",
                                "161002": "许昌县",
                                "161003": "鄢陵县",
                                "161004": "襄城县",
                                "161005": "禹州市",
                                "161006": "长葛市"
                            }
                        },
                        "161100": {
                            "name": "漯河市",
                            "county": {
                                "161101": "源汇区",
                                "161102": "郾城区",
                                "161103": "召陵区",
                                "161104": "舞阳县",
                                "161105": "临颍县"
                            }
                        },
                        "161200": {
                            "name": "三门峡市",
                            "county": {
                                "161201": "湖滨区",
                                "161202": "渑池县",
                                "161203": "陕县",
                                "161204": "卢氏县",
                                "161205": "义马市",
                                "161206": "灵宝市"
                            }
                        },
                        "161300": {
                            "name": "南阳市",
                            "county": {
                                "161301": "宛城区",
                                "161302": "卧龙区",
                                "161303": "南召县",
                                "161304": "方城县",
                                "161305": "西峡县",
                                "161306": "镇平县",
                                "161307": "内乡县",
                                "161308": "淅川县",
                                "161309": "社旗县",
                                "161310": "唐河县",
                                "161311": "新野县",
                                "161312": "桐柏县",
                                "161313": "邓州市"
                            }
                        },
                        "161400": {
                            "name": "商丘市",
                            "county": {
                                "161401": "梁园区",
                                "161402": "睢阳区",
                                "161403": "民权县",
                                "161404": "睢县",
                                "161405": "宁陵县",
                                "161406": "柘城县",
                                "161407": "虞城县",
                                "161408": "夏邑县",
                                "161409": "永城市"
                            }
                        },
                        "161500": {
                            "name": "信阳市",
                            "county": {
                                "161501": "师河区",
                                "161502": "平桥区",
                                "161503": "罗山县",
                                "161504": "光山县",
                                "161505": "新县",
                                "161506": "商城县",
                                "161507": "固始县",
                                "161508": "潢川县",
                                "161509": "淮滨县",
                                "161510": "息县"
                            }
                        },
                        "161600": {
                            "name": "周口市",
                            "county": {
                                "161601": "川汇区",
                                "161602": "扶沟县",
                                "161603": "西华县",
                                "161604": "商水县",
                                "161605": "沈丘县",
                                "161606": "郸城县",
                                "161607": "淮阳县",
                                "161608": "太康县",
                                "161609": "鹿邑县",
                                "161610": "项城市"
                            }
                        },
                        "161700": {
                            "name": "驻马店市",
                            "county": {
                                "161701": "驿城区",
                                "161702": "西平县",
                                "161703": "上蔡县",
                                "161704": "平舆县",
                                "161705": "正阳县",
                                "161706": "确山县",
                                "161707": "泌阳县",
                                "161708": "汝南县",
                                "161709": "遂平县",
                                "161710": "新蔡县"
                            }
                        }
                    }
                },
                "170000": {
                    "name": "湖北省",
                    "city": {
                        "170100": {
                            "name": "武汉市",
                            "county": {
                                "170101": "江岸区",
                                "170102": "江汉区",
                                "170103": "乔口区",
                                "170104": "汉阳区",
                                "170105": "武昌区",
                                "170106": "青山区",
                                "170107": "洪山区",
                                "170108": "东西湖区",
                                "170109": "汉南区",
                                "170110": "蔡甸区",
                                "170111": "江夏区",
                                "170112": "黄陂区",
                                "170113": "新洲区"
                            }
                        },
                        "170200": {
                            "name": "黄石市",
                            "county": {
                                "170201": "黄石港区",
                                "170202": "西塞山区",
                                "170203": "下陆区",
                                "170204": "铁山区",
                                "170205": "阳新县",
                                "170206": "大冶市"
                            }
                        },
                        "170300": {
                            "name": "十堰市",
                            "county": {
                                "170301": "茅箭区",
                                "170302": "张湾区",
                                "170303": "郧县",
                                "170304": "郧西县",
                                "170305": "竹山县",
                                "170306": "竹溪县",
                                "170307": "房县",
                                "170308": "丹江口市"
                            }
                        },
                        "170400": {
                            "name": "宜昌市",
                            "county": {
                                "170401": "西陵区",
                                "170402": "伍家岗区",
                                "170403": "点军区",
                                "170404": "猇亭区",
                                "170405": "夷陵区",
                                "170406": "远安县",
                                "170407": "兴山县",
                                "170408": "秭归县",
                                "170409": "长阳土家族自治县",
                                "170410": "五峰土家族自治县",
                                "170411": "宜都市",
                                "170412": "当阳市",
                                "170413": "枝江市"
                            }
                        },
                        "170500": {
                            "name": "襄樊市",
                            "county": {
                                "170501": "襄城区",
                                "170502": "樊城区",
                                "170503": "襄阳区",
                                "170504": "南漳县",
                                "170505": "谷城县",
                                "170506": "保康县",
                                "170507": "老河口市",
                                "170508": "枣阳市",
                                "170509": "宜城市"
                            }
                        },
                        "170600": {"name": "鄂州市", "county": {"170601": "梁子湖区", "170602": "华容区", "170603": "鄂城区"}},
                        "170700": {
                            "name": "荆门市",
                            "county": {
                                "170701": "东宝区",
                                "170702": "掇刀区",
                                "170703": "京山县",
                                "170704": "沙洋县",
                                "170705": "钟祥市"
                            }
                        },
                        "170800": {
                            "name": "孝感市",
                            "county": {
                                "170801": "孝南区",
                                "170802": "孝昌县",
                                "170803": "大悟县",
                                "170804": "云梦县",
                                "170805": "应城市",
                                "170806": "安陆市",
                                "170807": "汉川市"
                            }
                        },
                        "170900": {
                            "name": "荆州市",
                            "county": {
                                "170901": "沙市区",
                                "170902": "荆州区",
                                "170903": "公安县",
                                "170904": "监利县",
                                "170905": "江陵县",
                                "170906": "石首市",
                                "170907": "洪湖市",
                                "170908": "松滋市"
                            }
                        },
                        "171000": {
                            "name": "黄冈市",
                            "county": {
                                "171001": "黄州区",
                                "171002": "团风县",
                                "171003": "红安县",
                                "171004": "罗田县",
                                "171005": "英山县",
                                "171006": "浠水县",
                                "171007": "蕲春县",
                                "171008": "黄梅县",
                                "171009": "麻城市",
                                "171010": "武穴市"
                            }
                        },
                        "171100": {
                            "name": "咸宁市",
                            "county": {
                                "171101": "咸安区",
                                "171102": "嘉鱼县",
                                "171103": "通城县",
                                "171104": "崇阳县",
                                "171105": "通山县",
                                "171106": "赤壁市"
                            }
                        },
                        "171200": {"name": "随州市", "county": {"171201": "曾都区", "171202": "广水市"}},
                        "171300": {
                            "name": "恩施土家族苗族自治州",
                            "county": {
                                "171301": "恩施市",
                                "171302": "利川市",
                                "171303": "建始县",
                                "171304": "巴东县",
                                "171305": "宣恩县",
                                "171306": "咸丰县",
                                "171307": "来凤县",
                                "171308": "鹤峰县"
                            }
                        },
                        "171400": {
                            "name": "省直辖行政单位",
                            "county": {"171401": "仙桃市", "171402": "潜江市", "171403": "天门市", "171404": "神农架林区"}
                        }
                    }
                },
                "180000": {
                    "name": "湖南省",
                    "city": {
                        "180100": {
                            "name": "长沙市",
                            "county": {
                                "180101": "芙蓉区",
                                "180102": "天心区",
                                "180103": "岳麓区",
                                "180104": "开福区",
                                "180105": "雨花区",
                                "180106": "长沙县",
                                "180107": "望城县",
                                "180108": "宁乡县",
                                "180109": "浏阳市"
                            }
                        },
                        "180200": {
                            "name": "株洲市",
                            "county": {
                                "180201": "荷塘区",
                                "180202": "芦淞区",
                                "180203": "石峰区",
                                "180204": "天元区",
                                "180205": "株洲县",
                                "180206": "攸县",
                                "180207": "茶陵县",
                                "180208": "炎陵县",
                                "180209": "醴陵市"
                            }
                        },
                        "180300": {
                            "name": "湘潭市",
                            "county": {
                                "180301": "雨湖区",
                                "180302": "岳塘区",
                                "180303": "湘潭县",
                                "180304": "湘乡市",
                                "180305": "韶山市"
                            }
                        },
                        "180400": {
                            "name": "衡阳市",
                            "county": {
                                "180401": "珠晖区",
                                "180402": "雁峰区",
                                "180403": "石鼓区",
                                "180404": "蒸湘区",
                                "180405": "南岳区",
                                "180406": "衡阳县",
                                "180407": "衡南县",
                                "180408": "衡山县",
                                "180409": "衡东县",
                                "180410": "祁东县",
                                "180411": "耒阳市",
                                "180412": "常宁市"
                            }
                        },
                        "180500": {
                            "name": "邵阳市",
                            "county": {
                                "180501": "双清区",
                                "180502": "大祥区",
                                "180503": "北塔区",
                                "180504": "邵东县",
                                "180505": "新邵县",
                                "180506": "邵阳县",
                                "180507": "隆回县",
                                "180508": "洞口县",
                                "180509": "绥宁县",
                                "180510": "新宁县",
                                "180511": "城步苗族自治县",
                                "180512": "武冈市"
                            }
                        },
                        "180600": {
                            "name": "岳阳市",
                            "county": {
                                "180601": "岳阳楼区",
                                "180602": "云溪区",
                                "180603": "君山区",
                                "180604": "岳阳县",
                                "180605": "华容县",
                                "180606": "湘阴县",
                                "180607": "平江县",
                                "180608": "汨罗市",
                                "180609": "临湘市"
                            }
                        },
                        "180700": {
                            "name": "常德市",
                            "county": {
                                "180701": "武陵区",
                                "180702": "鼎城区",
                                "180703": "安乡县",
                                "180704": "汉寿县",
                                "180705": "澧县",
                                "180706": "临澧县",
                                "180707": "桃源县",
                                "180708": "石门县",
                                "180709": "津市市"
                            }
                        },
                        "180800": {
                            "name": "张家界市",
                            "county": {"180801": "永定区", "180802": "武陵源区", "180803": "慈利县", "180804": "桑植县"}
                        },
                        "180900": {
                            "name": "益阳市",
                            "county": {
                                "180901": "资阳区",
                                "180902": "赫山区",
                                "180903": "南县",
                                "180904": "桃江县",
                                "180905": "安化县",
                                "180906": "沅江市"
                            }
                        },
                        "181000": {
                            "name": "郴州市",
                            "county": {
                                "181001": "北湖区",
                                "181002": "苏仙区",
                                "181003": "桂阳县",
                                "181004": "宜章县",
                                "181005": "永兴县",
                                "181006": "嘉禾县",
                                "181007": "临武县",
                                "181008": "汝城县",
                                "181009": "桂东县",
                                "181010": "安仁县",
                                "181011": "资兴市"
                            }
                        },
                        "181100": {
                            "name": "永州市",
                            "county": {
                                "181101": "芝山区",
                                "181102": "冷水滩区",
                                "181103": "祁阳县",
                                "181104": "东安县",
                                "181105": "双牌县",
                                "181106": "道县",
                                "181107": "江永县",
                                "181108": "宁远县",
                                "181109": "蓝山县",
                                "181110": "新田县",
                                "181111": "江华瑶族自治县"
                            }
                        },
                        "181200": {
                            "name": "怀化市",
                            "county": {
                                "181201": "鹤城区",
                                "181202": "中方县",
                                "181203": "沅陵县",
                                "181204": "辰溪县",
                                "181205": "溆浦县",
                                "181206": "会同县",
                                "181207": "麻阳苗族自治县",
                                "181208": "新晃侗族自治县",
                                "181209": "芷江侗族自治县",
                                "181210": "靖州苗族侗族自治县",
                                "181211": "通道侗族自治县",
                                "181212": "洪江市"
                            }
                        },
                        "181300": {
                            "name": "娄底市",
                            "county": {
                                "181301": "娄星区",
                                "181302": "双峰县",
                                "181303": "新化县",
                                "181304": "冷水江市",
                                "181305": "涟源市"
                            }
                        },
                        "181400": {
                            "name": "湘西土家族苗族自治州",
                            "county": {
                                "181401": "吉首市",
                                "181402": "泸溪县",
                                "181403": "凤凰县",
                                "181404": "花垣县",
                                "181405": "保靖县",
                                "181406": "古丈县",
                                "181407": "永顺县",
                                "181408": "龙山县"
                            }
                        }
                    }
                },
                "190000": {
                    "name": "广东省",
                    "city": {
                        "190100": {
                            "name": "广州市",
                            "county": {
                                "190101": "东山区",
                                "190102": "荔湾区",
                                "190103": "越秀区",
                                "190104": "海珠区",
                                "190105": "天河区",
                                "190106": "芳村区",
                                "190107": "白云区",
                                "190108": "黄埔区",
                                "190109": "番禺区",
                                "190110": "花都区",
                                "190111": "增城市",
                                "190112": "从化市"
                            }
                        },
                        "190200": {
                            "name": "韶关市",
                            "county": {
                                "190201": "武江区",
                                "190202": "浈江区",
                                "190203": "曲江区",
                                "190204": "始兴县",
                                "190205": "仁化县",
                                "190206": "翁源县",
                                "190207": "乳源瑶族自治县",
                                "190208": "新丰县",
                                "190209": "乐昌市",
                                "190210": "南雄市"
                            }
                        },
                        "190300": {
                            "name": "深圳市",
                            "county": {
                                "190301": "罗湖区",
                                "190302": "福田区",
                                "190303": "南山区",
                                "190304": "宝安区",
                                "190305": "龙岗区",
                                "190306": "盐田区"
                            }
                        },
                        "190400": {"name": "珠海市", "county": {"190401": "香洲区", "190402": "斗门区", "190403": "金湾区"}},
                        "190500": {
                            "name": "汕头市",
                            "county": {
                                "190501": "龙湖区",
                                "190502": "金平区",
                                "190503": "濠江区",
                                "190504": "潮阳区",
                                "190505": "潮南区",
                                "190506": "澄海区",
                                "190507": "南澳县"
                            }
                        },
                        "190600": {
                            "name": "佛山市",
                            "county": {
                                "190601": "禅城区",
                                "190602": "南海区",
                                "190603": "顺德区",
                                "190604": "三水区",
                                "190605": "高明区"
                            }
                        },
                        "190700": {
                            "name": "江门市",
                            "county": {
                                "190701": "蓬江区",
                                "190702": "江海区",
                                "190703": "新会区",
                                "190704": "台山市",
                                "190705": "开平市",
                                "190706": "鹤山市",
                                "190707": "恩平市"
                            }
                        },
                        "190800": {
                            "name": "湛江市",
                            "county": {
                                "190801": "赤坎区",
                                "190802": "霞山区",
                                "190803": "坡头区",
                                "190804": "麻章区",
                                "190805": "遂溪县",
                                "190806": "徐闻县",
                                "190807": "廉江市",
                                "190808": "雷州市",
                                "190809": "吴川市"
                            }
                        },
                        "190900": {
                            "name": "茂名市",
                            "county": {
                                "190901": "茂南区",
                                "190902": "茂港区",
                                "190903": "电白县",
                                "190904": "高州市",
                                "190905": "化州市",
                                "190906": "信宜市"
                            }
                        },
                        "191000": {
                            "name": "肇庆市",
                            "county": {
                                "191001": "端州区",
                                "191002": "鼎湖区",
                                "191003": "广宁县",
                                "191004": "怀集县",
                                "191005": "封开县",
                                "191006": "德庆县",
                                "191007": "高要市",
                                "191008": "四会市"
                            }
                        },
                        "191100": {
                            "name": "惠州市",
                            "county": {
                                "191101": "惠城区",
                                "191102": "惠阳区",
                                "191103": "博罗县",
                                "191104": "惠东县",
                                "191105": "龙门县"
                            }
                        },
                        "191200": {
                            "name": "梅州市",
                            "county": {
                                "191201": "梅江区",
                                "191202": "梅县",
                                "191203": "大埔县",
                                "191204": "丰顺县",
                                "191205": "五华县",
                                "191206": "平远县",
                                "191207": "蕉岭县",
                                "191208": "兴宁市"
                            }
                        },
                        "191300": {
                            "name": "汕尾市",
                            "county": {"191301": "城区", "191302": "海丰县", "191303": "陆河县", "191304": "陆丰市"}
                        },
                        "191400": {
                            "name": "河源市",
                            "county": {
                                "191401": "源城区",
                                "191402": "紫金县",
                                "191403": "龙川县",
                                "191404": "连平县",
                                "191405": "和平县",
                                "191406": "东源县"
                            }
                        },
                        "191500": {
                            "name": "阳江市",
                            "county": {"191501": "江城区", "191502": "阳西县", "191503": "阳东县", "191504": "阳春市"}
                        },
                        "191600": {
                            "name": "清远市",
                            "county": {
                                "191601": "清城区",
                                "191602": "佛冈县",
                                "191603": "阳山县",
                                "191604": "连山壮族瑶族自治县",
                                "191605": "连南瑶族自治县",
                                "191606": "清新县",
                                "191607": "英德市",
                                "191608": "连州市"
                            }
                        },
                        "191700": {"name": "东莞市", "county": {"191701": "东莞市"}},
                        "191800": {"name": "中山市", "county": {"191801": "中山市"}},
                        "191900": {"name": "潮州市", "county": {"191901": "湘桥区", "191902": "潮安县", "191903": "饶平县"}},
                        "192000": {
                            "name": "揭阳市",
                            "county": {
                                "192001": "榕城区",
                                "192002": "揭东县",
                                "192003": "揭西县",
                                "192004": "惠来县",
                                "192005": "普宁市"
                            }
                        },
                        "192100": {
                            "name": "云浮市",
                            "county": {
                                "192101": "云城区",
                                "192102": "新兴县",
                                "192103": "郁南县",
                                "192104": "云安县",
                                "192105": "罗定市"
                            }
                        }
                    }
                },
                "200000": {
                    "name": "广西壮族自治区",
                    "city": {
                        "200100": {
                            "name": "南宁市",
                            "county": {
                                "200101": "兴宁区",
                                "200102": "青秀区",
                                "200103": "江南区",
                                "200104": "西乡塘区",
                                "200105": "良庆区",
                                "200106": "邕宁区",
                                "200107": "武鸣县",
                                "200108": "隆安县",
                                "200109": "马山县",
                                "200110": "上林县",
                                "200111": "宾阳县",
                                "200112": "横县"
                            }
                        },
                        "200200": {
                            "name": "柳州市",
                            "county": {
                                "200201": "城中区",
                                "200202": "鱼峰区",
                                "200203": "柳南区",
                                "200204": "柳北区",
                                "200205": "柳江县",
                                "200206": "柳城县",
                                "200207": "鹿寨县",
                                "200208": "融安县",
                                "200209": "融水苗族自治县",
                                "200210": "三江侗族自治县"
                            }
                        },
                        "200300": {
                            "name": "桂林市",
                            "county": {
                                "200301": "秀峰区",
                                "200302": "叠彩区",
                                "200303": "象山区",
                                "200304": "七星区",
                                "200305": "雁山区",
                                "200306": "阳朔县",
                                "200307": "临桂县",
                                "200308": "灵川县",
                                "200309": "全州县",
                                "200310": "兴安县",
                                "200311": "永福县",
                                "200312": "灌阳县",
                                "200313": "龙胜各族自治县",
                                "200314": "资源县",
                                "200315": "平乐县",
                                "200316": "荔蒲县",
                                "200317": "恭城瑶族自治县"
                            }
                        },
                        "200400": {
                            "name": "梧州市",
                            "county": {
                                "200401": "万秀区",
                                "200402": "蝶山区",
                                "200403": "长洲区",
                                "200404": "苍梧县",
                                "200405": "藤县",
                                "200406": "蒙山县",
                                "200407": "岑溪市"
                            }
                        },
                        "200500": {
                            "name": "北海市",
                            "county": {"200501": "海城区", "200502": "银海区", "200503": "铁山港区", "200504": "合浦县"}
                        },
                        "200600": {
                            "name": "防城港市",
                            "county": {"200601": "港口区", "200602": "防城区", "200603": "上思县", "200604": "东兴市"}
                        },
                        "200700": {
                            "name": "钦州市",
                            "county": {"200701": "钦南区", "200702": "钦北区", "200703": "灵山县", "200704": "浦北县"}
                        },
                        "200800": {
                            "name": "贵港市",
                            "county": {
                                "200801": "港北区",
                                "200802": "港南区",
                                "200803": "覃塘区",
                                "200804": "平南县",
                                "200805": "桂平市"
                            }
                        },
                        "200900": {
                            "name": "玉林市",
                            "county": {
                                "200901": "玉州区",
                                "200902": "容县",
                                "200903": "陆川县",
                                "200904": "博白县",
                                "200905": "兴业县",
                                "200906": "北流市"
                            }
                        },
                        "201000": {
                            "name": "百色市",
                            "county": {
                                "201001": "右江区",
                                "201002": "田阳县",
                                "201003": "田东县",
                                "201004": "平果县",
                                "201005": "德保县",
                                "201006": "靖西县",
                                "201007": "那坡县",
                                "201008": "凌云县",
                                "201009": "乐业县",
                                "201010": "田林县",
                                "201011": "西林县",
                                "201012": "隆林各族自治县"
                            }
                        },
                        "201100": {
                            "name": "贺州市",
                            "county": {"201101": "八步区", "201102": "昭平县", "201103": "钟山县", "201104": "富川瑶族自治县"}
                        },
                        "201200": {
                            "name": "河池市",
                            "county": {
                                "201201": "金城江区",
                                "201202": "南丹县",
                                "201203": "天峨县",
                                "201204": "凤山县",
                                "201205": "东兰县",
                                "201206": "罗城仫佬族自治县",
                                "201207": "环江毛南族自治县",
                                "201208": "巴马瑶族自治县",
                                "201209": "都安瑶族自治县",
                                "201210": "大化瑶族自治县",
                                "201211": "宜州市"
                            }
                        },
                        "201300": {
                            "name": "来宾市",
                            "county": {
                                "201301": "兴宾区",
                                "201302": "忻城县",
                                "201303": "象州县",
                                "201304": "武宣县",
                                "201305": "金秀瑶族自治县",
                                "201306": "合山市"
                            }
                        },
                        "201400": {
                            "name": "崇左市",
                            "county": {
                                "201401": "江洲区",
                                "201402": "扶绥县",
                                "201403": "宁明县",
                                "201404": "龙州县",
                                "201405": "大新县",
                                "201406": "天等县",
                                "201407": "凭祥市"
                            }
                        }
                    }
                },
                "210000": {
                    "name": "海南省",
                    "city": {
                        "210100": {
                            "name": "海口市",
                            "county": {"210101": "秀英区", "210102": "龙华区", "210103": "琼山区", "210104": "美兰区"}
                        },
                        "210200": {
                            "name": "三亚市",
                            "county": {"210201": "吉阳区", "210202": "天涯区", "210203": "海棠区", "210204": "崖州区"}
                        },
                        "210300": {
                            "name": "省直辖县级行政单位",
                            "county": {
                                "210301": "五指山市",
                                "210302": "琼海市",
                                "210303": "儋州市",
                                "210304": "文昌市",
                                "210305": "万宁市",
                                "210306": "东方市",
                                "210307": "定安县",
                                "210308": "屯昌县",
                                "210309": "澄迈县",
                                "210310": "临高县",
                                "210311": "白沙黎族自治县",
                                "210312": "昌江黎族自治县",
                                "210313": "乐东黎族自治县",
                                "210314": "陵水黎族自治县",
                                "210315": "保亭黎族苗族自治县",
                                "210316": "琼中黎族苗族自治县",
                                "210317": "西沙群岛",
                                "210318": "南沙群岛",
                                "210319": "中沙群岛的岛礁及其海域"
                            }
                        }
                    }
                },
                "220000": {
                    "name": "重庆市",
                    "city": {
                        "220100": {
                            "name": "市辖区",
                            "county": {
                                "220101": "万州区",
                                "220102": "涪陵区",
                                "220103": "渝中区",
                                "220104": "大渡口区",
                                "220105": "江北区",
                                "220106": "沙坪坝区",
                                "220107": "九龙坡区",
                                "220108": "南岸区",
                                "220109": "北碚区",
                                "220110": "万盛区",
                                "220111": "双桥区",
                                "220112": "渝北区",
                                "220113": "巴南区",
                                "220114": "黔江区",
                                "220115": "长寿区"
                            }
                        },
                        "220200": {
                            "name": "重庆周边",
                            "county": {
                                "220201": "綦江县",
                                "220202": "潼南县",
                                "220203": "铜梁县",
                                "220204": "大足县",
                                "220205": "荣昌县",
                                "220206": "璧山县",
                                "220207": "梁平县",
                                "220208": "城口县",
                                "220209": "丰都县",
                                "220210": "垫江县",
                                "220211": "武隆县",
                                "220212": "忠县",
                                "220213": "开县",
                                "220214": "云阳县",
                                "220215": "奉节县",
                                "220216": "巫山县",
                                "220217": "巫溪县",
                                "220218": "石柱土家族自治县",
                                "220219": "秀山土家族苗族自治县",
                                "220220": "酉阳土家族苗族自治县",
                                "220221": "彭水苗族土家族自治县"
                            }
                        },
                        "220300": {
                            "name": "市",
                            "county": {"220301": "江津市", "220302": "合川市", "220303": "永川市", "220304": "南川市"}
                        }
                    }
                },
                "230000": {
                    "name": "四川省",
                    "city": {
                        "230100": {
                            "name": "成都市",
                            "county": {
                                "230101": "锦江区",
                                "230102": "青羊区",
                                "230103": "金牛区",
                                "230104": "武侯区",
                                "230105": "成华区",
                                "230106": "龙泉驿区",
                                "230107": "青白江区",
                                "230108": "新都区",
                                "230109": "温江区",
                                "230110": "金堂县",
                                "230111": "双流县",
                                "230112": "郫县",
                                "230113": "大邑县",
                                "230114": "蒲江县",
                                "230115": "新津县",
                                "230116": "都江堰市",
                                "230117": "彭州市",
                                "230118": "邛崃市",
                                "230119": "崇州市"
                            }
                        },
                        "230200": {
                            "name": "自贡市",
                            "county": {
                                "230201": "自流井区",
                                "230202": "贡井区",
                                "230203": "大安区",
                                "230204": "沿滩区",
                                "230205": "荣县",
                                "230206": "富顺县"
                            }
                        },
                        "230300": {
                            "name": "攀枝花市",
                            "county": {
                                "230301": "东区",
                                "230302": "西区",
                                "230303": "仁和区",
                                "230304": "米易县",
                                "230305": "盐边县"
                            }
                        },
                        "230400": {
                            "name": "泸州市",
                            "county": {
                                "230401": "江阳区",
                                "230402": "纳溪区",
                                "230403": "龙马潭区",
                                "230404": "泸县",
                                "230405": "合江县",
                                "230406": "叙永县",
                                "230407": "古蔺县"
                            }
                        },
                        "230500": {
                            "name": "德阳市",
                            "county": {
                                "230501": "旌阳区",
                                "230502": "中江县",
                                "230503": "罗江县",
                                "230504": "广汉市",
                                "230505": "什邡市",
                                "230506": "绵竹市"
                            }
                        },
                        "230600": {
                            "name": "绵阳市",
                            "county": {
                                "230601": "涪城区",
                                "230602": "游仙区",
                                "230603": "三台县",
                                "230604": "盐亭县",
                                "230605": "安县",
                                "230606": "梓潼县",
                                "230607": "北川羌族自治县",
                                "230608": "平武县",
                                "230609": "江油市"
                            }
                        },
                        "230700": {
                            "name": "广元市",
                            "county": {
                                "230701": "市中区",
                                "230702": "元坝区",
                                "230703": "朝天区",
                                "230704": "旺苍县",
                                "230705": "青川县",
                                "230706": "剑阁县",
                                "230707": "苍溪县"
                            }
                        },
                        "230800": {
                            "name": "遂宁市",
                            "county": {
                                "230801": "船山区",
                                "230802": "安居区",
                                "230803": "蓬溪县",
                                "230804": "射洪县",
                                "230805": "大英县"
                            }
                        },
                        "230900": {
                            "name": "内江市",
                            "county": {
                                "230901": "市中区",
                                "230902": "东兴区",
                                "230903": "威远县",
                                "230904": "资中县",
                                "230905": "隆昌县"
                            }
                        },
                        "231000": {
                            "name": "乐山市",
                            "county": {
                                "231001": "市中区",
                                "231002": "沙湾区",
                                "231003": "五通桥区",
                                "231004": "金口河区",
                                "231005": "犍为县",
                                "231006": "井研县",
                                "231007": "夹江县",
                                "231008": "沐川县",
                                "231009": "峨边彝族自治县",
                                "231010": "马边彝族自治县",
                                "231011": "峨眉山市"
                            }
                        },
                        "231100": {
                            "name": "南充市",
                            "county": {
                                "231101": "顺庆区",
                                "231102": "高坪区",
                                "231103": "嘉陵区",
                                "231104": "南部县",
                                "231105": "营山县",
                                "231106": "蓬安县",
                                "231107": "仪陇县",
                                "231108": "西充县",
                                "231109": "阆中市"
                            }
                        },
                        "231200": {
                            "name": "眉山市",
                            "county": {
                                "231201": "东坡区",
                                "231202": "仁寿县",
                                "231203": "彭山县",
                                "231204": "洪雅县",
                                "231205": "丹棱县",
                                "231206": "青神县"
                            }
                        },
                        "231300": {
                            "name": "宜宾市",
                            "county": {
                                "231301": "翠屏区",
                                "231302": "宜宾县",
                                "231303": "南溪县",
                                "231304": "江安县",
                                "231305": "长宁县",
                                "231306": "高县",
                                "231307": "珙县",
                                "231308": "筠连县",
                                "231309": "兴文县",
                                "231310": "屏山县"
                            }
                        },
                        "231400": {
                            "name": "广安市",
                            "county": {
                                "231401": "广安区",
                                "231402": "岳池县",
                                "231403": "武胜县",
                                "231404": "邻水县",
                                "231405": "华莹市"
                            }
                        },
                        "231500": {
                            "name": "达州市",
                            "county": {
                                "231501": "通川区",
                                "231502": "达县",
                                "231503": "宣汉县",
                                "231504": "开江县",
                                "231505": "大竹县",
                                "231506": "渠县",
                                "231507": "万源市"
                            }
                        },
                        "231600": {
                            "name": "雅安市",
                            "county": {
                                "231601": "雨城区",
                                "231602": "名山县",
                                "231603": "荥经县",
                                "231604": "汉源县",
                                "231605": "石棉县",
                                "231606": "天全县",
                                "231607": "芦山县",
                                "231608": "宝兴县"
                            }
                        },
                        "231700": {
                            "name": "巴中市",
                            "county": {"231701": "巴州区", "231702": "通江县", "231703": "南江县", "231704": "平昌县"}
                        },
                        "231800": {
                            "name": "资阳市",
                            "county": {"231801": "雁江区", "231802": "安岳县", "231803": "乐至县", "231804": "简阳市"}
                        },
                        "231900": {
                            "name": "阿坝藏族羌族自治州",
                            "county": {
                                "231901": "汶川县",
                                "231902": "理县",
                                "231903": "茂县",
                                "231904": "松潘县",
                                "231905": "九寨沟县",
                                "231906": "金川县",
                                "231907": "小金县",
                                "231908": "黑水县",
                                "231909": "马尔康县",
                                "231910": "壤塘县",
                                "231911": "阿坝县",
                                "231912": "若尔盖县",
                                "231913": "红原县"
                            }
                        },
                        "232000": {
                            "name": "甘孜藏族自治州",
                            "county": {
                                "232001": "康定县",
                                "232002": "泸定县",
                                "232003": "丹巴县",
                                "232004": "九龙县",
                                "232005": "雅江县",
                                "232006": "道孚县",
                                "232007": "炉霍县",
                                "232008": "甘孜县",
                                "232009": "新龙县",
                                "232010": "德格县",
                                "232011": "白玉县",
                                "232012": "石渠县",
                                "232013": "色达县",
                                "232014": "理塘县",
                                "232015": "巴塘县",
                                "232016": "乡城县",
                                "232017": "稻城县",
                                "232018": "得荣县"
                            }
                        },
                        "232100": {
                            "name": "凉山彝族自治州",
                            "county": {
                                "232101": "西昌市",
                                "232102": "木里藏族自治县",
                                "232103": "盐源县",
                                "232104": "德昌县",
                                "232105": "会理县",
                                "232106": "会东县",
                                "232107": "宁南县",
                                "232108": "普格县",
                                "232109": "布拖县",
                                "232110": "金阳县",
                                "232111": "昭觉县",
                                "232112": "喜德县",
                                "232113": "冕宁县",
                                "232114": "越西县",
                                "232115": "甘洛县",
                                "232116": "美姑县",
                                "232117": "雷波县"
                            }
                        }
                    }
                },
                "240000": {
                    "name": "贵州省",
                    "city": {
                        "240100": {
                            "name": "贵阳市",
                            "county": {
                                "240101": "南明区",
                                "240102": "云岩区",
                                "240103": "花溪区",
                                "240104": "乌当区",
                                "240105": "白云区",
                                "240106": "小河区",
                                "240107": "开阳县",
                                "240108": "息烽县",
                                "240109": "修文县",
                                "240110": "清镇市"
                            }
                        },
                        "240200": {
                            "name": "六盘水市",
                            "county": {"240201": "钟山区", "240202": "六枝特区", "240203": "水城县", "240204": "盘县"}
                        },
                        "240300": {
                            "name": "遵义市",
                            "county": {
                                "240301": "红花岗区",
                                "240302": "汇川区",
                                "240303": "遵义县",
                                "240304": "桐梓县",
                                "240305": "绥阳县",
                                "240306": "正安县",
                                "240307": "道真仡佬族苗族自治县",
                                "240308": "务川仡佬族苗族自治县",
                                "240309": "凤冈县",
                                "240310": "湄潭县",
                                "240311": "余庆县",
                                "240312": "习水县",
                                "240313": "赤水市",
                                "240314": "仁怀市"
                            }
                        },
                        "240400": {
                            "name": "安顺市",
                            "county": {
                                "240401": "西秀区",
                                "240402": "平坝县",
                                "240403": "普定县",
                                "240404": "镇宁布依族苗族自治县",
                                "240405": "关岭布依族苗族自治县",
                                "240406": "紫云苗族布依族自治县"
                            }
                        },
                        "240500": {
                            "name": "铜仁地区",
                            "county": {
                                "240501": "铜仁市",
                                "240502": "江口县",
                                "240503": "玉屏侗族自治县",
                                "240504": "石阡县",
                                "240505": "思南县",
                                "240506": "印江土家族苗族自治县",
                                "240507": "德江县",
                                "240508": "沿河土家族自治县",
                                "240509": "松桃苗族自治县",
                                "240510": "万山特区"
                            }
                        },
                        "240600": {
                            "name": "黔西南布依族苗族自治州",
                            "county": {
                                "240601": "兴义市",
                                "240602": "兴仁县",
                                "240603": "普安县",
                                "240604": "晴隆县",
                                "240605": "贞丰县",
                                "240606": "望谟县",
                                "240607": "册亨县",
                                "240608": "安龙县"
                            }
                        },
                        "240700": {
                            "name": "毕节地区",
                            "county": {
                                "240701": "毕节市",
                                "240702": "大方县",
                                "240703": "黔西县",
                                "240704": "金沙县",
                                "240705": "织金县",
                                "240706": "纳雍县",
                                "240707": "威宁彝族回族苗族自治县",
                                "240708": "赫章县"
                            }
                        },
                        "240800": {
                            "name": "黔东南苗族侗族自治州",
                            "county": {
                                "240801": "凯里市",
                                "240802": "黄平县",
                                "240803": "施秉县",
                                "240804": "三穗县",
                                "240805": "镇远县",
                                "240806": "岑巩县",
                                "240807": "天柱县",
                                "240808": "锦屏县",
                                "240809": "剑河县",
                                "240810": "台江县",
                                "240811": "黎平县",
                                "240812": "榕江县",
                                "240813": "从江县",
                                "240814": "雷山县",
                                "240815": "麻江县",
                                "240816": "丹寨县"
                            }
                        },
                        "240900": {
                            "name": "黔南布依族苗族自治州",
                            "county": {
                                "240901": "都匀市",
                                "240902": "福泉市",
                                "240903": "荔波县",
                                "240904": "贵定县",
                                "240905": "瓮安县",
                                "240906": "独山县",
                                "240907": "平塘县",
                                "240908": "罗甸县",
                                "240909": "长顺县",
                                "240910": "龙里县",
                                "240911": "惠水县",
                                "240912": "三都水族自治县"
                            }
                        }
                    }
                },
                "250000": {
                    "name": "云南省",
                    "city": {
                        "250100": {
                            "name": "昆明市",
                            "county": {
                                "250101": "五华区",
                                "250102": "盘龙区",
                                "250103": "官渡区",
                                "250104": "西山区",
                                "250105": "东川区",
                                "250106": "呈贡县",
                                "250107": "晋宁县",
                                "250108": "富民县",
                                "250109": "宜良县",
                                "250110": "石林彝族自治县",
                                "250111": "嵩明县",
                                "250112": "禄劝彝族苗族自治县",
                                "250113": "寻甸回族彝族自治县",
                                "250114": "安宁市"
                            }
                        },
                        "250200": {
                            "name": "曲靖市",
                            "county": {
                                "250201": "麒麟区",
                                "250202": "马龙县",
                                "250203": "陆良县",
                                "250204": "师宗县",
                                "250205": "罗平县",
                                "250206": "富源县",
                                "250207": "会泽县",
                                "250208": "沾益县",
                                "250209": "宣威市"
                            }
                        },
                        "250300": {
                            "name": "玉溪市",
                            "county": {
                                "250301": "红塔区",
                                "250302": "江川县",
                                "250303": "澄江县",
                                "250304": "通海县",
                                "250305": "华宁县",
                                "250306": "易门县",
                                "250307": "峨山彝族自治县",
                                "250308": "新平彝族傣族自治县",
                                "250309": "元江哈尼族彝族傣族自治县"
                            }
                        },
                        "250400": {
                            "name": "保山市",
                            "county": {
                                "250401": "隆阳区",
                                "250402": "施甸县",
                                "250403": "腾冲县",
                                "250404": "龙陵县",
                                "250405": "昌宁县"
                            }
                        },
                        "250500": {
                            "name": "昭通市",
                            "county": {
                                "250501": "昭阳区",
                                "250502": "鲁甸县",
                                "250503": "巧家县",
                                "250504": "盐津县",
                                "250505": "大关县",
                                "250506": "永善县",
                                "250507": "绥江县",
                                "250508": "镇雄县",
                                "250509": "彝良县",
                                "250510": "威信县",
                                "250511": "水富县"
                            }
                        },
                        "250600": {
                            "name": "丽江市",
                            "county": {
                                "250601": "古城区",
                                "250602": "玉龙纳西族自治县",
                                "250603": "永胜县",
                                "250604": "华坪县",
                                "250605": "宁蒗彝族自治县"
                            }
                        },
                        "250700": {
                            "name": "思茅市",
                            "county": {
                                "250701": "翠云区",
                                "250702": "普洱哈尼族彝族自治县",
                                "250703": "墨江哈尼族自治县",
                                "250704": "景东彝族自治县",
                                "250705": "景谷傣族彝族自治县",
                                "250706": "镇沅彝族哈尼族拉祜族自治县",
                                "250707": "江城哈尼族彝族自治县",
                                "250708": "孟连傣族拉祜族佤族自治县",
                                "250709": "澜沧拉祜族自治县",
                                "250710": "西盟佤族自治县"
                            }
                        },
                        "250800": {
                            "name": "临沧市",
                            "county": {
                                "250801": "临翔区",
                                "250802": "凤庆县",
                                "250803": "云县",
                                "250804": "永德县",
                                "250805": "镇康县",
                                "250806": "双江拉祜族佤族布朗族傣族自治县",
                                "250807": "耿马傣族佤族自治县",
                                "250808": "沧源佤族自治县"
                            }
                        },
                        "250900": {
                            "name": "楚雄彝族自治州",
                            "county": {
                                "250901": "楚雄市",
                                "250902": "双柏县",
                                "250903": "牟定县",
                                "250904": "南华县",
                                "250905": "姚安县",
                                "250906": "大姚县",
                                "250907": "永仁县",
                                "250908": "元谋县",
                                "250909": "武定县",
                                "250910": "禄丰县"
                            }
                        },
                        "251000": {
                            "name": "红河哈尼族彝族自治州",
                            "county": {
                                "251001": "个旧市",
                                "251002": "开远市",
                                "251003": "蒙自县",
                                "251004": "屏边苗族自治县",
                                "251005": "建水县",
                                "251006": "石屏县",
                                "251007": "弥勒县",
                                "251008": "泸西县",
                                "251009": "元阳县",
                                "251010": "红河县",
                                "251011": "金平苗族瑶族傣族自治县",
                                "251012": "绿春县",
                                "251013": "河口瑶族自治县"
                            }
                        },
                        "251100": {
                            "name": "文山壮族苗族自治州",
                            "county": {
                                "251101": "文山县",
                                "251102": "砚山县",
                                "251103": "西畴县",
                                "251104": "麻栗坡县",
                                "251105": "马关县",
                                "251106": "丘北县",
                                "251107": "广南县",
                                "251108": "富宁县"
                            }
                        },
                        "251200": {"name": "西双版纳傣族自治州", "county": {"251201": "景洪市", "251202": "勐海县", "251203": "勐腊县"}},
                        "251300": {
                            "name": "大理白族自治州",
                            "county": {
                                "251301": "大理市",
                                "251302": "漾濞彝族自治县",
                                "251303": "祥云县",
                                "251304": "宾川县",
                                "251305": "弥渡县",
                                "251306": "南涧彝族自治县",
                                "251307": "巍山彝族回族自治县",
                                "251308": "永平县",
                                "251309": "云龙县",
                                "251310": "洱源县",
                                "251311": "剑川县",
                                "251312": "鹤庆县"
                            }
                        },
                        "251400": {
                            "name": "德宏傣族景颇族自治州",
                            "county": {
                                "251401": "瑞丽市",
                                "251402": "潞西市",
                                "251403": "梁河县",
                                "251404": "盈江县",
                                "251405": "陇川县"
                            }
                        },
                        "251500": {
                            "name": "怒江傈僳族自治州",
                            "county": {"251501": "泸水县", "251502": "福贡县", "251503": "贡山独龙族怒族自治县", "251504": "兰坪白族普米族自治县"}
                        },
                        "251600": {
                            "name": "迪庆藏族自治州",
                            "county": {"251601": "香格里拉县", "251602": "德钦县", "251603": "维西傈僳族自治县"}
                        }
                    }
                },
                "260000": {
                    "name": "西藏自治区",
                    "city": {
                        "260100": {
                            "name": "拉萨市",
                            "county": {
                                "260101": "城关区",
                                "260102": "林周县",
                                "260103": "当雄县",
                                "260104": "尼木县",
                                "260105": "曲水县",
                                "260106": "堆龙德庆县",
                                "260107": "达孜县",
                                "260108": "墨竹工卡县"
                            }
                        },
                        "260200": {
                            "name": "昌都地区",
                            "county": {
                                "260201": "昌都县",
                                "260202": "江达县",
                                "260203": "贡觉县",
                                "260204": "类乌齐县",
                                "260205": "丁青县",
                                "260206": "察雅县",
                                "260207": "八宿县",
                                "260208": "左贡县",
                                "260209": "芒康县",
                                "260210": "洛隆县",
                                "260211": "边坝县"
                            }
                        },
                        "260300": {
                            "name": "山南地区",
                            "county": {
                                "260301": "乃东县",
                                "260302": "扎囊县",
                                "260303": "贡嘎县",
                                "260304": "桑日县",
                                "260305": "琼结县",
                                "260306": "曲松县",
                                "260307": "措美县",
                                "260308": "洛扎县",
                                "260309": "加查县",
                                "260310": "隆子县",
                                "260311": "错那县",
                                "260312": "浪卡子县"
                            }
                        },
                        "260400": {
                            "name": "日喀则地区",
                            "county": {
                                "260401": "日喀则市",
                                "260402": "南木林县",
                                "260403": "江孜县",
                                "260404": "定日县",
                                "260405": "萨迦县",
                                "260406": "拉孜县",
                                "260407": "昂仁县",
                                "260408": "谢通门县",
                                "260409": "白朗县",
                                "260410": "仁布县",
                                "260411": "康马县",
                                "260412": "定结县",
                                "260413": "仲巴县",
                                "260414": "亚东县",
                                "260415": "吉隆县",
                                "260416": "聂拉木县",
                                "260417": "萨嘎县",
                                "260418": "岗巴县"
                            }
                        },
                        "260500": {
                            "name": "那曲地区",
                            "county": {
                                "260501": "那曲县",
                                "260502": "嘉黎县",
                                "260503": "比如县",
                                "260504": "聂荣县",
                                "260505": "安多县",
                                "260506": "申扎县",
                                "260507": "索县",
                                "260508": "班戈县",
                                "260509": "巴青县",
                                "260510": "尼玛县"
                            }
                        },
                        "260600": {
                            "name": "阿里地区",
                            "county": {
                                "260601": "普兰县",
                                "260602": "札达县",
                                "260603": "噶尔县",
                                "260604": "日土县",
                                "260605": "革吉县",
                                "260606": "改则县",
                                "260607": "措勤县"
                            }
                        },
                        "260700": {
                            "name": "林芝地区",
                            "county": {
                                "260701": "林芝县",
                                "260702": "工布江达县",
                                "260703": "米林县",
                                "260704": "墨脱县",
                                "260705": "波密县",
                                "260706": "察隅县",
                                "260707": "朗县"
                            }
                        }
                    }
                },
                "270000": {
                    "name": "陕西省",
                    "city": {
                        "270100": {
                            "name": "西安市",
                            "county": {
                                "270101": "新城区",
                                "270102": "碑林区",
                                "270103": "莲湖区",
                                "270104": "灞桥区",
                                "270105": "未央区",
                                "270106": "雁塔区",
                                "270107": "阎良区",
                                "270108": "临潼区",
                                "270109": "长安区",
                                "270110": "蓝田县",
                                "270111": "周至县",
                                "270112": "户县",
                                "270113": "高陵县"
                            }
                        },
                        "270200": {
                            "name": "铜川市",
                            "county": {"270201": "王益区", "270202": "印台区", "270203": "耀州区", "270204": "宜君县"}
                        },
                        "270300": {
                            "name": "宝鸡市",
                            "county": {
                                "270301": "渭滨区",
                                "270302": "金台区",
                                "270303": "陈仓区",
                                "270304": "凤翔县",
                                "270305": "岐山县",
                                "270306": "扶风县",
                                "270307": "眉县",
                                "270308": "陇县",
                                "270309": "千阳县",
                                "270310": "麟游县",
                                "270311": "凤县",
                                "270312": "太白县"
                            }
                        },
                        "270400": {
                            "name": "咸阳市",
                            "county": {
                                "270401": "秦都区",
                                "270402": "杨凌区",
                                "270403": "渭城区",
                                "270404": "三原县",
                                "270405": "泾阳县",
                                "270406": "乾县",
                                "270407": "礼泉县",
                                "270408": "永寿县",
                                "270409": "彬县",
                                "270410": "长武县",
                                "270411": "旬邑县",
                                "270412": "淳化县",
                                "270413": "武功县",
                                "270414": "兴平市"
                            }
                        },
                        "270500": {
                            "name": "渭南市",
                            "county": {
                                "270501": "临渭区",
                                "270502": "华县",
                                "270503": "潼关县",
                                "270504": "大荔县",
                                "270505": "合阳县",
                                "270506": "澄城县",
                                "270507": "蒲城县",
                                "270508": "白水县",
                                "270509": "富平县",
                                "270510": "韩城市",
                                "270511": "华阴市"
                            }
                        },
                        "270600": {
                            "name": "延安市",
                            "county": {
                                "270601": "宝塔区",
                                "270602": "延长县",
                                "270603": "延川县",
                                "270604": "子长县",
                                "270605": "安塞县",
                                "270606": "志丹县",
                                "270607": "吴旗县",
                                "270608": "甘泉县",
                                "270609": "富县",
                                "270610": "洛川县",
                                "270611": "宜川县",
                                "270612": "黄龙县",
                                "270613": "黄陵县"
                            }
                        },
                        "270700": {
                            "name": "汉中市",
                            "county": {
                                "270701": "汉台区",
                                "270702": "南郑县",
                                "270703": "城固县",
                                "270704": "洋县",
                                "270705": "西乡县",
                                "270706": "勉县",
                                "270707": "宁强县",
                                "270708": "略阳县",
                                "270709": "镇巴县",
                                "270710": "留坝县",
                                "270711": "佛坪县"
                            }
                        },
                        "270800": {
                            "name": "榆林市",
                            "county": {
                                "270801": "榆阳区",
                                "270802": "神木县",
                                "270803": "府谷县",
                                "270804": "横山县",
                                "270805": "靖边县",
                                "270806": "定边县",
                                "270807": "绥德县",
                                "270808": "米脂县",
                                "270809": "佳县",
                                "270810": "吴堡县",
                                "270811": "清涧县",
                                "270812": "子洲县"
                            }
                        },
                        "270900": {
                            "name": "安康市",
                            "county": {
                                "270901": "汉滨区",
                                "270902": "汉阴县",
                                "270903": "石泉县",
                                "270904": "宁陕县",
                                "270905": "紫阳县",
                                "270906": "岚皋县",
                                "270907": "平利县",
                                "270908": "镇坪县",
                                "270909": "旬阳县",
                                "270910": "白河县"
                            }
                        },
                        "271000": {
                            "name": "商洛市",
                            "county": {
                                "271001": "商州区",
                                "271002": "洛南县",
                                "271003": "丹凤县",
                                "271004": "商南县",
                                "271005": "山阳县",
                                "271006": "镇安县",
                                "271007": "柞水县"
                            }
                        }
                    }
                },
                "280000": {
                    "name": "甘肃省",
                    "city": {
                        "280100": {
                            "name": "兰州市",
                            "county": {
                                "280101": "城关区",
                                "280102": "七里河区",
                                "280103": "西固区",
                                "280104": "安宁区",
                                "280105": "红古区",
                                "280106": "永登县",
                                "280107": "皋兰县",
                                "280108": "榆中县"
                            }
                        },
                        "280200": {"name": "嘉峪关市", "county": {"280201": "嘉峪关市"}},
                        "280300": {"name": "金昌市", "county": {"280301": "金川区", "280302": "永昌县"}},
                        "280400": {
                            "name": "白银市",
                            "county": {
                                "280401": "白银区",
                                "280402": "平川区",
                                "280403": "靖远县",
                                "280404": "会宁县",
                                "280405": "景泰县"
                            }
                        },
                        "280500": {
                            "name": "天水市",
                            "county": {
                                "280501": "秦城区",
                                "280502": "北道区",
                                "280503": "清水县",
                                "280504": "秦安县",
                                "280505": "甘谷县",
                                "280506": "武山县",
                                "280507": "张家川回族自治县"
                            }
                        },
                        "280600": {
                            "name": "武威市",
                            "county": {"280601": "凉州区", "280602": "民勤县", "280603": "古浪县", "280604": "天祝藏族自治县"}
                        },
                        "280700": {
                            "name": "张掖市",
                            "county": {
                                "280701": "甘州区",
                                "280702": "肃南裕固族自治县",
                                "280703": "民乐县",
                                "280704": "临泽县",
                                "280705": "高台县",
                                "280706": "山丹县"
                            }
                        },
                        "280800": {
                            "name": "平凉市",
                            "county": {
                                "280801": "崆峒区",
                                "280802": "泾川县",
                                "280803": "灵台县",
                                "280804": "崇信县",
                                "280805": "华亭县",
                                "280806": "庄浪县",
                                "280807": "静宁县"
                            }
                        },
                        "280900": {
                            "name": "酒泉市",
                            "county": {
                                "280901": "肃州区",
                                "280902": "金塔县",
                                "280903": "安西县",
                                "280904": "肃北蒙古族自治县",
                                "280905": "阿克塞哈萨克族自治县",
                                "280906": "玉门市",
                                "280907": "敦煌市"
                            }
                        },
                        "281000": {
                            "name": "庆阳市",
                            "county": {
                                "281001": "西峰区",
                                "281002": "庆城县",
                                "281003": "环县",
                                "281004": "华池县",
                                "281005": "合水县",
                                "281006": "正宁县",
                                "281007": "宁县",
                                "281008": "镇原县"
                            }
                        },
                        "281100": {
                            "name": "定西市",
                            "county": {
                                "281101": "安定区",
                                "281102": "通渭县",
                                "281103": "陇西县",
                                "281104": "渭源县",
                                "281105": "临洮县",
                                "281106": "漳县",
                                "281107": "岷县"
                            }
                        },
                        "281200": {
                            "name": "陇南市",
                            "county": {
                                "281201": "武都区",
                                "281202": "成县",
                                "281203": "文县",
                                "281204": "宕昌县",
                                "281205": "康县",
                                "281206": "西和县",
                                "281207": "礼县",
                                "281208": "徽县",
                                "281209": "两当县"
                            }
                        },
                        "281300": {
                            "name": "临夏回族自治州",
                            "county": {
                                "281301": "临夏市",
                                "281302": "临夏县",
                                "281303": "康乐县",
                                "281304": "永靖县",
                                "281305": "广河县",
                                "281306": "和政县",
                                "281307": "东乡族自治县",
                                "281308": "积石山保安族东乡族撒拉族自治县"
                            }
                        },
                        "281400": {
                            "name": "甘南藏族自治州",
                            "county": {
                                "281401": "合作市",
                                "281402": "临潭县",
                                "281403": "卓尼县",
                                "281404": "舟曲县",
                                "281405": "迭部县",
                                "281406": "玛曲县",
                                "281407": "碌曲县",
                                "281408": "夏河县"
                            }
                        }
                    }
                },
                "290000": {
                    "name": "青海省",
                    "city": {
                        "290100": {
                            "name": "西宁市",
                            "county": {
                                "290101": "城东区",
                                "290102": "城中区",
                                "290103": "城西区",
                                "290104": "城北区",
                                "290105": "大通回族土族自治县",
                                "290106": "湟中县",
                                "290107": "湟源县"
                            }
                        },
                        "290200": {
                            "name": "海东地区",
                            "county": {
                                "290201": "平安县",
                                "290202": "民和回族土族自治县",
                                "290203": "乐都县",
                                "290204": "互助土族自治县",
                                "290205": "化隆回族自治县",
                                "290206": "循化撒拉族自治县"
                            }
                        },
                        "290300": {
                            "name": "海北藏族自治州",
                            "county": {"290301": "门源回族自治县", "290302": "祁连县", "290303": "海晏县", "290304": "刚察县"}
                        },
                        "290400": {
                            "name": "黄南藏族自治州",
                            "county": {"290401": "同仁县", "290402": "尖扎县", "290403": "泽库县", "290404": "河南蒙古族自治县"}
                        },
                        "290500": {
                            "name": "海南藏族自治州",
                            "county": {
                                "290501": "共和县",
                                "290502": "同德县",
                                "290503": "贵德县",
                                "290504": "兴海县",
                                "290505": "贵南县"
                            }
                        },
                        "290600": {
                            "name": "果洛藏族自治州",
                            "county": {
                                "290601": "玛沁县",
                                "290602": "班玛县",
                                "290603": "甘德县",
                                "290604": "达日县",
                                "290605": "久治县",
                                "290606": "玛多县"
                            }
                        },
                        "290700": {
                            "name": "玉树藏族自治州",
                            "county": {
                                "290701": "玉树县",
                                "290702": "杂多县",
                                "290703": "称多县",
                                "290704": "治多县",
                                "290705": "囊谦县",
                                "290706": "曲麻莱县"
                            }
                        },
                        "290800": {
                            "name": "海西蒙古族藏族自治州",
                            "county": {
                                "290801": "格尔木市",
                                "290802": "德令哈市",
                                "290803": "乌兰县",
                                "290804": "都兰县",
                                "290805": "天峻县"
                            }
                        }
                    }
                },
                "300000": {
                    "name": "宁夏回族自治区",
                    "city": {
                        "300100": {
                            "name": "银川市",
                            "county": {
                                "300101": "兴庆区",
                                "300102": "西夏区",
                                "300103": "金凤区",
                                "300104": "永宁县",
                                "300105": "贺兰县",
                                "300106": "灵武市"
                            }
                        },
                        "300200": {"name": "石嘴山市", "county": {"300201": "大武口区", "300202": "惠农区", "300203": "平罗县"}},
                        "300300": {
                            "name": "吴忠市",
                            "county": {"300301": "利通区", "300302": "盐池县", "300303": "同心县", "300304": "青铜峡市"}
                        },
                        "300400": {
                            "name": "固原市",
                            "county": {
                                "300401": "原州区",
                                "300402": "西吉县",
                                "300403": "隆德县",
                                "300404": "泾源县",
                                "300405": "彭阳县"
                            }
                        },
                        "300500": {"name": "中卫市", "county": {"300501": "沙坡头区", "300502": "中宁县", "300503": "海原县"}}
                    }
                },
                "310000": {
                    "name": "新疆维吾尔自治区",
                    "city": {
                        "310100": {
                            "name": "乌鲁木齐市",
                            "county": {
                                "310101": "天山区",
                                "310102": "沙依巴克区",
                                "310103": "新市区",
                                "310104": "水磨沟区",
                                "310105": "头屯河区",
                                "310106": "达坂城区",
                                "310107": "东山区",
                                "310108": "乌鲁木齐县"
                            }
                        },
                        "310200": {
                            "name": "克拉玛依市",
                            "county": {"310201": "独山子区", "310202": "克拉玛依区", "310203": "白碱滩区", "310204": "乌尔禾区"}
                        },
                        "310300": {"name": "吐鲁番地区", "county": {"310301": "吐鲁番市", "310302": "鄯善县", "310303": "托克逊县"}},
                        "310400": {"name": "哈密地区", "county": {"310401": "哈密市", "310402": "巴里坤哈萨克自治县", "310403": "伊吾县"}},
                        "310500": {
                            "name": "昌吉回族自治州",
                            "county": {
                                "310501": "昌吉市",
                                "310502": "阜康市",
                                "310503": "米泉市",
                                "310504": "呼图壁县",
                                "310505": "玛纳斯县",
                                "310506": "奇台县",
                                "310507": "吉木萨尔县",
                                "310508": "木垒哈萨克自治县"
                            }
                        },
                        "310600": {"name": "博尔塔拉蒙古自治州", "county": {"310601": "博乐市", "310602": "精河县", "310603": "温泉县"}},
                        "310700": {
                            "name": "巴音郭楞蒙古自治州",
                            "county": {
                                "310701": "库尔勒市",
                                "310702": "轮台县",
                                "310703": "尉犁县",
                                "310704": "若羌县",
                                "310705": "且末县",
                                "310706": "焉耆回族自治县",
                                "310707": "和静县",
                                "310708": "和硕县",
                                "310709": "博湖县"
                            }
                        },
                        "310800": {
                            "name": "阿克苏地区",
                            "county": {
                                "310801": "阿克苏市",
                                "310802": "温宿县",
                                "310803": "库车县",
                                "310804": "沙雅县",
                                "310805": "新和县",
                                "310806": "拜城县",
                                "310807": "乌什县",
                                "310808": "阿瓦提县",
                                "310809": "柯坪县"
                            }
                        },
                        "310900": {
                            "name": "克孜勒苏柯尔克孜自治州",
                            "county": {"310901": "阿图什市", "310902": "阿克陶县", "310903": "阿合奇县", "310904": "乌恰县"}
                        },
                        "311000": {
                            "name": "喀什地区",
                            "county": {
                                "311001": "喀什市",
                                "311002": "疏附县",
                                "311003": "疏勒县",
                                "311004": "英吉沙县",
                                "311005": "泽普县",
                                "311006": "莎车县",
                                "311007": "叶城县",
                                "311008": "麦盖提县",
                                "311009": "岳普湖县",
                                "311010": "伽师县",
                                "311011": "巴楚县",
                                "311012": "塔什库尔干塔吉克自治县"
                            }
                        },
                        "311100": {
                            "name": "和田地区",
                            "county": {
                                "311101": "和田市",
                                "311102": "和田县",
                                "311103": "墨玉县",
                                "311104": "皮山县",
                                "311105": "洛浦县",
                                "311106": "策勒县",
                                "311107": "于田县",
                                "311108": "民丰县"
                            }
                        },
                        "311200": {
                            "name": "伊犁哈萨克自治州",
                            "county": {
                                "311201": "伊宁市",
                                "311202": "奎屯市",
                                "311203": "伊宁县",
                                "311204": "察布查尔锡伯自治县",
                                "311205": "霍城县",
                                "311206": "巩留县",
                                "311207": "新源县",
                                "311208": "昭苏县",
                                "311209": "特克斯县",
                                "311210": "尼勒克县"
                            }
                        },
                        "311300": {
                            "name": "塔城地区",
                            "county": {
                                "311301": "塔城市",
                                "311302": "乌苏市",
                                "311303": "额敏县",
                                "311304": "沙湾县",
                                "311305": "托里县",
                                "311306": "裕民县",
                                "311307": "和布克赛尔蒙古自治县"
                            }
                        },
                        "311400": {
                            "name": "阿勒泰地区",
                            "county": {
                                "311401": "阿勒泰市",
                                "311402": "布尔津县",
                                "311403": "富蕴县",
                                "311404": "福海县",
                                "311405": "哈巴河县",
                                "311406": "青河县",
                                "311407": "吉木乃县"
                            }
                        },
                        "311500": {
                            "name": "省直辖行政单位",
                            "county": {"311501": "石河子市", "311502": "阿拉尔市", "311503": "图木舒克市", "311504": "五家渠市"}
                        }
                    }
                },
                "320000": {"name": "台湾省", "city": {"320100": {"name": "台湾", "county": {"320101": "台湾"}}}},
                "330000": {"name": "香港特别行政区", "city": {"330100": {"name": "香港", "county": {"330101": "香港"}}}},
                "340000": {"name": "澳门特别行政区", "city": {"340100": {"name": "澳门", "county": {"340101": "澳门"}}}}
            };
        }

    }
})();
/**
 * Created by dd on 12/26/15.
 */
(function () {
    angular
        .module('app.core')
        .factory('Util', ['$window', 'Log', 'Config', 'Const', Util]);

    function Util($window, Log, Config, Const) {

        return {
            setTitle: setTitle,
            getImgUrl: getImgUrl,
            url: url,
            getRequestParams: getRequestParams,
            getRequestParam: getRequestParam,
            go: go,
            goToRoute: goToRoute,
            getCurrentPage: getCurrentPage,
            getCurrentPath: getCurrentPath,
            getCurrentRoute: getCurrentRoute,
            canGuestVisit: canGuestVisit,
            time: time,
            installWindowScrollEventListener: installWindowScrollEventListener,
            uninstallWindowScrollEventListener: uninstallWindowScrollEventListener,
            timeFormat: timeFormat,
            strtotime: strtotime,
            getTimestamp: getTimestamp,
            containsKey: containsKey,
            getDate: getDate,
            dateDiff: dateDiff,
            date: date,
            sprintf: sprintf,
            inArray: in_array,
            stripTags: strip_tags,
            isMobile:isMobile,
            ltrim: ltrim,
            rtrim: rtrim,
            trim: trim,
            clone:clone
        };

        function setTitle(title)
        {
            $window.document.title = title;
        }

        function getImgUrl(imgName)
        {
            Core.Log.d(imgName);
            if (imgName.indexOf('://') != -1)
            {
                return imgName;
            }

            return Const.NET.IMG_URL_PREFIX + imgName;
        }

        function url(url, params)
        {
            var queryString = '';
            for (var key in params)
            {
                var value = params[key];
                queryString += (encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&');
            }
            queryString = trim(queryString, '&');
            return url + '?' + queryString;
        }

        function getRequestParams()
        {
            var queryString = trim($window.location.search, '?');
            var params = {};
            var paramList = queryString.split('&');
            for (var i in paramList)
            {
                var kv = paramList[i];
                var kvList = kv.split('=');
                if (kvList.length == 2)
                {
                    var key = decodeURIComponent(kvList[0]);
                    params[key] = decodeURIComponent(kvList[1]);
                }
            }

            return params;
        }

        function getRequestParam(key)
        {
            var params = getRequestParams();
            if (params.hasOwnProperty(key))
            {
                return params[key];
            }

            return undefined;
        }

        function go(path) {
            console.log(path);return;

            var pathname = $window.location.pathname;
            pathname = trim(pathname, '/');
            var paths = pathname.split('/');
            if (paths.length > 0) {
                paths.splice(paths.length - 1, 1);
            }

            path = sprintf('%s/%s', paths.join('/'), path);
            path = trim(path, '/');
            path = sprintf('%s//%s/%s', $window.location.protocol, $window.location.host, path);

            $window.location.href = path;
        }

        function goToRoute(route) {

            console.log(route);return;

            var routes = route.split('#');
            if (routes.length > 2) {
                Log.e(sprintf('invalid route: %s', route));
                return;
            }

            var page = routes[0];
            // page = trim(page, '.html');
            var endHtmlIndex = page.indexOf('.html');
            if (endHtmlIndex >= 0 && endHtmlIndex + 5 == page.length)
            {
                page = page.substring(0, endHtmlIndex);
            }
            page = page + '.html';
            var controller;
            if (routes.length == 2) {
                controller = routes[1];
            }
            var path = controller ? sprintf('%s#/%s', page, controller) : page;
            go(path);
        }

        function getCurrentPage() {
            var pathname = $window.location.pathname;
            pathname = rtrim(pathname, '/');
            var paths = pathname.split('/');

            return paths.length > 0 ? paths[paths.length - 1] : undefined;
        }

        function getCurrentPath() {
            var currentPage = getCurrentPage();
            if (currentPage) {
                return rtrim(currentPage, '.html');
            }
        }

        function getCurrentControllerPath() {
            var hash = $window.location.hash;
            hash = trim(hash);
            hash = trim(hash, '#!/');
            hash = trim(hash, '/');
            return hash;
        }

        function getCurrentRoute() {
            var path = getCurrentPath();
            var controllerPath = getCurrentControllerPath();
            if (path) {
                return path + '#' + controllerPath;
            }
        }

        function canGuestVisit() {
            var route = getCurrentRoute();
            if (!route) {
                return false;
            }

            for (var i = 0; i < Config.ROUTE_LIST_GUEST_CAN_VISIT.length; i++) {
                var path = Config.ROUTE_LIST_GUEST_CAN_VISIT[i];
                if (route.indexOf(path) === 0) {
                    return true;
                }
            }

            return false;
        }

        function isWindowScrollToBottom() {
            var offset = $window.document.body.offsetHeight - $window.scrollY - $window.innerHeight;
            return offset < 3;
        }

        function installWindowScrollEventListener(callback) {
            $window.onscroll = function () {
                if (isWindowScrollToBottom() && callback) {
                    callback();
                }
            };
        }

        function uninstallWindowScrollEventListener() {
            $window.onscroll = undefined;
        }


        function clone(obj) {
            var o;
            if (typeof obj == "object") {
                if (obj === null) {
                    o = null;
                } else {
                    if (obj instanceof Array) {
                        o = [];
                        for (var i = 0, len = obj.length; i < len; i++) {
                            o.push(clone(obj[i]));
                        }
                    } else {
                        o = {};
                        for (var j in obj) {
                            o[j] = clone(obj[j]);
                        }
                    }
                }
            } else {
                o = obj;
            }
            return o;
        }

        function time() {
            return parseInt(new Date().getTime() / 1000, 10);
        }

        function containsKey(object, keys) {
            if (!object) {
                return false;
            }

            if (!(keys instanceof Array)) {
                keys = ['' + keys];
            }

            for (var i in keys) {
                var key = keys[i];
                if (object[key] === undefined) {
                    Log.e(object);
                    Log.e(keys);
                    Log.e('invalid option, key ' + key + ' undefined');
                    return false;
                }
            }

            return true;
        }

        function timeFormat(time) {
            return date('Y-m-d H:i:s', time);
        }

        function getTimestamp(time) {
            return parseInt(time.getTime() / 1000, 10);
        }

        function isMobile(phone) {

            if (phone.length != 11) {
                return false;
            }

            var myReg = /^(((13[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))+\d{8})$/;
            if (!myReg.exec(phone)) {
                return false;
            }

            return true;
        }

        function getDate(unix) {
            var now = new Date(parseInt(unix) * 1000).toLocaleDateString();
            //return now.toLocaleDateString(); 
            return now;
        }

        function dateDiff(dateTimeStamp) {
            var minute = 1000 * 60;
            var hour = minute * 60;
            var day = hour * 24;
            var month = day * 30;
            var diffValue = new Date().getTime() - dateTimeStamp * 1000;
            Log.d(new Date().getTime() + '----' + dateTimeStamp);
            var monthC = diffValue / month;
            var weekC = diffValue / (7 * day);
            var dayC = diffValue / day;
            var hourC = diffValue / hour;
            var minC = diffValue / minute;
            if (monthC >= 1) {
                result = parseInt(monthC) + "个月前";
            }
            else if (weekC >= 1) {
                result = parseInt(weekC) + "周前";
            }
            else if (dayC >= 1) {
                result = parseInt(dayC) + "天前";
            }
            else if (hourC >= 1) {
                result = parseInt(hourC) + "个小时前";
            }
            else if (minC >= 1) {
                result = parseInt(minC) + "分钟前";
            } else {
                result = "刚刚";
            }
            return result;
        }

        function date(format, timestamp) {
            //  discuss at: http://phpjs.org/functions/date/
            // original by: Carlos R. L. Rodrigues (http://www.jsfromhell.com)
            // original by: gettimeofday
            //    parts by: Peter-Paul Koch (http://www.quirksmode.org/js/beat.html)
            // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // improved by: MeEtc (http://yass.meetcweb.com)
            // improved by: Brad Touesnard
            // improved by: Tim Wiel
            // improved by: Bryan Elliott
            // improved by: David Randall
            // improved by: Theriault
            // improved by: Theriault
            // improved by: Brett Zamir (http://brett-zamir.me)
            // improved by: Theriault
            // improved by: Thomas Beaucourt (http://www.webapp.fr)
            // improved by: JT
            // improved by: Theriault
            // improved by: Rafał Kukawski (http://blog.kukawski.pl)
            // improved by: Theriault
            //    input by: Brett Zamir (http://brett-zamir.me)
            //    input by: majak
            //    input by: Alex
            //    input by: Martin
            //    input by: Alex Wilson
            //    input by: Haravikk
            // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // bugfixed by: majak
            // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // bugfixed by: Brett Zamir (http://brett-zamir.me)
            // bugfixed by: omid (http://phpjs.org/functions/380:380#comment_137122)
            // bugfixed by: Chris (http://www.devotis.nl/)
            //        note: Uses global: php_js to store the default timezone
            //        note: Although the function potentially allows timezone info (see notes), it currently does not set
            //        note: per a timezone specified by date_default_timezone_set(). Implementers might use
            //        note: this.php_js.currentTimezoneOffset and this.php_js.currentTimezoneDST set by that function
            //        note: in order to adjust the dates in this function (or our other date functions!) accordingly
            //   example 1: date('H:m:s \\m \\i\\s \\m\\o\\n\\t\\h', 1062402400);
            //   returns 1: '09:09:40 m is month'
            //   example 2: date('F j, Y, g:i a', 1062462400);
            //   returns 2: 'September 2, 2003, 2:26 am'
            //   example 3: date('Y W o', 1062462400);
            //   returns 3: '2003 36 2003'
            //   example 4: x = date('Y m d', (new Date()).getTime()/1000);
            //   example 4: (x+'').length == 10 // 2009 01 09
            //   returns 4: true
            //   example 5: date('W', 1104534000);
            //   returns 5: '53'
            //   example 6: date('B t', 1104534000);
            //   returns 6: '999 31'
            //   example 7: date('W U', 1293750000.82); // 2010-12-31
            //   returns 7: '52 1293750000'
            //   example 8: date('W', 1293836400); // 2011-01-01
            //   returns 8: '52'
            //   example 9: date('W Y-m-d', 1293974054); // 2011-01-02
            //   returns 9: '52 2011-01-02'

            var that = this;
            var jsdate, f;
            // Keep this here (works, but for code commented-out below for file size reasons)
            // var tal= [];
            var txt_words = [
                'Sun', 'Mon', 'Tues', 'Wednes', 'Thurs', 'Fri', 'Satur',
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ];
            // trailing backslash -> (dropped)
            // a backslash followed by any character (including backslash) -> the character
            // empty string -> empty string
            var formatChr = /\\?(.?)/gi;
            var formatChrCb = function (t, s) {
                return f[t] ? f[t]() : s;
            };
            var _pad = function (n, c) {
                n = String(n);
                while (n.length < c) {
                    n = '0' + n;
                }
                return n;
            };
            f = {
                // Day
                d: function () { // Day of month w/leading 0; 01..31
                    return _pad(f.j(), 2);
                },
                D: function () { // Shorthand day name; Mon...Sun
                    return f.l()
                        .slice(0, 3);
                },
                j: function () { // Day of month; 1..31
                    return jsdate.getDate();
                },
                l: function () { // Full day name; Monday...Sunday
                    return txt_words[f.w()] + 'day';
                },
                N: function () { // ISO-8601 day of week; 1[Mon]..7[Sun]
                    return f.w() || 7;
                },
                S: function () { // Ordinal suffix for day of month; st, nd, rd, th
                    var j = f.j();
                    var i = j % 10;
                    if (i <= 3 && parseInt((j % 100) / 10, 10) == 1) {
                        i = 0;
                    }
                    return ['st', 'nd', 'rd'][i - 1] || 'th';
                },
                w: function () { // Day of week; 0[Sun]..6[Sat]
                    return jsdate.getDay();
                },
                z: function () { // Day of year; 0..365
                    var a = new Date(f.Y(), f.n() - 1, f.j());
                    var b = new Date(f.Y(), 0, 1);
                    return Math.round((a - b) / 864e5);
                },

                // Week
                W: function () { // ISO-8601 week number
                    var a = new Date(f.Y(), f.n() - 1, f.j() - f.N() + 3);
                    var b = new Date(a.getFullYear(), 0, 4);
                    return _pad(1 + Math.round((a - b) / 864e5 / 7), 2);
                },

                // Month
                F: function () { // Full month name; January...December
                    return txt_words[6 + f.n()];
                },
                m: function () { // Month w/leading 0; 01...12
                    return _pad(f.n(), 2);
                },
                M: function () { // Shorthand month name; Jan...Dec
                    return f.F()
                        .slice(0, 3);
                },
                n: function () { // Month; 1...12
                    return jsdate.getMonth() + 1;
                },
                t: function () { // Days in month; 28...31
                    return (new Date(f.Y(), f.n(), 0))
                        .getDate();
                },

                // Year
                L: function () { // Is leap year?; 0 or 1
                    var j = f.Y();
                    return j % 4 === 0 & j % 100 !== 0 | j % 400 === 0;
                },
                o: function () { // ISO-8601 year
                    var n = f.n();
                    var W = f.W();
                    var Y = f.Y();
                    return Y + (n === 12 && W < 9 ? 1 : n === 1 && W > 9 ? -1 : 0);
                },
                Y: function () { // Full year; e.g. 1980...2010
                    return jsdate.getFullYear();
                },
                y: function () { // Last two digits of year; 00...99
                    return f.Y()
                        .toString()
                        .slice(-2);
                },

                // Time
                a: function () { // am or pm
                    return jsdate.getHours() > 11 ? 'pm' : 'am';
                },
                A: function () { // AM or PM
                    return f.a()
                        .toUpperCase();
                },
                B: function () { // Swatch Internet time; 000..999
                    var H = jsdate.getUTCHours() * 36e2;
                    // Hours
                    var i = jsdate.getUTCMinutes() * 60;
                    // Minutes
                    var s = jsdate.getUTCSeconds(); // Seconds
                    return _pad(Math.floor((H + i + s + 36e2) / 86.4) % 1e3, 3);
                },
                g: function () { // 12-Hours; 1..12
                    return f.G() % 12 || 12;
                },
                G: function () { // 24-Hours; 0..23
                    return jsdate.getHours();
                },
                h: function () { // 12-Hours w/leading 0; 01..12
                    return _pad(f.g(), 2);
                },
                H: function () { // 24-Hours w/leading 0; 00..23
                    return _pad(f.G(), 2);
                },
                i: function () { // Minutes w/leading 0; 00..59
                    return _pad(jsdate.getMinutes(), 2);
                },
                s: function () { // Seconds w/leading 0; 00..59
                    return _pad(jsdate.getSeconds(), 2);
                },
                u: function () { // Microseconds; 000000-999000
                    return _pad(jsdate.getMilliseconds() * 1000, 6);
                },

                // Timezone
                e: function () { // Timezone identifier; e.g. Atlantic/Azores, ...
                    // The following works, but requires inclusion of the very large
                    // timezone_abbreviations_list() function.
                    /*              return that.date_default_timezone_get();
                     */
                    throw 'Not supported (see source code of date() for timezone on how to add support)';
                },
                I: function () { // DST observed?; 0 or 1
                    // Compares Jan 1 minus Jan 1 UTC to Jul 1 minus Jul 1 UTC.
                    // If they are not equal, then DST is observed.
                    var a = new Date(f.Y(), 0);
                    // Jan 1
                    var c = Date.UTC(f.Y(), 0);
                    // Jan 1 UTC
                    var b = new Date(f.Y(), 6);
                    // Jul 1
                    var d = Date.UTC(f.Y(), 6); // Jul 1 UTC
                    return ((a - c) !== (b - d)) ? 1 : 0;
                },
                O: function () { // Difference to GMT in hour format; e.g. +0200
                    var tzo = jsdate.getTimezoneOffset();
                    var a = Math.abs(tzo);
                    return (tzo > 0 ? '-' : '+') + _pad(Math.floor(a / 60) * 100 + a % 60, 4);
                },
                P: function () { // Difference to GMT w/colon; e.g. +02:00
                    var O = f.O();
                    return (O.substr(0, 3) + ':' + O.substr(3, 2));
                },
                T: function () { // Timezone abbreviation; e.g. EST, MDT, ...
                    // The following works, but requires inclusion of the very
                    // large timezone_abbreviations_list() function.
                    /*              var abbr, i, os, _default;
                     if (!tal.length) {
                     tal = that.timezone_abbreviations_list();
                     }
                     if (that.php_js && that.php_js.default_timezone) {
                     _default = that.php_js.default_timezone;
                     for (abbr in tal) {
                     for (i = 0; i < tal[abbr].length; i++) {
                     if (tal[abbr][i].timezone_id === _default) {
                     return abbr.toUpperCase();
                     }
                     }
                     }
                     }
                     for (abbr in tal) {
                     for (i = 0; i < tal[abbr].length; i++) {
                     os = -jsdate.getTimezoneOffset() * 60;
                     if (tal[abbr][i].offset === os) {
                     return abbr.toUpperCase();
                     }
                     }
                     }
                     */
                    return 'UTC';
                },
                Z: function () { // Timezone offset in seconds (-43200...50400)
                    return -jsdate.getTimezoneOffset() * 60;
                },

                // Full Date/Time
                c: function () { // ISO-8601 date.
                    return 'Y-m-d\\TH:i:sP'.replace(formatChr, formatChrCb);
                },
                r: function () { // RFC 2822
                    return 'D, d M Y H:i:s O'.replace(formatChr, formatChrCb);
                },
                U: function () { // Seconds since UNIX epoch
                    return jsdate / 1000 | 0;
                }
            };
            this.date = function (format, timestamp) {
                that = this;
                jsdate = (timestamp === undefined ? new Date() : // Not provided
                        (timestamp instanceof Date) ? new Date(timestamp) : // JS Date()
                            new Date(timestamp * 1000) // UNIX timestamp (auto-convert to int)
                );
                return format.replace(formatChr, formatChrCb);
            };
            return this.date(format, timestamp);
        }

        function sprintf() {
            //  discuss at: http://phpjs.org/functions/sprintf/
            // original by: Ash Searle (http://hexmen.com/blog/)
            // improved by: Michael White (http://getsprink.com)
            // improved by: Jack
            // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // improved by: Dj
            // improved by: Allidylls
            //    input by: Paulo Freitas
            //    input by: Brett Zamir (http://brett-zamir.me)
            //   example 1: sprintf("%01.2f", 123.1);
            //   returns 1: 123.10
            //   example 2: sprintf("[%10s]", 'monkey');
            //   returns 2: '[    monkey]'
            //   example 3: sprintf("[%'#10s]", 'monkey');
            //   returns 3: '[####monkey]'
            //   example 4: sprintf("%d", 123456789012345);
            //   returns 4: '123456789012345'
            //   example 5: sprintf('%-03s', 'E');
            //   returns 5: 'E00'

            var regex = /%%|%(\d+\$)?([-+\'#0 ]*)(\*\d+\$|\*|\d+)?(\.(\*\d+\$|\*|\d+))?([scboxXuideEfFgG])/g;
            var a = arguments;
            var i = 0;
            var format = a[i++];

            // pad()
            var pad = function (str, len, chr, leftJustify) {
                if (!chr) {
                    chr = ' ';
                }
                var padding = (str.length >= len) ? '' : new Array(1 + len - str.length >>> 0)
                    .join(chr);
                return leftJustify ? str + padding : padding + str;
            };

            // justify()
            var justify = function (value, prefix, leftJustify, minWidth, zeroPad, customPadChar) {
                var diff = minWidth - value.length;
                if (diff > 0) {
                    if (leftJustify || !zeroPad) {
                        value = pad(value, minWidth, customPadChar, leftJustify);
                    } else {
                        value = value.slice(0, prefix.length) + pad('', diff, '0', true) + value.slice(prefix.length);
                    }
                }
                return value;
            };

            // formatBaseX()
            var formatBaseX = function (value, base, prefix, leftJustify, minWidth, precision, zeroPad) {
                // Note: casts negative numbers to positive ones
                var number = value >>> 0;
                prefix = prefix && number && {
                        '2': '0b',
                        '8': '0',
                        '16': '0x'
                    }[base] || '';
                value = prefix + pad(number.toString(base), precision || 0, '0', false);
                return justify(value, prefix, leftJustify, minWidth, zeroPad);
            };

            // formatString()
            var formatString = function (value, leftJustify, minWidth, precision, zeroPad, customPadChar) {
                if (precision != null) {
                    value = value.slice(0, precision);
                }
                return justify(value, '', leftJustify, minWidth, zeroPad, customPadChar);
            };

            // doFormat()
            var doFormat = function (substring, valueIndex, flags, minWidth, _, precision, type) {
                var number, prefix, method, textTransform, value;

                if (substring === '%%') {
                    return '%';
                }

                // parse flags
                var leftJustify = false;
                var positivePrefix = '';
                var zeroPad = false;
                var prefixBaseX = false;
                var customPadChar = ' ';
                var flagsl = flags.length;
                for (var j = 0; flags && j < flagsl; j++) {
                    switch (flags.charAt(j)) {
                        case ' ':
                            positivePrefix = ' ';
                            break;
                        case '+':
                            positivePrefix = '+';
                            break;
                        case '-':
                            leftJustify = true;
                            break;
                        case "'":
                            customPadChar = flags.charAt(j + 1);
                            break;
                        case '0':
                            zeroPad = true;
                            customPadChar = '0';
                            break;
                        case '#':
                            prefixBaseX = true;
                            break;
                    }
                }

                // parameters may be null, undefined, empty-string or real valued
                // we want to ignore null, undefined and empty-string values
                if (!minWidth) {
                    minWidth = 0;
                } else if (minWidth === '*') {
                    minWidth = +a[i++];
                } else if (minWidth.charAt(0) == '*') {
                    minWidth = +a[minWidth.slice(1, -1)];
                } else {
                    minWidth = +minWidth;
                }

                // Note: undocumented perl feature:
                if (minWidth < 0) {
                    minWidth = -minWidth;
                    leftJustify = true;
                }

                if (!isFinite(minWidth)) {
                    throw new Error('sprintf: (minimum-)width must be finite');
                }

                if (!precision) {
                    precision = 'fFeE'.indexOf(type) > -1 ? 6 : (type === 'd') ? 0 : undefined;
                } else if (precision === '*') {
                    precision = +a[i++];
                } else if (precision.charAt(0) == '*') {
                    precision = +a[precision.slice(1, -1)];
                } else {
                    precision = +precision;
                }

                // grab value using valueIndex if required?
                value = valueIndex ? a[valueIndex.slice(0, -1)] : a[i++];

                switch (type) {
                    case 's':
                        return formatString(String(value), leftJustify, minWidth, precision, zeroPad, customPadChar);
                    case 'c':
                        return formatString(String.fromCharCode(+value), leftJustify, minWidth, precision, zeroPad);
                    case 'b':
                        return formatBaseX(value, 2, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
                    case 'o':
                        return formatBaseX(value, 8, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
                    case 'x':
                        return formatBaseX(value, 16, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
                    case 'X':
                        return formatBaseX(value, 16, prefixBaseX, leftJustify, minWidth, precision, zeroPad)
                            .toUpperCase();
                    case 'u':
                        return formatBaseX(value, 10, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
                    case 'i':
                    case 'd':
                        number = +value || 0;
                        number = Math.round(number - number % 1); // Plain Math.round doesn't just truncate
                        prefix = number < 0 ? '-' : positivePrefix;
                        value = prefix + pad(String(Math.abs(number)), precision, '0', false);
                        return justify(value, prefix, leftJustify, minWidth, zeroPad);
                    case 'e':
                    case 'E':
                    case 'f': // Should handle locales (as per setlocale)
                    case 'F':
                    case 'g':
                    case 'G':
                        number = +value;
                        prefix = number < 0 ? '-' : positivePrefix;
                        method = ['toExponential', 'toFixed', 'toPrecision']['efg'.indexOf(type.toLowerCase())];
                        textTransform = ['toString', 'toUpperCase']['eEfFgG'.indexOf(type) % 2];
                        value = prefix + Math.abs(number)[method](precision);
                        return justify(value, prefix, leftJustify, minWidth, zeroPad)[textTransform]();
                    default:
                        return substring;
                }
            };

            return format.replace(regex, doFormat);
        }

        function in_array(needle, haystack, argStrict) {
            //  discuss at: http://phpjs.org/functions/in_array/
            // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // improved by: vlado houba
            // improved by: Jonas Sciangula Street (Joni2Back)
            //    input by: Billy
            // bugfixed by: Brett Zamir (http://brett-zamir.me)
            //   example 1: in_array('van', ['Kevin', 'van', 'Zonneveld']);
            //   returns 1: true
            //   example 2: in_array('vlado', {0: 'Kevin', vlado: 'van', 1: 'Zonneveld'});
            //   returns 2: false
            //   example 3: in_array(1, ['1', '2', '3']);
            //   example 3: in_array(1, ['1', '2', '3'], false);
            //   returns 3: true
            //   returns 3: true
            //   example 4: in_array(1, ['1', '2', '3'], true);
            //   returns 4: false

            var key = '',
                strict = !!argStrict;

            //we prevent the double check (strict && arr[key] === ndl) || (!strict && arr[key] == ndl)
            //in just one for, in order to improve the performance
            //deciding wich type of comparation will do before walk array
            if (strict) {
                for (key in haystack) {
                    if (haystack[key] === needle) {
                        return true;
                    }
                }
            } else {
                for (key in haystack) {
                    if (haystack[key] == needle) {
                        return true;
                    }
                }
            }

            return false;
        }

        function trim(str, charlist) {
            //  discuss at: http://phpjs.org/functions/trim/
            // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // improved by: mdsjack (http://www.mdsjack.bo.it)
            // improved by: Alexander Ermolaev (http://snippets.dzone.com/user/AlexanderErmolaev)
            // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // improved by: Steven Levithan (http://blog.stevenlevithan.com)
            // improved by: Jack
            //    input by: Erkekjetter
            //    input by: DxGx
            // bugfixed by: Onno Marsman
            //   example 1: trim('    Kevin van Zonneveld    ');
            //   returns 1: 'Kevin van Zonneveld'
            //   example 2: trim('Hello World', 'Hdle');
            //   returns 2: 'o Wor'
            //   example 3: trim(16, 1);
            //   returns 3: 6

            var whitespace, l = 0,
                i = 0;
            str += '';

            if (!charlist) {
                // default list
                whitespace =
                    ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000';
            } else {
                // preg_quote custom list
                charlist += '';
                whitespace = charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '$1');
            }

            l = str.length;
            for (i = 0; i < l; i++) {
                if (whitespace.indexOf(str.charAt(i)) === -1) {
                    str = str.substring(i);
                    break;
                }
            }

            l = str.length;
            for (i = l - 1; i >= 0; i--) {
                if (whitespace.indexOf(str.charAt(i)) === -1) {
                    str = str.substring(0, i + 1);
                    break;
                }
            }

            return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
        }

        function ltrim(str, charlist) {
            //  discuss at: http://phpjs.org/functions/ltrim/
            // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            //    input by: Erkekjetter
            // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // bugfixed by: Onno Marsman
            //   example 1: ltrim('    Kevin van Zonneveld    ');
            //   returns 1: 'Kevin van Zonneveld    '

            charlist = !charlist ? ' \\s\u00A0' : (charlist + '')
                .replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '$1');
            var re = new RegExp('^[' + charlist + ']+', 'g');
            return (str + '')
                .replace(re, '');
        }

        function rtrim(str, charlist) {
            //  discuss at: http://phpjs.org/functions/rtrim/
            // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            //    input by: Erkekjetter
            //    input by: rem
            // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // bugfixed by: Onno Marsman
            // bugfixed by: Brett Zamir (http://brett-zamir.me)
            //   example 1: rtrim('    Kevin van Zonneveld    ');
            //   returns 1: '    Kevin van Zonneveld'

            charlist = !charlist ? ' \\s\u00A0' : (charlist + '')
                .replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '\\$1');
            var re = new RegExp('[' + charlist + ']+$', 'g');
            return (str + '')
                .replace(re, '');
        }
        
        function strip_tags (input, allowed) 
        {
            // eslint-disable-line camelcase
           //  discuss at: http://locutus.io/php/strip_tags/
           // original by: Kevin van Zonneveld (http://kvz.io)
           // improved by: Luke Godfrey
           // improved by: Kevin van Zonneveld (http://kvz.io)
           //    input by: Pul
           //    input by: Alex
           //    input by: Marc Palau
           //    input by: Brett Zamir (http://brett-zamir.me)
           //    input by: Bobby Drake
           //    input by: Evertjan Garretsen
           // bugfixed by: Kevin van Zonneveld (http://kvz.io)
           // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
           // bugfixed by: Kevin van Zonneveld (http://kvz.io)
           // bugfixed by: Kevin van Zonneveld (http://kvz.io)
           // bugfixed by: Eric Nagel
           // bugfixed by: Kevin van Zonneveld (http://kvz.io)
           // bugfixed by: Tomasz Wesolowski
           //  revised by: Rafał Kukawski (http://blog.kukawski.pl)
           //   example 1: strip_tags('<p>Kevin</p> <br /><b>van</b> <i>Zonneveld</i>', '<i><b>')
           //   returns 1: 'Kevin <b>van</b> <i>Zonneveld</i>'
           //   example 2: strip_tags('<p>Kevin <img src="someimage.png" onmouseover="someFunction()">van <i>Zonneveld</i></p>', '<p>')
           //   returns 2: '<p>Kevin van Zonneveld</p>'
           //   example 3: strip_tags("<a href='http://kvz.io'>Kevin van Zonneveld</a>", "<a>")
           //   returns 3: "<a href='http://kvz.io'>Kevin van Zonneveld</a>"
           //   example 4: strip_tags('1 < 5 5 > 1')
           //   returns 4: '1 < 5 5 > 1'
           //   example 5: strip_tags('1 <br/> 1')
           //   returns 5: '1  1'
           //   example 6: strip_tags('1 <br/> 1', '<br>')
           //   returns 6: '1 <br/> 1'
           //   example 7: strip_tags('1 <br/> 1', '<br><br/>')
           //   returns 7: '1 <br/> 1'

            // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
            allowed = (((allowed || '') + '').toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('')

            var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi
            var commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi

            return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
                return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : ''
            })
        }

        function strtotime(text, now) {
            //  discuss at: http://phpjs.org/functions/strtotime/
            //     version: 1109.2016
            // original by: Caio Ariede (http://caioariede.com)
            // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // improved by: Caio Ariede (http://caioariede.com)
            // improved by: A. Matías Quezada (http://amatiasq.com)
            // improved by: preuter
            // improved by: Brett Zamir (http://brett-zamir.me)
            // improved by: Mirko Faber
            //    input by: David
            // bugfixed by: Wagner B. Soares
            // bugfixed by: Artur Tchernychev
            //        note: Examples all have a fixed timestamp to prevent tests to fail because of variable time(zones)
            //   example 1: strtotime('+1 day', 1129633200);
            //   returns 1: 1129719600
            //   example 2: strtotime('+1 week 2 days 4 hours 2 seconds', 1129633200);
            //   returns 2: 1130425202
            //   example 3: strtotime('last month', 1129633200);
            //   returns 3: 1127041200
            //   example 4: strtotime('2009-05-04 08:30:00 GMT');
            //   returns 4: 1241425800

            var parsed, match, today, year, date, days, ranges, len, times, regex, i, fail = false;

            if (!text) {
                return fail;
            }

            // Unecessary spaces
            text = text.replace(/^\s+|\s+$/g, '')
                .replace(/\s{2,}/g, ' ')
                .replace(/[\t\r\n]/g, '')
                .toLowerCase();

            // in contrast to php, js Date.parse function interprets:
            // dates given as yyyy-mm-dd as in timezone: UTC,
            // dates with "." or "-" as MDY instead of DMY
            // dates with two-digit years differently
            // etc...etc...
            // ...therefore we manually parse lots of common date formats
            match = text.match(
                /^(\d{1,4})([\-\.\/\:])(\d{1,2})([\-\.\/\:])(\d{1,4})(?:\s(\d{1,2}):(\d{2})?:?(\d{2})?)?(?:\s([A-Z]+)?)?$/);

            if (match && match[2] === match[4]) {
                if (match[1] > 1901) {
                    switch (match[2]) {
                        case '-':
                        { // YYYY-M-D
                            if (match[3] > 12 || match[5] > 31) {
                                return fail;
                            }

                            return new Date(match[1], parseInt(match[3], 10) - 1, match[5],
                                    match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
                        }
                        case '.':
                        { // YYYY.M.D is not parsed by strtotime()
                            return fail;
                        }
                        case '/':
                        { // YYYY/M/D
                            if (match[3] > 12 || match[5] > 31) {
                                return fail;
                            }

                            return new Date(match[1], parseInt(match[3], 10) - 1, match[5],
                                    match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
                        }
                    }
                } else if (match[5] > 1901) {
                    switch (match[2]) {
                        case '-':
                        { // D-M-YYYY
                            if (match[3] > 12 || match[1] > 31) {
                                return fail;
                            }

                            return new Date(match[5], parseInt(match[3], 10) - 1, match[1],
                                    match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
                        }
                        case '.':
                        { // D.M.YYYY
                            if (match[3] > 12 || match[1] > 31) {
                                return fail;
                            }

                            return new Date(match[5], parseInt(match[3], 10) - 1, match[1],
                                    match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
                        }
                        case '/':
                        { // M/D/YYYY
                            if (match[1] > 12 || match[3] > 31) {
                                return fail;
                            }

                            return new Date(match[5], parseInt(match[1], 10) - 1, match[3],
                                    match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
                        }
                    }
                } else {
                    switch (match[2]) {
                        case '-':
                        { // YY-M-D
                            if (match[3] > 12 || match[5] > 31 || (match[1] < 70 && match[1] > 38)) {
                                return fail;
                            }

                            year = match[1] >= 0 && match[1] <= 38 ? +match[1] + 2000 : match[1];
                            return new Date(year, parseInt(match[3], 10) - 1, match[5],
                                    match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
                        }
                        case '.':
                        { // D.M.YY or H.MM.SS
                            if (match[5] >= 70) { // D.M.YY
                                if (match[3] > 12 || match[1] > 31) {
                                    return fail;
                                }

                                return new Date(match[5], parseInt(match[3], 10) - 1, match[1],
                                        match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
                            }
                            if (match[5] < 60 && !match[6]) { // H.MM.SS
                                if (match[1] > 23 || match[3] > 59) {
                                    return fail;
                                }

                                today = new Date();
                                return new Date(today.getFullYear(), today.getMonth(), today.getDate(),
                                        match[1] || 0, match[3] || 0, match[5] || 0, match[9] || 0) / 1000;
                            }

                            return fail; // invalid format, cannot be parsed
                        }
                        case '/':
                        { // M/D/YY
                            if (match[1] > 12 || match[3] > 31 || (match[5] < 70 && match[5] > 38)) {
                                return fail;
                            }

                            year = match[5] >= 0 && match[5] <= 38 ? +match[5] + 2000 : match[5];
                            return new Date(year, parseInt(match[1], 10) - 1, match[3],
                                    match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
                        }
                        case ':':
                        { // HH:MM:SS
                            if (match[1] > 23 || match[3] > 59 || match[5] > 59) {
                                return fail;
                            }

                            today = new Date();
                            return new Date(today.getFullYear(), today.getMonth(), today.getDate(),
                                    match[1] || 0, match[3] || 0, match[5] || 0) / 1000;
                        }
                    }
                }
            }

            // other formats and "now" should be parsed by Date.parse()
            if (text === 'now') {
                return now === null || isNaN(now) ? new Date()
                    .getTime() / 1000 | 0 : now | 0;
            }
            if (!isNaN(parsed = Date.parse(text))) {
                return parsed / 1000 | 0;
            }

            date = now ? new Date(now * 1000) : new Date();
            days = {
                'sun': 0,
                'mon': 1,
                'tue': 2,
                'wed': 3,
                'thu': 4,
                'fri': 5,
                'sat': 6
            };
            ranges = {
                'yea': 'FullYear',
                'mon': 'Month',
                'day': 'Date',
                'hou': 'Hours',
                'min': 'Minutes',
                'sec': 'Seconds'
            };

            function lastNext(type, range, modifier) {
                var diff, day = days[range];

                if (typeof day !== 'undefined') {
                    diff = day - date.getDay();

                    if (diff === 0) {
                        diff = 7 * modifier;
                    } else if (diff > 0 && type === 'last') {
                        diff -= 7;
                    } else if (diff < 0 && type === 'next') {
                        diff += 7;
                    }

                    date.setDate(date.getDate() + diff);
                }
            }

            function process(val) {
                var splt = val.split(' '), // Todo: Reconcile this with regex using \s, taking into account browser issues with split and regexes
                    type = splt[0],
                    range = splt[1].substring(0, 3),
                    typeIsNumber = /\d+/.test(type),
                    ago = splt[2] === 'ago',
                    num = (type === 'last' ? -1 : 1) * (ago ? -1 : 1);

                if (typeIsNumber) {
                    num *= parseInt(type, 10);
                }

                if (ranges.hasOwnProperty(range) && !splt[1].match(/^mon(day|\.)?$/i)) {
                    return date['set' + ranges[range]](date['get' + ranges[range]]() + num);
                }

                if (range === 'wee') {
                    return date.setDate(date.getDate() + (num * 7));
                }

                if (type === 'next' || type === 'last') {
                    lastNext(type, range, num);
                } else if (!typeIsNumber) {
                    return false;
                }

                return true;
            }

            times = '(years?|months?|weeks?|days?|hours?|minutes?|min|seconds?|sec' +
                '|sunday|sun\\.?|monday|mon\\.?|tuesday|tue\\.?|wednesday|wed\\.?' +
                '|thursday|thu\\.?|friday|fri\\.?|saturday|sat\\.?)';
            regex = '([+-]?\\d+\\s' + times + '|' + '(last|next)\\s' + times + ')(\\sago)?';

            match = text.match(new RegExp(regex, 'gi'));
            if (!match) {
                return fail;
            }

            for (i = 0, len = match.length; i < len; i++) {
                if (!process(match[i])) {
                    return fail;
                }
            }

            // ECMAScript 5 only
            // if (!match.every(process))
            //    return false;

            return (date.getTime() / 1000);
        }


    }
})();
/**
 * Created by dd on 12/26/15.
 */
(function () {
    angular
        .module('app.core')
        .factory('Api', ['$http', '$q', 'Data', 'Const', 'Log', 'Util', 'Config', Api]);

    function Api($http, $q, Data, Const, Log, Util, Config) {
        var apiList = {
            Admin: {
                login: ['admin/login', 'username', 'password'],
                addAdmin: ['admin/add', 'username', 'name', 'password'],
                logout: ['admin/logout'],
                updatePassword: ['admin/update-password', 'old_password', 'password'],
                getAdminAuthList: ['admin/auth-list']
            },
            Stat: {
                getStatistics: ['stat/home'],
                getWaybillStatOfMarket: ['stat/waybill-stat-of-market', 'begin_time', 'end_time']
            },
            Waybill: {
                getWaybillList: ['waybill/waybill-list', 'page', 'filter', 'begin_date', 'end_date', 'sn', 'status', 'express_company_id', 'from_company_name', 'to_company_name', 'is_return', 'return_status', 'source_type', 'charge_pay_type'],
                getWaybillListofSchedule: ['waybill/waybill-list-of-schedule', 'schedule_id', 'page'],
                getWaybillListofMerchant: ['waybill/waybill-list-of-company', 'company_id', 'page'],
                getWaybillListofDriver: ['waybill/waybill-list-of-courier', 'courier_id', 'page'],
                getWaybillDetail: ['waybill/waybill-detail', 'waybill_id'],
                getWaybillActionList: ['waybill/waybill-action-list', 'waybill_id'],
                updateWaybillStatus: ['waybill/waybill-status-update', 'waybill_id', 'status'],
                getWaybillStatusList: ['waybill/waybill-status-list', 'waybill_id'],
                deleteWaybill: ['waybill/waybill-delete', 'waybill_id'],
                updateWaybillCommentAdmin: ['waybill/waybill-comment-admin-update', 'waybill_id', 'comment'],
                updateWaybillCharge: ['waybill/waybill-charge-update', 'waybill_id', 'charge', 'comment'],
                updateWaybillChargePaid: ['waybill/waybill-charge-paid-update', 'waybill_id', 'charge_paid', 'comment'],
                updateWaybillCod: ['waybill/waybill-cod-update', 'waybill_id', 'cod', 'comment'],
                updateWaybillCodReceived: ['waybill/waybill-cod-received-update', 'waybill_id', 'cod_received', 'comment'],
                updateWaybillCodPaid: ['waybill/waybill-cod-paid-update', 'waybill_id', 'cod_paid', 'comment'],
                updateWaybillCodPaidBatch: ['waybill/waybill-cod-paid-update', 'waybill_id_list', 'comment'],
                rejectWaybillReturn: ['waybill/reject-waybill-return', 'waybill_id', 'return_cod', 'return_charge_back', 'return_charge_go_user_type', 'return_charge_back_user_type', 'return_comment', 'return_admin_comment'],
                updateWaybillReturnSuccess: ['waybill/update-waybill-return-success', 'waybill_id', 'return_cod', 'return_charge_back', 'return_charge_go_user_type', 'return_charge_back_user_type', 'return_comment', 'return_admin_comment'],
                updateExpressInfo: ['waybill/express-info-update', 'waybill_id', 'express_company_id', 'express_branch_id'],

                getPendingReceiveWaybillListOfToday: ['waybill/waybill-list-of-pending-receive-today', 'page', 'filter', 'sn', 'from_company_name'],
                updateWaybillStatusReceiving: ['waybill/waybill-update-status-receiving', 'waybill_id', 'comment'],
                updateWaybillStatusReceiveSuccess: ['waybill/waybill-update-status-receive-success', 'waybill_id', 'comment'],
                updateWaybillStatusRejectReceive: ['waybill/waybill-update-status-reject-receive', 'waybill_id', 'comment'],

            },
            Transport: {
                getScheduleList: ['transport/schedule-list'],
                getScheduleListOfCourier: ['transport/schedule-list-of-courier', 'courier_id'],
                getTransportListOfToday: ['transport/transport-list-of-today'],
                saveSchedule: ['transport/schedule-save', 'id', 'start_hour', 'start_minute', 'route_id', 'price_large_size', 'price_small_size', 'discount', 'courier_id'],
                removeSchedule: ['transport/schedule-remove', 'schedule_id'],
                getRouteList: ['transport/route-list']
            },
            Express: {
                saveCompany: ['express/company-save', 'express_company_id', 'code', 'name', 'username', 'password', 'legal_person_name', 'phone', 'tel', 'deposit', 'last_schedule_time', 'due_time', 'status'],
                getCompanyList: ['express/company-list', 'name', 'phone', 'code', 'status'],
                changeCompanyStatus: ['express/company-status-change', 'express_company_id', 'status'],
                getCompanyDetail: ['express/company-detail', 'express_company_id'],
                getRouteList: ['express/route-list', 'page', 'province', 'city', 'county', 'company'],
                deleteRoute: ['express/route-delete', 'express_route_id'],
                saveRoute: ['express/route-save', 'express_route_id', 'province', 'city', 'county', 'express_company_list'],
                getBranchList: ['express/branch-list', 'page', 'province', 'city', 'county', 'name', 'express_company_id'],
                deleteBranch: ['express/branch-delete', 'express_branch_id'],
                saveBranch: ['express/branch-save', 'express_branch_id', 'name', 'contact', 'phone', 'telephone', 'province', 'city', 'county', 'address', 'status', 'express_company_id'],
                getCompanyListByRoute: ['express/company-list-of-route', 'province', 'city', 'county'],
                getBranchListByCompany: ['express/branch-list-of-route-of-company', 'province', 'city', 'county', 'express_company_id'],
            },
            Courier: {
                getCourierList: ['courier/courier-list', 'page'],
                saveCourier: ['courier/courier-save', 'id', 'username', 'name', 'phone', 'password', 'wage_base', 'wage_bonus_attendance', 'wage_bonus_rate', 'wage_performance_x1', 'wage_performance_p1', 'wage_performance_p2'],
                removeCourier: ['courier/courier-remove', 'courier_id'],
                updateCourierPassword: ['courier/courier-password-update', 'courier_id', 'password'],
            },
            Merchant: {
                getMerchantList: ['company/list', 'page', 'filter', 'name', 'phone', 'id'],
                getMerchantDetail: ['company/detail', 'merchant_id'],
                saveMerchant: ['company/company-save', 'company_id', 'name', 'username', 'legal_person_name', 'phone', 'collect_area_id', 'booth_number', 'register_time', 'status', 'business_scope'],
                changeStatus: ['company/company-change-status', 'company_id', 'status']
            },
            System: {
                saveDepartment: ['system/department-save', 'department_id', 'name', 'comment'],
                getDepartmentList: ['system/department-list'],
                deleteDepartment: ['system/department-delete', 'department_id'],
                savePdaDevice: ['system/pda-device-save', 'device_id', 'number', 'model', 'factory', 'buy_time', 'status'],
                getPdaDeviceList: ['system/pda-device-list', 'number', 'model', 'factory', 'status'],
                deletePdaDevice: ['system/pda-device-delete', 'device_id'],
                saveRole: ['system/role-save', 'role_id', 'name', 'comment', 'auth_list'],
                getRoleList: ['system/role-list'],
                deleteRole: ['system/role-delete', 'role_id'],
                saveAdmin: ['admin/add', 'username', 'name', 'password', 'department_id', 'role_id'],
                editAdminPassword: ['admin/password-edit', 'admin_id', 'password'],
                editAdmin: ['admin/edit', 'admin_id', 'name', 'department_id', 'role_id'],
                getAdminList: ['admin/list'],
                deleteAdmin: ['admin/delete', 'admin_id']
            },

            Collect: {
                saveArea: ['collect/area-save', 'area_id', 'name', 'status'],
                getAreaList: ['collect/area-list'],
                deleteArea: ['collect/area-delete', 'area_id'],
                getAreaDetail: ['collect/area-delete-detail', 'area_id'],
                saveUser: ['collect/user-save', 'collect_user_id', 'username', 'password', 'name', 'gender', 'birthday', 'entry_time', 'status', 'collect_area_id'],
                editUser: ['collect/user-edit', 'collect_user_id', 'name', 'gender', 'birthday', 'entry_time', 'status', 'collect_area_id'],
                getUserList: ['collect/user-list', 'page', 'name', 'begin_date', 'end_date'],
                getUserAllList: ['collect/user-all-list'],
                deleteUser: ['collect/user-delete', 'collect_user_id'],
                getUserDetail: ['collect/user-detail', 'collect_user_id']
            },

            Finance: {
                getTradeListIn: ['finance/trade-list-of-in', 'page', 'begin_date', 'end_date', 'status', 'subject', 'company_type', 'company_name'],
                getTradeListOut: ['finance/trade-list-of-out', 'page', 'begin_date', 'end_date', 'status', 'subject', 'company_type', 'company_name'],
                getTradeDetail: ['finance/trade-detail', 'trade_id'],
                getBankPayList: ['finance/waybill-list-by-trade', 'page', 'trade_id']
            },

            Clearing: {
                getBankPayList: ['clearing/pay-list', 'page', 'target_id', 'target_type', 'company_id', 'company_type', 'type', 'subject', 'status', 'clearing_status', 'begin_time', 'end_time', 'waybill_sn', 'company_name'],
                getWaybillTradeLogList: ['clearing/log-list-of-trade', 'trade_id'],
                getWaybillTradeRequestList: ['clearing/request-list-of-trade', 'trade_id'],
                getLogList: ['clearing/log-list', 'page', 'target_id', 'target_type', 'begin_time', 'end_time'],
                getRequestList: ['clearing/request-list', 'page', 'source_id', 'source_type', 'begin_time', 'end_time'],
                getPayListOfWaybill: ['clearing/pay-list-of-waybill', 'waybill_id']
            },

            Ad: {
                saveImgSlider: ['ad/ad-add', 'ad_id', 'name', 'title', 'img', 'begin_time', 'end_time', 'comment'],
                getImgSliderList: ['ad/ad-list'],
                deleteImgSlider: ['ad/ad-delete', 'ad_id'],
                getAdDetail: ['ad/detail', 'ad_id']
            },
            Insurance: {
                getInsuranceWaybillList: ['insurance/waybill-list', 'page', 'begin_time', 'end_time', 'sn']
            },
            Report: {
                getWaybillOfMarket: ['report/waybill-list-of-market', 'page', 'begin_date', 'end_date', 'express_company_id', 'from_company_name'],
                getWaybillOfExpress: ['report/waybill-list-of-express', 'page', 'begin_date', 'end_date', 'express_company_id', 'express_company_branch_name'],
                getCompanyListOfMerchant: ['report/company-list-of-merchant', 'page', 'begin_date', 'end_date', 'from_company_name'],
                getWaybillOfCollect: ['report/waybill-list-of-collect', 'page', 'begin_date', 'end_date', 'pda_user_id']
            },
            Loading: {
                getLoadingList: ['loading/list', 'page', 'begin_date', 'end_date', 'express_company_id'],
                getWaybillShippingLabelList: ['loading/waybill-shipping-label-list', 'transport_id'],
                printWaybillShippingLabelList: ['loading/waybill-shipping-label-print', 'transport_id']
            },

            Post: {
                getPostList: ['post/list', 'page', 'type'],
                getPostDetail: ['post/detail', 'post_id'],
                savePost: ['post/save', 'post_id', 'title', 'content', 'status'],
                deletePost: ['post/delete', 'post_id']

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
            var token = Data.getToken();
            var url = Const.NET.END_POINT + '/' + api + '?token=' + token + '&client=' + Const.NET.CLIENT + '&version=' + Const.NET.VERSION + '&sp=' + Const.NET.SP + '&';
            Log.d(url + transformObjectToUrlencodedData(data));
            return $http({
                method: 'POST',
                url: url,
                data: transformObjectToUrlencodedData(data),
                headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
            }).then(function (response) {
                if (response.data.hasOwnProperty('code') && response.data.code == Const.ERROR.ERROR_TOKEN_INVALID) {
                    Data.clearAuthData();
                    Core.$state.go('login');
                }

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
                    code: Const.ERROR.ERROR_NETWORK,
                    response: response
                });
            }, function (reason) {
                return {
                    code: Const.ERROR.ERROR_NETWORK,
                    response: reason
                }
            });
        }

        function getUrl(api, data) {
            var token = Data.getToken();
            var url = Const.NET.END_POINT + '/' + api + '?token=' + token + '&client=' + Const.NET.CLIENT + '&version=' + Const.NET.VERSION + '&sp=' + Const.NET.SP + '&';
            url = url + transformObjectToUrlencodedData(data);
            return url;
        }

        function handlePost(api, data) {
            return post(api, data).then(function (response) {
                if (response.code >= 0 && response.code == 0 && response.data) {
                    return $q.resolve(response.data);
                }

                var code = response.code ? response.code : -2;
                var message = response.message ? response.message : undefined;
                return $q.resolve({
                    code: code,
                    message: message
                });
            }, function (errorResponse) {
                return $q.reject({
                    code: Const.ERROR.ERROR_NETWORK,
                    response: errorResponse
                })
            });
        }
    }
})();
/**
 * Created by dd on 12/26/15.
 */
(function () {
    angular
        .module('app.core')
        .factory('Const', Const);

    function Const() {
        return {
            ERROR: {
                ALREADY_EXISTS: 6,
                INVALID_USER_NAME: 5,
                ERROR_PASSWORD: 3,
                ERROR_NETWORK: -10000,
                ERROR_INVALID: -1,
                ERROR_PARAM_NOT_SET: 1,
                ERROR_TOKEN_INVALID: 2,
                ERROR_LOGIN_FAIL: 3,
                ERROR_WRONG_PARAM: 4,
                ERROR_NOT_EXIST: 5,
                ERROR_EXIST: 6,
                ERROR_ORG_NOT_EXIST: 7,
                ERROR_ORG_MEMBER_NOT_EXISTS: 8,
                ERROR_REGISTER: 9,
                ERROR_USER_NOT_EXISTS: 10,
                ERROR_PHONE_HAS_BEEN_TAKEN: 11,
                ERROR_BIND_USER_BIND_EXISTS: 12,
                ERROR_WRONG_TYPE: 13,
                ERROR_SAVE_ERROR: 14,
                ERROR_ACTION_NOT_ALLOWED: 15,
                ERROR_WRONG_VERIFICATION_CODE: 16,
                ERROR_SEND_PHONE_VCODE_TOO_OFTEN: 17
            },

            SYSTEM: {
                LOG_LEVEL_ERROR: 1,
                LOG_LEVEL_WARN: 2,
                LOG_LEVEL_INFO: 3,
                LOG_LEVEL_TRACE: 4,
                LOG_LEVEL_DEBUG: 5
            },

            NET: {
                END_POINT: 'http://yex-api.yuntu78.com/qpc/100',
                // END_POINT: 'http://yunto.api/qpc/100',
                VERSION: 1,
                CLIENT: 3,
                SP: 2,

                IMG_UPLOAD_END_POINT: 'http://static.yuntick.com/api/img-upload/smartwork',
                IMG_URL_PREFIX: 'http://static.yuntick.com/smartwork/img/',
                CREATE_BARCODE: 'http://sw-oa-api.yuntick.com/res/qr?code=',
                INVITE_URL_HEAD: 'http://sw-oa-client-h5.yuntick.com/home.html?invite_token=',
                INVITE_URL_TAIL: '#!/receive-invite',

                API: {
                    USER_LOGIN: 'user/login',
                    USER_WX_LOGIN: 'user/login-by-wx',
                    USER_REGISTER: 'user/register',
                    USER_WX_REGISTER: 'user/register-by-wx',
                    USER_LOGOUT: 'user/logout',
                    USER_DETAIL: 'user/detail',
                    USER_DETAIL_BY_PHONE: 'user/detail-by-phone',
                    USER_PASSWORD_UPDATE: 'user/password-update',
                    USER_PASSWORD_RESET: 'user/password-reset',
                    USER_AVATAR_UPDATE: 'user/avatar-update',
                    USER_BASIC_INFO_UPDATE: 'user/basic-info-update',
                    USER_PHONE_UPDATE: 'user/phone-update',
                    USER_OUTER_USER_INFO_UPDATE: 'user/outer-user-info-update',
                    USER_OUTER_USER_LIST: 'user/outer-user-list',
                    USER_OUTER_USER_BIND: 'user/outer-user-bind',
                    USER_OUTER_USER_UNBIND: 'user/outer-user-unbind',

                    COMMON_PHONE_VCODE_SEND: 'common/phone-verification-code-send',
                    COMMON_PHONE_VCODE_CHECK: 'common/phone-verification-code-check',


                }
            },
            APP: {
                ADMIN: {
                    //operator_type
                    OPERATOR_TYPE_USER: 1,            //普通用户
                    OPERATOR_TYPE_ADMIN: 2,            //管理员
                    OPERATOR_TYPE_SYSTEM: 3             //系统
                },

            },

            DATA: {
                KEY_PREFIX: 'yunto.data.',
                KEY_TOKEN: 'token',
                KEY_ORG_ROOT: 'org-root',
                KEY_PAY_DETAIL: 'pay-detail',
                KEY_ORG: 'org/org-default',
                KEY_USER: 'user',
                KEY_DEFAULT_AVATAR: 'home/img/default-avatar.png',
            },

            EVENT: {
                EVENT_TEST: 'event-test',
                REFRESH_NAV_AUTH_LIST: 'refresh-nav-auth-list',
                REFRESH_CURRENT_PAGE: "refresh-current-page",
            },

            // TRANSPORT: {
            //     0: '尚未就绪',
            //     1: '司机就绪',
            //     2: '运输途中',
            //     3: '班次完成'
            // },
            TRANSPORT: {
                0: '未完成',
                1: '已完成',
            },

            WAYBILL_STATUS: {
                STATUS_INIT: 0,
                STATUS_RECEIVING: 100,
                STATUS_RECEIVING_PENDING_TRUCK_LOADING: 101,
                STATUS_RECEIVE_SUCCESS: 200,
                STATUS_IN_TRANSIT: 300,
                STATUS_DELIVERING: 400,
                STATUS_DELIVER_SUCCESS: 500,
                STATUS_RETURNING: 600,
                STATUS_RETURNING_SUCCESS: 700,

                STATUS_CANCEL: -1,
                STATUS_RECEIVE_REJECT: -100,
                STATUS_RECEIVE_FAIL: -101,
                STATUS_DELIVER_REJECT: -400,
                STATUS_DELIVER_FAIL: -401,
                STATUS_FAIL: -9999
            },

            WAYBILL_STATUS_NAME: {
                0: '初稿',
                1: "待收单",
                100: '取件中',
                101: '待装车',
                200: '待装车',
                300: '运输中',
                400: '运输中',
                500: '已签收',
                600: '退货中',
                700: '退货完成',
                '-1': '被取消',
                '-100': '订单被拒绝',
                '-101': '收单失败',
                '-400': '派件被拒绝',
                '-401': '派送失败',
                '-9999': '失败'
            },

            WAYBILL_RETURN_STATUS_NAME: {
                0: '无',
                1: '发起退货',
                2: '退货成功',
                '-1': '平台介入中',
            },

            WAYBILL_SOURCE_TYPE_NAME: {
                0: "本系统",
                10000: '旧系统'
            },

            BANK_PAY_TYPE_NAME: {
                1: '收款',
                2: '打款',
            },

            BANK_PAY_STATUS_NAME: {
                0: '初始',
                1: '等待',
                2: '执行中',
                3: '执行成功',
                '-1': '失败',
            },

            BANK_PAY_CLEAR_STATUS_NAME: {
                0: "等待",
                1: "成功",
                '-1': '失败'
            },

            BANK_PAY_SUBJECT: {
                1: '运费',
                2: '代收款',
                3: '退货运费',
                101: '运费佣金',
                102: '代收款佣金',
                103: '退货运费佣金',
                201: '保费'
            },

            SOURCE_TYPE: {
                0: '同城',
                10000: '专线'
            },

            COLLECT_AREA_STATUS: {
                USE: 1, //启用
                PAUSE: 2, //停用
            },

            COLLECT_USER_STATUS: {
                USE: 1, //启用
                PAUSE: 2, //停用
            },

            EXPRESS_COMPANY_STATUS: {
                STATUS_NONE_AUTH: 1,
                STATUS_AUTH: 2,
                STATUS_FROZEN: 3
            },

            MERCHANT_STATUS: {
                0: "未认证",
                1: "已认证",
                2: "已冻结"
            },

            WAYBILL_RETURN_STATUS: {
                '0': '未发起退货',
                '1': "发起退货",
                '2': "退货成功",
                '-1': "平台介入中"
            },

            BANK_LOG_TYPE_LIST: {
                1: "商户不存在",
                2: "物流公司不存在",
                3: "银行卡错误",
                4: "交易不可执行",
            },

            COMPANY_TYPE: {
                1: '平台',
                2: '商户',
                3: '物流'
            },

            TRADE_COMPANY_TYPE: {
                1: '平台',
                2: '商户',
                3: '物流公司'
            },

            CHARGE_PAY_TYPE: {
                0: '寄方付',
                1: '收方付'
            },

            DELIVER_TYPE: {
                0: '自提',
                1: '送货'
            },
            EDIT_WAYBILL_CONTENT: {
                'charge': '运费',
                'charge_paid': '已付运费',
                'cod_received': '已收待收款',
                'comment': '备注',
                'comment_admin': '后台备注',
                'change_status': "订单状态",
                'change_route': '网点'
            },

            CONFIG_TYPE: {
                'delete_waybill': '确定删除订单吗?',
                'frozen_express_company': '确定冻结该账户吗?',
                'unfrozen_express_company': '确定解冻该账户吗?',
                'company_auth_pass': '确定通过该账户的认证?',
                'frozen_account': '确定冻结该账户',
                'unfrozen_account': '确定解冻该账户',
                'check_success': '确定审核通过?',
                'delete_express_router': '确定删除该线路吗?',
                'delete_express_branch': '确定删除该网点吗?',
                'delete_department': '确定删除该部门吗',
                'delete_role': '确定删除该角色吗',
                'delete_admin': '确定删除该用户吗',
                'delete_vehicle': '确定删除该PDA吗',
                'delete_img_slider': '确定删除该轮播图吗',
                'delete_area': '确定删除该区域吗',
                'delete_collect_user': '确定删除该人员吗',
                'delete_post': '确认删除该新闻吗?',
                'reject_waybill_return': '确认拒绝该退货单吗?',
                'logout': '确定退出登录吗?'
            },

            TRADE_SUBJECT_LIST: {
                1: '运费',
                2: '代收货款',
                101: '运费佣金',
                102: '代收款佣金'
            },

            PACKAGE_TYPE: {
                0: '木',
                1: '纸',
                2: '编织袋',
                3: '信封'
            },

            LOG_TARGET_TYPE: {
                1: '运单',
                2: '商户',
                3: '物流公司',
                4: '银行交易'
            },

            LOG_TYPE: {
                1: '商户不存在',
                2: '物流公司不存在',
                3: '银行卡号错误',
                4: '银行交易失败'
            },

            REQUEST_SOURCE_TYPE: {
                1: '银行卡签约',
                2: '交易',
                3: '交易查询'
            }
        }
    }

})();
(function () {
    angular
        .module('app.core')
        .filter('stringTruncate', stringTruncate)
        .filter('digitLength', ['Core', DigitLength])
        .filter('timeFormat', ['Core', timeFormat])
        .filter('currencyFormat', CurrencyFormat)
        .filter('chargePayType', ['Core', chargePayType])
        .filter('transportStatus', ['Core', TransportStatus])
        .filter('getImgUrl', ['Core', getImgUrl])
        .filter('stopReceivingStatus', StopReceivingStatus)
        .filter('waybillStatus', ['Core', WaybillStatus])
        .filter('waybillReturnStatus', ['Core', WaybillReturnStatus])
        .filter('bankPayType', ['Core', BankPayType])
        .filter('bankPaySubject', ['Core', BankPaySubject])
        .filter('bankPayStatus', ['Core', BankPayStatus])
        .filter('tradeStatus', ['Core', BankPayStatus])
        .filter('companyType', ['Core', CompanyType])
        .filter('confirmContent', ['Core', confirmContent])
        .filter('editWaybillContent', ['Core', EditWaybillContent])
        .filter('sourceType', ['Core', SourceType])
        .filter('merchantStatus', ['Core', merchantStatus])
        .filter('expressCompanyStatus', ['Core', expressCompanyStatus])
        .filter('getAge', ['Core', getAge])
        .filter('tradeCompanyType', ['Core', tradeCompanyType])
        .filter('waybillReturnStatus', ['Core', waybillReturnStatus])
        .filter('requestSourceType', requestSourceType)
        .filter('tradeSubject', ['Core', tradeSubject])
        .filter('deliverType', ['Core', deliverType])
        .filter('packageType', ['Core', packageType])
        .filter('logTargetType', ['Core', logTargetType])
        .filter('logType', ['Core', logType])
        .filter('requestSourceType', ['Core', requestSourceType])
        .filter('requestResponseDataInfo', ['Core', RequestResponseDataInfo])
    ;

    function date(Core) {
        return function (timeStamp, format) {
            format = format ? format : 'Y-m-d H:i:s';
            return Core.Util.date(format, timeStamp);
        };
    }

    function timeFormat(Core) {
        return function (timeStamp, format) {
            if (!parseInt(timeStamp)) return "";
            format = format ? format : 'Y-m-d H:i:s';
            return Core.Util.date(format, timeStamp);
        };
    }

    function stringTruncate() {
        return function (input, chars, breakOnWord) {
            if (isNaN(chars)) return input;
            if (chars <= 0) return '';
            if (input && input.length > chars) {
                input = input.substring(0, chars);

                if (!breakOnWord) {
                    var lastspace = input.lastIndexOf(' ');
                    //get last space
                    if (lastspace !== -1) {
                        input = input.substr(0, lastspace);
                    }
                } else {
                    while (input.charAt(input.length - 1) === ' ') {
                        input = input.substr(0, input.length - 1);
                    }
                }
                return input + '…';
            }
            return input;
        };
    }

    function DigitLength(Core) {
        return function (data, length) {
            return Core.Util.sprintf('%0' + length + 'd', data);
        }
    }

    function CurrencyFormat() {
        return function (data) {
            return (parseInt(data) / 100);
        }
    }

    function chargePayType(Core) {
        return function (type) {
            return Core.Const.CHARGE_PAY_TYPE[type];
        }
    }

    function TransportStatus(Core) {
        return function (data) {
            return Core.Const.TRANSPORT[parseInt(data)];
        }
    }

    function getImgUrl(Core) {
        return function (img) {
            return Core.Const.NET.IMG_URL_PREFIX + img;
        }
    }

    function StopReceivingStatus() {
        return function (data) {
            return data ? '是' : '否';
        }
    }

    function WaybillStatus(Core) {
        return function (data) {
            return Core.Const.WAYBILL_STATUS_NAME[parseInt(data)];
        }
    }

    function WaybillReturnStatus(Core) {
        return function (data) {
            return Core.Const.WAYBILL_RETURN_STATUS_NAME[parseInt(data)];
        }
    }

    function BankPayType(Core) {
        return function (data) {
            return Core.Const.BANK_PAY_TYPE_NAME[parseInt(data)];
        }
    }

    function BankPayStatus(Core) {
        return function (data) {
            return Core.Const.BANK_PAY_STATUS_NAME[parseInt(data)];
        }
    }

    function BankPaySubject(Core) {
        return function (data) {
            return Core.Const.BANK_PAY_SUBJECT[parseInt(data)];
        }
    }

    function CompanyType(Core) {
        return function (data) {
            return Core.Const.COMPANY_TYPE[parseInt(data)];
        }
    }
    
    function EditWaybillContent(Core) {
        return function (data) {
            return Core.Const.EDIT_WAYBILL_CONTENT[data];
        }
    }

    function SourceType(Core) {
        return function (data) {
            return Core.Const.SOURCE_TYPE[parseInt(data)];
        }
    }

    function confirmContent(Core) {
        return function (type) {
            return Core.Const.CONFIG_TYPE[type];
        }
    }

    function expressCompanyStatus(Core) {
        return function (status) {
            var text = '';
            switch (status) {
                case Core.Const.EXPRESS_COMPANY_STATUS.STATUS_NONE_AUTH:
                    text = "未认证";
                    break;
                case Core.Const.EXPRESS_COMPANY_STATUS.STATUS_AUTH:
                    text = "已认证";
                    break;
                case Core.Const.EXPRESS_COMPANY_STATUS.STATUS_FROZEN:
                    text = "已冻结";
                    break;
                default:
                    text = "未知状态";
                    break;
            }
            return text;
        }
    }

    function tradeStatus(Core) {
        return function (status) {
            var text = "";
            switch (status) {
                case 0:
                    text = "交易中";
                    break;
                case 1:
                    text = "交易成功";
                    break;
                case -1:
                    text = "交易失败";
                    break;
                default:
                    break;
            }
            return text;
        }
    }

    function getAge(Core) {
        return function (birthday) {
            var nowYear = Core.Util.date('Y', Core.Util.time());
            var birthdayYear = Core.Util.date('Y', birthday);
            return parseInt(nowYear - birthdayYear, 10);
        }
    }

    function merchantStatus(Core) {
        return function (status) {
            return Core.Const.MERCHANT_STATUS[status];
        }
    }

    function tradeCompanyType(Core) {
        return function (type) {
            return Core.Const.TRADE_COMPANY_TYPE[type];
        }
    }

    function tradeSubject(Core) {
        return function (subject) {
            return Core.Const.TRADE_SUBJECT_LIST[subject];
        }
    }

    function waybillReturnStatus(Core) {
        return function (status) {
            return Core.Const.WAYBILL_RETURN_STATUS[status];
        }
    }

    function deliverType(Core) {
        return function (type) {
            return Core.Const.DELIVER_TYPE[type];
        }
    }

    function packageType(Core) {
        return function (type) {
            switch (type) {
                case 0:
                case 1:
                case 2:
                case 3:
                    return Core.Const.PACKAGE_TYPE[type];
                default :
                    return '无'
            }
        }
    }

    function logTargetType(Core) {
        return function (type) {
            return Core.Const.LOG_TARGET_TYPE[type];
        }
    }

    function logType(Core) {
        return function (type) {
            return Core.Const.LOG_TYPE[type];
        }
    }

    function requestSourceType(Core) {
        return function (type) {
            return Core.Const.REQUEST_SOURCE_TYPE[type];
        }
    }

    function RequestResponseDataInfo(Core) {
        return function (data) {
            var responseData = JSON.parse(data);
            var info = "";
            if (responseData)
            {
                if (responseData.hasOwnProperty('result') && responseData.hasOwnProperty('iretcode') && responseData.hasOwnProperty('iretmsg'))
                {
                    info = responseData.result + " / " + responseData.iretcode + " / " + responseData.iretmsg ;
                }
            }

            return info;
        }
    }


})();
(function () {
    angular.module('app', [
        'ui.router',                    // Routing
        'oc.lazyLoad',                  // ocLazyLoad
        'ui.bootstrap',                 // Ui Bootstrap
        'ngIdle',                       // Idle timer
        'ngSanitize',                    // ngSanitize
        'app.core',
        'templates'
    ])
})();
(function () {
    angular
        .module('app')
        .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', 'IdleProvider', 'KeepaliveProvider', function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, IdleProvider, KeepaliveProvider) {
            IdleProvider.idle(5); // in seconds
            IdleProvider.timeout(120); // in seconds

            $urlRouterProvider.otherwise('/admin/home');

            $ocLazyLoadProvider.config({
                // Set to true if you want to see what and when is dynamically loaded
                debug: false,
                events: true,
                modules: [
                    {
                        name: 'print',
                        serie: true,
                        files: ['print/js/bundle.min.js', 'print/css/style.min.css']
                    },
                ]
            });

            function libFilePath(file) {
                return 'asset/inspinia/' + file;
            }

            var adminLayout = 'admin/layout/main.html';

            $stateProvider
                .state('login', {
                    url: '/login',
                    controller: 'LoginController',
                    templateUrl: 'admin/login/login.html',
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    files: [libFilePath('css/plugins/iCheck/custom.css'), libFilePath('js/plugins/iCheck/icheck.min.js')]
                                }
                            ]);
                        }
                    }
                })

                .state('admin', {
                    abstract: true,
                    url: '/admin',
                    templateUrl: adminLayout,
                    controller: function ($scope) {
                        $scope.navTitle = '系统首页';
                        $scope.isMain = true;
                    }
                })
                .state('admin.home', {
                    url: '/home',
                    controller: 'admin.HomeController',
                    templateUrl: 'admin/main/main.html',
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    files: [libFilePath('js/plugins/peity/jquery.peity.min.js'), libFilePath('js/plugins/peity/angular-peity.js')]
                                },
                                {
                                    files: [libFilePath('css/plugins/iCheck/custom.css'), libFilePath('js/plugins/iCheck/icheck.min.js')]
                                }
                            ]);
                        }
                    }
                })

                //班次管理
                .state('transport', {
                    abstract: true,
                    url: '/transport',
                    templateUrl: adminLayout,
                    controller: function ($scope) {
                        $scope.navTitle = '班次';
                        $scope.nav = 'transport';
                        $scope.isMain = false;
                    }
                })
                .state('transport.list', {
                    url: '/list',
                    controller: 'TransportController',
                    templateUrl: 'admin/transport/transport-list.html',
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    serie: true,
                                    files: [libFilePath('js/plugins/dataTables/datatables.min.js'), libFilePath('css/plugins/dataTables/datatables.min.css')]
                                },
                                {
                                    serie: true,
                                    name: 'datatables',
                                    files: [libFilePath('js/plugins/dataTables/angular-datatables.min.js')]
                                },
                                {
                                    serie: true,
                                    name: 'datatables.buttons',
                                    files: [libFilePath('js/plugins/dataTables/angular-datatables.buttons.min.js')]
                                },
                                {
                                    name: 'ui.select',
                                    files: [libFilePath('js/plugins/ui-select/select.min.js'), libFilePath('css/plugins/ui-select/select.min.css')]
                                },
                                {
                                    insertBefore: '#loadBefore',
                                    name: 'localytics.directives',
                                    files: [libFilePath('css/plugins/chosen/chosen.css'), libFilePath('js/plugins/chosen/chosen.jquery.js'), libFilePath('js/plugins/chosen/chosen.js')]
                                },
                                {
                                    files: [libFilePath('css/plugins/clockpicker/clockpicker.css'), libFilePath('js/plugins/clockpicker/clockpicker.js')]
                                },
                                {
                                    files: [libFilePath('css/plugins/touchspin/jquery.bootstrap-touchspin.min.css'), libFilePath('js/plugins/touchspin/jquery.bootstrap-touchspin.min.js')]
                                },
                                {
                                    files: [libFilePath('js/plugins/sweetalert/sweetalert.min.js'), libFilePath('css/plugins/sweetalert/sweetalert.css')]
                                },
                                {
                                    name: 'oitozero.ngSweetAlert',
                                    files: [libFilePath('js/plugins/sweetalert/angular-sweetalert.min.js')]
                                }
                            ]);
                        }
                    }
                })

                //司机管理
                .state('driver', {
                    abstract: true,
                    url: '/driver',
                    templateUrl: adminLayout,
                    controller: function ($scope) {
                        $scope.navTitle = '司机';
                        $scope.nav = 'driver';
                        $scope.isMain = false;
                    }
                })
                .state('driver.list', {
                    url: '/list',
                    controller: 'DriverController',
                    templateUrl: 'admin/driver/driver-list.html',
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    serie: true,
                                    files: [libFilePath('js/plugins/dataTables/datatables.min.js'), libFilePath('css/plugins/dataTables/datatables.min.css')]
                                },
                                {
                                    serie: true,
                                    name: 'datatables',
                                    files: [libFilePath('js/plugins/dataTables/angular-datatables.min.js')]
                                },
                                {
                                    serie: true,
                                    name: 'datatables.buttons',
                                    files: [libFilePath('js/plugins/dataTables/angular-datatables.buttons.min.js')]
                                },
                                {
                                    name: 'ui.select',
                                    files: [libFilePath('js/plugins/ui-select/select.min.js'), libFilePath('css/plugins/ui-select/select.min.css')]
                                },
                                {
                                    insertBefore: '#loadBefore',
                                    name: 'localytics.directives',
                                    files: [libFilePath('css/plugins/chosen/chosen.css'), libFilePath('js/plugins/chosen/chosen.jquery.js'), libFilePath('js/plugins/chosen/chosen.js')]
                                },
                                {
                                    name: 'nouislider',
                                    files: [libFilePath('css/plugins/nouslider/jquery.nouislider.css'), libFilePath('js/plugins/nouslider/jquery.nouislider.min.js'), libFilePath('js/plugins/nouslider/angular-nouislider.js')]
                                },
                                {
                                    files: [libFilePath('css/plugins/ionRangeSlider/ion.rangeSlider.css'), libFilePath('css/plugins/ionRangeSlider/ion.rangeSlider.skinFlat.css'), libFilePath('js/plugins/ionRangeSlider/ion.rangeSlider.min.js')]
                                },
                                {
                                    files: [libFilePath('css/plugins/clockpicker/clockpicker.css'), libFilePath('js/plugins/clockpicker/clockpicker.js')]
                                },
                                {
                                    files: [libFilePath('css/plugins/touchspin/jquery.bootstrap-touchspin.min.css'), libFilePath('js/plugins/touchspin/jquery.bootstrap-touchspin.min.js')]
                                },
                                {
                                    files: [libFilePath('js/plugins/sweetalert/sweetalert.min.js'), libFilePath('css/plugins/sweetalert/sweetalert.css')]
                                },
                                {
                                    name: 'oitozero.ngSweetAlert',
                                    files: [libFilePath('js/plugins/sweetalert/angular-sweetalert.min.js')]
                                }
                            ]);
                        }
                    }
                })
                .state('driver.schedule', {
                    url: '/:driverId/schedule',
                    controller: 'DriverScheduleController',
                    templateUrl: 'admin/driver/driver-schedule.html',
                })
                .state('driver.waybill', {
                    url: '/:scheduleId/waybill',
                    controller: 'DriverWaybillController',
                    templateUrl: 'admin/driver/driver-waybill.html',
                })





                //订单管理
                .state('waybill', {
                    abstract: true,
                    url: '/waybill',
                    templateUrl: adminLayout,
                    controller: function ($scope) {
                        $scope.navTitle = '订单';
                        $scope.nav = 'waybill';
                        $scope.isMain = false;
                    },
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    name: 'datePicker',
                                    serie: true,
                                    files: [
                                        libFilePath('js/plugins/moment/moment.min.js'),
                                        libFilePath('css/plugins/datapicker/angular-datapicker.css'),
                                        libFilePath('js/plugins/datapicker/angular-datepicker.js'),
                                        libFilePath('js/plugins/daterangepicker/angular-daterangepicker.js')
                                    ]
                                },
                                {
                                    name: 'ui.select',
                                    files: [libFilePath('js/plugins/ui-select/select.min.js'), libFilePath('css/plugins/ui-select/select.min.css')]
                                },
                                {
                                    serie: true,
                                    files: [libFilePath('js/plugins/dataTables/datatables.min.js'), libFilePath('css/plugins/dataTables/datatables.min.css')]
                                },
                                {
                                    serie: true,
                                    name: 'datatables',
                                    files: [libFilePath('js/plugins/dataTables/angular-datatables.min.js')]
                                },
                                {
                                    serie: true,
                                    name: 'datatables.buttons',
                                    files: [libFilePath('js/plugins/dataTables/angular-datatables.buttons.min.js')]
                                },
                                {
                                    name: 'jquery.format',
                                    files: [libFilePath('js/plugins/jquery.format/jquery.format.js')]
                                }
                            ]);
                        }
                    }
                })
                .state('waybill.list', {
                    url: '/list',
                    controller: 'WaybillListController',
                    templateUrl: 'admin/waybill/waybill-list.html'
                })
                .state('waybill.returnList', {
                    url: '/return-list',
                    controller: 'WaybillReturnListController',
                    templateUrl: 'admin/waybill/waybill-return-list.html'
                })
                .state('waybill.detail', {
                    url: '/detail/:waybillId',
                    params: { 
                        page: null
                    },
                    controller: 'WaybillDetailController',
                    templateUrl: 'admin/waybill/waybill-detail.html'
                })

                //商户管理
                .state('merchant', {
                    abstract: true,
                    url: '/merchant',
                    templateUrl: adminLayout,
                    controller: function ($scope) {
                        $scope.navTitle = '商户';
                        $scope.nav = 'merchant';
                        $scope.isMain = false;
                    },
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    name: 'datePicker',
                                    serie: true,
                                    files: [
                                        libFilePath('js/plugins/moment/moment.min.js'),
                                        libFilePath('css/plugins/datapicker/angular-datapicker.css'),
                                        libFilePath('js/plugins/datapicker/angular-datepicker.js'),
                                        libFilePath('js/plugins/daterangepicker/angular-daterangepicker.js')
                                    ]
                                },
                                {
                                    serie: true,
                                    files: [libFilePath('js/plugins/dataTables/datatables.min.js'), libFilePath('css/plugins/dataTables/datatables.min.css')]
                                },
                                {
                                    serie: true,
                                    name: 'datatables',
                                    files: [libFilePath('js/plugins/dataTables/angular-datatables.min.js')]
                                },
                                {
                                    serie: true,
                                    name: 'datatables.buttons',
                                    files: [libFilePath('js/plugins/dataTables/angular-datatables.buttons.min.js')]
                                },
                                {
                                    name: 'ui.select',
                                    files: [libFilePath('js/plugins/ui-select/select.min.js'), libFilePath('css/plugins/ui-select/select.min.css')]
                                },
                                {
                                    insertBefore: '#loadBefore',
                                    name: 'localytics.directives',
                                    files: [libFilePath('css/plugins/chosen/chosen.css'), libFilePath('js/plugins/chosen/chosen.jquery.js'), libFilePath('js/plugins/chosen/chosen.js')]
                                },
                                {
                                    files: [libFilePath('css/plugins/clockpicker/clockpicker.css'), libFilePath('js/plugins/clockpicker/clockpicker.js')]
                                },
                                {
                                    files: [libFilePath('css/plugins/touchspin/jquery.bootstrap-touchspin.min.css'), libFilePath('js/plugins/touchspin/jquery.bootstrap-touchspin.min.js')]
                                }
                            ]);
                        }
                    }
                })
                .state('merchant.list', {
                    url: '/list',
                    controller: 'MerchantController',
                    templateUrl: 'admin/merchant/merchant-list.html',
                })
                .state('merchant.detail', {
                    url: '/detail/:merchantId',
                    controller: 'MerchantDetailController',
                    templateUrl: 'admin/merchant/merchant-detail.html',
                })
                .state('merchant.waybill', {
                    url: '/:merchantId/waybill',
                    controller: 'MerchantWaybillController',
                    templateUrl: 'admin/merchant/merchant-waybill.html',
                })

                //物流管理
                .state('express', {
                    abstract: true,
                    url: '/express',
                    templateUrl: adminLayout,
                    controller: function ($scope) {
                        $scope.navTitle = '物流';
                        $scope.nav = 'express';
                        $scope.isMain = false;
                    },
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    name: 'datePicker',
                                    serie: true,
                                    files: [
                                        libFilePath('js/plugins/moment/moment.min.js'),
                                        libFilePath('css/plugins/datapicker/angular-datapicker.css'),
                                        libFilePath('js/plugins/datapicker/angular-datepicker.js'),
                                        libFilePath('js/plugins/daterangepicker/angular-daterangepicker.js')
                                    ]
                                },
                                {
                                    name: 'timepicker',
                                    files: [
                                        libFilePath('js/plugins/jquery-timepicker/jquery.timepicker.css'),
                                        libFilePath('js/plugins/jquery-timepicker/jquery.timepicker.min.js'),
                                        libFilePath('js/plugins/angular-jquery-timepicker/src/timepickerdirective.js'),
                                    ]
                                },
                                {
                                    name: 'ui.select',
                                    files: [libFilePath('js/plugins/ui-select/select.min.js'), libFilePath('css/plugins/ui-select/select.min.css')]
                                },
                                {
                                    insertBefore: '#loadBefore',
                                    name: 'localytics.directives',
                                    files: [libFilePath('css/plugins/chosen/chosen.css'), libFilePath('js/plugins/chosen/chosen.jquery.js'), libFilePath('js/plugins/chosen/chosen.js')]
                                },
                                {
                                    name: 'ui.sortable',
                                    files: [
                                        libFilePath('js/plugins/ui-sortable/sortable.js')
                                    ]
                                },
                                {
                                    name: 'angular-city-select',
                                    files: [
                                        libFilePath('js/plugins/angular-city-select/dist/angular-city-select.css'), libFilePath('js/plugins/angular-city-select/dist/angular-city-select.js')
                                    ]
                                }
                            ]);
                        }
                    }
                })
                .state('express.company', {
                    url: '/company',
                    controller: 'ExpressCompanyController',
                    templateUrl: 'admin/express/express-company.html',
                })
                .state('express.companyDetail', {
                    url: '/company-detail/:companyId',
                    controller: 'ExpressCompanyDetailController',
                    templateUrl: 'admin/express/express-company-detail.html'
                })
                .state('express.route', {
                    url: '/route',
                    controller: 'ExpressRouterController',
                    templateUrl: 'admin/express/express-router.html'
                })
                .state('express.branch', {
                    url: '/branch',
                    controller: 'ExpressBranchController',
                    templateUrl: 'admin/express/express-branch.html'
                })

                //财务管理
                .state('finance', {
                    abstract: true,
                    url: '/finance',
                    templateUrl: adminLayout,
                    controller: function ($scope) {
                        $scope.navTitle = '财务';
                        $scope.nav = 'finance';
                        $scope.isMain = false;
                    },
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    name: 'datePicker',
                                    serie: true,
                                    files: [
                                        libFilePath('js/plugins/moment/moment.min.js'),
                                        libFilePath('css/plugins/datapicker/angular-datapicker.css'),
                                        libFilePath('js/plugins/datapicker/angular-datepicker.js'),
                                        libFilePath('js/plugins/daterangepicker/angular-daterangepicker.js')
                                    ]
                                },
                                {
                                    name: 'ui.select',
                                    files: [libFilePath('js/plugins/ui-select/select.min.js'), libFilePath('css/plugins/ui-select/select.min.css')]
                                },
                                {
                                    name: 'jquery.format',
                                    files: [libFilePath('js/plugins/jquery.format/jquery.format.js')]
                                }

                            ]);
                        }
                    }
                })
                .state('finance.playMoneyDetail', {
                    url: '/play-money-detail/:playMoneyId',
                    controller: 'FinancePlayMoneyDetailController',
                    templateUrl: 'admin/finance/finance-play-money-detail.html',
                })
                .state('finance.tradeIn', {
                    url: '/trade-in-list',
                    controller: 'FinanceTradeInController',
                    templateUrl: 'admin/finance/finance-trade-in.html',
                })
                .state('finance.tradeLogList', {
                    url: '/trade-log-list/:tradeId',
                    controller: 'TradeLogListController',
                    templateUrl: 'admin/finance/trade-Log-list.html',
                })
                .state('finance.tradeRequestList', {
                    url: '/trade-request-list/:tradeId',
                    controller: 'TradeRequestListController',
                    templateUrl: 'admin/finance/trade-request-list.html',
                })
                .state('finance.bankPayList', {
                    url: '/bank-pay-list/:tradeId',
                    controller: 'FinanceBankPayListController',
                    templateUrl: 'admin/finance/finance-bank-pay-list.html',
                })
                .state('finance.tradeOut', {
                    url: '/trade-out-list',
                    controller: 'FinanceTradeOutController',
                    templateUrl: 'admin/finance/finance-trade-out.html',
                })
                .state('finance.check', {
                    url: '/check',
                    controller: 'FinanceCheckController',
                    templateUrl: 'admin/finance/finance-check.html',
                })
                .state('finance.detail', {
                    url: '/detail/:financeId',
                    controller: 'FinanceDetailController',
                    templateUrl: 'admin/finance/finance-detail.html',
                })







                //清算管理
                .state('clearing', {
                    abstract: true,
                    url: '/clearing',
                    templateUrl: adminLayout,
                    controller: function ($scope) {
                        $scope.navTitle = '清算';
                        $scope.nav = 'clearing';
                        $scope.isMain = false;
                    },
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    name: 'datePicker',
                                    serie: true,
                                    files: [
                                        libFilePath('js/plugins/moment/moment.min.js'),
                                        libFilePath('css/plugins/datapicker/angular-datapicker.css'),
                                        libFilePath('js/plugins/datapicker/angular-datepicker.js'),
                                        libFilePath('js/plugins/daterangepicker/angular-daterangepicker.js')
                                    ]
                                },
                                {
                                    name: 'ui.select',
                                    files: [libFilePath('js/plugins/ui-select/select.min.js'), libFilePath('css/plugins/ui-select/select.min.css')]
                                },
                                {
                                    name: 'jquery.format',
                                    files: [libFilePath('js/plugins/jquery.format/jquery.format.js')]
                                }
                            ]);
                        }
                    }
                })

                .state('clearing.bankPayList', {
                    url: '/bank-pay-list',
                    controller: 'ClearingBankPayListController',
                    templateUrl: 'admin/clearing/bank-pay-list.html'
                })
                .state('clearing.logList', {
                    url: '/log-list',
                    controller: 'ClearingLogListController',
                    templateUrl: 'admin/clearing/log-list.html'
                })
                .state('clearing.requestList', {
                    url: '/request-list',
                    controller: 'ClearingRequestListController',
                    templateUrl: 'admin/clearing/request-list.html'
                })












                //新闻管理

                .state('post', {
                    abstract: true,
                    url: '/post',
                    templateUrl: adminLayout,
                    controller: function ($scope) {
                        $scope.navTitle = '公告';
                        $scope.nav = 'post';
                        $scope.isMain = false;
                    }
                })
                .state('post.detail', {
                    url: '/detail/:postId',
                    controller: 'PostDetailController',
                    templateUrl: 'admin/post/post-detail.html'
                })


                //系统管理
                .state('system', {
                    abstract: true,
                    url: '/system',
                    templateUrl: adminLayout,
                    controller: function ($scope) {
                        $scope.navTitle = '系统';
                        $scope.nav = 'system';
                        $scope.isMain = false;
                    },
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    name: 'datePicker',
                                    serie: true,
                                    files: [
                                        libFilePath('js/plugins/moment/moment.min.js'),
                                        libFilePath('css/plugins/datapicker/angular-datapicker.css'),
                                        libFilePath('js/plugins/datapicker/angular-datepicker.js'),
                                        libFilePath('js/plugins/daterangepicker/angular-daterangepicker.js')
                                    ]
                                },
                                {
                                    name: 'ui.select',
                                    files: [libFilePath('js/plugins/ui-select/select.min.js'), libFilePath('css/plugins/ui-select/select.min.css')]
                                },
                                {
                                    serie: true,
                                    files: [libFilePath('js/plugins/dataTables/datatables.min.js'), libFilePath('css/plugins/dataTables/datatables.min.css')]
                                },
                                {
                                    serie: true,
                                    name: 'datatables',
                                    files: [libFilePath('js/plugins/dataTables/angular-datatables.min.js')]
                                },
                                {
                                    serie: true,
                                    name: 'datatables.buttons',
                                    files: [libFilePath('js/plugins/dataTables/angular-datatables.buttons.min.js')]
                                },
                                {
                                    name: 'fileUpload',
                                    files: [libFilePath('js/plugins/ng-file-upload/dist/ng-file-upload-all.min.js')]
                                }

                            ]);
                        }
                    }
                })
                .state('system.department', {
                    url: '/department',
                    controller: 'SystemDepartmentController',
                    templateUrl: 'admin/system/system-department.html'
                })
                .state('system.role', {
                    url: '/role',
                    controller: 'SystemRoleController',
                    templateUrl: 'admin/system/system-role.html'
                })
                .state('system.admin', {
                    url: '/admin',
                    controller: 'SystemAdminController',
                    templateUrl: 'admin/system/system-admin.html'
                })
                .state('system.vehicle', {
                    url: '/vehicle',
                    controller: 'SystemVehicleController',
                    templateUrl: 'admin/system/system-vehicle.html'
                })
                .state('system.slider', {
                    url: '/slider',
                    controller: 'SystemSliderController',
                    templateUrl: 'admin/system/system-slider.html'
                })
                .state('system.sliderDetail', {
                    url: '/slider-detail/:adId',
                    controller: 'SystemSliderDetailController',
                    templateUrl: 'admin/system/system-slider-detail.html'
                })
                .state('system.post', {
                    url: '/post',
                    controller: 'SystemPostController',
                    templateUrl: 'admin/system/system-post.html'
                })
                .state('system.postEdit', {
                    url: '/post-edit/:postId',
                    controller: 'SystemPostEditController',
                    templateUrl: 'admin/system/system-post-edit.html',
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    name: 'summernote',
                                    files: [
                                        libFilePath('js/plugins/summernote/dist/summernote.css'), libFilePath('css/plugins/summernote/summernote-bs3.css'),
                                        libFilePath('js/plugins/summernote/dist/summernote.min.js'), libFilePath('js/plugins/summernote/dist/angular-summernote.js')
                                    ]
                                }

                            ]);
                        }
                    }
                })


                //揽货管理
                .state('collectGoods', {
                    abstract: true,
                    url: '/collect-goods',
                    templateUrl: adminLayout,
                    controller: function ($scope) {
                        $scope.navTitle = '揽货管理';
                        $scope.nav = 'collectGoods';
                        $scope.isMain = false;
                    },
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    name: 'ui.select',
                                    files: [libFilePath('js/plugins/ui-select/select.min.js'), libFilePath('css/plugins/ui-select/select.min.css')]
                                }
                            ]);
                        }
                    }
                })
                .state('collectGoods.list', {
                    url: '/list',
                    controller: 'CollectController',
                    templateUrl: 'admin/collect/collect-list.html',
                })

                //揽件人员管理
                .state('collect', {
                    abstract: true,
                    url: '/collect',
                    templateUrl: adminLayout,
                    controller: function ($scope) {
                        $scope.navTitle = '揽件人员';
                        $scope.nav = 'collect';
                        $scope.isMain = false;
                    },
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    name: 'datePicker',
                                    serie: true,
                                    files: [
                                        libFilePath('js/plugins/moment/moment.min.js'),
                                        libFilePath('css/plugins/datapicker/angular-datapicker.css'),
                                        libFilePath('js/plugins/datapicker/angular-datepicker.js'),
                                        libFilePath('js/plugins/daterangepicker/angular-daterangepicker.js')
                                    ]
                                },
                                {
                                    name: 'ui.select',
                                    files: [libFilePath('js/plugins/ui-select/select.min.js'), libFilePath('css/plugins/ui-select/select.min.css')]
                                },
                            ]);
                        }
                    }
                })
                .state('collect.area', {
                    url: '/area',
                    controller: 'CollectAreaController',
                    templateUrl: 'admin/collect/collect-area.html'
                })
                .state('collect.areaDetail', {
                    url: '/area-detail/:areaId',
                    controller: 'CollectAreaDetailController',
                    templateUrl: 'admin/collect/collect-area-detail.html'
                })
                .state('collect.user', {
                    url: '/user',
                    controller: 'CollectUserController',
                    templateUrl: 'admin/collect/collect-user.html'
                })
                .state('collect.userDetail', {
                    url: '/user-detail/:userId',
                    controller: 'CollectUserDetailController',
                    templateUrl: 'admin/collect/collect-user-detail.html'
                })

                //保单管理
                .state('insurance', {
                    abstract: true,
                    url: '/insurance',
                    templateUrl: adminLayout,
                    controller: function ($scope) {
                        $scope.navTitle = '保单';
                        $scope.nav = 'insurance';
                        $scope.isMain = false;
                    },
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    name: 'datePicker',
                                    serie: true,
                                    files: [
                                        libFilePath('js/plugins/moment/moment.min.js'),
                                        libFilePath('css/plugins/datapicker/angular-datapicker.css'),
                                        libFilePath('js/plugins/datapicker/angular-datepicker.js'),
                                        libFilePath('js/plugins/daterangepicker/angular-daterangepicker.js')
                                    ]
                                },
                                {
                                    name: 'ui.select',
                                    files: [libFilePath('js/plugins/ui-select/select.min.js'), libFilePath('css/plugins/ui-select/select.min.css')]
                                }
                            ]);
                        }
                    }
                })
                .state('insurance.waybillList', {
                    url: '/waybill-list',
                    controller: 'InsuranceWaybillListController',
                    templateUrl: 'admin/insurance/insurance-waybill-list.html'
                })

                .state('stat', {
                    abstract: true,
                    url: '/stat',
                    templateUrl: adminLayout,
                    controller: function ($scope) {
                        $scope.navTitle = '统计';
                        $scope.nav = 'stat';
                        $scope.isMain = false;
                    },
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    name: 'datePicker',
                                    serie: true,
                                    files: [
                                        libFilePath('js/plugins/moment/moment.min.js'),
                                        libFilePath('css/plugins/datapicker/angular-datapicker.css'),
                                        libFilePath('js/plugins/datapicker/angular-datepicker.js'),
                                        libFilePath('js/plugins/daterangepicker/angular-daterangepicker.js')
                                    ]
                                },
                                {
                                    serie: true,
                                    files: [libFilePath('js/plugins/c3/c3.css'), libFilePath('js/plugins/c3/d3.v3.min.js'), libFilePath('js/plugins/c3/c3.js')]
                                },
                                {
                                    name: 'ui.select',
                                    files: [libFilePath('js/plugins/ui-select/select.min.js'), libFilePath('css/plugins/ui-select/select.min.css')]
                                }
                            ]);
                        }
                    }
                })
                .state('stat.market', {
                    url: '/market',
                    controller: 'StatMarketController',
                    templateUrl: 'admin/stat/stat-market.html'
                })

                //报表管理
                .state('report', {
                    abstract: true,
                    url: '/report',
                    templateUrl: adminLayout,
                    controller: function ($scope) {
                        $scope.navTitle = '报表';
                        $scope.nav = 'report';
                        $scope.isMain = false;
                    },
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    name: 'datePicker',
                                    serie: true,
                                    files: [
                                        libFilePath('js/plugins/moment/moment.min.js'),
                                        libFilePath('css/plugins/datapicker/angular-datapicker.css'),
                                        libFilePath('js/plugins/datapicker/angular-datepicker.js'),
                                        libFilePath('js/plugins/daterangepicker/angular-daterangepicker.js')
                                    ]
                                },
                                {
                                    serie: true,
                                    files: [libFilePath('js/plugins/c3/c3.css'), libFilePath('js/plugins/c3/d3.v3.min.js'), libFilePath('js/plugins/c3/c3.js')]
                                },
                                {
                                    name: 'ui.select',
                                    files: [libFilePath('js/plugins/ui-select/select.min.js'), libFilePath('css/plugins/ui-select/select.min.css')]
                                }
                            ]);
                        }
                    }
                })
                .state('report.market', {
                    url: '/market',
                    controller: 'ReportMarketController',
                    templateUrl: 'admin/report/report-market.html'
                })
                .state('report.express', {
                    url: '/express',
                    controller: 'ReportExpressController',
                    templateUrl: 'admin/report/report-express.html'
                })
                .state('report.merchant', {
                    url: '/merchant',
                    controller: 'ReportMerchantController',
                    templateUrl: 'admin/report/report-merchant.html'
                })
                .state('report.collect', {
                    url: '/collect',
                    controller: 'ReportCollectController',
                    templateUrl: 'admin/report/report-collect.html'
                })

                //装车清单
                .state('goods', {
                    abstract: true,
                    url: '/goods',
                    templateUrl: adminLayout,
                    controller: function ($scope) {
                        $scope.navTitle = '装车清单';
                        $scope.nav = 'goods';
                        $scope.isMain = false;
                    },
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    name: 'datePicker',
                                    serie: true,
                                    files: [
                                        libFilePath('js/plugins/moment/moment.min.js'),
                                        libFilePath('css/plugins/datapicker/angular-datapicker.css'),
                                        libFilePath('js/plugins/datapicker/angular-datepicker.js'),
                                        libFilePath('js/plugins/daterangepicker/angular-daterangepicker.js')
                                    ]
                                },
                                {
                                    name: 'ui.select',
                                    files: [libFilePath('js/plugins/ui-select/select.min.js'), libFilePath('css/plugins/ui-select/select.min.css')]
                                }
                            ]);
                        }
                    }
                })
                .state('goods.list', {
                    url: '/list',
                    controller: 'GoodsListController',
                    templateUrl: 'admin/goods/goods-list.html'
                })
                .state('goods.waybillShippingList', {
                    url: '/waybill-shipping-list/:transportId',
                    controller: 'WaybillShippingListController',
                    templateUrl: 'admin/goods/waybill-shipping-list.html'
                })
                .state('goods.waybillShippingPrint', {
                    url: '/waybill-shipping-print/:transportId',
                    controller: 'WaybillShippingPrintController',
                    templateUrl: 'admin/goods/waybill-shipping-print.html'
                })


                .state('print', {
                    url: '/print',
                    template: '<div ui-view class="fade-in-right-big smooth"></div>',
                })
                .state('print.waybillShippingPrint', {
                    url: '/waybill-shipping-print/:transportId',
                    controller: 'WaybillShippingPrintController',
                    templateUrl: 'admin/goods/waybill-shipping-print.html'
                })
        }])

        .run(['$rootScope', '$state', 'Core', function ($rootScope, $state, Core) {
            $rootScope.$state = $state;
            console.log('$state: ');
            console.log($state);

            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

                var detail2List = fromState.name == "waybill.detail" && toState.name == "waybill.list";
                var list2Detail = fromState.name == "waybill.list" && toState.name == "waybill.detail";
                if (!(detail2List || list2Detail)) {
                    Core.Data.set("admin-waybill-list-search", {});
                }
            });

            $rootScope.hideBrowserTip = true;
            if (Core.isIE()) {
                $rootScope.hideBrowserTip = false;
            }
        }]);
})();
/**
 * Created by dd on 4/4/16.
 */
(function () {
    angular
        .module('app')
        .controller('LayoutController', ['$scope', '$templateCache', '$interval', 'Core', LayoutController]);


    function LayoutController($scope, $templateCache, $interval, Core) {
        var vm = $scope;

        vm.logout = logout;
        vm.reset = reset;

        updateMinute();
        processUserInfo();
        // processAdminAuthList();

        Core.on(Core.Const.EVENT.REFRESH_NAV_AUTH_LIST, function (event, data) {
            Core.$timeout(function () {
                processAdminAuthList();
                processUserInfo();
            }, 200);
        });

        function processUserInfo() {
            var user = Core.Data.getUser();
            vm.username = user ? (user.name ? user.name : user.username) : '管理员';
        }

        // console.log('sss' + Core.$state.current);

        function logout() {
            var uibModal = Core.$uibModal.open({
                templateUrl: 'admin/public-modal/confirm-modal.html',
                controller: 'ConfirmModalController',
                resolve: {
                    type: function () {
                        return 'logout';
                    },
                    id: function () {
                        return 0;
                    }
                }
            });

            uibModal.result.then(function (data) {
                Core.$timeout(function(){
                    Core.Data.clearAuthData();
                    Core.$state.go('login');
                }, 200);
            }, function () {
                Core.Log.d('Modal dismissed at: ' + new Date());
            });
        }

        function reset() {

        }

        function updateMinute() {
            vm.actualTime = Core.Util.time();
        }

        var timer = $interval(function () {
            updateMinute();
        }, 600);


        if (!Core.Data.isGuest()) {
            processAdminAuthList();
        }

        function processAdminAuthList() {
            Core.Api.Admin.getAdminAuthList().then(
                function (responseData) {
                    vm.authList = responseData.auth_list;
                    
                    Core.publish(Core.Const.EVENT.REFRESH_CURRENT_PAGE);
                },
                function (error) {
                    Core.Notify.error('获取权限失败');
                }
            );
        }
    }
})();
/**
 * Created by whis on 5/5/16.
 */
(function () {
    angular
        .module('app')
        .controller('ClearingBankPayListController', ['$scope', '$stateParams', '$templateCache', '$uibModal', 'Core', ClearingBankPayListController]);


    function ClearingBankPayListController($scope, $stateParams, $templateCache, $uibModal, Core) {
        var vm = $scope;
        var isFirst = true;

        //分页初始化设置
        vm.count = 0;
        vm.currentPage = 1;
        vm.pageSize = 20;
        vm.totalPage = 0;

        vm.date = {
            start: "",
            end: ""
        };
        vm.search = {
            waybillSn: "",
            companyName: "",
            subject: ""
        };

        vm.statusList = [
            {text: "全部", number: ""},
            {text: Core.Const.BANK_PAY_STATUS_NAME[0], number: 0},
            {text: Core.Const.BANK_PAY_STATUS_NAME[1], number: 1},
            {text: Core.Const.BANK_PAY_STATUS_NAME[2], number: 2},
            {text: Core.Const.BANK_PAY_STATUS_NAME[3], number: 3},
            {text: Core.Const.BANK_PAY_STATUS_NAME['-1'], number: '-1'},
        ];

        vm.clearStatusList = [
            {text: "全部", number: ""},
            {text: Core.Const.BANK_PAY_CLEAR_STATUS_NAME[0], number: 0},
            {text: Core.Const.BANK_PAY_CLEAR_STATUS_NAME[1], number: 1},
            {text: Core.Const.BANK_PAY_CLEAR_STATUS_NAME['-1'], number: '-1'}
        ];

        vm.subjectList = [
            {text: "全部", number: ""},
            {text: Core.Const.BANK_PAY_SUBJECT[1], number: 1},
            {text: Core.Const.BANK_PAY_SUBJECT[2], number: 2},
            {text: Core.Const.BANK_PAY_SUBJECT[3], number: 3},
            {text: Core.Const.BANK_PAY_SUBJECT[101], number: 101},
            {text: Core.Const.BANK_PAY_SUBJECT[102], number: 102},
            {text: Core.Const.BANK_PAY_SUBJECT[103], number: 103},
        ];

        vm.getBankPayList = getBankPayList;
        vm.pageChanged = getBankPayList;
        vm.goBack = goBack;
        vm.jsonFormat = jsonFormat;
        vm.clearSearchOptions = clearSearchOptions;

        vm.$watch('currentPage', function () {
            if (isFirst) {
                isFirst = false;
                return;
            }
            Core.Data.set('currentPage', '');
        });

        Core.on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (fromState.name == 'waybill.detail' && fromParams.page) {
                Core.Data.set('currentPage', fromParams.page);
            } else {
                Core.Data.set('currentPage', '');
            }

        });

        getBankPayList();

        function clearSearchOptions() {

            vm.date = {
                start: "",
                end: ""
            };
            vm.search = {
                waybillSn: "",
                companyName: "",
                subject: ""
            };
            vm.statusList.selected = "";
            vm.clearStatusList.selected = "";
            vm.subjectList.selected = "";

            getBankPayList();
        }

        function getBankPayList() {
            var start = "", end = "";
            if (vm.date.start) {
                start = vm.date.start.format('YYYY-MM-DD');
            }
            if (vm.date.end) {
                end = vm.date.end.format('YYYY-MM-DD');
            }
            var status = "";
            if (vm.statusList.selected) {
                status = vm.statusList.selected.number;
            }
            var clearStatus = "";
            if (vm.clearStatusList.selected) {
                clearStatus = vm.clearStatusList.selected.number;
            }
            var subject = "";
            if (vm.subjectList.selected) {
                subject = vm.subjectList.selected.number;
            }
            var currentPage = Core.Data.get('currentPage') ? Core.Data.get('currentPage') : vm.currentPage;
            Core.Api.Clearing.getBankPayList(
                currentPage,
                "",
                "",
                "",
                "",
                "",
                subject,
                status,
                clearStatus,
                start,
                end,
                vm.search.waybillSn,
                vm.search.companyName
            ).then(
                function (response) {
                    vm.bankPayList = response.pay_list;
                    vm.count = response.count;
                    vm.totalPage = parseInt(vm.count / vm.pageSize) + (vm.count % vm.pageSize ? 1 : 0);
                    vm.currentPage = currentPage;
                },
                function (reason) {
                    Core.Notify.error(reason.message);
                }
            );
        }

        function goBack() {
            Core.$window.history.back();
        }

        function jsonFormat(data) {
            data = data ? data : null;
            var uibModal = Core.$uibModal.open({
                templateUrl: 'admin/json-format/json-format-modal.html',
                controller: 'JsonFormatController',
                resolve: {
                    data: function () {
                        return data;
                    }
                }
            });

            uibModal.result.then(function (data) {

            }, function () {
                Core.Log.d('Modal dismissed at: ' + new Date());
            });
        }
    }
})();
/**
 * Created by whis on 5/5/16.
 */
(function(){
    angular
        .module('app')
        .controller('ClearingLogListController', ['$scope', '$stateParams', '$templateCache', '$uibModal', 'Core', ClearingLogListController]);


    function ClearingLogListController($scope, $stateParams, $templateCache, $uibModal, Core)
    {
        var vm = $scope;
        var isFirst = true;
        //分页初始化设置
        vm.count = 0;
        vm.currentPage = 1;
        vm.pageSize = 20;
        vm.totalPage = 0;

        vm.tradeId = $stateParams.tradeId;

        vm.getLogList = getLogList;
        vm.pageChanged = getLogList;
        vm.goBack = goBack;
        vm.jsonFormat = jsonFormat;
        vm.clearSearchOptions = clearSearchOptions;

        vm.date = {
            start: '',
            end: ''
        };

        vm.targetTypeList = [
            {number: '', text: '全部'},
            {number: '1', text: "运单"},
            {number: '2', text: "商户"},
            {number: '3', text: "物流公司"},
            {number: '4', text: "银行交易"}
        ];

        vm.$watch('currentPage', function () {
            if(isFirst){
                isFirst = false;
                return;
            }
            Core.Data.set('currentPage', '');
        });

        Core.on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (fromState.name == 'waybill.detail' && fromParams.page) {
                Core.Data.set('currentPage', fromParams.page)
            } else {
                Core.Data.set('currentPage', '')
            }

        });

        getLogList();

        function clearSearchOptions(){
            vm.date = {
                start: "",
                end: ""
            };

            getLogList();
        }

        function getLogList() {
            var targetId = '';
            var targetType = 1;
            // if (vm.targetTypeList.selected != undefined) {
            //     targetType = vm.targetTypeList.selected.number;
            // }

            var startDate = '';
            if (vm.date.start)
            {
                startDate = vm.date.start.format('YYYY-MM-DD');
            }

            var endDate = '';
            if (vm.date.end)
            {
                endDate = vm.date.end.format("YYYY-MM-DD");
            }
            var currentPage = Core.Data.get('currentPage') ? Core.Data.get('currentPage') : vm.currentPage;
            Core.Api.Clearing.getLogList(
                currentPage,
                targetId,
                targetType,
                startDate,
                endDate
            ).then(
                function(response) {
                    vm.logList = response.log_list;

                    vm.count = response.count;
                    vm.totalPage = parseInt(vm.count / vm.pageSize) + (vm.count % vm.pageSize ? 1 : 0);
                    vm.currentPage = currentPage;
                },
                function(reason) {
                    Core.Notify.error(reason.message);
                }
            );
        }

        function goBack()
        {
            Core.$window.history.back();
        }

        function jsonFormat(data)
        {
            data = data ? data : null;
            var uibModal = Core.$uibModal.open({
                templateUrl: 'admin/json-format/json-format-modal.html',
                controller: 'JsonFormatController',
                resolve: {
                    data: function () {
                        return data;
                    }
                }
            });

            uibModal.result.then(function (data) {

            }, function () {
                Core.Log.d('Modal dismissed at: ' + new Date());
            });
        }
    }
})();
/**
 * Created by whis on 5/5/16.
 */
(function () {
    angular
        .module('app')
        .controller('ClearingRequestListController', ['$scope', '$stateParams', '$templateCache', '$uibModal', 'Core', ClearingRequestListController]);


    function ClearingRequestListController($scope, $stateParams, $templateCache, $uibModal, Core) {
        var vm = $scope;
        var isFirst = true;
        //分页初始化设置
        vm.count = 0;
        vm.currentPage = 1;
        vm.pageSize = 20;
        vm.totalPage = 0;

        vm.tradeId = $stateParams.tradeId;

        vm.getRequestList = getRequestList;
        vm.pageChanged = getRequestList;
        vm.goBack = goBack;
        vm.jsonFormat = jsonFormat;
        vm.clear = clear;

        vm.date = {
            start: '',
            end: ''
        };

        vm.requestTypeList = [
            {number: '', text: '全部'},
            {number: '1', text: "银行卡"},
            {number: '2', text: "银行交易"},
            {number: '3', text: "银行请求"}
        ];

        vm.$watch('currentPage', function () {
            if(isFirst){
                isFirst = false;
                return;
            }
            Core.Data.set('currentPage', '');
        });

        Core.on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (fromState.name == 'waybill.detail' && fromParams.page) {
                Core.Data.set('currentPage', fromParams.page)
            } else {
                Core.Data.set('currentPage', '')
            }

        });


        getRequestList();

        function clear(){
            vm.date.start = "";
            vm.date.end = "";
        }

        function getRequestList() {
            var sourceId = '';
            var sourceType = '';
            // if (vm.requestTypeList.selected != undefined) {
            //     sourceType = vm.requestTypeList.selected.number;
            // }

            var startDate = '';
            if (vm.date.start) {
                startDate = vm.date.start.format('YYYY-MM-DD');
            }

            var endDate = '';
            if (vm.date.end) {
                endDate = vm.date.end.format("YYYY-MM-DD");
            }
            var currentPage = Core.Data.get('currentPage') ? Core.Data.get('currentPage') : vm.currentPage;
            Core.Api.Clearing.getRequestList(
                currentPage,
                sourceId,
                sourceType,
                startDate,
                endDate
            ).then(
                function (response) {
                    vm.requestList = response.request_list;

                    vm.count = response.count;
                    vm.totalPage = parseInt(vm.count / vm.pageSize) + (vm.count % vm.pageSize ? 1 : 0);
                    vm.currentPage = currentPage;
                },
                function (reason) {
                    Core.Notify.error(reason.message);
                }
            );
        }

        function goBack() {
            Core.$window.history.back();
        }

        function jsonFormat(data) {
            data = data ? data : null;
            var uibModal = Core.$uibModal.open({
                templateUrl: 'admin/json-format/json-format-modal.html',
                controller: 'JsonFormatController',
                resolve: {
                    data: function () {
                        return data;
                    }
                }
            });

            uibModal.result.then(function (data) {

            }, function () {
                Core.Log.d('Modal dismissed at: ' + new Date());
            });
        }
    }
})();
(function(){
    angular
        .module('app')
        .controller('ExpressBranchController', ['$scope', '$uibModal', 'Core', ExpressBranchController]);


    function ExpressBranchController($scope, $uibModal, Core)
    {
        var vm = $scope;

        vm.item = {
            // city: [ '浙江', '杭州', '西湖区' ]
            city: ''
        };

        //分页初始化设置
        vm.count = 0;
        vm.currentPage = 1;
        vm.pageSize = 20;
        vm.totalPage = 0;

        vm.search = {
            province: "",
            city: "",
            station: "",
            company: ""
        };

        vm.openModalOfEdit = openModalOfEdit;
        vm.showConfirmModal = showConfirmModal;
        vm.getExpressBranch = getExpressBranch;
        vm.pageChanged = getExpressBranch;
        vm.clearSearchOptions = clearSearchOptions;

        getExpressCompanyList();

        function getExpressCompanyList()
        {
            Core.Api.Express.getCompanyList().then(
                function (data) {
                    vm.expressCompanyList = data.express_company_list;

                    vm.expressCompanyList.unshift({id: "", name: "全部"});
                    getExpressBranch();
                },
                function (reason) {
                    Core.Notify.error('reason ' + reason.message);
                }
            )
        }

        function clearSearchOptions() {
            vm.search = {
                province: "",
                city: "",
                station: "",
                company: ""
            };

            vm.item = {
                // city: [ '浙江', '杭州', '西湖区' ]
                city: ''
            };

            getExpressBranch();
        }

        function getExpressBranch() {

            var station = vm.search.station ? vm.search.station : "";
            var company = vm.search.company ? vm.search.company : "";

            var selectCity = vm.item.city;
            var province = selectCity.cn ? selectCity.cn[0] : "";
            var city = selectCity.cn ? selectCity.cn[1] ? selectCity.cn[1] : "" : "";
            var county = selectCity.cn ? selectCity.cn[2] ? selectCity.cn[2] : "" : "";
            console.log(province, city, county);

            province = province ? province : "";
            city = city ? city : "";
            county = county ? county : "";

            var expressCompanyId = "";
            if (vm.expressCompanyList.selected) {
                expressCompanyId = vm.expressCompanyList.selected.id;
            }
            
            Core.Api.Express.getBranchList( 
                vm.currentPage,
                province,
                city,
                county,
                station,
                expressCompanyId
            ).then(
                function (data) {
                    vm.branchList = data.express_branch_list;

                    vm.count = data.count;
                    vm.totalPage = parseInt(vm.count / vm.pageSize) + (vm.count % vm.pageSize ? 1 : 0);
                },
                function (reason) {
                    Core.Notify.error('reason ' + reason.message);
                }
            )
        }

        function openModalOfEdit(data) {
            data = data ? data : null;
            var uibModal = Core.$uibModal.open({
                templateUrl: 'admin/express/edit-branch-modal.html',
                controller: 'ExpressBranchEditController',
                resolve: {
                    data: function () {
                        return data;
                    }
                }
            });

            uibModal.result.then(function (data) {
                Core.$timeout(function(){
                    Core.$state.reload();
                }, 200);
            }, function () {
                Core.Log.d('Modal dismissed at: ' + new Date());
            });
        }

        function showConfirmModal(type, id) {
            var uibModal = Core.$uibModal.open({
                templateUrl: 'admin/public-modal/confirm-modal.html',
                controller: 'ConfirmModalController',
                resolve: {
                    type: function () {
                        return type;
                    },
                    id: function () {
                        return id;
                    }
                }
            });

            uibModal.result.then(function (data) {
                Core.$timeout(function(){
                    Core.$state.reload();
                }, 200);
            }, function () {
                Core.Log.d('Modal dismissed at: ' + new Date());
            });
        }
    } 
})();
(function(){
    angular
        .module('app')
        .controller('ExpressCompanyDetailController', ['$scope', '$stateParams', 'Core', ExpressCompanyDetailController]);


    function ExpressCompanyDetailController($scope, $stateParams, Core)
    {
        var vm = $scope;

        var id = $stateParams.companyId;

        vm.goBack = goBack;
        vm.openModalOfEdit = openModalOfEdit;
        
        getExpressCompanyDetail();

        function getExpressCompanyDetail()
        {
            Core.Api.Express.getCompanyDetail(id).then(
                function(response)
                {
                    vm.companyDeatil = response.express_company;
                    console.log(vm.companyDeatil);
                },
                function(reason)
                {
                    Core.Notify.error('reason: ' + reason.message);
                }
            );
        }

        function openModalOfEdit(data) {
            data = data ? data : null;
            var uibModal = Core.$uibModal.open({
                templateUrl: 'admin/express/edit-company-modal.html',
                controller: 'ExpressCompanyEditAccountController',
                resolve: {
                    data: function () {
                        return data;
                    }
                }
            });

            uibModal.result.then(function (data) {
                Core.$timeout(function(){
                    Core.$state.reload();
                }, 200);
            }, function () {
                Core.Log.d('Modal dismissed at: ' + new Date());
            });
        }

        function goBack()
        {
            Core.$window.history.back();
        }
    } 
})();
(function () {
    angular
        .module('app')
        .controller('ExpressCompanyController', ['$scope', '$uibModal', 'Core', ExpressCompanyController]);


    function ExpressCompanyController($scope, $uibModal, Core) {
        var vm = $scope;

        //分页初始化设置
        vm.count = 0;
        vm.currentPage = 1;
        vm.pageSize = 20;
        vm.totalPage = 0;

        vm.search = {
            name: "",
            phone: "",
            logisticsCode: ""
        };

        vm.nowTime = Core.Util.time();

        vm.statusList = [
            {number: '', text: '全部'},
            {number: '1', text: "未认证"},
            {number: '2', text: "已认证"},
            {number: '3', text: "已冻结"},
        ];

        vm.openModalOfEdit = openModalOfEdit;
        vm.getExpressCompanyList = getExpressCompanyList;
        vm.pageChanged = getExpressCompanyList;
        vm.showConfirmModal = showConfirmModal;
        vm.clearSearchOptions = clearSearchOptions;

        getExpressCompanyList();

        function clearSearchOptions()
        {
            vm.search = {
                name: "",
                phone: "",
                logisticsCode: ""
            };
            vm.statusList.selected = null;

            getExpressCompanyList();
        }

        function getExpressCompanyList() {
            var name = vm.search.name ? vm.search.name : "";
            var phone = vm.search.phone ? vm.search.phone : "";
            var code = vm.search.logisticsCode ? vm.search.logisticsCode : "";

            var status = 0;
            if (vm.statusList.selected) {
                console.log(vm.statusList.selected);
                status = vm.statusList.selected.number;
            }

            Core.Api.Express.getCompanyList(
                name,
                phone,
                code,
                status
            ).then(
                function (data) {
                    vm.expressCompanyList = data.express_company_list;
                    
                },
                function (reason) {
                    Core.Notify.error('reason ' + reason.message);
                }
            )
        }

        function openModalOfEdit(data) {
            data = data ? data : null;
            var uibModal = Core.$uibModal.open({
                templateUrl: 'admin/express/edit-company-modal.html',
                controller: 'ExpressCompanyEditAccountController',
                resolve: {
                    data: function () {
                        return data;
                    }
                }
            });

            uibModal.result.then(function (data) {
                Core.$timeout(function(){
                    Core.$state.reload();
                }, 200);
            }, function () {
                Core.Log.d('Modal dismissed at: ' + new Date());
            });
        }

        function showConfirmModal(type, id) {
            var uibModal = Core.$uibModal.open({
                templateUrl: 'admin/public-modal/confirm-modal.html',
                controller: 'ConfirmModalController',
                resolve: {
                    type: function () {
                        return type;
                    },
                    id: function () {
                        return id;
                    }
                }
            });

            uibModal.result.then(function (data) {
                Core.$timeout(function(){
                    Core.$state.reload();
                }, 200);
            }, function () {
                Core.Log.d('Modal dismissed at: ' + new Date());
            });
        }


    }
})();
(function(){
    angular
        .module('app')
        .controller('ExpressBranchEditController', ['$scope', '$templateCache', '$uibModalInstance', 'Core', 'RegionControl', 'data', ExpressBranchEditController]);


    function ExpressBranchEditController($scope, $templateCache, $uibModalInstance, Core, RegionControl, data)
    {
        var vm = $scope;

        vm.editTitle = data ? "修改" : "新增";

        console.log(data);
        // 城市选择初始化
        vm.regionList = RegionControl.init();
        vm.cityList = {};
        vm.countyList = {};

        vm.changeProvinceCode = function(provinceObject) {
            vm.cityList = provinceObject.city;
        };

        vm.changeCityCode = function(cityObject) {
            vm.countyList = cityObject.county;
        };

        vm.saveData = {
            expressBranchId: data ? data.id : 0,
            name: data ? data.name : "",
            contact: data ? data.contact : "",
            phone: data ? data.phone : "",
            tel: data ? data.telephone : "",
            provinceName: data ? data.province : "",
            cityName: data ? data.city : "",
            countyName: data ? data.county : "",
            address: data ? data.address : "",
            express_company_list: data ? data.express_company_list : "",
        };

        vm.selectedExpressCompany = data ? data.express_company_list : [];
        vm.expressCompanyList = [];
        
        var statusTextArr = ['已启用', '未启用'];
        vm.statusSelect = {selected: {number: data ? data.status : 1, text: data ? statusTextArr[data.status - 1] : ""}};;

        vm.statusList = [
            { number: '1',      text: "已启用" },
            { number: '2',      text: "未启用" }
        ];

        getExpressCompanyList();

        function getExpressCompanyList()
        {
            Core.Api.Express.getCompanyList().then(
                function (responseData) {
                    vm.expressCompanyList = responseData.express_company_list;

                    if (data) {
                        vm.expressCompanyList.selected = data.express_company;
                    }
                },
                function (reason) {
                    Core.Notify.error('reason ' + reason.message);
                }
            )
        }

        vm.save = save;
        vm.cancel = cancel;

        function save() {
            var saveData = vm.saveData;
            var status = 1;
            if (vm.statusSelect.selected)
            {
                status = vm.statusSelect.selected.number;
            }

            if (vm.saveData.province)
            {
                saveData.provinceName = vm.saveData.province.name;
            }
            if (vm.saveData.city)
            {
                saveData.cityName = vm.saveData.city.name;
            }

            var expressCompanyId = "";
            if (vm.expressCompanyList.selected) {
                expressCompanyId = vm.expressCompanyList.selected.id;
            }

            if (!expressCompanyId) {
                Core.Notify.error('请选择一家物流公司');
                return false;
            }

            Core.Api.Express.saveBranch(
                saveData.expressBranchId,
                saveData.name,
                saveData.contact,
                saveData.phone,
                saveData.tel,
                saveData.provinceName,
                saveData.cityName,
                saveData.countyName,
                saveData.address,
                status,
                expressCompanyId
            ).then(
                function (response) {

                }, function (reason) {
                    Core.Notify.error('save error');
                    console.log(reason);
                }
            );

            $uibModalInstance.close();
        };

        function cancel() {
            console.log('cancel');
            $uibModalInstance.dismiss('cancel');
        };

        function getSelectedExpressCompanyIdList()
        {
            var arr = [];
            angular.forEach(vm.selectedExpressCompany, function(value, key){
                arr.push(value.id);
            });

            return arr;
        }
    }
})();
(function(){
    angular
        .module('app')
        .controller('ExpressCompanyEditAccountController', ['$scope', '$templateCache', '$uibModalInstance', 'Core', 'data', ExpressCompanyEditAccountController]);


    function ExpressCompanyEditAccountController($scope, $templateCache, $uibModalInstance, Core, data)
    {
        var vm = $scope;

        vm.isEdit = data ? true : false;

        vm.saveData = {
            companyId: data ? data.id : "",
            code: data ? data.code : "",
            name: data ? data.name : "",
            username: "",
            password: "",
            legal_person_name: data ? data.legal_person_name : "",
            phone: data ? data.phone : "",
            tel: data ? data.tel : "",
            deposit: data ? data.deposit / 100 : "",
        };

        var statusTextArr = ['已认证', '未认证', '已冻结'];
        vm.statusSelect = {selected: {number: data ? data.status : 1, text: data ? statusTextArr[data.status - 1] : ""}};
        vm.date = {
            dueTime: data ? moment(Core.Util.date('Y-m-d', data.due_time)) : "",
            last_schedule_time: data ? moment(data.last_schedule_time, 'HH:00') : new Date(),
        };

        vm.statusList = [
            {number: 1, text: '已认证'},
            {number: 2, text: '未认证'},
            {number: 3, text: '已冻结'}
        ];

        vm.save = save;
        vm.cancel = cancel;

        function save() {
            var saveData = vm.saveData;
            var statusSelected = 1;
            if (vm.statusSelect.selected)
            {
                statusSelected = vm.statusSelect.selected.number;
            }
            var dueTime = 0;
            if (vm.date.dueTime)
            {
                dueTime = vm.date.dueTime.unix();
            }
            var lastScheduleTime = '22:00';
            if (vm.date.last_schedule_time)
            {
                lastScheduleTime = Core.Util.date('H:i', vm.date.last_schedule_time)
            }

            Core.Api.Express.saveCompany(
                saveData.companyId,
                saveData.code,
                saveData.name,
                saveData.username,
                saveData.password,
                saveData.legal_person_name,
                saveData.phone,
                saveData.tel,
                saveData.deposit,
                lastScheduleTime,
                dueTime,
                statusSelected
            ).then(
                function(response)
                {

                },
                function(reason)
                {
                    Core.Notify.error(reason.message);
                    return false;
                }
            );

            $uibModalInstance.close();
        };

        function cancel() {
            console.log('cancel');
            $uibModalInstance.dismiss('cancel');
        };


    }
})();
(function(){
    angular
        .module('app')
        .controller('ExpressRouteEditAccountController', ['$scope', '$templateCache', '$uibModalInstance', 'Core', 'RegionControl', 'data', ExpressRouteEditAccountController]);


    function ExpressRouteEditAccountController($scope, $templateCache, $uibModalInstance, Core, RegionControl, data)
    {
        var vm = $scope;

        // 城市选择初始化
        vm.regionList = RegionControl.init();
        vm.cityList = [];
        vm.countyList = [];

        vm.saveData = {
            expressRouteId: data ? data.id : 0,
            provinceName: data ? data.province : "",
            cityName: data ? data.city : "",
            countyName: data ? data.county : "",
            express_company_list: data ? data.express_company_list : ""
        };

        vm.changeProvinceCode = function(provinceObject) {
            vm.saveData.provinceName = false;
            vm.saveData.cityName = false;
            vm.cityList = provinceObject.city;
        };

        vm.changeCityCode = function(cityObject) {
            vm.saveData.countyName = false;
            vm.countyList = cityObject.county;
        };


        vm.sortableOptions = {
            connectWith: ".connectList",
            update: function(e, ui) {}
        };
        vm.selectedExpressCompany = data ? data.express_company_list : [];

        vm.expressCompanyList = [];

        vm.save = save;
        vm.cancel = cancel;

        // getExpressBranch();
        getExpressCompanyList();

        function getExpressCompanyList()
        {
            Core.Api.Express.getCompanyList("", "", "", "").then(
                function (data) {
                    var expressCompanyList = data.express_company_list;
                    var unselectedExpressCompanyList = [];
                    angular.forEach(expressCompanyList, function(value, key){
                        if (!Core.Util.inArray(value.id, getSelectedExpressCompanyIdList()))
                        {
                            unselectedExpressCompanyList.push(value);
                        }
                    });

                    vm.expressCompanyList = unselectedExpressCompanyList;
                },
                function (reason) {
                    Core.Notify.error('reason ' + reason.message);
                }
            )
        }

        function save() {

            var saveData = vm.saveData;

            var express_company_list = "";
            if (vm.selectedExpressCompany.length > 0)
            {
                for (var i in vm.selectedExpressCompany)
                {
                    var company = vm.selectedExpressCompany[i];
                    express_company_list += company.id + ',';
                }
            }
            if (vm.saveData.province)
            {
                saveData.provinceName = vm.saveData.province.name;
            }
            if (vm.saveData.city)
            {
                saveData.cityName = vm.saveData.city.name;
            }

            Core.Api.Express.saveRoute(
                saveData.expressRouteId,
                saveData.provinceName,
                saveData.cityName,
                saveData.countyName,
                express_company_list
            ).then(
                function(response)
                {

                },
                function(reason)
                {
                    Core.Notify.error(reason.message);
                }
            );
            $uibModalInstance.close();
        }

        function cancel() {
            console.log('cancel');
            $uibModalInstance.dismiss('cancel');
        }

        function getSelectedExpressCompanyIdList()
        {
            var arr = [];
            angular.forEach(vm.selectedExpressCompany, function(value, key){
                arr.push(value.id);
            });

            return arr;
        }


        // function getExpressBranch() {
        //
        //     Core.Api.Express.getBranchList(1, "", "", "").then(
        //         function (response) {
        //             vm.branchList = response.express_branch_list;
        //
        //             vm.branchList.selected = data ? data.express_company_branch : "";
        //
        //             vm.count = response.count;
        //             vm.totalPage = parseInt(vm.count / vm.maxSize) + (vm.count % vm.maxSize ? 1 : 0);
        //         },
        //         function (reason) {
        //             Core.Notify.error('reason ' + reason.message);
        //         }
        //     )
        // }
    }
})();
(function(){
    angular
        .module('app')
        .controller('ExpressRouterController', ['$scope', '$uibModal', 'Core', ExpressRouterController]);


    function ExpressRouterController($scope, $uibModal, Core)
    {
        var vm = $scope;

        vm.item = {
            city: ''
        };

        //分页初始化设置
        vm.count = 0;
        vm.currentPage = 1;
        vm.pageSize = 20;
        vm.totalPage = 0;

        vm.search = {
            province: "",
            city: "",
            station: "",
            company: ""
        };

        vm.showConfirmModal = showConfirmModal;
        vm.openModalOfEdit = openModalOfEdit;
        vm.getExpressRouteList = getExpressRouteList;
        vm.pageChanged = getExpressRouteList;
        vm.clearSearchOptions = clearSearchOptions;

        getExpressRouteList();

        function clearSearchOptions()
        {
            vm.search = {
                company: ""
            };
            vm.item = {
                city: ''
            };
            getExpressRouteList();
        }

        function getExpressRouteList() {

            var station = vm.search.station ? vm.search.station : "";
            var company = vm.search.company ? vm.search.company : "";

            var selectCity = vm.item.city;
            var province = selectCity.cn ? selectCity.cn[0] : "";
            var city = selectCity.cn ? selectCity.cn[1] ? selectCity.cn[1] : "" : "";
            var county = selectCity.cn ? selectCity.cn[2] ? selectCity.cn[2] : "" : "";
            console.log(province, city, county);

            province = province ? province : "";
            city = city ? city : "";
            county = county ? county : "";

            Core.Api.Express.getRouteList(
                vm.currentPage,
                province,
                city,
                county,
                company
            ).then(
                function (data) {
                    var routeList = data.express_route_list;

                    for (var i in routeList)
                    {
                        var route = routeList[i];
                        route.expressCompanyListString = "";
                        for (j in route.express_company_list)
                        {
                            var expressCompany = route.express_company_list[j];
                            route.expressCompanyListString += expressCompany.name + ',';
                        }
                    }

                    vm.routeList = routeList;

                    vm.count = data.count;
                    vm.totalPage = parseInt(vm.count / vm.pageSize) + (vm.count % vm.pageSize ? 1 : 0);
                },
                function (reason) {
                    Core.Notify.error('reason ' + reason.message);
                }
            )
        }

        function openModalOfEdit(data) {
            data = data ? data : null;
            var uibModal = Core.$uibModal.open({
                templateUrl: 'admin/express/edit-route-modal.html',
                controller: 'ExpressRouteEditAccountController',
                resolve: {
                    data: function () {
                        return data;
                    }
                }
            });

            uibModal.result.then(function (data) {
                Core.$timeout(function(){
                    Core.$state.reload();
                }, 200);
            }, function () {
                Core.Log.d('Modal dismissed at: ' + new Date());
            });
        }

        function showConfirmModal(type, id) {
            var uibModal = Core.$uibModal.open({
                templateUrl: 'admin/public-modal/confirm-modal.html',
                controller: 'ConfirmModalController',
                resolve: {
                    type: function () {
                        return type;
                    },
                    id: function () {
                        return id;
                    }
                }
            });

            uibModal.result.then(function (data) {
                Core.$timeout(function(){
                    Core.$state.reload();
                }, 200);
            }, function () {
                Core.Log.d('Modal dismissed at: ' + new Date());
            });
        }
    } 
})();
(function(){
    angular
        .module('app')
        .controller('AddDriverController', ['$scope', '$uibModalInstance', 'Core', 'driver', AddDriverController]);


    function AddDriverController($scope, $uibModalInstance, Core, driver)
    {
        var vm = $scope;

        if (!driver) {
            vm.modalTitle = '新增司机';
            vm.id = 0;
            vm.name = '';
            vm.username = '';
            vm.phone = '';
            vm.isNewDriver = true;
            vm.password = '';
            vm.passwordRepeat = '';
            vm.wage = {
                base: '',
                bonus_attendance: '',
                bonus_rate: '',
                performance_x1: '',
                performance_p1: '',
                performance_p2: ''
            };
        } else {
            vm.modalTitle = '修改司机';
            vm.id = driver.id;
            vm.name = driver.name;
            vm.username = driver.username;
            vm.phone = driver.phone;
            vm.isNewDriver = false;
            vm.password = '';
            vm.passwordRepeat = '';
            vm.wage = {
                base: parseInt(driver.wage.base / 100),
                bonus_attendance: parseInt(driver.wage.bonus_attendance / 100),
                bonus_rate: parseInt(driver.wage.bonus_rate / 100),
                performance_x1: parseInt(driver.wage.performance_x1 / 100),
                performance_p1: driver.wage.performance_p1,
                performance_p2: driver.wage.performance_p2,
            };
        }


        vm.save = save;
        vm.cancel = cancel;

        function save() {

            if (!driver)
            {
                if (vm.password != vm.passwordRepeat)
                {
                    Core.Notify.error('两次输入的密码不一致');
                    return;
                }
            }

            Core.Api.Courier.saveCourier(
                vm.id,
                vm.username,
                vm.name,
                vm.phone,
                vm.password ? vm.password : '',
                parseInt(vm.wage.base) * 100,
                parseInt(vm.wage.bonus_attendance) * 100,
                parseInt(vm.wage.bonus_rate) * 100,
                parseInt(vm.wage.performance_x1) * 100,
                vm.wage.performance_p1,
                vm.wage.performance_p2
            ).then(
                function (data) {
                    $uibModalInstance.close();
                    Core.$state.reload();
                }, function (reason) {
                    Core.Notify.error(reason.message);
                }
            );
            // $uibModalInstance.close();
        };

        function cancel() {
            console.log('cancel');
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
(function(){
    angular
        .module('app')
        .controller('DriverController', ['$scope', '$templateCache', '$uibModal', 'Core', 'DTOptionsBuilder', 'SweetAlert', DriverController]);


    function DriverController($scope, $templateCache, $uibModal, Core, DTOptionsBuilder, SweetAlert)
    {
        var vm = $scope;

        vm.count = 0;
        vm.currentPage = 1;
        vm.pageSize = 20;
        vm.totalPage = 0;
        
        vm.scheduleList = [];
        getCourierList();

        vm.addDriverModal = addDriverModal;
        vm.updatePasswordModal = updatePasswordModal;
        vm.delete = deleteDriver;
        vm.edit = editDriver;
        vm.pageChanged = getCourierList;

        console.log($templateCache.info() + 'Driver');

        vm.dtOptions = DTOptionsBuilder.newOptions()
            .withDOM('<"html5buttons"B>lTfgitp')
            .withButtons([
                {extend: 'copy'},
                {extend: 'csv'},
                {extend: 'excel', title: 'ExampleFile'},
                {extend: 'pdf', title: 'ExampleFile'},

                {extend: 'print',
                    customize: function (win){
                        $(win.document.body).addClass('white-bg');
                        $(win.document.body).css('font-size', '10px');

                        $(win.document.body).find('table')
                            .addClass('compact')
                            .css('font-size', 'inherit');
                    }
                }
            ]);


        function getCourierList() {
            Core.Api.Courier.getCourierList(vm.currentPage).then(
                function (data) {
                    vm.driverList = data.courier_list;

                    vm.count = data.count;
                    vm.totalPage = parseInt(vm.count / vm.pageSize) + (vm.count % vm.pageSize ? 1 : 0);
                },
                function (reason) {
                    Core.Notify.error(reason.message);
                }
            )
        }

        function addDriverModal() {
            $uibModal.open({
                templateUrl: 'main/driver/add-driver-modal.html',
                controller: 'AddDriverController',
                resolve: {
                    driver: function () {
                        return '';
                    }
                }
            });
        }

        function updatePasswordModal(driver) {
            $uibModal.open({
                templateUrl: 'main/driver/update-password-modal.html',
                controller: 'UpdatePasswordController',
                resolve: {
                    driver: function () {
                        return driver;
                    }
                }
            });
        }

        function removeDriver(driver) {
            Core.Api.Courier.removeCourier(driver.id).then(
                function (data) {
                    Core.Notify.success('删除成功');
                    Core.$state.reload();
                },
                function (reason) {
                    Core.Notify.error(reason.message ? reason.message : '删除失败');
                }
            )
        }

        function editDriver(driver) {
            $uibModal.open({
                templateUrl: 'main/driver/add-driver-modal.html',
                controller: 'AddDriverController',
                resolve: {
                    driver: function () {
                        return driver;
                    }
                }
            });
        }

        function deleteDriver(driver) {
            if (confirm('确定删除吗?'))
            {
                removeDriver(driver);
            }
        }



    }
})();
(function(){
    angular
        .module('app')
        .controller('DriverScheduleController', ['$scope', '$templateCache', 'Core', '$stateParams', DriverScheduleController]);


    function DriverScheduleController($scope, $templateCache, Core, $stateParams)
    {
        var vm = $scope;

        vm.driverId = $stateParams.driverId;
        vm.scheduleList = [];
        getDriverScheduleList();

        vm.pageChanged = getDriverScheduleList;
        
        console.log($templateCache.info() + 'transport');

        function getDriverScheduleList() {
            Core.Api.Transport.getScheduleListOfCourier(vm.driverId).then(
                function (data) {
                    vm.scheduleList = data.schedule_list;
                },
                function (reason) {
                    Core.Notify.error(reason.message);
                }
            )
        }

    }
})();
(function(){
    angular
        .module('app')
        .controller('UpdatePasswordController', ['$scope', '$templateCache', '$uibModalInstance', 'Core', 'driver', UpdatePasswordController]);


    function UpdatePasswordController($scope, $templateCache, $uibModalInstance, Core, driver)
    {
        var vm = $scope;

        vm.password = '';
        vm.passwordRepeat = '';


        vm.save = save;
        vm.cancel = cancel;

        console.log($templateCache.info() + 'transport');

        function save() {

            if (!vm.password)
            {
                Core.Notify.error('密码不能为空');
                return;
            }

            if (vm.password !=  vm.passwordRepeat)
            {
                Core.Notify.error('两次输入的密码不一致');
                return;
            }

            Core.Api.Courier.updateCourierPassword(
                driver.id,
                vm.password
            ).then(
                function (data) {
                    // Core.$state.reload();
                }, function (reason) {
                    Core.Notify.error(reason.message ? reason.message : '更新失败');
                }
            );

            $uibModalInstance.close();
        };

        function cancel() {
            console.log('cancel');
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
(function(){
    angular
        .module('app')
        .controller('DriverWaybillController', ['$scope', '$templateCache', 'Core', '$stateParams', DriverWaybillController]);


    function DriverWaybillController($scope, $templateCache, Core, $stateParams)
    {
        var vm = $scope;
        var isFirst = true;
        vm.count = 0;
        vm.currentPage = 1;
        vm.pageSize = 20;
        vm.totalPage = 0;
        
        
        vm.scheduleId = $stateParams.scheduleId;
        vm.waybillList = [];
        vm.$watch('currentPage', function () {
            if (isFirst){
                isFirst = false;
                return;
            }
            Core.Data.set('currentPage', '');
        });

        Core.on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (fromState.name == 'waybill.detail' && fromParams.page) {
                Core.Data.set('currentPage', fromParams.page)
            } else {
                Core.Data.set('currentPage', '')
            }

        });
        getDriverWaybillList();


        vm.pageChanged = getDriverWaybillList;


        console.log($templateCache.info() + 'transport');


        function getDriverWaybillList() {
            var currentPage = Core.Data.get('currentPage') ? Core.Data.get('currentPage') : vm.currentPage;
            Core.Api.Waybill.getWaybillListofSchedule(vm.scheduleId, currentPage).then(
                function (data) {
                    vm.waybillList = data.waybill_list;
                    vm.count = data.count;
                    vm.currentPage = currentPage;
                },
                function (reason) {
                    Core.Notify.error(reason.message);
                }
            )
        }

    }
})();
(function () {
    angular
        .module('app')
        .controller('EditCollectAreaController', ['$scope', '$uibModalInstance', 'Core', 'data', EditCollectAreaController]);


    function EditCollectAreaController($scope, $uibModalInstance, Core, data) {
        var vm = $scope;

        vm.isEdit = data ? "修改" : "添加";

        vm.areaId = data ? data.id : 0;
        vm.name = data ? data.name : "";
        vm.status = data ? data.status : 1;

        vm.save = save;
        vm.cancel = cancel;

        function save() {

            if (!vm.name)
            {
                Core.Notify.error('区域名称不能为空');
                return false;
            }

            Core.Api.Collect.saveArea(vm.areaId, vm.name, vm.status).then(
                function (response) {

                },
                function (reason) {
                    Core.Notify.error(reason.message);
                }
            );

            $uibModalInstance.close();
        };

        function cancel() {
            console.log('cancel');
            $uibModalInstance.dismiss('cancel');
        };

    }
})();
(function () {
    angular
        .module('app')
        .controller('CollectAreaDetailController', ['$scope', '$stateParams', 'Core', CollectAreaDetailController]);


    function CollectAreaDetailController($scope, $stateParams, Core) {
        var vm = $scope;

        vm.areaId = $stateParams.areaId;

        vm.statusList = {
            use: Core.Const.COLLECT_AREA_STATUS.USE,
            pause: Core.Const.COLLECT_AREA_STATUS.PAUSE
        };

        vm.goBack = goBack;
        vm.openEditModal = openEditModal;

        getCollectAreaDetail();

        function getCollectAreaDetail() {
            Core.Api.Collect.getAreaDetail(vm.areaId).then(
                function (data) {
                    vm.collectAreaDetail = data.detail;

                    console.log(data.detail);
                },
                function (reason) {
                    Core.Notify.error('reason ' + reason.message);
                }
            );
        }

        function openEditModal(data) {
            data = data ? data : null;
            var uibModal = Core.$uibModal.open({
                templateUrl: 'admin/collect/edit-area-modal.html',
                controller: 'EditCollectAreaController',
                resolve: {
                    data: function () {
                        return data;
                    }
                }
            });

            uibModal.result.then(function (data) {
                Core.$timeout(function(){
                    Core.$state.reload();
                }, 200);
            }, function () {
                Core.Log.d('Modal dismissed at: ' + new Date());
            });
        }

        function goBack() {
            Core.$window.history.back();
        }
    }
})();
(function () {
    angular
        .module('app')
        .controller('CollectAreaController', ['$scope', '$uibModal', 'Core', CollectAreaController]);


    function CollectAreaController($scope, $uibModal, Core) {
        var vm = $scope;

        vm.statusList = {
            use: Core.Const.COLLECT_AREA_STATUS.USE,
            pause: Core.Const.COLLECT_AREA_STATUS.PAUSE
        };

        vm.showConfirmModal = showConfirmModal;
        vm.openEditModal = openEditModal;
        vm.getCollectAreaList = getCollectAreaList;

        getCollectAreaList();

        function getCollectAreaList() {

            Core.Api.Collect.getAreaList().then(
                function (data) {
                    vm.areaList = data.list;
                },
                function (reason) {
                    Core.Notify.error('reason ' + reason.message);
                }
            )
        }

        function openEditModal(data) {
            data = data ? data : null;
            var uibModal = Core.$uibModal.open({
                templateUrl: 'admin/collect/edit-area-modal.html',
                controller: 'EditCollectAreaController',
                resolve: {
                    data: function () {
                        return data;
                    }
                }
            });

            uibModal.result.then(function (data) {
                Core.$timeout(function(){
                    Core.$state.reload();
                }, 200);
            }, function () {
                Core.Log.d('Modal dismissed at: ' + new Date());
            });
        }

        function showConfirmModal(type, id) {
            var uibModal = Core.$uibModal.open({
                templateUrl: 'admin/public-modal/confirm-modal.html',
                controller: 'ConfirmModalController',
                resolve: {
                    type: function () {
                        return type;
                    },
                    id: function () {
                        return id;
                    }
                }
            });

            uibModal.result.then(function (data) {
                Core.$timeout(function(){
                    Core.$state.reload();
                }, 200);
            }, function () {
                Core.Log.d('Modal dismissed at: ' + new Date());
            });
        }
    }
})();
(function () {
    angular
        .module('app')
        .controller('CollectController', ['$scope', '$uibModal', 'Core', CollectController]);


    function CollectController($scope, $uibModal, Core) {
        var vm = $scope;

        vm.STATUS_INIT = Core.Const.WAYBILL_STATUS.STATUS_INIT;
        vm.STATUS_RECEIVING = Core.Const.WAYBILL_STATUS.STATUS_RECEIVING;
        vm.STATUS_RECEIVING_PENDING_TRUCK_LOADING = Core.Const.WAYBILL_STATUS.STATUS_RECEIVING_PENDING_TRUCK_LOADING;

        vm.count = 0;
        vm.currentPage = 1;
        vm.pageSize = 20;
        vm.totalPage = 0;


        vm.search = {
            waybillSn: "",
            fromCompany: ""
        };

        vm.waybillList = [];
        vm.routeList = [];

        vm.route = {};
        vm.schedule = {};

        vm.rejectReceiveModal = rejectReceiveModal;
        vm.receivingModal = receivingModal;
        vm.receiveSuccessModal = receiveSuccessModal;
        vm.pageChanged = getWaybillList;
        vm.showWaybillDetail = showWaybillDetail;
        vm.getWaybillList = getWaybillList;
        vm.clearSearchOptions = clearSearchOptions;

        vm.refreshInterval = null;

        setRefreshInterval();
        getWaybillList();

        function clearSearchOptions()
        {
            vm.search = {
                waybillSn: "",
                fromCompany: ""
            };

            getWaybillList();
        }

        function setRefreshInterval() {
            if (vm.refreshInterval) {
                Core.$interval.cancel(vm.refreshInterval);
            }

            vm.refreshInterval = Core.$interval(function () {
                var date = new Date();
                if (date.getSeconds() % 30 == 0) {
                    getWaybillList();
                }
            }, 500);
        }

        function getWaybillList() {

            Core.Api.Waybill.getPendingReceiveWaybillListOfToday(
                vm.currentPage, 
                '',
                vm.search.waybillSn,
                vm.search.fromCompany
            ).then(
                function (data) {
                    vm.waybillList = data.waybill_list;

                    vm.count = data.count;
                    vm.totalPage = parseInt(vm.count / vm.pageSize) + (vm.count % vm.pageSize ? 1 : 0);
                },
                function (reason) {
                    Core.Notify.error(reason.message);
                }
            )
        }

        function showWaybillDetail(waybill) {
            $uibModal.open({
                templateUrl: 'admin/collect/waybill-detail-modal.html',
                controller: 'Collect.WaybillDetailController',
                resolve: {
                    waybill: function () {
                        return waybill;
                    }
                }
            });
        }

        function rejectReceiveModal(waybill) {
            $uibModal.open({
                templateUrl: 'admin/collect/reject-receive-modal.html',
                controller: 'RejectReceiveController',
                resolve: {
                    waybill: function () {
                        return waybill;
                    }
                }
            });
        }

        function receivingModal(waybill) {
            $uibModal.open({
                templateUrl: 'admin/collect/receiving-modal.html',
                controller: 'ReceivingController',
                resolve: {
                    waybill: function () {
                        return waybill;
                    }
                }
            });
        }

        function receiveSuccessModal(waybill) {
            $uibModal.open({
                templateUrl: 'admin/collect/receive-success-modal.html',
                controller: 'ReceiveSuccessController',
                resolve: {
                    waybill: function () {
                        return waybill;
                    }
                }
            });
        }


    }
})();
(function(){
    angular
        .module('app')
        .controller('ReceiveSuccessController', ['$scope', '$templateCache', '$uibModalInstance', 'Core', 'waybill', ReceiveSuccessController]);


    function ReceiveSuccessController($scope, $templateCache, $uibModalInstance, Core, waybill)
    {
        var vm = $scope;

        vm.comment = '';
        vm.save = save;
        vm.cancel = cancel;

        console.log($templateCache.info() + 'transport');
        
        function save() {

            Core.Api.Waybill.updateWaybillStatusReceiveSuccess(waybill.id, vm.comment).then(
                function (data) {
                    Core.$state.reload();
                }, function (reason) {
                    Core.Notify.error('save error');
                    console.log(reason);
                }
            );

            $uibModalInstance.close();
        };

        function cancel() {
            console.log('cancel');
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
(function(){
    angular
        .module('app')
        .controller('ReceivingController', ['$scope', '$uibModalInstance', 'Core', 'waybill', ReceivingController]);


    function ReceivingController($scope, $uibModalInstance, Core, waybill)
    {
        var vm = $scope;

        vm.scheduleList = [];
        vm.comment = '';

        vm.save = save;
        vm.cancel = cancel;

        getScheduleList();

        function getScheduleList() {
            Core.Api.Transport.getScheduleList().then(
                function (data) {
                    var scheduleList = [];
                    var date = new Date();
                    var hour = date.getHours();
                    var minute = date.getMinutes();
                    for (var i = 0; i < data.schedule_list.length; i++)
                    {
                        var schedule = data.schedule_list[i];
                        if (waybill.route_id && schedule.route.id != waybill.route_id)
                        {
                            continue;
                        }

                        if (schedule.transport_status != 0)
                        {
                            continue;
                        }

                        if (schedule.start_hour > hour || (schedule.start_hour == hour && schedule.start_minute - minute >= 5))
                        {
                            scheduleList.push(schedule);
                        }
                    }
                    vm.scheduleList = scheduleList;
                },
                function (reason) {
                    alert(reason);
                }
            )
        }

        function save() {
            Core.Api.Waybill.updateWaybillStatusReceiving(waybill.id, vm.comment).then(
                function (data) {
                    Core.$state.reload();
                }, function (reason) {
                    Core.Notify.error('save error');
                    console.log(reason);
                }
            );

            $uibModalInstance.close();
        };

        function cancel() {
            console.log('cancel');
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
(function(){
    angular
        .module('app')
        .controller('RejectReceiveController', ['$scope', '$templateCache', '$uibModalInstance', 'Core', 'waybill', RejectReceiveController]);


    function RejectReceiveController($scope, $templateCache, $uibModalInstance, Core, waybill)
    {
        var vm = $scope;

        vm.comment = '';
        vm.save = save;
        vm.cancel = cancel;

        console.log($templateCache.info() + 'transport');

        function save() {

            if (!vm.comment)
            {
                Core.Notify.error('拒单理由不能为空');
                return;
            }

            Core.Api.Waybill.updateWaybillStatusRejectReceive(
                waybill.id,
                vm.comment
            ).then(
                function (data) {
                    Core.$state.reload();
                }, function (reason) {
                    Core.Notify.error('save error');
                    console.log(reason);
                }
            );

            $uibModalInstance.close();
        };

        function cancel() {
            console.log('cancel');
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
(function () {
    angular
        .module('app')
        .controller('CollectUserDetailController', ['$scope', '$stateParams', 'Core', CollectUserDetailController]);


    function CollectUserDetailController($scope, $stateParams, Core) {
        var vm = $scope;

        vm.userId = $stateParams.userId;

        vm.goBack = goBack;
        vm.openEditModal = openEditModal;

        getCollectUserDetail();

        function getCollectUserDetail() {
            Core.Api.Collect.getUserDetail(vm.userId).then(
                function (data) {
                    vm.collectUserDetail = data.detail;

                    vm.areaNameListString = "";
                    if (vm.collectUserDetail.collect_area_list.length > 0)
                    {
                        var collectAreaList = vm.collectUserDetail.collect_area_list;
                        angular.forEach(collectAreaList, function(value, key){
                            vm.areaNameListString += value.name + '; ';
                        });
                    }
                },
                function (reason) {
                    Core.Notify.error('reason ' + reason.message);
                }
            );
        }

        function openEditModal(data) {
            data = data ? data : null;
            var uibModal = Core.$uibModal.open({
                templateUrl: 'admin/collect/edit-user-modal.html',
                controller: 'EditCollectUserController',
                resolve: {
                    data: function () {
                        return data;
                    }
                }
            });

            uibModal.result.then(function (data) {
                Core.$timeout(function(){
                    Core.$state.reload();
                }, 200);
            }, function () {
                Core.Log.d('Modal dismissed at: ' + new Date());
            });
        }

        function goBack() {
            Core.$window.history.back();
        }
    }
})();
(function () {
    angular
        .module('app')
        .controller('CollectUserController', ['$scope', '$uibModal', 'Core', CollectUserController]);


    function CollectUserController($scope, $uibModal, Core) {
        var vm = $scope;

        //分页初始化配置
        vm.count = 0;
        vm.currentPage = 1;
        vm.pageSize = 20;
        vm.totalPage = 0;

        vm.showConfirmModal = showConfirmModal;
        vm.openEditModal = openEditModal;
        vm.getCollectUserList = getCollectUserList;
        vm.pageChanged = getCollectUserList;
        vm.clearSearchOptions = clearSearchOptions;

        vm.search = {
            name: ""
        };
        vm.date = {
            start: '',
            end: ''
        };
        
        getCollectUserList();

        function clearSearchOptions()
        {
            vm.search = {
                name: ""
            };
            vm.date = {
                start: '',
                end: ''
            };

            getCollectUserList();
        }

        function getCollectUserList() {
            var start = "", end = "";
            if (vm.date.start) {
                start = vm.date.start.format('YYYY-MM-DD');
            }
            if (vm.date.end) {
                end = vm.date.end.format('YYYY-MM-DD');
            }

            Core.Api.Collect.getUserList(
                vm.currentPage,
                vm.search.name,
                start,
                end
            ).then(
                function (data) {
                    vm.userList = data.list;

                    vm.count = data.count;
                    vm.totalPage = parseInt(vm.count / vm.pageSize) + (vm.count % vm.pageSize ? 1 : 0);
                },
                function (reason) {
                    Core.Notify.error('reason ' + reason.message);
                }
            )
        }

        function openEditModal(data) {
            data = data ? data : null;
            var uibModal = Core.$uibModal.open({
                templateUrl: 'admin/collect/edit-user-modal.html',
                controller: 'EditCollectUserController',
                resolve: {
                    data: function () {
                        return data;
                    }
                }
            });

            uibModal.result.then(function (data) {
                Core.$timeout(function () {
                    Core.$state.reload();
                }, 200);
            }, function () {
                Core.Log.d('Modal dismissed at: ' + new Date());
            });
        }

        function showConfirmModal(type, id) {
            var uibModal = Core.$uibModal.open({
                templateUrl: 'admin/public-modal/confirm-modal.html',
                controller: 'ConfirmModalController',
                resolve: {
                    type: function () {
                        return type;
                    },
                    id: function () {
                        return id;
                    }
                }
            });

            uibModal.result.then(function (data) {
                Core.$timeout(function () {
                    Core.$state.reload();
                }, 200);
            }, function () {
                Core.Log.d('Modal dismissed at: ' + new Date());
            });
        }
    }
})();
(function () {
    angular
        .module('app')
        .controller('EditCollectUserController', ['$scope', '$uibModalInstance', 'Core', 'data', EditCollectUserController]);


    function EditCollectUserController($scope, $uibModalInstance, Core, data) {
        var vm = $scope;

        vm.collectUserId = data ? data.id : 0;
        vm.userInfo = {
            username:  data ? data.username : "",
            password: data ? data.password : "",
            againPassword: data ? data.password : "",
            name: data ? data.name : "",
            gender: data ? data.gender : 0,
            status: data ? data.status : 1
        };

        vm.date = {
            birthday: data ? moment(Core.Util.date('Y-m-d', data.birthday)) :"",
            entryTime: data ? moment(Core.Util.date('Y-m-d', data.entry_time)) : ""
        };

        vm.editUserInfo = data ? true : false;

        vm.save = save;
        vm.cancel = cancel;

        getCollectAreaList();

        function getCollectAreaList() {
            Core.Api.Collect.getAreaList().then(
                function (response) {
                    vm.areaList = response.list;

                    var selectedAreaArr = data ? data.collect_area_id.split(',') : [];
                    if (selectedAreaArr.length > 0)
                    {
                        angular.forEach(vm.areaList, function(value, key){
                            if (Core.Util.inArray(value.id, selectedAreaArr))
                            {
                                value.selected = true;
                            }
                        });
                    }
                },
                function (reason) {
                    Core.Notify.error('reason ' + reason.message);
                }
            )
        }

        function save() {

            var userInfo = vm.userInfo;
            if (!userInfo.username) {
                Core.Notify.error('登录账号不能为空');
                return false;
            }
            
            if (userInfo.password != userInfo.againPassword)
            {
                Core.Notify.error('登录密码和确认密码不一致');
                return false;
            }

            var entryTime = 0, birthday = 0;
            if (vm.date.entryTime)
            {
                entryTime = vm.date.entryTime.unix();
            }
            if (vm.date.birthday)
            {
                birthday = vm.date.birthday.unix();
            }

            var areaIdString = "";
            angular.forEach(vm.areaList, function(value, key){
                if (value.selected)
                {
                    areaIdString += value.id + ',';
                }
            });
            
            if (vm.editUserInfo)
            {
                Core.Api.Collect.editUser(
                    vm.collectUserId,
                    userInfo.name,
                    userInfo.gender,
                    birthday,
                    entryTime,
                    userInfo.status,
                    areaIdString
                ).then(
                    function (response) {
                        Core.Notify.success('修改成功');
                    },
                    function (reason) {
                        Core.Notify.error(reason.message);
                        return false;
                    }
                );
            }
            else
            {
                Core.Api.Collect.saveUser(
                    vm.collectUserId,
                    userInfo.username,
                    userInfo.password,
                    userInfo.name,
                    userInfo.gender,
                    birthday,
                    entryTime,
                    userInfo.status,
                    areaIdString
                ).then(
                    function (response) {
                        Core.Notify.success('添加成功');
                    },
                    function (reason) {
                        Core.Notify.error(reason.message);
                        return false;
                    }
                );
            }

            $uibModalInstance.close();
        };

        function cancel() {
            console.log('cancel');
            $uibModalInstance.dismiss('cancel');
        };

    }
})();
(function(){
    angular
        .module('app')
        .controller('Collect.WaybillDetailController', ['$scope', '$uibModal', '$uibModalInstance', 'Core', 'waybill', WaybillDetailController]);


    function WaybillDetailController($scope, $uibModal, $uibModalInstance, Core, waybill)
    {
        var vm = $scope;
        vm.waybill = waybill;
        
        vm.STATUS_INIT = Core.Const.WAYBILL_STATUS.STATUS_INIT;
        vm.STATUS_RECEIVING = Core.Const.WAYBILL_STATUS.STATUS_RECEIVING;
        vm.STATUS_RECEIVING_PENDING_TRUCK_LOADING = Core.Const.WAYBILL_STATUS.STATUS_RECEIVING_PENDING_TRUCK_LOADING;

        vm.cancel = cancel;
        vm.rejectReceiveModal = rejectReceiveModal;
        vm.receivingModal = receivingModal;
        vm.receiveSuccessModal = receiveSuccessModal;

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }


        function rejectReceiveModal(waybill) {

            $uibModalInstance.dismiss('cancel');

            $uibModal.open({
                templateUrl: 'main/collect/reject-receive-modal.html',
                controller: 'RejectReceiveController',
                resolve: {
                    waybill: function () {
                        return waybill;
                    }
                }
            });
        }

        function receivingModal(waybill) {
            $uibModalInstance.dismiss('cancel');

            $uibModal.open({
                templateUrl: 'main/collect/receiving-modal.html',
                controller: 'ReceivingController',
                resolve: {
                    waybill: function () {
                        return waybill;
                    }
                }
            });
        }

        function receiveSuccessModal(waybill) {
            $uibModalInstance.dismiss('cancel');

            $uibModal.open({
                templateUrl: 'main/collect/receive-success-modal.html',
                controller: 'ReceiveSuccessController',
                resolve: {
                    waybill: function () {
                        return waybill;
                    }
                }
            });
        }

    }
})();
(function(){
    angular
        .module('app')
        .controller('GoodsListController', ['$scope', '$uibModal', 'Core', GoodsListController]);


    function GoodsListController($scope, $uibModal, Core)
    {
        var vm = $scope;

        //分页初始化设置
        vm.count = 0;
        vm.currentPage = 1;
        vm.pageSize = 20;
        vm.totalPage = 0;

        vm.selectAllWaybill = false;

        vm.date = {
            start: "",
            end: ""
        };

        vm.expressCompanyList = [];

        $scope.$watch('selectAllTransport', function (newVal, oldVal, scope) {
            angular.forEach(vm.transpostList, function (item, list) {
                item.selected = newVal;
            })
        });
        
        vm.getTransportList = getTransportList;
        vm.pageChanged = getTransportList;
        vm.clearSearchOptions = clearSearchOptions;

        getExpressCompanyList();
        getTransportList();

        function clearSearchOptions()
        {
            vm.date = {
                start: "",
                end: ""
            };
            vm.expressCompanyList.selected = null;

            getTransportList();
        }

        function getExpressCompanyList()
        {
            Core.Api.Express.getCompanyList("", "", "", "").then(
                function (data) {
                    vm.expressCompanyList = data.express_company_list;
                    vm.expressCompanyList.unshift({id: 0, name: '全部'});
                },
                function (reason) {
                    Core.Notify.error('reason ' + reason.message);
                }
            )
        }

        function getTransportList()
        {
            var start = 0, end = 0;
            if (vm.date.start)
            {
                start = vm.date.start.format('YYYY-MM-DD');
            }
            if (vm.date.end)
            {
                end = vm.date.end.format('YYYY-MM-DD');
            }

            var expressCompanyId = 0;
            if (vm.expressCompanyList.selected)
            {
                expressCompanyId = vm.expressCompanyList.selected.id;
            }

            Core.Api.Loading.getLoadingList(
                vm.currentPage,
                start,
                end,
                expressCompanyId
            ).then(
                function (data) {
                    vm.transpostList = data.list;

                    vm.count = data.count;
                    vm.totalPage = parseInt(vm.count / vm.pageSize) + (vm.count % vm.pageSize ? 1 : 0);
                },
                function (reason) {
                    Core.Notify.error(reason.message);
                }
            )
        }
    }
})();
(function(){
    angular
        .module('app')
        .controller('WaybillShippingListController', ['$scope', '$stateParams', '$uibModal', 'Core', WaybillShippingListController]);
    
    function WaybillShippingListController($scope, $stateParams, $uibModal, Core)
    {
        var vm = $scope;

        //分页初始化设置
        vm.count = 0;
        vm.currentPage = 1;
        vm.pageSize = 20;
        vm.totalPage = 0;
        
        vm.transportId = $stateParams.transportId;

        vm.goBack = goBack;
        
        getWaybillShippingListByTransportId();

        function getWaybillShippingListByTransportId()
        {
            Core.Api.Loading.getWaybillShippingLabelList(vm.transportId).then(
                function (data) {
                    vm.waybillList = data.list;

                    console.log(vm.waybillList);
                },
                function (reason) {
                    Core.Notify.error(reason.message);
                }
            )
        }

        function goBack()
        {
            Core.$window.history.back();
        }
    }
})();
/**
 * Created by whis on 5/5/16.
 */
(function(){
    angular
        .module('app')
        .controller('FinanceBankPayListController', ['$scope', '$stateParams', '$templateCache', '$uibModal', 'Core', FinanceBankPayListController]);


    function FinanceBankPayListController($scope, $stateParams, $templateCache, $uibModal, Core)
    {
        var vm = $scope;
        var isFirst = true;

        //分页初始化设置
        vm.count = 0;
        vm.currentPage = 1;
        vm.pageSize = 20;
        vm.totalPage = 0;

        vm.tradeId = $stateParams.tradeId;

        vm.pageChanged = getBankPayList;
        vm.goBack = goBack;

        vm.$watch('currentPage', function () {
            if(isFirst){
                isFirst = false;
                return;
            }
            Core.Data.set('currentPage', '');
        });

        Core.on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (fromState.name == 'waybill.detail' && fromParams.page) {
                Core.Data.set('currentPage', fromParams.page)
            } else {
                Core.Data.set('currentPage', '')
            }

        });

        getBankPayList();

        function getBankPayList() {
            var currentPage = Core.Data.get('currentPage') ? Core.Data.get('currentPage') : vm.currentPage;
            Core.Api.Finance.getBankPayList(
                currentPage,
                vm.tradeId
            ).then(
                function(response) {
                    vm.bankPayList = response.list;

                    vm.count = response.count;
                    vm.totalPage = parseInt(vm.count / vm.pageSize) + (vm.count % vm.pageSize ? 1 : 0);
                    vm.currentPage = currentPage;
                },
                function(reason) {
                    Core.Notify.error(reason.message);
                }
            );
        }

        function goBack()
        {
            Core.$window.history.back();
        }
    }
})();
/**
 * Created by whis on 5/5/16.
 */
(function(){
    angular
        .module('app')
        .controller('FinanceCheckController', ['$scope', '$templateCache', '$uibModal', 'Core', FinanceCheckController]);


    function FinanceCheckController($scope, $templateCache, $uibModal, Core)
    {
        var vm = $scope;

        //分页初始化设置
        vm.count = 0;
        vm.currentPage = 1;
        vm.pageSize = 20;
        vm.totalPage = 0;

        vm.date = {
            start: '',
            end: ''
        };
        vm.search = {
            expressCompany: '',
            merchant: '',
        };
        vm.payStatusList = [
            { number: '1',      text: "交易成功" },
            { number: '2',      text: "交易失败" },
        ];
        vm.payObjectList = [
            { name: '商户', value: 1 },
            { name: '用户', value: 2 }
        ];
        vm.payTypeList = [
            { name: '运费', value: 1 },
            { name: '奖金', value: 2 }
        ];
        vm.moneyDirectionList = [
            {name: '打款', value: 1},  
            {name: '收款', value: 2},  
        ];

        getMerchantList();

        function getMerchantList() {

            var beginDate = 0, endDate = 0;
            if (vm.date.start)
            {
                beginDate = vm.date.start.unix();
            }
            if (vm.date.end)
            {
                endDate = vm.date.end.unix();
            }
            var payStatus = 0, payObject = 0, payType = 0, moneyDirection = 0;
            if (vm.payStatusList.selected)
            {
                payStatus = vm.payStatusList.selected.value;
            }
            if (vm.payObjectList.selected)
            {
                payObject = vm.payObjectList.selected.value;
            }
            if (vm.payTypeList.selected)
            {
                payType = vm.payTypeList.selected.value;
            }
            if (vm.moneyDirectionList.selected)
            {
                moneyDirection = vm.moneyDirectionList.selected.value;
            }

            Core.Api.Merchant.getMerchantList(vm.currentPage, '', "", "", "").then(
                function (data) {
                    vm.merchantList = data.company_list;
                    
                    vm.count = data.count;
                    vm.totalPage = parseInt(vm.count / vm.pageSize) + (vm.count % vm.pageSize ? 1 : 0);
                },
                function (reason) {
                    Core.Notify.error('reason ' + reason.message);
                }
            )
        }
    }
})();
/**
 * Created by whis on 5/5/16.
 */
(function(){
    angular
        .module('app')
        .controller('FinanceDetailController', ['$scope', '$stateParams', '$uibModal', 'Core', FinanceDetailController]);


    function FinanceDetailController($scope, $stateParams, $uibModal, Core)
    {
        var vm = $scope;

        vm.tradeId = $stateParams.financeId;

        vm.goBack = goBack;
        vm.jsonFormat = jsonFormat;

        getTradeDetail();
        getTradeLogList();
        getTradeRequestList();

        function getTradeDetail() {

            Core.Api.Finance.getTradeDetail(vm.tradeId).then(
                function (data) {
                    vm.tradeDetail = data.trade_detail;
                },
                function (reason) {
                    Core.Notify.error(reason.message);
                }
            )
        }

        function goBack() {
            Core.$window.history.back();
        }

        function getTradeLogList() {

            Core.Api.Clearing.getWaybillTradeLogList(
                vm.tradeId
            ).then(
                function(response) {
                    vm.logList = response.log_list;
                },
                function(reason) {
                    Core.Notify.error(reason.message);
                }
            );
        }

        function getTradeRequestList() {

            Core.Api.Clearing.getWaybillTradeRequestList(
                vm.tradeId
            ).then(
                function(response) {
                    vm.requestList = response.request_list;

                },
                function(reason) {
                    Core.Notify.error(reason.message);
                }
            );
        }

        function jsonFormat(data)
        {
            data = data ? data : null;
            var uibModal = Core.$uibModal.open({
                templateUrl: 'admin/json-format/json-format-modal.html',
                controller: 'JsonFormatController',
                resolve: {
                    data: function () {
                        return data;
                    }
                }
            });

            uibModal.result.then(function (data) {

            }, function () {
                Core.Log.d('Modal dismissed at: ' + new Date());
            });
        }
    }
})();
(function(){
    angular
        .module('app')
        .controller('FinancePlayMoneyDetailController', ['$scope', '$stateParams', 'Core', FinancePlayMoneyDetailController]);


    function FinancePlayMoneyDetailController($scope, $stateParams, Core)
    {
        var vm = $scope;

        var id = $stateParams.playMoneyId;

        vm.goBack = goBack;

        console.log(id);

        function goBack()
        {
            Core.$window.history.back();
        }
    } 
})();
/**
 * Created by whis on 5/5/16.
 */
(function(){
    angular
        .module('app')
        .controller('FinanceTradeInController', ['$scope', '$templateCache', '$uibModal', 'Core', FinanceTradeInController]);


    function FinanceTradeInController($scope, $templateCache, $uibModal, Core)
    {
        var vm = $scope;

        //分页初始化设置
        vm.count = 0;
        vm.currentPage = 1;
        vm.pageSize = 20;
        vm.totalPage = 0;

        vm.searchInputStatus = false;
        vm.date = {
            start: '',
            end: ''
        };
        vm.search = {
            companyName: ""
        };
        vm.payStatusList = [
            { number: "",       text: "全部"},
            { number: '0',      text: Core.Const.BANK_PAY_STATUS_NAME[0] },
            { number: '1',      text: Core.Const.BANK_PAY_STATUS_NAME[1] },
            { number: '2',      text: Core.Const.BANK_PAY_STATUS_NAME[2] },
            { number: '3',      text: Core.Const.BANK_PAY_STATUS_NAME[3] },
            { number: '-1',      text: Core.Const.BANK_PAY_STATUS_NAME["-1"] },
        ];
        vm.companyTypeList = [
            {name: "全部", number: ""},
            { name: Core.Const.TRADE_COMPANY_TYPE[1], number: 1 },
            { name: Core.Const.TRADE_COMPANY_TYPE[2], number: 2 },
            { name: Core.Const.TRADE_COMPANY_TYPE[3], number: 3 }
        ];
        vm.paySubjectList = [
            { name: "全部", number: ""},
            { name: Core.Const.BANK_PAY_SUBJECT[1], number: 1},
            { name: Core.Const.BANK_PAY_SUBJECT[2], number: 2},
            { name: Core.Const.BANK_PAY_SUBJECT[3], number: 3},
            { name: Core.Const.BANK_PAY_SUBJECT[101], number: 101},
            { name: Core.Const.BANK_PAY_SUBJECT[102], number: 102},
            { name: Core.Const.BANK_PAY_SUBJECT[103], number: 103},
            { name: Core.Const.BANK_PAY_SUBJECT[201], number: 201},
        ];

        vm.$watch('companyTypeList.selected', function(newVal, oldVal, scope) {
            if (newVal && (newVal.number == 2 || newVal.number == 3)) {
                vm.searchInputStatus = true;
            }
            else
            {
                vm.searchInputStatus = false;
            }
        });

        vm.clearSearchOptions = clearSearchOptions;

        getExpressCompanyList();

        function getExpressCompanyList() {
            Core.Api.Express.getCompanyList().then(
                function (data) {
                    vm.expressCompanyList = data.express_company_list;

                    vm.expressCompanyList.unshift({id: "", name: "全部"});

                    getWaybillList();
                },
                function (reason) {
                    Core.Notify.error('reason ' + reason.message);
                }
            )
        }

        vm.getWaybillList = getWaybillList;
        vm.pageChanged = getWaybillList;

        function clearSearchOptions() {
            vm.date = {
                start: "",
                end: ""
            };
            vm.companyTypeList.selected = "";
            vm.payStatusList.selected = "";
            vm.paySubjectList.selected = "";
            vm.search = {
                companyName: ""
            };

            getWaybillList();
        }

        function getWaybillList() {

            var startDate = "", endDate = "";
            if (vm.date.start)
            {
                startDate = vm.date.start.format("YYYY-MM-DD");
            }
            if (vm.date.end)
            {
                endDate = vm.date.end.format("YYYY-MM-DD");
            }
            var payStatus = "";
            if (vm.payStatusList.selected)
            {
                payStatus = vm.payStatusList.selected.number;
            }
            var subject = "";
            if (vm.paySubjectList.selected) {
                subject = vm.paySubjectList.selected.number;
            }

            var companyType = "";
            if (vm.companyTypeList.selected)
            {
                companyType = vm.companyTypeList.selected.number;
            }

            if (companyType == 2 || companyType == 3) {
                if (!vm.search.companyName) {
                    Core.Notify.error('请输入公司名进行搜索');
                    return false;
                }
            }

            Core.Api.Finance.getTradeListIn(
                vm.currentPage,
                startDate,
                endDate,
                payStatus,
                subject,
                companyType,
                vm.search.companyName
            ).then(
                function(response) {
                    vm.tradeList = response.trade_list;

                    vm.count = response.count;
                    vm.totalPage = parseInt(vm.count / vm.pageSize) + (vm.count % vm.pageSize ? 1 : 0);
                },
                function(reason) {
                    Core.Notify.error(reason.message);
                }
            );
        }
    }
})();
/**
 * Created by whis on 5/5/16.
 */
(function(){
    angular
        .module('app')
        .controller('TradeLogListController', ['$scope', '$stateParams', '$templateCache', '$uibModal', 'Core', TradeLogListController]);


    function TradeLogListController($scope, $stateParams, $templateCache, $uibModal, Core)
    {
        var vm = $scope;

        //分页初始化设置
        vm.count = 0;
        vm.currentPage = 1;
        vm.pageSize = 20;
        vm.totalPage = 0;

        vm.tradeId = $stateParams.tradeId;

        vm.goBack = goBack;

        getTradeLogList();

        function getTradeLogList() {

            Core.Api.Clearing.getWaybillTradeLogList(
                vm.tradeId
            ).then(
                function(response) {
                    vm.logList = response.log_list;
                },
                function(reason) {
                    Core.Notify.error(reason.message);
                }
            );
        }

        function goBack()
        {
            Core.$window.history.back();
        }
    }
})();
/**
 * Created by whis on 5/5/16.
 */
(function () {
    angular
        .module('app')
        .controller('FinanceTradeOutController', ['$scope', '$templateCache', '$uibModal', 'Core', FinanceTradeOutController]);


    function FinanceTradeOutController($scope, $templateCache, $uibModal, Core) {
        var vm = $scope;

        //分页初始化设置
        vm.count = 0;
        vm.currentPage = 1;
        vm.pageSize = 20;
        vm.totalPage = 0;

        vm.searchInputStatus = false;
        vm.date = {
            start: '',
            end: ''
        };
        vm.search = {
            companyName: ""
        };
        vm.payStatusList = [
            {number: "", text: "全部"},
            {number: '0', text: Core.Const.BANK_PAY_STATUS_NAME[0]},
            {number: '1', text: Core.Const.BANK_PAY_STATUS_NAME[1]},
            {number: '2', text: Core.Const.BANK_PAY_STATUS_NAME[2]},
            {number: '3', text: Core.Const.BANK_PAY_STATUS_NAME[3]},
            {number: '-1', text: Core.Const.BANK_PAY_STATUS_NAME["-1"]},
        ];
        vm.companyTypeList = [
            {name: "全部", number: ""},
            {name: Core.Const.TRADE_COMPANY_TYPE[1], number: 1},
            {name: Core.Const.TRADE_COMPANY_TYPE[2], number: 2},
            {name: Core.Const.TRADE_COMPANY_TYPE[3], number: 3}
        ];
        vm.paySubjectList = [
            {name: "全部", number: ""},
            {name: Core.Const.BANK_PAY_SUBJECT[1], number: 1},
            {name: Core.Const.BANK_PAY_SUBJECT[2], number: 2},
            {name: Core.Const.BANK_PAY_SUBJECT[3], number: 3},
            {name: Core.Const.BANK_PAY_SUBJECT[101], number: 101},
            {name: Core.Const.BANK_PAY_SUBJECT[102], number: 102},
            {name: Core.Const.BANK_PAY_SUBJECT[103], number: 103},
            {name: Core.Const.BANK_PAY_SUBJECT[201], number: 201},
        ];

        vm.$watch('companyTypeList.selected', function (newVal, oldVal, scope) {
            if (newVal && (newVal.number == 2 || newVal.number == 3)) {
                vm.searchInputStatus = true;
            }
            else {
                vm.searchInputStatus = false;
            }
        });

        vm.clearSearchOptions = clearSearchOptions;

        getExpressCompanyList();

        function getExpressCompanyList() {
            Core.Api.Express.getCompanyList().then(
                function (data) {
                    vm.expressCompanyList = data.express_company_list;

                    vm.expressCompanyList.unshift({id: "", name: "全部"});
                    getWaybillList();
                },
                function (reason) {
                    Core.Notify.error('reason ' + reason.message);
                }
            )
        }

        vm.getWaybillList = getWaybillList;
        vm.pageChanged = getWaybillList;

        function clearSearchOptions() {

            vm.date = {
                start: "",
                end: ""
            };
            vm.companyTypeList.selected = "";
            vm.payStatusList.selected = "";
            vm.paySubjectList.selected = "";
            vm.search = {
                companyName: ""
            };

            getWaybillList();
        }

        function getWaybillList() {

            var startDate = "", endDate = "";
            if (vm.date.start) {
                startDate = vm.date.start.unix();
            }
            if (vm.date.end) {
                endDate = vm.date.end.unix();
            }
            var payStatus = "";
            if (vm.payStatusList.selected)
            {
                payStatus = vm.payStatusList.selected.number;
            }
            var subject = "";
            if (vm.paySubjectList.selected) {
                subject = vm.paySubjectList.selected.number;
            }

            var companyType = "";
            if (vm.companyTypeList.selected)
            {
                companyType = vm.companyTypeList.selected.number;
            }

            if (companyType == 2 || companyType == 3) {
                if (!vm.search.companyName) {
                    Core.Notify.error('请输入公司名进行搜索');
                    return false;
                }
            }

            Core.Api.Finance.getTradeListOut(
                vm.currentPage,
                startDate,
                endDate,
                payStatus,
                subject,
                companyType,
                vm.search.companyName
            ).then(
                function (response) {
                    vm.tradeList = response.trade_list;

                    vm.count = response.count;
                    vm.totalPage = parseInt(vm.count / vm.pageSize) + (vm.count % vm.pageSize ? 1 : 0);
                },
                function (reason) {
                    Core.Notify.error(reason.message);
                }
            )
        }
    }
})();
/**
 * Created by whis on 5/5/16.
 */
(function(){
    angular
        .module('app')
        .controller('TradeRequestListController', ['$scope', '$stateParams', '$templateCache', '$uibModal', 'Core', TradeRequestListController]);


    function TradeRequestListController($scope, $stateParams, $templateCache, $uibModal, Core)
    {
        var vm = $scope;

        //分页初始化设置

        vm.tradeId = $stateParams.tradeId;

        vm.goBack = goBack;
        vm.jsonFormat = jsonFormat;

        getTradeRequestList();

        function getTradeRequestList() {

            Core.Api.Clearing.getWaybillTradeRequestList(
                vm.tradeId
            ).then(
                function(response) {
                    vm.requestList = response.request_list;

                },
                function(reason) {
                    Core.Notify.error(reason.message);
                }
            );
        }

        function goBack()
        {
            Core.$window.history.back();
        }

        function jsonFormat(data) {
            data = data ? data : null;
            var uibModal = Core.$uibModal.open({
                templateUrl: 'admin/json-format/json-format-modal.html',
                controller: 'JsonFormatController',
                resolve: {
                    data: function () {
                        return data;
                    }
                }
            });

            uibModal.result.then(function (data) {

            }, function () {
                Core.Log.d('Modal dismissed at: ' + new Date());
            });
        }
    }
})();
/**
 * Created by whis on 7/7/16.
 */
(function () {
    angular
        .module('app')
        .controller('JsonFormatController', ['$scope', '$uibModalInstance', 'Core', 'data', JsonFormatController]);


    function JsonFormatController($scope, $uibModalInstance, Core, data) {
        var vm = $scope;

        vm.save = save;
        vm.cancel = cancel;

        console.log(data);
        var jsonString = $.format(data,  {method: 'json'});
    console.log(jsonString);
        vm.data = jsonString;

        function save() {
            

            $uibModalInstance.close();
        }

        function cancel() {
            console.log('cancel');
            $uibModalInstance.dismiss('cancel');
        }

    }
})();
(function(){
    angular
        .module('app')
        .controller('InsuranceWaybillListController', ['$scope', '$uibModal', 'Core', InsuranceWaybillListController]);


    function InsuranceWaybillListController($scope, $uibModal, Core) {
        var vm = $scope;
        var isFirst = true;
        //分页初始化
        vm.count = 0;
        vm.currentPage = 1;
        vm.pageSize = 20;
        vm.totalPage = 0;
        
        vm.date = {
            start: "",
            end: ""
        };
        
        vm.search = {
            waybillSn: ""  
        };

        vm.getInsuranceWaybillList = getInsuranceWaybillList;
        vm.pageChanged = getInsuranceWaybillList;
        vm.clearSearchOptions = clearSearchOptions;

        vm.$watch('currentPage', function () {
            if(isFirst){
                isFirst = false;
                return;
            }
            Core.Data.set('currentPage', '');
        });

        Core.on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (fromState.name == 'waybill.detail' && fromParams.page) {
                Core.Data.set('currentPage', fromParams.page)
            } else {
                Core.Data.set('currentPage', '')
            }

        });

        getInsuranceWaybillList();

        function clearSearchOptions(){
            vm.date = {
                start: "",
                end: ""
            };
            vm.search.waybillSn = "";

            getInsuranceWaybillList();
        }

        function getInsuranceWaybillList() {

            var start = "", end = "";
            if (vm.date.start) {
                start = vm.date.start.format('YYYY-MM-DD');
            }
            if (vm.date.end) {
                end = vm.date.end.format('YYYY-MM-DD');
            }
            var currentPage = Core.Data.get('currentPage') ? Core.Data.get('currentPage') : vm.currentPage;
            Core.Api.Insurance.getInsuranceWaybillList(
                currentPage,
                start,
                end,
                vm.search.waybillSn
            ).then(
                function (data) {
                    vm.waybillList = data.waybill_list;

                    vm.count = data.count;
                    vm.totalPage = parseInt(vm.count / vm.pageSize) + (vm.count % vm.pageSize ? 1 : 0);
                    vm.currentPage = currentPage;
                },
                function (reason) {
                    Core.Notify.error('reason ' + reason.message);
                }
            )
        }
    } 
})();
(function(){
    angular
        .module('app')
        .controller('PolicyWaybillController', ['$scope', '$stateParams', 'Core', PolicyWaybillController]);


    function PolicyWaybillController($scope, $stateParams, Core)
    {
        var vm = $scope;

        vm.merchantId = $stateParams.merchantId;

        vm.count = 0;
        vm.currentPage = 1;
        vm.pageSize = 20;
        vm.totalPage = 0;

        getMerchantList();

        function getMerchantList() {

            Core.Api.Insurance.getInsuranceList().then(
                function (data) {
                    vm.waybillList = data.list;
                },
                function (reason) {
                    Core.Notify.error('reason ' + reason.message);
                }
            )
        }
    } 
})();
(function(){
    angular
        .module('app')
        .controller('LoginController', ['$scope', '$templateCache', 'Core', LoginController]);


    function LoginController($scope, $templateCache, Core) {
        var vm = $scope;

        vm.username = '';
        vm.password = '';

        vm.login = login;
        vm.goToAppLaunch = goToAppLaunch;

        function login() {
            var username = vm.username;
            var password = vm.password;
            Core.Api.Admin.login(username, password).then(
                function (data) {
                    Core.Data.setToken(data.token);
                    Core.Data.setUser(data.admin);

                    Core.publish(Core.Const.EVENT.REFRESH_NAV_AUTH_LIST);
                    
                    Core.Notify.success('登录成功');

                    console.log('go to main');

                    Core.Data.setUserType(Core.Config.DATA.APP_USER_TYPE.APP_USER_TYPE_ADMIN);
                    Core.$state.go('admin.home');
                },
                function (error) {
                    Core.Notify.error(error.message);
                }
            );
        }

        function goToAppLaunch()
        {
            Core.localStorageService.set(Core.Config.DATA.APP_USER_TYPE, "");
            Core.localStorageService.set(Core.Config.DATA.KEY_APP_LAUNCH_INIT_ID, "");

            Core.$window.location.href = "index.html";
        }
    }
})();
(function(){
    angular
        .module('app')
        .controller('admin.HomeController', ['$scope', '$templateCache', '$interval', 'Core', HomeController]);


    function HomeController($scope, $templateCache, $interval, Core) {
        var vm = $scope;
        // console.log($templateCache.info() + 'transport');

        Core.on(Core.Const.EVENT.REFRESH_CURRENT_PAGE, function (event, data) {
            Core.$state.reload();
        });

        vm.currentPage = 1;
        vm.stripTags = Core.Util.stripTags;

        getPostList(); 

        function getPostList() {
            Core.Api.Post.getPostList(vm.currentPage, 1).then(
                function (responseData) {
                    vm.postList = responseData.post_list;
                },
                function (error) { 
                    Core.Notify.error('获取新闻列表失败');
                }
            );
        }
    }
})();
(function () {
    angular
        .module('app')
        .controller('MerchantDetailController', ['$scope', '$stateParams', 'Core', MerchantDetailController]);


    function MerchantDetailController($scope, $stateParams, Core) {
        var vm = $scope;

        vm.merchantId = $stateParams.merchantId;

        vm.goBack = goBack;
        vm.openEditModal = openEditModal;

        getCollectAreaDetail();

        function getCollectAreaDetail() {
            Core.Api.Merchant.getMerchantDetail(vm.merchantId).then(
                function (data) {
                    vm.merchantDetail = data.detail;

                    console.log(data.detail);
                },
                function (reason) {
                    Core.Notify.error('reason ' + reason.message);
                }
            );
        }

        function openEditModal(data) {
            data = data ? data : null;
            var uibModal = Core.$uibModal.open({
                templateUrl: 'admin/merchant/edit-modal.html',
                controller: 'EditController',
                resolve: {
                    data: function () {
                        return data;
                    }
                }
            });

            uibModal.result.then(function (data) {
                Core.$timeout(function(){
                    Core.$state.reload();
                }, 200);
            }, function () {
                Core.Log.d('Modal dismissed at: ' + new Date());
            });
        }

        function goBack() {
            Core.$window.history.back();
        }
    }
})();
(function(){
    angular
        .module('app')
        .controller('EditController', ['$scope', '$templateCache', '$uibModalInstance', 'Core', 'data', EditController]);


    function EditController($scope, $templateCache, $uibModalInstance, Core, data)
    {
        var vm = $scope;

        vm.areaList = [
            {id: 0, name: '1区'},
            {id: 1, name: '2区'},
            {id: 2, name: '北区'}
        ];

        vm.statusList = [
            {id: 0, name: '未认证'},
            {id: 1, name: '已认证'},
            {id: 2, name: '已冻结'}
        ];

        var statusTextArr = ['未认证', '已认证', '已冻结'];
        vm.statusSelect = {selected: {id: data ? data.status : 1, name: data ? statusTextArr[data.status] : ""}};

        vm.saveData = {
            merchantId: data ? data.id : 0,
            name: data ? data.name : "",
            username: data ? data.username : "",
            legalPersonName: data ? data.legal_person_name : "",
            phone: data ? data.phone : "",
            boothNumber: data ? data.booth_number : "",
            businessScope: data ? data.business_scope : ""
        };

        vm.date = {
            registerTime: data ? moment(Core.Util.date('Y-m-d', data.register_time)) : ""
        };

        getCollectAreaList();

        function getCollectAreaList() {

            Core.Api.Collect.getAreaList().then(
                function (response) {
                    vm.collectAreaList = response.list;

                    vm.collectAreaList.selected = data ? data.collect_area : "";
                },
                function (reason) {
                    Core.Notify.error('reason ' + reason.message);
                }
            )
        }

        vm.save = save;
        vm.cancel = cancel;

        function save() {

            var saveData = vm.saveData;
            var registerTime = 0;
            if (vm.date.registerTime)
            {
                registerTime = vm.date.registerTime.unix();
            }

            var areaId = 0;
            if (vm.collectAreaList.selected)
            {
                areaId = vm.collectAreaList.selected.id;
            }
            var status = 1;
            if (vm.statusSelect.selected)
            {
                status = vm.statusSelect.selected.id;
            }

            Core.Api.Merchant.saveMerchant(
                saveData.merchantId,
                saveData.name,
                saveData.username,
                saveData.legalPersonName,
                saveData.phone,
                areaId,
                saveData.boothNumber,
                registerTime,
                status,
                saveData.businessScope
            ).then(
                function (data) {
                    Core.Notify.success('保存成功');
                }, function (reason) {
                    Core.Notify.error('save error');
                }
            );

            $uibModalInstance.close();
        };

        function cancel() {
            console.log('cancel');
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
(function () {
    angular
        .module('app')
        .controller('MerchantController', ['$scope', '$uibModal', 'Core', MerchantController]);


    function MerchantController($scope, $uibModal, Core) {
        var vm = $scope;

        vm.count = 0;
        vm.currentPage = 1;
        vm.pageSize = 20;
        vm.totalPage = 0;
        
        vm.merchantList = [];

        vm.search = {
            name: "",
            phone: "",
            merchantCode: ""
        };


        vm.pageChanged = getMerchantList;
        vm.openModalOfEdit = openModalOfEdit;
        vm.getMerchantList = getMerchantList;
        vm.showConfirmModal = showConfirmModal;
        vm.clearSearchOptions = clearSearchOptions;

        getMerchantList();

        function clearSearchOptions()
        {
            vm.search = {
                name: "",
                phone: "",
                merchantCode: ""
            };

            getMerchantList();
        }


        function getMerchantList() {

            var name = vm.search.name ? vm.search.name : '';
            var phone = vm.search.phone ? vm.search.phone : "";
            var merchantCode = vm.search.merchantCode ? vm.search.merchantCode : "";

            Core.Api.Merchant.getMerchantList(
                vm.currentPage,
                '',
                name,
                phone,
                merchantCode
            ).then(
                function (data) {
                    vm.merchantList = data.company_list;

                    vm.search = {
                        name: data.name,
                        phone: data.phone,
                        merchantCode: data.id ? data.id: "",
                    };

                    vm.count = data.count;
                    vm.totalPage = parseInt(vm.count / vm.pageSize) + (vm.count % vm.pageSize ? 1 : 0);
                },
                function (reason) {
                    Core.Notify.error('reason ' + reason.message);
                }
            )
        }

        function openModalOfEdit(data) {
            data = data ? data : null;
            var uibModal = Core.$uibModal.open({
                templateUrl: 'admin/merchant/edit-modal.html',
                controller: 'EditController',
                resolve: {
                    data: function () {
                        return data;
                    }
                }
            });

            uibModal.result.then(function (data) {
                Core.$timeout(function(){
                    Core.$state.reload();
                }, 200);
            }, function () {
                Core.Log.d('Modal dismissed at: ' + new Date());
            });
        }

        function showConfirmModal(type, id) {
            var uibModal = Core.$uibModal.open({
                templateUrl: 'admin/public-modal/confirm-modal.html',
                controller: 'ConfirmModalController',
                resolve: {
                    type: function () {
                        return type;
                    },
                    id: function () {
                        return id;
                    }
                }
            });

            uibModal.result.then(function (data) {
                Core.$timeout(function(){
                    Core.$state.reload();
                }, 200);
            }, function () {
                Core.Log.d('Modal dismissed at: ' + new Date());
            });
        }
    }
})();
(function(){
    angular
        .module('app')
        .controller('MerchantWaybillController', ['$scope', '$templateCache', 'Core', '$stateParams', MerchantWaybillController]);


    function MerchantWaybillController($scope, $templateCache, Core, $stateParams)
    {
        var vm = $scope;
        var isFirst = true;
        vm.merchantId = $stateParams.merchantId;

        vm.count = 0;
        vm.currentPage = 1;
        vm.pageSize = 20;
        vm.totalPage = 0;

        getMerchantWaybillList();
        
        vm.waybillList = [];
        vm.$watch('currentPage', function () {
            if(isFirst){
                isFirst = false;
                return;
            }
            Core.Data.set('currentPage', '');
        });

        Core.on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (fromState.name == 'waybill.detail' && fromParams.page) {
                Core.Data.set('currentPage', fromParams.page)
            } else {
                Core.Data.set('currentPage', '')
            }

        });

        function getMerchantWaybillList() {
            console.log(vm.scheduleId);
            var currentPage = Core.Data.get('currentPage') ? Core.Data.get('currentPage') : vm.currentPage;
            Core.Api.Waybill.getWaybillListofMerchant(vm.merchantId, currentPage).then(
                function (data) {
                    vm.waybillList = data.waybill_list;
                    vm.count = data.count;
                    vm.currentPage = currentPage;
                },
                function (reason) {
                    Core.Notify.error(reason.message);
                }
            )
        }

    }
})();
(function(){
    angular
        .module('app')
        .controller('PostDetailController', ['$scope', '$uibModal', '$stateParams', 'Core', PostDetailController]);


    function PostDetailController($scope, $uibModal, $stateParams, Core)
    {
        var vm = $scope;

        vm.postId = $stateParams.postId;

        vm.goBack = goBack;

        if (vm.postId && vm.postId > 0)
        {
            getPostDetail();
        }

        function getPostDetail() {
            Core.Api.Post.getPostDetail(vm.postId).then(
                function (responseData) {
                    vm.post = responseData;
                },
                function (error) {
                    Core.Notify.error('获取详情失败');
                    return false;
                }
            );
        }
  
        function goBack()
        {
            Core.$window.history.back();
        }
    }
})();
(function(){
    angular
        .module('app')
        .controller('WaybillShippingPrintController', ['$scope', '$stateParams', '$uibModal', 'Core', WaybillShippingPrintController]);
    
    function WaybillShippingPrintController($scope, $stateParams, $uibModal, Core)
    {
        var vm = $scope;

        //分页初始化设置
        vm.count = 0;
        vm.currentPage = 1;
        vm.pageSize = 20;
        vm.totalPage = 0;
        
        vm.transportId = $stateParams.transportId;

        vm.printPage = printPage;

        getWaybillShippingPrintByTransportId();

        function getWaybillShippingPrintByTransportId()
        {
            Core.Api.Loading.printWaybillShippingLabelList(vm.transportId).then(
                function (data) {
                    vm.waybillList = data.list;

                    vm.transportInfo = data.transport_info;
                },
                function (reason) {
                    Core.Notify.error(reason.message);
                }
            )
        }

        function printPage()
        {
            var newStr = document.getElementById('print-content').innerHTML;
            var oldStr = document.body.innerHTML;
            
            document.body.innerHTML = newStr;
            Core.$window.print();
            document.body.innerHTML = oldStr;

            Core.$window.close();
            return false;
        }
    }
})();
(function () {
    angular
        .module('app')
        .controller('ConfirmModalController', ['$scope', '$uibModalInstance', 'Core', 'type', 'id', ConfirmModalController]);


    function ConfirmModalController($scope, $uibModalInstance, Core, type, id) {
        var vm = $scope;

        vm.type = type;
        vm.id = id;

        vm.save = save;
        vm.cancel = cancel;

        function save() {
            var url = "";
            switch (vm.type)
            {
                case 'delete_waybill':
                    url = Core.Api.Waybill.deleteWaybill(id);
                    break;
                case 'frozen_express_company':
                    url = Core.Api.Express.changeCompanyStatus(id, Core.Const.EXPRESS_COMPANY_STATUS.STATUS_FROZEN);
                    break;
                case 'unfrozen_express_company':
                    url = Core.Api.Express.changeCompanyStatus(id, Core.Const.EXPRESS_COMPANY_STATUS.STATUS_AUTH);
                    break;
                case 'company_auth_pass':
                    url = Core.Api.Express.changeCompanyStatus(id, Core.Const.EXPRESS_COMPANY_STATUS.STATUS_AUTH);
                    break;
                case 'frozen_account':
                    //解冻解封操作
                    url = Core.Api.Merchant.changeStatus(id, 2);
                    break;
                case 'unfrozen_account':
                    url = Core.Api.Merchant.changeStatus(id, 1);
                    break;
                case 'check_success':
                    url = Core.Api.Merchant.changeStatus(id, 1);
                    break;
                case 'delete_express_router':
                    url = Core.Api.Express.deleteRoute(id);
                    break;
                case 'delete_express_branch':
                    url = Core.Api.Express.deleteBranch(id);
                    break;
                case  'delete_department':
                    url = Core.Api.System.deleteDepartment(id);
                    break;
                case 'delete_role':
                    url = Core.Api.System.deleteRole(id);
                    break;
                case 'delete_admin':
                    url = Core.Api.System.deleteAdmin(id);
                    break;
                case 'delete_vehicle':
                    url = Core.Api.System.deletePdaDevice(id);
                    break;
                case 'delete_img_slider':
                    url = Core.Api.Ad.deleteImgSlider(id);
                    break;
                case 'delete_area':
                    url = Core.Api.Collect.deleteArea(id);
                    break;
                case 'delete_collect_user':
                    url = Core.Api.Collect.deleteUser(id);
                    break;
                case 'delete_post': 
                    url = Core.Api.Post.deletePost(id);
                    break;
                case 'logout':
                    url = '';
                    Core.Data.clearAuthData();
                    Core.$state.go('login');
                    break;
                default:
                    Core.Notify.error('未设置');
                    return false;
                    break
            }
            if(url){
                url.then(
                    function (data) {

                    },
                    function (reason) {
                        Core.Notify.error('reason ' + reason.message);
                    }
                );
            }
            $uibModalInstance.close();
        }

        function cancel() {
            console.log('cancel');
            $uibModalInstance.dismiss('cancel');
        }

    }
})();
(function(){
    angular
        .module('app')
        .controller('ReportCollectController', ['$scope', '$uibModal', 'Core', ReportCollectController]);


    function ReportCollectController($scope, $uibModal, Core)
    {
        var vm = $scope;

        //分页初始化设置
        vm.count = 0;
        vm.currentPage = 1;
        vm.pageSize = 20;
        vm.totalPage = 0;

        vm.pdaUserList = [];
        vm.date = {
            start: '',
            end: '',
        }; 
        vm.search = {
            collectUser: ""
        };
        
        vm.getCollectUserStatList = getCollectUserStatList;
        vm.pageChanged = getCollectUserStatList;
        vm.clearSearchOptions = clearSearchOptions;

        getCollectUserStatList();
        getCollectUserList();

        function clearSearchOptions()
        {
            vm.date = {
                start: '',
                end: '',
            };
            vm.search = {
                collectUser: ""
            };
            vm.pdaUserList.selected = null;

            getCollectUserStatList();
        }

        function getCollectUserList()
        {
            Core.Api.Collect.getUserAllList().then(
                function (responseData) {
                    vm.pdaUserList = responseData.list;
                    vm.pdaUserList.unshift({id: "", name: "全部"});
                },
                function (error) {
                    Core.Notify.error(error.message);
                }
            );
        }

        function getCollectUserStatList(isExport) {

            var collectUserId = "";
            if (vm.pdaUserList.selected) {
                collectUserId = vm.pdaUserList.selected.id;
            }

            var startDate = 0, endDate = 0;
            if (vm.date.start)
            {
                startDate = vm.date.start.format("YYYY-MM-DD");
            }
            if (vm.date.end)
            {
                endDate = vm.date.end.format("YYYY-MM-DD");
            }

            if (isExport)
            {
                var data = {
                    page: vm.currentPage,
                    begin_date: startDate,
                    end_date: endDate,
                    pda_user_id: collectUserId,
                };

                Core.$window.location.href = Core.Api.getUrl('report/waybill-list-of-collect-export', data);
            }
            else
            {
                Core.Api.Report.getWaybillOfCollect(
                    vm.currentPage,
                    startDate,
                    endDate,
                    collectUserId
                ).then(
                    function (response) {
                        vm.collectList = response.pda_user_list;

                        vm.collectStat = response.stat;

                        vm.count = response.count;
                        vm.totalPage = parseInt(vm.count / vm.pageSize) + (vm.count % vm.pageSize ? 1 : 0);
                    },
                    function (reason) {
                        Core.Notify.error('reason ' + reason.message);
                    }
                )
            }
        }
    } 
})();
(function(){
    angular
        .module('app')
        .controller('ReportExpressController', ['$scope', 'Core', ReportExpressController]);


    function ReportExpressController($scope, Core)
    {
        var vm = $scope;
        var isFirst = true;
        //分页初始化设置
        vm.count = 0;
        vm.currentPage = 1;
        vm.pageSize = 20;
        vm.totalPage = 0;

        vm.date = {
            start: '',
            end: '',
        };

        vm.expressCompanyList = [];
        vm.expressBranchList = [];

        vm.getWaybillOfExpress = getWaybillOfExpress;
        vm.pageChanged = getWaybillOfExpress;
        vm.clearSearchOptions = clearSearchOptions;

        vm.$watch('currentPage', function () {
            if(isFirst){
                isFirst = false;
                return;
            }
            Core.Data.set('currentPage', '');
        });

        Core.on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (fromState.name == 'waybill.detail' && fromParams.page) {
                Core.Data.set('currentPage', fromParams.page)
            } else {
                Core.Data.set('currentPage', '')
            }

        });

        getExpressCompanyList();
        getExpressBranchList();

        getWaybillOfExpress();

        function clearSearchOptions()
        {
            vm.date = {
                start: '',
                end: '',
            };
            vm.expressCompanyList.selected = null;
            vm.expressBranchList = null;

            getWaybillOfExpress();
        }

        function getExpressCompanyList()
        {
            Core.Api.Express.getCompanyList("", "", "", "").then(
                function (data) {
                    vm.expressCompanyList = data.express_company_list;
                    vm.expressCompanyList.unshift({id: 0, name: '全部'});
                },
                function (reason) {
                    Core.Notify.error('reason ' + reason.message);
                }
            )
        }

        function getExpressBranchList()
        {
            Core.Api.Express.getBranchList(1, "", "", "").then(
                function (data) {
                    vm.expressBranchList = data.express_branch_list;
                    vm.expressBranchList.unshift({id: "", name: "全部"});
                },
                function (reason) {
                    Core.Notify.error('reason ' + reason.message);
                }
            )
        }

        function getWaybillOfExpress(isExport) {

            var startDate = 0, endDate = 0;
            if (vm.date.start)
            {
                startDate = vm.date.start.format("YYYY-MM-DD");
            }
            if (vm.date.end)
            {
                endDate = vm.date.end.format("YYYY-MM-DD");
            }
            var expressCompanyId = "";
            if (vm.expressCompanyList.selected)
            {
                expressCompanyId = vm.expressCompanyList.selected.id;
            }
            var branchName = "";
            if (vm.expressBranchList.selected)
            {
                branchName = vm.expressBranchList.selected.name;
            }
            var currentPage = Core.Data.get('currentPage') ? Core.Data.get('currentPage') : vm.currentPage;
            if (isExport)
            {
                var data = {
                    page: currentPage,
                    begin_date: startDate,
                    end_date: endDate,
                    express_company_id: expressCompanyId,
                    express_company_branch_name: branchName
                };

                Core.$window.location.href = Core.Api.getUrl('report/waybill-list-of-express-export', data);
            }
            else
            {
                Core.Api.Report.getWaybillOfExpress(
                    currentPage,
                    startDate,
                    endDate,
                    expressCompanyId,
                    branchName
                ).then(
                    function (response) {
                        vm.waybillList = response.waybill_list;

                        vm.waybillStat = response.stat;

                        vm.count = response.count;
                        vm.totalPage = parseInt(vm.count / vm.pageSize) + (vm.count % vm.pageSize ? 1 : 0);
                        vm.currentPage = currentPage;
                    },
                    function (reason) {
                        Core.Notify.error('reason ' + reason.message);
                    }
                )
            }
        }
    } 
})();
(function () {
    angular
        .module('app')
        .controller('ReportMarketController', ['$scope', '$uibModal', 'Core', ReportMarketController]);


    function ReportMarketController($scope, $uibModal, Core) {
        var vm = $scope;
        var isFirst = true;
        //分页初始化设置
        vm.count = 0;
        vm.currentPage = 1;
        vm.pageSize = 20;
        vm.totalPage = 0;

        vm.expressCompanyList = [];
        vm.date = {
            start: '',
            end: '',
        };
        vm.search = {
            from_company_name: ""
        };

        vm.getWaybillListOfMarket = getWaybillListOfMarket;
        vm.pageChanged = getWaybillListOfMarket;
        vm.clearSearchOptions = clearSearchOptions;


        vm.$watch('currentPage', function () {
            if (isFirst) {
                isFirst = false;
                return;
            }
            Core.Data.set('currentPage', '');
        });

        Core.on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (fromState.name == 'waybill.detail' && fromParams.page) {
                Core.Data.set('currentPage', fromParams.page)
            } else {
                Core.Data.set('currentPage', '')
            }
        });

        getExpressCompanyList();
        getWaybillListOfMarket();

        function clearSearchOptions() {
            vm.date = {
                start: '',
                end: '',
            };
            vm.search = {
                from_company_name: ""
            };

            vm.expressCompanyList.selected = null;

            getWaybillListOfMarket();
        }

        function getExpressCompanyList() {

            Core.Api.Express.getCompanyList().then(
                function (data) {
                    vm.expressCompanyList = data.express_company_list;
                    vm.expressCompanyList.unshift({id: 0, name: '全部'});
                },
                function (reason) {
                    Core.Notify.error('reason ' + reason.message);
                }
            )
        }

        function getWaybillListOfMarket(isExport) {

            var fromCompanyName = vm.search.from_company_name ? vm.search.from_company_name : "";

            var startDate = 0, endDate = 0;
            if (vm.date.start) {
                startDate = vm.date.start.format("YYYY-MM-DD");
            }
            if (vm.date.end) {
                endDate = vm.date.end.format("YYYY-MM-DD");
            }
            var expressCompanyId = 0;
            if (vm.expressCompanyList.selected) {
                expressCompanyId = vm.expressCompanyList.selected.id;
            }
            var currentPage = Core.Data.get('currentPage') ? Core.Data.get('currentPage') : vm.currentPage;
            if (isExport) {
                var data = {
                    page: currentPage,
                    begin_date: startDate,
                    end_date: endDate,
                    express_company_id: expressCompanyId,
                    from_company_name: fromCompanyName
                };

                Core.$window.location.href = Core.Api.getUrl('report/waybill-list-of-market-export', data);
            }
            else {

                Core.Api.Report.getWaybillOfMarket(
                    currentPage,
                    startDate,
                    endDate,
                    expressCompanyId,
                    fromCompanyName
                ).then(
                    function (response) {
                        vm.waybillList = response.waybill_list;

                        vm.waybillStat = response.stat;

                        vm.count = response.count;
                        vm.totalPage = parseInt(vm.count / vm.pageSize) + (vm.count % vm.pageSize ? 1 : 0);
                        vm.currentPage = currentPage;
                    },
                    function (reason) {
                        Core.Notify.error(reason.message);
                    }
                );
            }
        }

    }
})();
(function(){
    angular
        .module('app')
        .controller('ReportMerchantController', ['$scope', '$uibModal', 'Core', ReportMerchantController]);


    function ReportMerchantController($scope, $uibModal, Core)
    {
        var vm = $scope;

        //分页初始化设置
        vm.count = 0;
        vm.currentPage = 1;
        vm.pageSize = 20;
        vm.totalPage = 0;

        vm.date = {
            start: '',
            end: '',
        };
        vm.search = {
            fromCompany: ""
        };

        vm.getMerchantStatList = getMerchantStatList;
        vm.pageChanged = getMerchantStatList;
        vm.clearSearchOptions = clearSearchOptions;

        getMerchantStatList();

        function clearSearchOptions()
        {
            vm.date = {
                start: '',
                end: '',
            };
            vm.search = {
                fromCompany: ""
            };

            getMerchantStatList();
        }

        function getMerchantStatList(isExport) {

            var fromCompany = vm.search.fromCompany ? vm.search.fromCompany : "";
            var startDate = 0, endDate = 0;
            if (vm.date.start)
            {
                startDate = vm.date.start.format("YYYY-MM-DD");
            }
            if (vm.date.end)
            {
                endDate = vm.date.end.format("YYYY-MM-DD");
            }

            if (isExport)
            {
                var data = {
                    page: vm.currentPage,
                    begin_date: startDate,
                    end_date: endDate,
                    merchant_name: fromCompany,
                };

                Core.$window.location.href = Core.Api.getUrl('report/company-list-of-merchant-export', data);
            }
            else
            {
                Core.Api.Report.getCompanyListOfMerchant(
                    vm.currentPage,
                    startDate,
                    endDate,
                    fromCompany
                ).then(
                    function (response) {
                        vm.merchantList = response.company_list;

                        vm.merchantStat = response.stat;

                        vm.count = response.count;
                        vm.totalPage = parseInt(vm.count / vm.pageSize) + (vm.count % vm.pageSize ? 1 : 0);
                    },
                    function (reason) {
                        Core.Notify.error('reason ' + reason.message);
                    }
                )
            }
        }
    } 
})();
(function(){
    angular
        .module('app')
        .controller('StatMarketController', ['$scope', '$uibModal', 'Core', StatMarketController]);


    function StatMarketController($scope, $uibModal, Core)
    {
        var vm = $scope;

        vm.date = {
            start: '',
            end: '',
        };
        
        vm.getWaybillStatOfMarket = getWaybillStatOfMarket;

        getWaybillStatOfMarket();

        function getWaybillStatOfMarket()
        {
            var start = 0,
                end = 0;
            if (vm.date.start)
            {
                start = vm.date.start.format("YYYY-MM-DD");
            }
            if (vm.date.end)
            {
                end = vm.date.end.format("YYYY-MM-DD");
            }

            Core.Api.Stat.getWaybillStatOfMarket(start, end).then(
                function (responseData) {

                    vm.nowMonthStat = {
                        waybillCount: responseData.now_month.waybill_count,
                        chargeSum: responseData.now_month.sum_charge,
                        codSum: responseData.now_month.sum_cod
                    };

                    loadChart(responseData.stat)
                },
                function (error) {
                    Core.Notify.error(reason.message);
                }
            );
        }

        function loadChart(stat)
        {
            var data_date = [];
            var data_waybill_count = [];
            var data_charge_sum = [];
            var data_cod_sum = [];

            for (var i in stat)
            {
                var item = stat[i];

                var dates = i.split('-');
                var date = new Date(dates[0], dates[1] - 1);

                data_date.push(date);
                data_waybill_count.push(parseInt(item.waybill_count));
                data_charge_sum.push(parseInt(item.sum_charge / 100.0));
                data_cod_sum.push(parseInt(item.sum_cod / 100.0));
            }

            c3.generate({
                bindto: '#chart-waybill',
                data: {
                    x: 'x',
                    columns: [
                        ['x'].concat(data_date),
                        ['运单数'].concat(data_waybill_count)
                    ],
                    colors: {
                        '运单数': '#1ab394',
                    },
                },
                axis: {
                    x: {
                        type: 'timeseries',
                        tick: {
                            format: '%Y-%m'
                        }
                    }
                }
            });

            c3.generate({
                bindto: '#chart-charge',
                data: {
                    x: 'x',
                    columns: [
                        ['x'].concat(data_date),
                        ['运费'].concat(data_charge_sum)
                    ],
                    colors: {
                        '运费': '#1ab394',
                    },
                },
                axis: {
                    x: {
                        type: 'timeseries',
                        tick: {
                            format: '%Y-%m'
                        }
                    }
                }
            });

            c3.generate({
                bindto: '#chart-cod',
                data: {
                    x: 'x',
                    columns: [
                        ['x'].concat(data_date),
                        ['代收款'].concat(data_cod_sum)
                    ],
                    colors: {
                        '代收款': '#1ab394',
                    },
                },
                axis: {
                    x: {
                        type: 'timeseries',
                        tick: {
                            format: '%Y-%m'
                        }
                    }
                }
            });
        }
    } 
})();
(function(){
    angular
        .module('app')
        .controller('EditAdminController', ['$scope', '$uibModalInstance', 'Core', 'data', EditAdminController]);


    function EditAdminController($scope, $uibModalInstance, Core, data)
    {
        var vm = $scope;

        vm.adminId = data ? data.id : 0;
        vm.saveData = {
            username: data ? data.username : "",
            password: "",
            againPassword: "",
            name: data ? data.name : "",
        };

        vm.createNewAdmin = data ? false : true;
        
        vm.save = save;
        vm.cancel = cancel;

        init();

        function init()
        {
            Core.Api.System.getDepartmentList().then(
                function (response) {
                    vm.departmentList = response.list;

                    vm.departmentList.selected = data ? data.department : "";
                },
                function (reason) {
                    Core.Notify.error('reason ' + reason.message);
                }
            );

            Core.Api.System.getRoleList().then(
                function (response) {
                    vm.roleList = response.list;

                    vm.roleList.selected = data ? data.role : "";
                },
                function (reason) {
                    Core.Notify.error('reason ' + reason.message);
                }
            )
        }

        
        function save() {

            var saveData = vm.saveData;
            if (!saveData.username)
            {
                Core.Notify.error('登录账号不能为空!');
                return false;
            }

            if (saveData.password !== saveData.againPassword)
            {
                Core.Notify.error('密码和确认密码不一致');
                return false;
            }

            var departmentId = 0;
            if (vm.departmentList.selected)
            {
                departmentId = vm.departmentList.selected.id;
            }

            var roleId = 0;
            if (vm.roleList.selected)
            {
                roleId = vm.roleList.selected.id;
            }
            
            if (vm.createNewAdmin)
            {
                Core.Api.System.saveAdmin(
                    saveData.username,
                    saveData.name,
                    saveData.password,
                    departmentId,
                    roleId
                ).then(
                    function(data){

                    },
                    function(reason)
                    {
                        Core.Notify.error(reason.message);
                    }
                );   
            } 
            else 
            {
                Core.Api.System.editAdmin(
                    vm.adminId,
                    saveData.name,
                    departmentId,
                    roleId
                ).then(
                    function(data){

                    },
                    function(reason)
                    {
                        Core.Notify.error(reason.message);
                    }
                );
            }

            $uibModalInstance.close();
        };

        function cancel() {
            console.log('cancel');
            $uibModalInstance.dismiss('cancel');
        };
        
    }
})();
(function(){
    angular
        .module('app')
        .controller('EditAdminPasswordController', ['$scope', '$uibModalInstance', 'Core', 'data', EditAdminPasswordController]);


    function EditAdminPasswordController($scope, $uibModalInstance, Core, data)
    {
        var vm = $scope;

        vm.adminId = data.adminId;
        vm.saveData = {
            password: "",
            againPassword: "",
        };

        vm.save = save;
        vm.cancel = cancel;

        function save() {

            var saveData = vm.saveData;

            if (saveData.password !== saveData.againPassword)
            {
                Core.Notify.error('新密码和确认新密码不一致');
                return false;
            }

            Core.Api.System.editAdminPassword(
                vm.adminId,
                saveData.password
            ).then(
                function(data){
                    Core.Notify.success('密码修改成功!');
                },
                function(reason)
                {
                    Core.Notify.error(reason.message);
                }
            );

            $uibModalInstance.close();
        };

        function cancel() {
            console.log('cancel');
            $uibModalInstance.dismiss('cancel');
        };
        
    }
})();
(function(){
    angular
        .module('app')
        .controller('SystemSliderDetailController', ['$scope', '$stateParams', 'Core', SystemSliderDetailController]);


    function SystemSliderDetailController($scope, $stateParams, Core) {
        var vm = $scope;

        vm.adId = $stateParams ? $stateParams.adId : 0;

        vm.goBack = goBack;
        getAdDetail();

        function getAdDetail()
        {
            Core.Api.Ad.getAdDetail(vm.adId).then(
                function (responseData) {
                    vm.adInfo = responseData.ad;

                    console.log(vm.adInfo);
                },
                function (error) {
                    Core.Notify.error('获取详情失败');
                }
            );
        }

        function goBack()
        {
            Core.$window.history.back();
        }
    }
})();
(function(){
    angular
        .module('app')
        .controller('EditDepartmentController', ['$scope', '$uibModalInstance', 'Core', 'data', EditDepartmentController]);


    function EditDepartmentController($scope, $uibModalInstance, Core, data)
    {
        var vm = $scope;

        vm.departmentId = data ? data.id : 0;
        vm.name = data ? data.name : "";
        vm.comment = data ? data.comment : "";

        console.log(data);

        vm.save = save;
        vm.cancel = cancel;

        function save() {

            Core.Api.System.saveDepartment(vm.departmentId, vm.name, vm.comment).then(
                function (data) {

                },
                function (reason) {
                    Core.Notify.error('reason ' + reason.message);
                }
            );

            $uibModalInstance.close();
        };

        function cancel() {
            console.log('cancel');
            $uibModalInstance.dismiss('cancel');
        };
        
    }
})();
(function () {
    angular
        .module('app')
        .controller('EditImgSliderController', ['$scope', '$uibModalInstance', 'Core', 'data', 'Upload', EditImgSliderController]);


    function EditImgSliderController($scope, $uibModalInstance, Core, data, Upload) {
        var vm = $scope;

        vm.adId = data ? data.id : 0;
        vm.name = data ? data.name : "";
        vm.title = data ? data.title : "";
        vm.comment = data ? data.comment : "";
        vm.date = {
            start: data ? moment(Core.Util.date('Y-m-d', data.begin_time)) : "",
            end: data ? moment(Core.Util.date('Y-m-d', data.end_time)) : ""
        };
        vm.img = ""; 

        if (data) {
            vm.imgUrl = Core.Const.NET.IMG_URL_PREFIX + data.img;
        }

        vm.save = save;
        vm.cancel = cancel;

        function save() {

            var beginTime = 0,
                endTime = 0;
            if (vm.date.start) {
                beginTime = vm.date.start.format('YYYY-MM-DD');
            }
            if (vm.date.end) {
                endTime = vm.date.end.format('YYYY-MM-DD');
            }

            Core.Api.Ad.saveImgSlider(
                vm.adId,
                vm.name,
                vm.title,
                vm.img,
                beginTime,
                endTime,
                vm.comment
            ).then(
                function (response) {

                },
                function (reason) {
                    Core.Notify.error(reason.message);
                }
            )

            $uibModalInstance.close();
        };

        function cancel() {
            console.log('cancel');
            $uibModalInstance.dismiss('cancel');
        };

        vm.upload = function (file) {
            if (!file) {
                return;
            }
            Upload.upload({
                url: Core.Const.NET.IMG_UPLOAD_END_POINT,
                headers: {'DIX': 'dix'},
                data: {file: file}
            }).then(function (resp) {
                var respData = resp.data;
                vm.img = respData.data.name;
                vm.imgUrl = Core.Const.NET.IMG_URL_PREFIX + vm.img;

            }, function (resp) {
                Core.Notify.error('上传失败');
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });
        };

    }
})();
(function(){
    angular
        .module('app')
        .controller('EditRoleController', ['$scope', '$uibModalInstance', 'Core', 'data', EditRoleController]);


    function EditRoleController($scope, $uibModalInstance, Core, data)
    {
        var vm = $scope;

        vm.roleId = data ? data.id : 0;
        vm.name = data ? data.name : "";
        vm.comment = data ? data.comment : "";

        var selectedAuthList = data ? JSON.parse(data.authority) : [];

        // console.log(selectedAuthList);
        vm.authList = [
            {name: '运单管理', value: 'auth_waybill'},
            {name: '商户管理', value: 'auth_company'},
            {name: '评价管理', value: 'auth_rate'},
            {name: '物流管理', value: 'auth_express'},
            {name: '财务管里', value: 'auth_finance'},
            {name: '系统管理', value: 'auth_system'},
            {name: '揽件人员管理', value: 'auth_collect'},
            {name: '保单管理', value: 'auth_insurance'},
            {name: '报表管理', value: 'auth_report'},
            {name: '装车清单', value: 'auth_loading'},
            {name: '可修改所有运单信息(高权限)', value: 'all_waybill'}
        ];

        angular.forEach(vm.authList, function(value, key){

            if (selectedAuthList[value.value])
            {
                value.selected = true;
            }
        });

        vm.selectAllAuth = false;

        vm.selectedAll = selectedAll;
        vm.save = save;
        vm.cancel = cancel;

        function save() {

            var selectedAuthListString = "";

            angular.forEach(vm.authList, function(value, key){
                if (value.selected)
                {
                    selectedAuthListString += value.value + ',';
                }
            });


            Core.Api.System.saveRole(vm.roleId, vm.name, vm.comment, selectedAuthListString).then(
                function(data){

                },
                function(reason)
                {
                    Core.Notify.error(reason.message);
                }
            );

            $uibModalInstance.close();
        };

        function cancel() {
            console.log('cancel');
            $uibModalInstance.dismiss('cancel');
        };

        function selectedAll()
        {
            angular.forEach(vm.authList, function (item, list) {
                item.selected = vm.selectAllAuth;
            })
        }
    }
})();
(function(){
    angular
        .module('app')
        .controller('SystemAdminController', ['$scope', '$uibModal', 'Core', SystemAdminController]);


    function SystemAdminController($scope, $uibModal, Core)
    {
        var vm = $scope;

        vm.showConfirmModal = showConfirmModal;
        vm.openEditModal = openEditModal;
        vm.openModalEditPassword = openModalEditPassword;

        getAdminList();

        function getAdminList() {

            Core.Api.System.getAdminList().then(
                function (data) {
                    vm.adminList = data.list;
                },
                function (reason) {
                    Core.Notify.error('reason ' + reason.message);
                }
            )
        }

        function openEditModal(data) {
            data = data ? data : null;
            var uibModal = Core.$uibModal.open({
                templateUrl: 'admin/system/edit-admin-modal.html',
                controller: 'EditAdminController',
                resolve: {
                    data: function () {
                        return data;
                    }
                }
            });

            uibModal.result.then(function (data) {
                Core.$timeout(function(){
                    Core.$state.reload();
                }, 200);
            }, function () {
                Core.Log.d('Modal dismissed at: ' + new Date());
            });
        }

        function showConfirmModal(type, id)
        {
            var uibModal = Core.$uibModal.open({
                templateUrl: 'admin/public-modal/confirm-modal.html',
                controller: 'ConfirmModalController',
                resolve: {
                    type: function () {
                        return type;
                    },
                    id: function () {
                        return id;
                    }
                }
            });

            uibModal.result.then(function (data) {
                Core.$timeout(function(){
                    Core.$state.reload();
                }, 200);
            }, function () {
                Core.Log.d('Modal dismissed at: ' + new Date());
            });
        }

        function openModalEditPassword(adminId)
        {
            var data = {
                adminId: adminId
            };
            var uibModal = Core.$uibModal.open({
                templateUrl: 'admin/system/edit-admin-password-modal.html',
                controller: 'EditAdminPasswordController',
                resolve: {
                    data: function () {
                        return data;
                    }
                }
            });

            uibModal.result.then(function (data) {
                Core.$timeout(function(){
                    Core.$state.reload();
                }, 200);
            }, function () {
                Core.Log.d('Modal dismissed at: ' + new Date());
            });
        }
    } 
})();
(function(){
    angular
        .module('app')
        .controller('SystemDepartmentController', ['$scope', 'Core', SystemDepartmentController]);


    function SystemDepartmentController($scope, Core)
    {
        var vm = $scope;

        vm.showConfirmModal = showConfirmModal;
        vm.openEditModal = openEditModal;

        getDepartmentList();

        function getDepartmentList() {

            Core.Api.System.getDepartmentList().then(
                    function (data) {
                        vm.departmentList = data.list;
                    },
                    function (reason) {
                        Core.Notify.error('reason ' + reason.message);
                    }
            )
        }

        function openEditModal(data) {
            data = data ? data : null;
            var uibModal = Core.$uibModal.open({
                templateUrl: 'admin/system/edit-department-modal.html',
                controller: 'EditDepartmentController',
                resolve: {
                    data: function () {
                        return data;
                    }
                }
            });

            uibModal.result.then(function (data) {
                Core.$timeout(function(){
                    Core.$state.reload();
                }, 200);
            }, function () {
                Core.Log.d('Modal dismissed at: ' + new Date());
            });
        }

        function showConfirmModal(type, id)
        {
            var uibModal = Core.$uibModal.open({
                templateUrl: 'admin/public-modal/confirm-modal.html',
                controller: 'ConfirmModalController',
                resolve: {
                    type: function () {
                        return type;
                    },
                    id: function () {
                        return id;
                    }
                }
            });

            uibModal.result.then(function (data) {
                Core.$timeout(function(){
                    Core.$state.reload();
                }, 200);
            }, function () {
                Core.Log.d('Modal dismissed at: ' + new Date());
            });
        }
    } 
})();
(function(){
    angular
        .module('app')
        .controller('SystemPostEditController', ['$scope', '$stateParams', 'Core', 'Upload', SystemPostEditController]);


    function SystemPostEditController($scope, $stateParams, Core, Upload)
    {
        var vm = $scope;
        vm.postId = $stateParams.postId;

        vm.post = {
            id: vm.postId,
            title: "",
            content: "",
            status: "1"
        };

        vm.options = {
            focus: true,
        };

        vm.imageUpload = function(files) {
            console.log('image upload:', files);
            console.log('image upload\'s editable:', vm.editable);

            upload(files[0]);
        };

        vm.savePost = savePost;

        if (vm.postId > 0)
        {
            getPostDetail();
        }

        function getPostDetail()
        {
            Core.Api.Post.getPostDetail(vm.postId).then(
                function (responseData) {
                    vm.post = {
                        id: responseData.id,
                        title: responseData.title,
                        content: responseData.content,
                        status: responseData.status.toString()
                    }
                },
                function (error) {
                    Core.Notify.error('获取详情失败');
                }
            );
        } 

        function savePost() {


            // console.log(vm.post);
            // return;

            Core.Api.Post.savePost(
                vm.post.id,
                vm.post.title,
                vm.post.content,
                vm.post.status
            ).then(
                function (responseData) {
                    Core.$state.go('system.post');
                },
                function (error) {
                    Core.Notify.error('保存出错');
                }
            );
        }


        function upload(file) {
            if (!file)
            {
                return;
            }
            Upload.upload({
                url: Core.Const.NET.IMG_UPLOAD_END_POINT,
                headers: {'DIX': 'dix'},
                data: { file: file }
            }).then(function (resp) {
                var respData = resp.data;
                vm.img = respData.data.name;
                vm.imgUrl = Core.Const.NET.IMG_URL_PREFIX + vm.img;


                vm.editable.append('<img src="' + vm.imgUrl +'" />');


            }, function (resp) {
                Core.Notify.error('上传失败');
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });
        };
      
    } 
})();
(function(){
    angular
        .module('app')
        .controller('SystemPostController', ['$scope', '$uibModal', 'Core', SystemPostController]);


    function SystemPostController($scope, $uibModal, Core)
    {
        var vm = $scope;

        vm.count = 0;
        vm.currentPage = 1;
        vm.pageSize = 20;
        vm.totalPage = 0;

        vm.showConfirmModal = showConfirmModal;
        vm.pageChanged = getPostList;

        getPostList();

        function getPostList() {
            Core.Api.Post.getPostList(vm.currentPage, 0).then(
                function (responseData) {
                    vm.postList = responseData.post_list;

                    vm.count = responseData.count;
                    vm.totalPage = parseInt(vm.count / vm.pageSize) + (vm.count % vm.pageSize ? 1 : 0);
                },
                function (error) {
                    Core.Notify.error('获取列表失败');
                }
            );
        }

        function showConfirmModal(type, id) {

            var uibModal = Core.$uibModal.open({
                templateUrl: 'admin/public-modal/confirm-modal.html',
                controller: 'ConfirmModalController',
                resolve: {
                    type: function () {
                        return type;
                    },
                    id: function () {
                        return id;
                    }
                }
            });

            uibModal.result.then(function (data) {
                Core.$timeout(function(){
                    Core.$state.reload();
                }, 200);
            }, function () {
                Core.Log.d('Modal dismissed at: ' + new Date());
            });
        }
    } 
})();
(function(){
    angular
        .module('app')
        .controller('SystemRoleController', ['$scope', '$uibModal', 'Core', SystemRoleController]);


    function SystemRoleController($scope, $uibModal, Core)
    {
        var vm = $scope;

        vm.showConfirmModal = showConfirmModal;
        vm.openEditModal = openEditModal;

        getRoleList();

        function getRoleList() {

            Core.Api.System.getRoleList().then(
                function (data) {
                    vm.roleList = data.list;


                },
                function (reason) {
                    Core.Notify.error('reason ' + reason.message);
                }
            )
        }

        function openEditModal(data) {
            data = data ? data : null;
            var uibModal = Core.$uibModal.open({
                templateUrl: 'admin/system/edit-role-modal.html',
                controller: 'EditRoleController',
                resolve: {
                    data: function () {
                        return data;
                    }
                }
            });

            uibModal.result.then(function (data) {
                Core.$timeout(function(){
                    Core.$state.reload();
                }, 200);
            }, function () {
                Core.Log.d('Modal dismissed at: ' + new Date());
            });
        }

        function showConfirmModal(type, id)
        {
            var uibModal = Core.$uibModal.open({
                templateUrl: 'admin/public-modal/confirm-modal.html',
                controller: 'ConfirmModalController',
                resolve: {
                    type: function () {
                        return type;
                    },
                    id: function () {
                        return id;
                    }
                }
            });

            uibModal.result.then(function (data) {
                Core.$timeout(function(){
                    Core.$state.reload();
                }, 200);
            }, function () {
                Core.Log.d('Modal dismissed at: ' + new Date());
            });
        }
    } 
})();
(function () {
    angular
        .module('app')
        .controller('SystemSliderController', ['$scope', '$uibModal', 'Core', SystemSliderController]);


    function SystemSliderController($scope, $uibModal, Core) {
        var vm = $scope;

        vm.showConfirmModal = showConfirmModal;
        vm.openEditModal = openEditModal;

        getMerchantList();

        function getMerchantList() {

            Core.Api.Ad.getImgSliderList().then(
                function (data) {
                    vm.imgSlideList = data.list;
                },
                function (reason) {
                    Core.Notify.error('reason ' + reason.message);
                }
            )
        }

        function openEditModal(data) {
            var uibModal = Core.$uibModal.open({
                templateUrl: 'admin/system/edit-img-slider-modal.html',
                controller: 'EditImgSliderController',
                resolve: {
                    data: function () {
                        return data;
                    }
                }
            });

            uibModal.result.then(function (data) {
                Core.$timeout(function(){
                    Core.$state.reload();
                }, 200);
            }, function () {
                Core.Log.d('Modal dismissed at: ' + new Date());
            });
        }

        function showConfirmModal(type, id) {
            var uibModal = Core.$uibModal.open({
                templateUrl: 'admin/public-modal/confirm-modal.html',
                controller: 'ConfirmModalController',
                resolve: {
                    type: function () {
                        return type;
                    },
                    id: function () {
                        return id;
                    }
                }
            });

            uibModal.result.then(function (data) {
                Core.$timeout(function(){
                    Core.$state.reload();
                }, 200);
            }, function () {
                Core.Log.d('Modal dismissed at: ' + new Date());
            });
        }
    }
})();
(function(){
    angular
        .module('app')
        .controller('SystemVehicleController', ['$scope', '$uibModal', 'Core', SystemVehicleController]);


    function SystemVehicleController($scope, $uibModal, Core)
    {
        var vm = $scope;

        vm.search = {
            number: "",
            model: "",
            factory: ""
        };

        vm.statusList = [
            { number: "", text: "全部"},
            { number: '1',      text: "工作" },
            { number: '2',      text: "闲置" },
        ];

        vm.showConfirmModal = showConfirmModal;
        vm.openEditModal = openEditModal;
        vm.getPdaDeviceList = getPdaDeviceList;
        vm.clearSearchOptions = clearSearchOptions;

        getPdaDeviceList();

        function clearSearchOptions()
        {
            vm.search = {
                number: "",
                model: "",
                factory: ""
            };
            vm.statusList.selected = null;

            getPdaDeviceList();
        }

        function getPdaDeviceList() {

            var number = vm.search.number ? vm.search.number : "";
            var model = vm.search.model ? vm.search.model : "";
            var factory = vm.search.factory ? vm.search.factory : "";

            var status = 0;
            if (vm.statusList.selected)
            {
                status = vm.statusList.selected.number;
            }

            Core.Api.System.getPdaDeviceList(
                number,
                model,
                factory,
                status
            ).then(
                function (data) {
                    vm.vehicleList = data.list;
                },
                function (reason) {
                    Core.Notify.error('reason ' + reason.message);
                }
            )
        }

        function openEditModal(data) {
            data = data ? data : null;
            var uibModal = Core.$uibModal.open({
                templateUrl: 'admin/system/edit-vehicle-modal.html',
                controller: 'EditVehicleController',
                resolve: {
                    data: function () {
                        return data;
                    }
                }
            });

            uibModal.result.then(function (data) {
                Core.$timeout(function(){
                    Core.$state.reload();
                }, 200);
            }, function () {
                Core.Log.d('Modal dismissed at: ' + new Date());
            });
        }

        function showConfirmModal(type, id)
        {
            var uibModal = Core.$uibModal.open({
                templateUrl: 'admin/public-modal/confirm-modal.html',
                controller: 'ConfirmModalController',
                resolve: {
                    type: function () {
                        return type;
                    },
                    id: function () {
                        return id;
                    }
                }
            });

            uibModal.result.then(function (data) {
                Core.$timeout(function(){
                    Core.$state.reload();
                }, 200);
            }, function () {
                Core.Log.d('Modal dismissed at: ' + new Date());
            });
        }
    } 
})();
(function () {
    angular
        .module('app')
        .controller('EditVehicleController', ['$scope', '$uibModalInstance', 'Core', 'data', EditVehicleController]);


    function EditVehicleController($scope, $uibModalInstance, Core, data) {
        var vm = $scope;

        vm.vehicleId = data ? data.id : 0;
        vm.number = data ? data.number : "";
        vm.model = data ? data.model : "";
        vm.factory = data ? data.factory : "";
        vm.date = {
            buyTime: data ? moment(Core.Util.date('Y-m-d', data.buy_time)) : ""
            // buyTime: data ? moment('2016-05-01') : ""
        };
        vm.workStatus = data ? data.status : 0; //todo 状态与服务端同步定义

        vm.save = save;
        vm.cancel = cancel;

        function save() {

            if (!vm.number || !vm.model || !vm.factory)
            {
                Core.Notify.error('请填写完整');
                return false;
            }

            var buyTime = 0;
            if (vm.date.buyTime)
            {
                buyTime = vm.date.buyTime.unix();
            }

            Core.Api.System.savePdaDevice(vm.vehicleId, vm.number, vm.model, vm.factory, buyTime, vm.workStatus).then(
                function (response) {

                },
                function (reason) {
                    Core.Notify.error(reason.message);
                }
            );

            $uibModalInstance.close();
        };

        function cancel() {
            console.log('cancel');
            $uibModalInstance.dismiss('cancel');
        };

    }
})();
(function(){
    angular
        .module('app')
        .controller('ModalController', ['$scope', '$templateCache', '$uibModalInstance', 'Core', 'schedule', ModalController]);


    function ModalController($scope, $templateCache, $uibModalInstance, Core, schedule)
    {
        var vm = $scope;

        if (schedule == '') {
            vm.modalTitle = '新增班次';
            vm.routeSelect = {};
            vm.routeList = [];
            vm.driverSelect = {};
            vm.driverList = [];
            vm.pageNum = 0;
            vm.scheduleId = 0;
            vm.startTime = '10:00';
            vm.largePrice = '';
            vm.smallPrice = '';
            vm.discount = 80;
        } else {
            vm.modalTitle = '修改班次';
            vm.routeSelect = {'selected': schedule.route};
            vm.routeList = [];
            vm.driverSelect = {'selected': schedule.courier};
            vm.driverList = [];
            vm.pageNum = 0;
            vm.scheduleId = schedule.id;
            vm.startTime = Core.$filter('digitLength')(schedule.start_hour, 2) + ':' + Core.$filter('digitLength')(schedule.start_minute, 2);
            vm.largePrice = schedule.price ? Core.$filter('currencyFormat')(schedule.price.large_size) : '';
            vm.smallPrice = schedule.price ? Core.$filter('currencyFormat')(schedule.price.small_size) : '';
            vm.discount = 100 - schedule.discount;
        }


        vm.spinOption = {postfix: '%'};

        getRouteList();
        getDriverList();

        vm.save = save;
        vm.cancel = cancel;

        console.log($templateCache.info() + 'transport');

        function getRouteList() {
            Core.Api.Transport.getRouteList().then(
                function (data) {
                    vm.routeList = data.route_list;
                },
                function (reason) {
                    Core.Notify.error(reason.message);
                    console.log(reason);
                }
            )
        }

        function getDriverList() {
            Core.Api.Courier.getCourierList(vm.pageNum).then(
                function (data) {
                    vm.driverList = data.courier_list;
                    console.log(vm.driverList);
                }, function (reason) {
                    Core.Notify.error(reason.message);
                    console.log(reason);
                }
            )
            vm.pageNum += 1;
        }

        function save() {
            vm.startTime = vm.startTime.split(':');
            vm.discount = 100 - vm.discount;
            vm.largePrice = parseInt(vm.largePrice * 100);
            vm.smallPrice = parseInt(vm.smallPrice * 100);

            console.log(vm.routeSelect);

            Core.Api.Transport.saveSchedule(
                vm.scheduleId,
                vm.startTime[0],
                vm.startTime[1],
                vm.routeSelect.selected.id,
                vm.largePrice,
                vm.smallPrice,
                vm.discount,
                vm.driverSelect.selected.id
            ).then(
                function (data) {
                    Core.$state.reload();
                }, function (reason) {
                    Core.Notify.error('save error');
                    console.log(reason);
                }
            );

            $uibModalInstance.close();
        };

        function cancel() {
            console.log('cancel');
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
(function(){
    angular
        .module('app')
        .controller('TransportController', ['$scope', '$templateCache', '$uibModal', 'Core', 'DTOptionsBuilder', 'SweetAlert', TransportController]);


    function TransportController($scope, $templateCache, $uibModal, Core, DTOptionsBuilder, SweetAlert)
    {
        var vm = $scope;

        vm.scheduleList = [];
        getScheduleList();

        vm.openModal = openModal;
        vm.delete = deleteSchedule;
        vm.edit = editSchedule;

        console.log($templateCache.info() + 'transport');

        vm.dtOptions = DTOptionsBuilder.newOptions()
            .withDOM('<"html5buttons"B>lTfgitp')
            .withButtons([
                {extend: 'copy'},
                {extend: 'csv'},
                {extend: 'excel', title: 'ExampleFile'},
                {extend: 'pdf', title: 'ExampleFile'},

                {extend: 'print',
                    customize: function (win){
                        $(win.document.body).addClass('white-bg');
                        $(win.document.body).css('font-size', '10px');

                        $(win.document.body).find('table')
                            .addClass('compact')
                            .css('font-size', 'inherit');
                    }
                }
            ]);


        function getScheduleList() {
            Core.Api.Transport.getScheduleList().then(
                function (data) {
                    vm.scheduleList = data.schedule_list;
                },
                function (reason) {
                    Core.Notify.error(reason.message);
                }
            )
        }

        function openModal() {
            $uibModal.open({
                templateUrl: 'main/transport/add-schedule-modal.html',
                controller: 'ModalController',
                resolve: {
                    schedule: function () {
                        return '';
                    }
                }
            });
        }

        function removeSchedule(schedule) {
            Core.Api.Transport.removeSchedule(schedule.id).then(
                function (data) {
                    Core.$state.reload();
                },
                function (reason) {
                    Core.Notify.error('删除失败');
                }
            )
        }

        function editSchedule(schedule) {
            $uibModal.open({
                templateUrl: 'main/transport/add-schedule-modal.html',
                controller: 'ModalController',
                resolve: {
                    schedule: function () {
                        return schedule;
                    }
                }
            });
        }

        function deleteSchedule(schedule) {
            if (confirm('确认删除?'))
            {
                removeSchedule(schedule);
            }
        }
    }
})();
(function(){
    angular
        .module('app')
        .controller('WaybillDetailController', ['$scope', '$templateCache', 'Core', '$stateParams', WaybillDetailController]);


    function WaybillDetailController($scope, $templateCache, Core, $stateParams)
    {
        var vm = $scope;

        console.log($stateParams);
        console.log($stateParams.page);

        vm.waybillId = $stateParams.waybillId;
        vm.waybill = {};
        vm.waybillActionList = [];

        vm.receiveStatus = {
            active: false,
            time: ""
        };

        vm.transitStatus = {
            active: false,
            time: ""
        };

        vm.deliverSuccess = {
            active: false,
            time: ""
        };

        vm.waybillReturnBegin = {
            active: false,
            time: ""
        };
        vm.waybillReturnEnd = {
            active: false,
            time: ""
        };

        getWaybillDetail();
        getWaybillActionList();
        getWaybillStatusList();
        getBankPayList();

        vm.openEditModal = openEditModal;
        vm.goBack = goBack;
        vm.jsonFormat = jsonFormat;

        //console.log($templateCache.info() + 'WaybillController');

        function getWaybillDetail() {

            Core.Api.Waybill.getWaybillDetail(vm.waybillId).then(
                function (data) {
                    vm.waybill = data.waybill;

                },
                function (reason) {
                    //console.log('fff');
                    Core.Notify.error(reason.message);
                }
            )
        }

        function getWaybillActionList() {
            Core.Api.Waybill.getWaybillActionList(vm.waybillId).then(
                function (data) {
                    vm.waybillActionList = data.waybill_action_list;
                },
                function (reason) {
                    Core.Notify.error(reason.message ? reason.message : '获取失败');
                }
            );
        }

        function getWaybillStatusList()
        {
            Core.Api.Waybill.getWaybillStatusList(vm.waybillId).then(
                function (responseData) {
                    vm.waybillStatusList = responseData.status_list;

                    console.log(vm.waybillStatusList);

                    var length = vm.waybillStatusList.length;
                    for (var i = length; i > 0; i--)
                    {
                        var value = vm.waybillStatusList[i - 1];

                        if (value.status <= Core.Const.WAYBILL_STATUS.STATUS_RECEIVE_SUCCESS)
                        {
                            vm.receiveStatus = {
                                active: true,
                                time: Core.Util.date('Y-m-d H:i:s', value.create_time)
                            }
                        }
                        else if (value.status < Core.Const.WAYBILL_STATUS.STATUS_DELIVER_SUCCESS)
                        {
                            vm.transitStatus = {
                                active: true,
                                time: Core.Util.date('Y-m-d H:i:s', value.create_time)
                            }
                        }
                        else if (value.status == Core.Const.WAYBILL_STATUS.STATUS_DELIVER_SUCCESS)
                        {
                            vm.deliverSuccess = {
                                active: true,
                                time: Core.Util.date('Y-m-d H:i:s', value.create_time)
                            }
                        }

                        if (value.status == Core.Const.WAYBILL_STATUS.STATUS_RETURNING)
                        {
                            vm.waybillReturnBegin.active = true;
                        }
                        if (value.status == Core.Const.WAYBILL_STATUS.STATUS_RETURNING_SUCCESS)
                        {
                            vm.waybillReturnEnd.active = true;
                        }
                    }
                },
                function (error) {
                    Core.Notify.error(error.message);
                }
            );
        }

        function openEditModal(type, waybill) {

            var uibModal = Core.$uibModal.open({
                templateUrl: 'admin/waybill/edit-waybill-modal.html',
                controller: 'EditWaybillController',
                resolve: {
                    type: function () {
                        return type;
                    },
                    data: function () {
                        return waybill;
                    }
                }
            });

            uibModal.result.then(function (data) {
                Core.$timeout(function(){
                    Core.$state.reload();
                }, 200);
            }, function () {
                Core.Log.d('Modal dismissed at: ' + new Date());
            });
        }

        function goBack()
        {
            Core.$window.history.back();
        }

        function jsonFormat(data)
        {
            data = data ? data : null;
            var uibModal = Core.$uibModal.open({
                templateUrl: 'admin/json-format/json-format-modal.html',
                controller: 'JsonFormatController',
                resolve: {
                    data: function () {
                        return data;
                    }
                }
            });

            uibModal.result.then(function (data) {

            }, function () {
                Core.Log.d('Modal dismissed at: ' + new Date());
            });
        }


        function getBankPayList() {
            Core.Api.Clearing.getPayListOfWaybill(
                vm.waybillId
            ).then(
                function(response) {
                    vm.bankPayList = response.pay_list;
                },
                function(reason) {
                    Core.Notify.error(reason.message);
                }
            );
        }
    }
})();


// function getWaybillClearingTradeLogList()
// {
//     Core.Api.Clearing.getWaybillTradeLogList(vm.waybillId).then(
//         function (responseData) {
//             vm.logList = responseData.log_list;
//         },
//         function (error) {
//             Core.Notify.error('获取交易日志列表失败');
//         }
//     );
// }
//
// function getWaybillClearingTradeRequestList()
// {
//     Core.Api.Clearing.getWaybillTradeRequestList(vm.waybillId).then(
//         function (responseData) {
//             vm.requestList = responseData.request_list;
//         },
//         function (error) {
//             Core.Notify.error('获取交易请求列表失败');
//         }
//     );
// }
(function () {
    angular
        .module('app')
        .controller('EditWaybillController', ['$scope', '$uibModalInstance', 'Core', 'type', 'data', EditWaybillController]);


    function EditWaybillController($scope, $uibModalInstance, Core, type, data) {
        var vm = $scope;

        vm.waybillId = data ? data.id : 0;

        console.log(data);

        vm.type = type;
        vm.showComment = false;
        vm.showChangeStatus = false;
        vm.showChangeRoute = false;

        vm.save = save;
        vm.cancel = cancel;

        switch (type) {
            case 'comment_admin':
                initChangeComment();
                break;
            case 'change_status':
                initChangeStatus();
                break;
            case 'change_route':
                initChangeRoute();
                break;
        }


        function initChangeComment() {
            vm.showComment = true;
            vm.statusList = [
                {number: '', text: '全部'},
                {number: '0', text: Core.Const.WAYBILL_STATUS_NAME[0]},
                {number: '1', text: Core.Const.WAYBILL_STATUS_NAME[1]},
                // { number: '100',      text: Core.Const.WAYBILL_STATUS_NAME[100] },
                // { number: '101',      text: Core.Const.WAYBILL_STATUS_NAME[101] },
                {number: '200', text: Core.Const.WAYBILL_STATUS_NAME[200]},
                {number: '300', text: Core.Const.WAYBILL_STATUS_NAME[300]},
                // { number: '400',      text: Core.Const.WAYBILL_STATUS_NAME[400] },
                {number: '500', text: Core.Const.WAYBILL_STATUS_NAME[500]},
                {number: '600', text: Core.Const.WAYBILL_STATUS_NAME[600]},
                {number: '700', text: Core.Const.WAYBILL_STATUS_NAME[700]},

                {number: '-1', text: Core.Const.WAYBILL_STATUS_NAME[-1]},
                {number: '-100', text: Core.Const.WAYBILL_STATUS_NAME[-100]},
                {number: '-101', text: Core.Const.WAYBILL_STATUS_NAME[-101]},
                {number: '-400', text: Core.Const.WAYBILL_STATUS_NAME[-400]},
                {number: '-401', text: Core.Const.WAYBILL_STATUS_NAME[-401]},
                {number: '-9999', text: Core.Const.WAYBILL_STATUS_NAME[-9999]}
            ];
            vm.editContent = {
                comment: data.comment_admin ? data.comment_admin : ""
            }
        }

        function initChangeStatus() {
            vm.statusList = [
                {number: '', text: '全部'},
                {number: '0', text: Core.Const.WAYBILL_STATUS_NAME[0]},
                {number: '1', text: Core.Const.WAYBILL_STATUS_NAME[1]},
                // { number: '100',      text: Core.Const.WAYBILL_STATUS_NAME[100] },
                // { number: '101',      text: Core.Const.WAYBILL_STATUS_NAME[101] },
                {number: '200', text: Core.Const.WAYBILL_STATUS_NAME[200]},
                {number: '300', text: Core.Const.WAYBILL_STATUS_NAME[300]},
                // { number: '400',      text: Core.Const.WAYBILL_STATUS_NAME[400] },
                {number: '500', text: Core.Const.WAYBILL_STATUS_NAME[500]},
                {number: '600', text: Core.Const.WAYBILL_STATUS_NAME[600]},
                {number: '700', text: Core.Const.WAYBILL_STATUS_NAME[700]},

                {number: '-1', text: Core.Const.WAYBILL_STATUS_NAME[-1]},
                {number: '-100', text: Core.Const.WAYBILL_STATUS_NAME[-100]},
                {number: '-101', text: Core.Const.WAYBILL_STATUS_NAME[-101]},
                {number: '-400', text: Core.Const.WAYBILL_STATUS_NAME[-400]},
                {number: '-401', text: Core.Const.WAYBILL_STATUS_NAME[-401]},
                {number: '-9999', text: Core.Const.WAYBILL_STATUS_NAME[-9999]}
            ];
            vm.showChangeStatus = true;
        }

        function initChangeRoute() {
            vm.showChangeRoute = true;
            console.log(data.to_province, data.to_city, data.to_county);
            getCompanyList(data.to_province, data.to_city, data.to_county);
            vm.$watch('expressCompanyList.selected', function () {
                if (vm.expressCompanyList && vm.expressCompanyList.selected) {
                    if (vm.expressBranchList && vm.expressBranchList.selected) {
                        vm.expressBranchList.selected = "";
                    }
                    getBranchList(data.to_province, data.to_city, data.to_county, vm.expressCompanyList.selected.id);
                }
            });
        }


        function save() {
            if (type == 'comment_admin') {
                Core.Api.Waybill.updateWaybillCommentAdmin(vm.waybillId, vm.editContent.comment).then(
                    function (response) {
                        Core.Notify.success('备注保存成功');
                        Core.$state.reload();
                    }, function (reason) {
                        Core.Notify.error('更新失败');
                        console.log(reason);
                    }
                )
            }
            else if (type == 'change_status') {
                //todo 修改运单状态接口
                var status = 0;
                if (vm.statusList.selected) {
                    status = vm.statusList.selected.number;
                }

                console.log(status);

                Core.Api.Waybill.updateWaybillStatus(vm.waybillId, status).then(
                    function (responseData) {
                        Core.Notify.success('更新快递单状态成功');
                        Core.$state.reload();
                    },
                    function (error) {
                        Core.Notify.error('更新快递单状态失败');
                    }
                );

            } else if (type == 'change_route') {
                Core.Api.Waybill.updateExpressInfo(vm.waybillId, vm.expressCompanyList.selected.id, vm.expressBranchList.selected.id).then(
                    function (responseData) {
                        Core.Notify.success('修改网点成功');
                        Core.$state.reload();
                    },
                    function (error) {
                        Core.Notify.error('修改网点失败');
                    }
                );
            }

            $uibModalInstance.close();
        }

        function cancel() {
            console.log('cancel');
            $uibModalInstance.dismiss('cancel');
        }

        function getCompanyList(province, city, county) {
            Core.Api.Express.getCompanyListByRoute(
                province,
                city,
                county
            ).then(
                function (mdata) {
                    console.log('----data----');
                    console.log(mdata);
                    vm.expressCompanyList = mdata.express_company_list;
                    angular.forEach(vm.expressCompanyList, function (expressCompany, index, array) {
                        if (expressCompany.id == data.express_company_id) {
                            vm.expressCompanyList.selected = expressCompany;
                            Core.$timeout(function () {
                                vm.$apply();
                            });
                        }
                    })
                },
                function (reason) {
                    Core.Notify.error('reason ' + reason.message);
                }
            )
        }

        function getBranchList(province, city, county, company) {
            Core.Api.Express.getBranchListByCompany(
                province,
                city,
                county,
                company
            ).then(
                function (mdata) {
                    console.log('----getBranchList----');
                    console.log(company);
                    console.log(mdata);
                    vm.expressBranchList = mdata.express_branch_list;
                    angular.forEach(vm.expressBranchList, function (expressBranch, index, array) {
                        if (expressBranch.id == data.express_branch_id) {
                            vm.expressBranchList.selected = expressBranch;
                            Core.$timeout(function () {
                                vm.$apply();
                            });
                        }
                    })
                },
                function (reason) {
                    Core.Notify.error('reason ' + reason.message);
                }
            )
        }

    }
})();
(function () {
    angular
        .module('app')
        .controller('WaybillListController', ['$scope', '$element', 'Core', WaybillListController]);

    function WaybillListController($scope, $element, Core) {
        $element[0].querySelector('#start-date').onchange = function () {
            console.log('start date change');
            console.log(arguments);
        };

        var vm = $scope;
        var cacheSearch = {};
        var isFirst = true;
        //分页初始化配置
        vm.count = 0;
        vm.currentPage = 1;
        vm.pageSize = 20;
        vm.totalPage = 0;


        vm.date = {
            start: '',
            end: ''
        };

        vm.search = {
            waybillSn: "",
            expressCompany: "",
            fromCompany: "",
            toCompany: ""
        };
        vm.expressCompanyList = [];

        vm.statusList = [
            {number: '', text: '全部'},
            // {number: '0', text: Core.Const.WAYBILL_STATUS_NAME[0]},
            {number: '1', text: Core.Const.WAYBILL_STATUS_NAME[1]},
            // { number: '100',      text: Core.Const.WAYBILL_STATUS_NAME[100] },
            // { number: '101',      text: Core.Const.WAYBILL_STATUS_NAME[101] },
            {number: '200', text: Core.Const.WAYBILL_STATUS_NAME[200]},
            {number: '300', text: Core.Const.WAYBILL_STATUS_NAME[300]},
            // { number: '400',      text: Core.Const.WAYBILL_SUCCESS[400] },
            {number: '500', text: Core.Const.WAYBILL_STATUS_NAME[500]},
            {number: '600', text: Core.Const.WAYBILL_STATUS_NAME[600]},
            {number: '700', text: Core.Const.WAYBILL_STATUS_NAME[700]},
        ];

        vm.oddList = [
            {name: "全部", value: ""},
            {name: '是', value: 1},
            {name: '否', value: 0}
        ];

        vm.payTypeList = [
            {name: "全部", value: ""},
            {name: '是', value: 1},
            {name: '否', value: 0}
        ];

        vm.sourceTypeList = [
            {text: "全部", number: ""},
            {text: Core.Const.WAYBILL_SOURCE_TYPE_NAME[0], number: '0'},
            {text: Core.Const.WAYBILL_SOURCE_TYPE_NAME[10000], number: '10000'}
        ];

        vm.$watch('currentPage', function () {
            if (isFirst) {
                isFirst = false;
                return;
            }
            Core.Data.set('currentPage', '');
        });

        Core.on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (fromState.name == 'waybill.detail' && fromParams.page) {
                Core.Data.set('currentPage', fromParams.page);
            } else {
                Core.Data.set('currentPage', '')
            }

        });

        getExpressCompany();

        vm.getWaybillList = getWaybillList;
        vm.getAbnormalWaybillList = getAbnormalWaybillList;
        vm.pageChanged = getWaybillList;
        vm.showConfirmModal = showConfirmModal;
        vm.openEditModal = openEditModal;
        vm.clearSearchOptions = clearSearchOptions;

        function getExpressCompany() {
            Core.Api.Express.getCompanyList().then(
                function (data) {
                    vm.expressCompanyList = data.express_company_list;

                    vm.expressCompanyList.unshift({id: 0, 'name': '全部'});

                    getCacheSearch();
                    startSaveCacheSearchService();
                    getWaybillList();
                },
                function (reason) {
                    Core.Notify.error('reason ' + reason.message);
                }
            )
        }

        function getCacheSearch() {
            cacheSearch = Core.Data.get("admin-waybill-list-search") ? Core.Data.get("admin-waybill-list-search") : {};
            vm.date.start = cacheSearch.dateStart ? moment(cacheSearch.dateStart) : "";
            vm.date.end = cacheSearch.dateEnd ? moment(cacheSearch.dateEnd) : "";
            vm.search.waybillSn = cacheSearch.waybillSn;
            vm.search.fromCompany = cacheSearch.fromCompany;
            vm.search.toCompany = cacheSearch.toCompany;
            vm.expressCompanyList.selected = cacheSearch.expressCompanyListSelected;
            vm.oddList.selected = cacheSearch.oddListSelected;
            vm.payTypeList.selected = cacheSearch.payTypeListSelected;
            vm.statusList.selected = cacheSearch.statusListSelected;
        }

        function startSaveCacheSearchService() {
            vm.$watchGroup(['date.start', 'date.end', 'search.waybillSn', 'search.fromCompany', 'search.toCompany', 'statusList.selected', 'oddList.selected', 'expressCompanyList.selected', 'payTypeList.selected'], function (newValue, oldValue, scope) {
                cacheSearch.dateStart = newValue[0];
                cacheSearch.dateEnd = newValue[1];
                cacheSearch.waybillSn = newValue[2];
                cacheSearch.fromCompany = newValue[3];
                cacheSearch.toCompany = newValue[4];
                cacheSearch.statusListSelected = newValue[5];
                cacheSearch.oddListSelected = newValue[6];
                cacheSearch.expressCompanyListSelected = newValue[7] ? {
                    id: newValue[7].id,
                    name: newValue[7].name
                } : "";
                cacheSearch.payTypeListSelected = newValue[8];
                Core.Data.set("admin-waybill-list-search", cacheSearch);
            });

        }

        function clearSearchOptions() {
            Core.Data.set("admin-waybill-list-search", {});
            getCacheSearch();
            getWaybillList();
        }

        function getWaybillList(filter) {
            if (!filter) {
                filter = '';
            }

            var waybillSn = vm.search.waybillSn;
            var fromCompany = vm.search.fromCompany;
            var toCompany = vm.search.toCompany;

            var status = '';
            if (vm.statusList.selected != undefined) {
                status = vm.statusList.selected.number;
            }

            var oddStatus = 0;
            if (vm.oddList.selected != undefined) {
                oddStatus = vm.oddList.selected.value;
            }

            var payType = "";
            if (vm.payTypeList.selected != undefined) {
                payType = vm.payTypeList.selected.value;
            }

            var startDate = '';
            if (vm.date.start) {
                startDate = vm.date.start.format('YYYY-MM-DD');
            }

            var endDate = '';
            if (vm.date.end) {
                endDate = vm.date.end.format("YYYY-MM-DD");
            }

            var expressCompanyNameId = 0;
            if (vm.expressCompanyList.selected) {
                expressCompanyNameId = vm.expressCompanyList.selected.id;
            }

            var waybillSourceType = "";
            if (vm.sourceTypeList.selected) {
                waybillSourceType = vm.sourceTypeList.selected.number;
            }
            var currentPage = Core.Data.get('currentPage') ? Core.Data.get('currentPage') : vm.currentPage;

            Core.Api.Waybill.getWaybillList(
                currentPage,
                oddStatus,
                startDate,
                endDate,
                waybillSn,
                status,
                expressCompanyNameId, 
                fromCompany,
                toCompany,
                oddStatus,
                null,
                waybillSourceType,
                payType
            ).then(
                function (data) {
                    vm.waybillList = data.waybill_list;

                    vm.count = data.count;
                    vm.waybill_count_of_today = data.count_today;
                    vm.waybill_count_amount_of_today = data.count_amount_today;
                    vm.totalPage = parseInt(vm.count / vm.pageSize) + (vm.count % vm.pageSize ? 1 : 0);
                    vm.currentPage = currentPage;
                },
                function (reason) {
                    Core.Notify.error(reason.message);
                }
            )
        }

        function getAbnormalWaybillList() {
            var currentPage = Core.Data.get('currentPage') ? Core.Data.get('currentPage') : vm.currentPage;

            Core.Api.Waybill.getWaybillList(currentPage, 1).then(
                function (responseData) {
                    vm.waybillList = responseData.waybill_list;

                    vm.count = responseData.count;
                    vm.totalPage = parseInt(vm.count / vm.pageSize) + (vm.count % vm.pageSize ? 1 : 0);
                    vm.currentPage = currentPage;
                },
                function (error) {
                    Core.Notify.error('获取异常订单列表失败');
                }
            );
        }

        function showConfirmModal(type, id) {
            var uibModal = Core.$uibModal.open({
                templateUrl: 'admin/public-modal/confirm-modal.html',
                controller: 'ConfirmModalController',
                resolve: {
                    type: function () {
                        return type;
                    },
                    id: function () {
                        return id;
                    }
                }
            });

            uibModal.result.then(function (data) {
                Core.$timeout(function () {
                    Core.$state.reload();
                }, 200);
            }, function () {
                Core.Log.d('Modal dismissed at: ' + new Date());
            });
        }

        function openEditModal(type, data) {
            data = data ? data : null;
            var uibModal = Core.$uibModal.open({
                templateUrl: 'admin/waybill/edit-waybill-modal.html',
                controller: 'EditWaybillController',
                resolve: {
                    type: function () {
                        return type;
                    },
                    data: function () {
                        return data;
                    }
                }
            });

            uibModal.result.then(function (data) {
                Core.$timeout(function () {
                    Core.$state.reload();
                }, 200);
            }, function () {
                Core.Log.d('Modal dismissed at: ' + new Date());
            });
        }

    }
})();
(function(){
    angular
        .module('app')
        .controller('WaybillReturnController', ['$scope', '$uibModalInstance', 'Core', 'data', WaybillReturnController]);


    function WaybillReturnController($scope, $uibModalInstance, Core, data)
    {
        var vm = $scope;

        vm.saveData = {
            waybillId: data ? data.id : 0,
            returnCod: data ? parseInt(data.return_cod / 100.0) : "",
            returnCharge: data ? parseInt(data.return_charge_back / 100.0) : "",
            returnComment: data ? data.return_comment : "",
            returnExpressComment: data ? data.return_express_comment : "",
            returnAdminComment: data ? data.return_admin_comment : ""
        };


        vm.returnChargeGoUserType = [
            { text: '商户', value: 1 },
            { text: '汽修店', value: 2 }
        ];

        vm.returnChargeBackUserType = [
            { text: '商户', value: 1 },
            { text: '汽修店', value: 2 }
        ];

        var textArr = ['商户', '汽修店'];
        if (data)
        {
            vm.returnChargeGoUserType.selected = {value: data.return_charge_go_user_type, text: textArr[data.return_charge_go_user_type - 1]};
            vm.returnChargeBackUserType.selected = {value: data.return_charge_back_user_type, text: textArr[data.return_charge_back_user_type - 1]};
        }

        vm.save = save;
        vm.cancel = cancel;

        function save() {
            var saveData = vm.saveData;
            var returnChargeGoUserType = 1;
            if (vm.returnChargeGoUserType.selected)
            {
                returnChargeGoUserType = vm.returnChargeGoUserType.selected.value;
            }
            var returnChargeBackUserType = 1;
            if (vm.returnChargeBackUserType.selected) {
                returnChargeBackUserType = vm.returnChargeBackUserType.selected.value;
            }

            Core.Api.Waybill.updateWaybillReturnSuccess(
                saveData.waybillId,
                saveData.returnCod * 100,
                saveData.returnCharge * 100,
                returnChargeGoUserType,
                returnChargeBackUserType,
                saveData.returnComment,
                saveData.returnAdminComment
            ).then(
                function (responseData) {
                    Core.Notify.success('审核通过');
                },
                function (error) {
                    Core.Notify.error('保存失败');
                }
            );

            $uibModalInstance.close();
        }

        function cancel() {
            console.log('cancel');
            $uibModalInstance.dismiss('cancel');
        };

    }
})();
(function () {
    angular
        .module('app')
        .controller('WaybillReturnListController', ['$scope', '$element', 'Core', WaybillReturnListController]);

    function WaybillReturnListController($scope, $element, Core) {
        $element[0].querySelector('#start-date').onchange = function () {
            console.log('start date change');
            console.log(arguments);
        };

        var vm = $scope;
        var isFirst = true;
        vm.count = 0;
        vm.currentPage = 1;
        vm.pageSize = 20;
        vm.totalPage = 0;

        vm.date = {
            start: '',
            end: ''
        };

        vm.search = {
            waybillSn: "",
            expressCompany: "",
            fromCompany: "",
            toCompany: ""
        };
        vm.expressCompanyList = [];

        vm.statusList = [
            {number: '', text: '全部'},
            //{ number: '0',      text: Core.Const.WAYBILL_STATUS_NAME[0] },
            {number: '1', text: Core.Const.WAYBILL_STATUS_NAME[1]},
            // { number: '100',      text: Core.Const.WAYBILL_STATUS_NAME[100] },
            // { number: '101',      text: Core.Const.WAYBILL_STATUS_NAME[101] },
            {number: '200', text: Core.Const.WAYBILL_STATUS_NAME[200]},
            {number: '300', text: Core.Const.WAYBILL_STATUS_NAME[300]},
            // { number: '400',      text: Core.Const.WAYBILL_SUCCESS[400] },
            {number: '500', text: Core.Const.WAYBILL_STATUS_NAME[500]},
            {number: '600', text: Core.Const.WAYBILL_STATUS_NAME[600]},
            {number: '700', text: Core.Const.WAYBILL_STATUS_NAME[700]},
        ];

        vm.returnStatusList = [
            {number: '', text: '全部'},
            {number: '1', text: Core.Const.WAYBILL_RETURN_STATUS_NAME[1]},
            {number: '2', text: Core.Const.WAYBILL_RETURN_STATUS_NAME[2]},
            {number: '-1', text: Core.Const.WAYBILL_RETURN_STATUS_NAME['-1']},
        ];

        vm.oddList = [
            {name: "全部", value: ""},
            {name: '是', value: 1},
            {name: '否', value: 0}
        ];

        vm.payTypeList = [
            {name: "全部", value: ""},
            {name: '是', value: 1},
            {name: '否', value: 0}
        ];


        vm.$watch('currentPage', function () {
            if (isFirst) {
                isFirst = false;
                return;
            }
            Core.Data.set('currentPage', '');
        });

        Core.on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (fromState.name == 'waybill.detail' && fromParams.page) {
                Core.Data.set('currentPage', fromParams.page)
            } else {
                Core.Data.set('currentPage', '')
            }

        });

        getWaybillList();
        getExpressCompany();

        vm.getWaybillList = getWaybillList;
        vm.pageChanged = getWaybillList;
        vm.rejectWaybillReturn = rejectWaybillReturn;
        vm.showReturnWaybillModal = showReturnWaybillModal;
        vm.clearSearchOptions = clearSearchOptions;

        function clearSearchOptions() {
            vm.date = {
                start: "",
                end: ""
            };
            vm.search = {
                waybillSn: "",
                expressCompany: "",
                fromCompany: "",
                toCompany: ""
            };

            vm.statusList.selected = '';
            vm.oddList.selected = '';
            vm.payTypeList.selected = '';
            vm.expressCompanyList.selected = '';
            vm.returnStatusList.selected = '';

            getWaybillList();
        }

        function getExpressCompany() {
            Core.Api.Express.getCompanyList().then(
                function (data) {
                    vm.expressCompanyList = data.express_company_list;

                    vm.expressCompanyList.unshift({id: 0, 'name': '全部'});
                },
                function (reason) {
                    Core.Notify.error('reason ' + reason.message);
                }
            )
        }

        function getWaybillList(filter, isReturn) {
            if (!filter) {
                filter = '';
            }

            var waybillSn = vm.search.waybillSn ? vm.search.waybillSn : "";
            var fromCompany = vm.search.fromCompany ? vm.search.fromCompany : "";
            var toCompany = vm.search.toCompany ? vm.search.toCompany : "";

            var status = '';
            if (vm.statusList.selected != undefined) {
                status = vm.statusList.selected.number;
            }

            var oddStatus = 0;
            if (vm.oddList.selected != undefined) {
                oddStatus = vm.oddList.selected.value;
            }

            var payType = 1;
            if (vm.payTypeList.selected != undefined) {
                payType = vm.payTypeList.selected.value;
            }

            var startDate = '';
            if (vm.date.start) {
                startDate = vm.date.start.format('YYYY-MM-DD');
            }

            var endDate = '';
            if (vm.date.end) {
                endDate = vm.date.end.format("YYYY-MM-DD");
            }

            var expressCompanyNameId = 0;
            if (vm.expressCompanyList.selected) {
                expressCompanyNameId = vm.expressCompanyList.selected.id;
            }
            var returnStatus = "";
            if (vm.returnStatusList.selected) {
                returnStatus = vm.returnStatusList.selected.number;
            }
            var currentPage = Core.Data.get('currentPage') ? Core.Data.get('currentPage') : vm.currentPage;
            if (isReturn) {
                Core.Api.Waybill.getWaybillList(
                    currentPage,
                    oddStatus,
                    startDate,
                    endDate,
                    waybillSn,
                    status,
                    expressCompanyNameId,
                    fromCompany,
                    toCompany,
                    1,
                    '-1',
                    payType
                ).then(
                    function (data) {
                        vm.waybillList = data.waybill_list;


                        vm.count = data.count;
                        vm.waybill_count_of_today = data.count_today;
                        vm.totalPage = parseInt(vm.count / vm.pageSize) + (vm.count % vm.pageSize ? 1 : 0);
                        vm.currentPage = currentPage;
                    },
                    function (reason) {
                        Core.Notify.error(reason.message);
                    }
                )
            }
            else {
                Core.Api.Waybill.getWaybillList(
                    currentPage,
                    oddStatus,
                    startDate,
                    endDate,
                    waybillSn,
                    status,
                    expressCompanyNameId,
                    fromCompany,
                    toCompany,
                    1,
                    returnStatus
                ).then(
                    function (data) {
                        vm.waybillList = data.waybill_list;


                        vm.count = data.count;
                        vm.waybill_count_of_today = data.count_today;
                        vm.totalPage = parseInt(vm.count / vm.pageSize) + (vm.count % vm.pageSize ? 1 : 0);
                        vm.currentPage = currentPage;
                    },
                    function (reason) {
                        Core.Notify.error(reason.message);
                    }
                )
            }
        }


        function rejectWaybillReturn(type, id) {
            var uibModal = Core.$uibModal.open({
                templateUrl: 'admin/public-modal/confirm-modal.html',
                controller: 'ConfirmModalController',
                resolve: {
                    type: function () {
                        return type;
                    },
                    id: function () {
                        return id;
                    }
                }
            });

            uibModal.result.then(function (data) {
                Core.$timeout(function () {
                    Core.$state.reload();
                }, 200);
            }, function () {
                Core.Log.d('Modal dismissed at: ' + new Date());
            });
        }

        function showReturnWaybillModal(data) {
            data = data ? data : null;
            var uibModal = Core.$uibModal.open({
                templateUrl: 'admin/waybill/waybill-return-modal.html',
                controller: 'WaybillReturnController',
                resolve: {
                    data: function () {
                        return data;
                    }
                }
            });

            uibModal.result.then(function (data) {
                Core.$timeout(function () {
                    Core.$state.reload();
                }, 200);
            }, function () {
                Core.Log.d('Modal dismissed at: ' + new Date());
            });

        }
    }
})();