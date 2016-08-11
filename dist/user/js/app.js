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
            //Admin: {
            //    login: ['admin/login', 'username', 'password'],
            //    addAdmin: ['admin/add', 'username', 'name', 'password'],
            //    logout: ['admin/logout'],
            //    updatePassword: ['admin/update-password', 'old_password', 'password']
            //},
            //Stat: {
            //    getStatistics: ['stat/home']
            //},
            Waybill: {
                getWaybillListofSchedule: ['waybill/waybill-list-of-schedule', 'schedule_id', 'page'],
                getWaybillListofMerchant: ['waybill/waybill-list-of-company', 'company_id', 'page'],
                getWaybillListofDriver: ['waybill/waybill-list-of-courier', 'courier_id', 'page'],
                getWaybillDetail: ['waybill/waybill-detail', 'waybill_id'],
                getWaybillActionList: ['waybill/waybill-action-list', 'waybill_id'],
                getWaybillStatusList: ['waybill/waybill-status-list', 'waybill_id'],
                updateWaybillCommentAdmin: ['waybill/waybill-comment-admin-update', 'waybill_id', 'comment'],
                updateWaybillCharge: ['waybill/waybill-charge-update', 'waybill_id', 'charge', 'comment'],
                updateWaybillChargePaid: ['waybill/waybill-charge-paid-update', 'waybill_id', 'charge_paid', 'comment'],
                updateWaybillCod: ['waybill/waybill-cod-update', 'waybill_id', 'cod', 'comment'],
                updateWaybillCodReceived: ['waybill/waybill-cod-received-update', 'waybill_id', 'cod_received', 'comment'],
                updateWaybillCodPaid: ['waybill/waybill-cod-paid-update', 'waybill_id', 'cod_paid', 'comment'],
                updateWaybillCodPaidBatch: ['waybill/waybill-cod-paid-update', 'waybill_id_list', 'comment'],
                getPendingReceiveWaybillListOfToday: ['waybill/waybill-list-of-pending-receive-today', 'page', 'filter', 'route_id', 'schedule_id', 'sn', 'from_company_name'],
                updateWaybillStatusReceiving: ['waybill/waybill-update-status-receiving', 'waybill_id', 'schedule_id', 'comment'],
                updateWaybillStatusReceiveSuccess: ['waybill/waybill-update-status-receive-success', 'waybill_id', 'comment'],
                updateWaybillStatusRejectReceive: ['waybill/waybill-update-status-reject-receive', 'waybill_id', 'comment'],
                createWaybillReturn: ['waybill/waybill-return-create', 'waybill_id', 'return_cod', 'return_charge_back', 'return_charge_go_user_type', 'return_charge_back_user_type', 'return_comment'], //创建退货api
                getWaybillReturnList: ['waybill/waybill-return-list', 'page', 'filter', 'begin_date', 'end_date', 'waybill_sn', 'status', 'to_company_name', 'return_status'],
                deleteReturnWaybill: ['waybill/waybill-return-delete', 'waybill_id'],
                confirmReturnWaybill: ['waybill/waybill-return-confirm', 'waybill_id', 'return_cod', 'return_charge_back', 'return_charge_go_user_type', 'return_charge_back_user_type', 'return_comment'],
                rejectReturnWaybill: ['waybill/reject-waybill-return', 'waybill_id', 'return_cod', 'return_charge_back', 'return_charge_go_user_type', 'return_charge_back_user_type', 'return_comment'],

                getTransportRouteList: ['waybill/transport-route-list'],
                getWaybillRouteList: ['waybill/route-list'],
                calculateWaybillCharge: ['waybill/waybill-charge-calculate', 'cargo_large_size_count', 'cargo_small_size_count', 'route_id'],
                saveWaybill: ['waybill/waybill-save', 'waybill_id', 'from_address_id', 'to_address_id', 'content', 'comment', 'cargo_large_size_count', 'cargo_small_size_count', 'package', 'amount', 'insure_declare_value', 'insure_charge', 'charge', 'charge_pay_type', 'cod', 'cod_alipay_id', 'cod_alipay_name', 'deliver_type', 'flag_send_deliver_success_message', 'route_id'],
                getWaybillList: ['waybill/waybill-list', 'page', 'filter', 'begin_date', 'end_date', 'sn', 'status', 'route_id', 'from_company_name', 'to_company_name', 'charge_done', 'cod_done', 'cod_paid_done'],

            },
            //Transport: {
            //    getScheduleList: ['transport/schedule-list'],
            //    getScheduleListOfCourier: ['transport/schedule-list-of-courier', 'courier_id'],
            //    getTransportListOfToday: ['transport/transport-list-of-today'],
            //    saveSchedule: ['transport/schedule-save', 'id', 'start_hour', 'start_minute', 'route_id', 'price_large_size', 'price_small_size', 'discount', 'courier_id'],
            //    removeSchedule: ['transport/schedule-remove', 'schedule_id'],
            //    getRouteList: ['transport/route-list']
            //},
            //Courier: {
            //    getCourierList: ['courier/courier-list', 'page'],
            //    saveCourier: ['courier/courier-save', 'id', 'username', 'name', 'phone', 'password', 'wage_base', 'wage_bonus_attendance', 'wage_bonus_rate', 'wage_performance_x1', 'wage_performance_p1', 'wage_performance_p2'],
            //    removeCourier: ['courier/courier-remove', 'courier_id'],
            //    updateCourierPassword: ['courier/courier-password-update', 'courier_id', 'password'],
            //},
            //Merchant: {
            //    getMerchantList: ['company/list', 'page', 'filter', 'stat_start_time', 'stat_end_time', 'name'],
            //    addMoneyToUserAccount: ['company/money-income-add', 'company_id', 'money', 'comment']
            //},
            Common: {
                getSmsCode: ['common/phone-verification-code-send', 'phone'],
                calculateInsure: ['common/calculate-insure', 'insure_declare_value']
            },
            User: {
                login: ['user/login', 'phone', 'username', 'password'],
                reset: ['user/password-reset', 'phone', 'password', 'code'],
                register: ['user/register', 'company_name', 'phone', 'password', 'code'],
                getAddressList: ['user/address-list', 'page', 'type', 'name', 'phone', 'company_name', 'province', 'city', 'county'],
                getPopularAddressList: ['user/address-list-of-most-popular-of-company', 'type'],
                saveAddress: ['user/address-save', 'address_id', 'type', 'name', 'phone', 'province', 'city', 'county', 'address'],
                deleteAddress: ['user/address-remove', 'address_id'],
            },
            WaybillCross: {
                deleteWaybillCross: ['waybill/waybill-delete', 'waybill_id'],
                saveWaybillCross: ['waybill-cross-city/waybill-save', 'waybill_id', 'from_address_id', 'to_address_id', 'content', 'comment', 'package', 'amount', 'insure_declare_value', 'insure_charge', 'charge', 'charge_pay_type', 'cod', 'deliver_type', 'flag_send_deliver_success_message', 'express_branch_id', 'express_company_id', 'express_waybill_id', 'status'],
                getWaybillList: ['waybill-cross-city/waybill-list', 'page', 'filter', 'begin_date', 'end_date', 'sn', 'status', 'from_company_name', 'to_company_name', 'charge_done', 'cod_done', 'cod_paid_done', 'express_company_id'],
                getWaybillReport: ['waybill-cross-city/waybill-report', 'page', 'begin_date', 'end_date', 'express_company_id'],
                updateWaybillStatusPending: ['waybill-cross-city/waybill-status-pending-update', 'waybill_id']
            },
            Express: {
                getCompanyListByRoute: ['express/company-list-of-route', 'province', 'city', 'county'],
                getBranchListByCompany: ['express/branch-list-of-route-of-company', 'province', 'city', 'county', 'express_company_id'],
                getCompanyList: ['express/company-list', 'name', 'phone', 'code']
            },
            Finance: {
                getTradeListIn: ['finance/trade-list-of-in', 'page', 'begin_date', 'end_date', 'waybill_sn', 'express_company_id', 'from_company_name', 'to_company_name', 'status', 'object', 'subject'],
                getTradeListOut: ['finance/trade-list-of-out', 'page', 'begin_date', 'end_date', 'waybill_sn', 'express_company_id', 'from_company_name', 'to_company_name', 'status', 'object', 'subject'],
                getTradeDetail: ['finance/trade-detail', 'trade_id']
            },
            Clearing: {
                getWaybillTradeLogList: ['clearing/log-list-of-trade', 'trade_id'],
                getWaybillTradeRequestList: ['clearing/request-list-of-trade', 'trade_id'],
            },
            Company: {
                getCompanyDetail: ['company/detail'],
                saveCompany: ['company/company-update', 'company_id', 'legal_person_name', 'legal_person_phone', 'legal_person_id_no', 'booth_number', 'business_scope', 'province', 'city', 'county', 'address', 'telephone', 'fax'],
                deleteCompany: ['company/delete', 'company_id'],
                deleteAccount: ['company/child-user-remove', 'child_user_id'],
                getChildAccountList: ['company/child-user-list'],
                updateAccount: ['company/child-user-update', 'child_user_id', 'name', 'auth_list', 'remark'],
                addAccount: ['company/child-user-add', 'phone', 'password', 'code', 'name', 'auth_list'],
                getCompanyUserInfo: ['company/child-user-info'],
                getCompanyList: ['company/list', 'page', 'customer_name', 'phone', 'company_name', 'province', 'city', 'county']
            },
            BankCard: {
                getBankCardList: ['bank-card/list'],
                getBankCardTypeList: ['bank-card/bank-type-list'],
                saveBankCard: ['bank-card/save', 'id', 'usage', 'account_type', 'bank_type', 'account_no', 'owner_name', 'owner_certificate_type', 'owner_certificate_no', 'owner_phone', 'flag_sms_notification']
            },
            Post: {
                getPostList: ['post/list', 'page', 'type'],
                getPostDetail: ['post/detail', 'post_id'],
            },

            Intra: {
                getRouteList: ['waybill-intra/route-list'],
                getWaybillRouteList: ['waybill-intra/route-list'],
                getWaybillList: ['waybill-intra/waybill-list', 'page', 'filter', 'begin_date', 'end_date', 'sn', 'status', 'route_id', 'from_company_name', 'to_company_name', 'charge_done', 'cod_done', 'cod_paid_done'],
                updateWaybillCodPaidBatch: ['waybill-intra/waybill-cod-paid-update-batch', 'waybill_id_list', 'comment'],
                getWaybillDetail: ['waybill-intra/waybill-detail', 'waybill_id'],
                getWaybillActionList: ['waybill-intra/waybill-action-list', 'waybill_id'],

                getTransportRouteList: ['waybill-intra/transport-route-list'],
                calculateWaybillCharge: ['waybill-intra/waybill-charge-calculate', 'cargo_large_size_count', 'cargo_small_size_count', 'route_id'],
                saveWaybill: ['waybill-intra/waybill-save', 'waybill_id', 'from_address_id', 'to_address_id', 'content', 'comment', 'cargo_large_size_count', 'cargo_small_size_count', 'package', 'amount', 'insure_declare_value', 'insure_charge', 'charge', 'charge_pay_type', 'cod', 'cod_alipay_id', 'cod_alipay_name', 'deliver_type', 'flag_send_deliver_success_message', 'route_id']
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
                // END_POINT: 'http://yunto-api.sinfere.com/admin/100',
                //END_POINT: 'http://yunto.api/qpc/100',
                // END_POINT: 'http://yunto.api/client/100',
                END_POINT: 'http://yex-api.yuntu78.com/client/100',
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
                REFRESH_NAV_INFO: 'refresh-nav-info',
                REFRESH_CURRENT_PAGE: "refresh-current-page",
            },

            TRANSPORT: {
                0: '尚未就绪',
                1: '司机就绪',
                2: '运输途中',
                3: '班次完成'
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

            WAYBILL_INTRA_STATUS_NAME: {
                0: "待收单",
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

            TRADE_COMPANY_TYPE: {
                1: '平台',
                2: '商户',
                3: '物流公司'
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

            ADDRESS_TYPE: {
                DELIVER: 1,
                RECEIVE: 2
            },

            BANK_CARD_USAGE: {
                1: '接收运费/保费',
                2: '接收代收款'
            },
            
            BANK_PAY_STATUS_NAME: {
                0: '初始',
                1: '等待',
                2: '执行中',
                3: '执行成功',
                '-1': '失败',
            },

            ACCOUNT_TYPE: {
                1: '个人账户',
                2: '企业账户'
            },

            CERTIFICATE_TYPE: {
                1: '身份证'
            },

            SMS_FLAG: {
                0: '不接收',
                1: '接收'
            },

            WAYBILL_RETURN_STATUS: {
                '0': '无',
                '1': "发起退货",
                '2': "退货成功",
                '-1': "平台介入中"
            }
            
        }
    }

})();
(function () {
    angular
        .module('app.core')
        .filter('digitLength', ['Core', DigitLength])
        .filter('currencyFormat', CurrencyFormat)
        .filter('transportStatus', ['Core', TransportStatus])
        .filter('stopReceivingStatus', StopReceivingStatus)
        .filter('chargePayType', chargePayType)
        .filter('waybillStatus', ['Core', WaybillStatus])
        .filter('waybillIntraStatus', ['Core', waybillIntraStatus])
        .filter('confirmContent', ['Core', confirmContent])
        .filter('editWaybillContent', ['Core', EditWaybillContent])
        .filter('sourceType', ['Core', SourceType])
        .filter('bankCardUsage', ['Core', bankCardUsage])
        .filter('accountType', ['Core', accountType])
        .filter('certificationType', ['Core', certificationType])
        .filter('smsFlag', ['Core', smsFlag])
        .filter('timeFormat', ['Core', timeFormat])
        .filter('waybillReturnStatus', ['Core', waybillReturnStatus])
        .filter('stringTruncate', stringTruncate)
        .filter('deliverType',deliverType)
        .filter('packageType',packageType)
        .filter('tradeStatus', ['Core', tradeStatus])
        .filter('bankPaySubject', ['Core', BankPaySubject])
        .filter('tradeCompanyType', ['Core', tradeCompanyType])
    ;

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

    function TransportStatus(Core) {
        return function (data) {
            return Core.Const.TRANSPORT[parseInt(data)];
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

    function waybillIntraStatus(Core) {
        return function (data) {
            return Core.Const.WAYBILL_INTRA_STATUS_NAME[parseInt(data)];
        }
    }
 
    function EditWaybillContent() {
        return function (data) {
            if (data == 'charge') return '运费';
            if (data == 'charge_paid') return '已付运费';
            if (data == 'cod_received') return '已收待收款';
            if (data == 'comment') return '备注';
            if (data == 'comment_admin') return '后台备注';
            if (data == 'change_status') return "更改订单状态";
        }
    }

    function SourceType() {
        return function (data) {
            return Core.Const.SOURCE_TYPE[parseInt(data)];
        }
    }

    function confirmContent()
    {
        return function (type)
        {
            if (type == 'delete_waybill') return "确定删除订单吗?";
            if (type == "frozen_account") return "确定冻结该账户?";
            if (type == 'delete_logistics_router') return "确定删除该线路？";
            if (type == 'delete_logistics_branch') return "确定删除该网点？";
            if (type == 'delete_department') return "确定删除该部门吗?";
            if (type == 'delete_role') return "确定删除该角色吗?";
            if (type == 'delete_address') return "确定删除该地址吗?";
            if (type == 'delete_return_waybill') return "确定删除吗?";
            if (type == 'confirm_return_waybill') return "确认退回吗?"; 
            if (type == 'update_waybill_status_pending') return "确认提交吗?";
            if (type == 'logout') return "确定退出登录吗?";
            if (type == 'delete_customer') return "确定删除该客户吗?";
        }
    }

    function bankCardUsage(Core)
    {
        return function (data) {
            if (data !== '') {
                return Core.Const.BANK_CARD_USAGE[parseInt(data)];
            } else {
                return '其他';
            }
        }
    }

    function accountType(Core)
    {
        return function (data) {
            return Core.Const.ACCOUNT_TYPE[parseInt(data)];
        }
    }

    function certificationType(Core)
    {
        return function (data) {
            return Core.Const.CERTIFICATE_TYPE[parseInt(data)];
        }
    }

    function smsFlag(Core)
    {
        return function (data) {
            return Core.Const.SMS_FLAG[parseInt(data)];
        }
    }

    function timeFormat(Core) {
        return function (timeStamp, format) {
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

    function waybillReturnStatus(Core)
    { 
        return function (status)
        {
            return Core.Const.WAYBILL_RETURN_STATUS[status];
        }
    }

    function chargePayType()
    {
        var typeArr = {
            0: '寄方付',
            1: '收方付'
        };

        return function (type) {
            return typeArr[type];
        }
    }

    function deliverType()
    {
        var typeArr = {
            0: '自提',
            1: '送货'
        };

        return function (type) {
            return typeArr[type];
        }
    }

    function  packageType()
    {
        var typeArr = {
            0: '木',
            1: '纸',
            2: '编织袋',
            3: '信封'
        };


        return function (type) {
            switch (type){
                case 0:
                case 1:
                case 2:
                case 3:
                    return typeArr[type];
                default :
                    return '未知';
            }
        }
    }

    function tradeStatus(Core) {
        return function (data) {
            return Core.Const.BANK_PAY_STATUS_NAME[parseInt(data)];
        }
    }

    function BankPaySubject(Core) {
        return function (data) {
            return Core.Const.BANK_PAY_SUBJECT[parseInt(data)];
        }
    }

    function tradeCompanyType(Core) {
        return function (type) {
            return Core.Const.TRADE_COMPANY_TYPE[type];
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

            $urlRouterProvider.otherwise('/user/home');

            $ocLazyLoadProvider.config({
                // Set to true if you want to see what and when is dynamically loaded
                debug: false
            });

            function libFilePath(file) {
                return 'asset/inspinia/' + file;
            }

            var userLayout = 'user/layout/main.html';

            $stateProvider
                .state('login', {
                    url: '/login',
                    controller: 'LoginController',
                    templateUrl: 'user/login/login.html',
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
                .state('forgotPwd', {
                    url: '/forgot-pwd',
                    controller: 'ForgotPwdController',
                    templateUrl: 'user/login/forgot-pwd.html'
                })
                .state('register', {
                    url: '/register',
                    controller: 'RegisterController',
                    templateUrl: 'user/login/register.html'
                })


                .state('user', {
                    abstract: true,
                    url: '/user',
                    templateUrl: userLayout,
                    controller: function ($scope, $rootScope) {
                        $scope.navTitle = '系统首页';
                        $scope.isMain = true;
                        $rootScope.$on('stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                            console.log('-------------');
                            console.log('-------------');
                        });
                    }
                })
                .state('user.home', {
                    url: '/home',
                    controller: 'user.HomeController',
                    templateUrl: 'user/home/home.html',
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

                .state('deliver', {
                    abstract: true,
                    url: '/deliver',
                    templateUrl: userLayout,
                    controller: function ($scope) {
                        $scope.navTitle = '快速发货';
                        $scope.nav = 'deliver';
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
                                    files: [libFilePath('css/plugins/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css')]
                                },
                                {
                                    files: [libFilePath('css/plugins/touchspin/jquery.bootstrap-touchspin.min.css'), libFilePath('js/plugins/touchspin/jquery.bootstrap-touchspin.min.js')]
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
                                    name: 'angular-city-select',
                                    files: [libFilePath('js/plugins/angular-city-select/dist/angular-city-select.css'), libFilePath('js/plugins/angular-city-select/dist/angular-city-select.js')]
                                }
                            ]);
                        }
                    }
                })
                .state('deliver.citySave', {
                    url: '/city-save/:waybillId',
                    controller: 'user.CityDeliverController',
                    templateUrl: 'user/deliver/deliver-city-save.html'
                })
                .state('deliver.save', {
                    url: '/save/:waybillId',
                    controller: 'user.DeliverController',
                    templateUrl: 'user/deliver/deliver-save.html'
                })


                //订单管理
                .state('waybill', {
                    abstract: true,
                    url: '/waybill',
                    templateUrl: userLayout,
                    controller: function ($scope) {
                        $scope.navTitle = '运单';
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
                                }
                            ]);
                        }
                    }
                })
                .state('waybill.list', {
                    url: '/list',
                    controller: 'WaybillListController',
                    templateUrl: 'user/waybill/waybill-list.html'
                })
                .state('waybill.detail', {
                    url: '/detail/:waybillId',
                    params: {
                        page: null
                    },
                    controller: 'WaybillDetailController',
                    templateUrl: 'user/waybill/waybill-detail.html'
                })
                .state('waybill.returnlist', {
                    url: '/returnlist',
                    controller: 'WaybillReturnListController',
                    templateUrl: 'user/waybill/waybill-return-list.html'
                })
                .state('waybill.statistics', {
                    url: '/statistics',
                    controller: 'WaybillStatisticsController',
                    templateUrl: 'user/waybill/waybill-statistics.html'
                })

                //同城运单管理
                .state('waybillIntra', {
                    abstract: true,
                    url: '/waybill-intra',
                    templateUrl: userLayout,
                    controller: function ($scope) {
                        $scope.navTitle = '运单';
                        $scope.nav = 'waybill-intra';
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
                                }
                            ]);
                        }
                    }
                })
                .state('waybillIntra.list', {
                    url: '/list',
                    controller: 'WaybillIntraListController',
                    templateUrl: 'user/waybill-intra/waybill-list.html'
                })
                .state('waybillIntra.detail', {
                    url: '/detail/:waybillId',
                    controller: 'WaybillIntraDetailController',
                    templateUrl: 'user/waybill-intra/waybill-detail.html'
                })

                .state('customer',{
                    abstract: true,
                    url: '/customer',
                    templateUrl: userLayout,
                    controller: function ($scope) {
                        $scope.navTitle = '客户';
                        $scope.nav = 'customer';
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
                                    name: 'angular-city-select',
                                    files: [libFilePath('js/plugins/angular-city-select/dist/angular-city-select.css'), libFilePath('js/plugins/angular-city-select/dist/angular-city-select.js')]
                                }
                            ]);
                        }
                    }
                })
                .state('customer.list', {
                    url: '/list',
                    controller: 'CustomerListController',
                    templateUrl: 'user/customer/customer-list.html'
                })

                //地址管理
                .state('address', {
                    abstract: true,
                    url: '/address',
                    templateUrl: userLayout,
                    controller: function ($scope) {
                        $scope.navTitle = '地址';
                        $scope.nav = 'address';
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
                                    name: 'angular-city-select',
                                    files: [libFilePath('js/plugins/angular-city-select/dist/angular-city-select.css'), libFilePath('js/plugins/angular-city-select/dist/angular-city-select.js')]
                                }
                            ]);
                        }
                    }
                })
                .state('address.deliver', {
                    url: '/deliver',
                    controller: 'DeliverAddressController',
                    templateUrl: 'user/address/address-deliver.html'
                })
                .state('address.receive', {
                    url: '/receive',
                    controller: 'ReceiveAddressController',
                    templateUrl: 'user/address/address-receive.html'
                })

                //财务管理
                .state('finance', {
                    abstract: true,
                    url: '/finance',
                    templateUrl: userLayout,
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

                            ]);
                        }
                    }
                })
                .state('finance.detail', {
                    url: '/detail/:tradeId',
                    controller: 'FinanceDetailController',
                    templateUrl: 'user/finance/finance-detail.html',
                })
                .state('finance.tradeIn', {
                    url: '/trade-in-list',
                    controller: 'FinanceTradeInController',
                    templateUrl: 'user/finance/finance-trade-in.html'
                })
                .state('finance.tradeOut', {
                    url: '/trade-out-list',
                    controller: 'FinanceTradeOutController',
                    templateUrl: 'user/finance/finance-trade-out.html',
                })

                //账号管理
                .state('account', {
                    abstract: true,
                    url: '/account',
                    templateUrl: userLayout,
                    controller: function ($scope) {
                        $scope.navTitle = '账号';
                        $scope.nav = 'account';
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
                                    name: 'angular-city-select',
                                    files: [libFilePath('js/plugins/angular-city-select/dist/angular-city-select.css'), libFilePath('js/plugins/angular-city-select/dist/angular-city-select.js')]
                                }
                            ]);
                        }
                    }
                })
                .state('account.list', {
                    url: '/list',
                    controller: 'AccountListController',
                    templateUrl: 'user/account/account-list.html'
                })


                //店铺管理
                .state('company', {
                    abstract: true,
                    url: '/company',
                    templateUrl: userLayout,
                    controller: function ($scope) {
                        $scope.navTitle = '店铺';
                        $scope.nav = 'company';
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
                                    name: 'angular-city-select',
                                    files: [libFilePath('js/plugins/angular-city-select/dist/angular-city-select.css'), libFilePath('js/plugins/angular-city-select/dist/angular-city-select.js')]
                                },
                                {
                                    name: 'ui.switchery',
                                    files: [libFilePath('css/plugins/switchery/switchery.css'), libFilePath('js/plugins/switchery/switchery.js'), libFilePath('js/plugins/switchery/ng-switchery.js')]
                                },
                                {
                                    files: [libFilePath('css/plugins/iCheck/custom.css'), libFilePath('js/plugins/iCheck/icheck.min.js')]
                                }
                            ]);
                        }
                    }
                })
                .state('company.certificate', {
                    url: '/certificate',
                    controller: 'CompanyCertificateController',
                    templateUrl: 'user/company/company-certificate.html'
                })
                .state('company.bind', {
                    url: '/bind',
                    controller: 'CompanyBindController',
                    templateUrl: 'user/company/company-bind.html'
                })


                .state('post', {
                    abstract: true,
                    url: '/post',
                    templateUrl: userLayout,
                    controller: function ($scope) {
                        $scope.navTitle = '公告';
                        $scope.nav = 'post';
                        $scope.isMain = false;
                    }
                })
                .state('post.detail', {
                    url: '/detail/:postId',
                    controller: 'PostDetailController',
                    templateUrl: 'user/post/post-detail.html'
                })


        }])

        .run(['$rootScope', '$state', 'Core', function ($rootScope, $state, Core) {
            $rootScope.$state = $state;
            console.log('$state: ');
            console.log($state);
            Core.on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

                var detail2List = fromState.name == "waybill.detail" && toState.name == "waybill.list";
                var list2Detail = fromState.name == "waybill.list" && toState.name == "waybill.detail";
                var save2List = fromState.name == "deliver.save" && toState.name == "waybill.list";
                var list2Save = fromState.name == "waybill.list" && toState.name == "deliver.save";
                var fromChange = fromState.name == "deliver.save" && fromParams.waybillId;
                var fromSave = fromState.name == "deliver.save" && !fromParams.waybillId;
                if (!(detail2List || list2Detail || save2List || list2Save)) {
                    Core.Data.set("user-waybill-list-search", {});
                } else if (!fromChange && fromSave) {
                    Core.Data.set("user-waybill-list-search", {});
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

        updateMinute();
        processUserInfo();

        vm.logout = logout;

        Core.on(Core.Const.EVENT.REFRESH_NAV_INFO, function (event, data) {
            Core.$timeout(function () {
                processUserInfo();
                processCompanyUserInfo();
            }, 200);
        });

        function processUserInfo() {
            var user = Core.Data.getUser();
            // console.log(user);
            vm.username = user ? (user.company ? user.company.name : '管理员') : '管理员';

        }

        // console.log('sss' + Core.$state.current);

        function logout() {
            var uibModal = Core.$uibModal.open({
                templateUrl: 'user/public-modal/confirm-modal.html',
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
        };

        function updateMinute() {
            vm.actualTime = new Date();
        }

        var timer = $interval(function () {
            updateMinute();
        }, 600);

        if (!Core.Data.isGuest()) {
            processCompanyUserInfo();
        }

        function processCompanyUserInfo() {
            Core.Api.Company.getCompanyUserInfo().then(
                function (responseData) {
                    var list = responseData.company_user ? responseData.company_user.auth_list : [];

                    vm.authList = {};
                    angular.forEach(list, function (value, key) {
                        vm.authList[value] = true;
                    });

                    Core.publish(Core.Const.EVENT.REFRESH_CURRENT_PAGE);
                    // console.log(vm.authList);
                },
                function (error) {
                    Core.Notify.error(error.message);
                }
            );
        }
    }
})();
(function(){
    angular
        .module('app')
        .controller('EditAccountModalController', ['$scope', '$templateCache', '$uibModalInstance', 'Core', 'account', EditAccountModalController]);


    function EditAccountModalController($scope, $templateCache, $uibModalInstance, Core, account)
    {
        var vm = $scope;

        console.log(account);

        vm.title = account ? '编辑' : '添加';

        vm.isNew = account ? false: true;

        vm.saveData = {
            userId: account ? account.id : 0,
            phone: "",
            code: "",
            password: "",
            name: account ? account.name : ""
        };

        vm.menuList = [
            {value: '2', name: '快速发货', key: 'auth_waybill_deliver'},
            {value: '3', name: '订单管理', key: 'auth_waybill'},
            {value: '4', name: '客户管理', key: 'auth_customer'},
            {value: '5', name: '地址管理', key: 'auth_collect'},
            {value: '6', name: '财务管理', key: 'auth_finance'},
            {value: '7', name: '账户管理', key: 'auth_system'},
            {value: '8', name: '店铺管理', key: 'auth_company'},
        ];

        if (account) {
            var authData = account.auth_list ? account.auth_list : null;
            console.log(authData);
            if (authData)
            {
                angular.forEach(vm.menuList, function (value, key){
                    if (Core.Util.inArray(value.key, authData))
                    {
                        value.selected = true;
                    }
                });
            }
        }

        vm.selectAllMenu = false;
        vm.selectedAll = selectedAll;

        function selectedAll() {
            angular.forEach(vm.menuList, function (item, list) {
                item.selected = vm.selectAllMenu;
            })
        }

        vm.getSmsCode = getSmsCode;
        vm.save = save;
        vm.cancel = cancel;

        function getSmsCode() {
            Core.Api.Common.getSmsCode(vm.saveData.phone).then(
                function (data) {
                    Core.Notify.success('验证码已发送！');
                }, function (reason) {
                    Core.Notify.error('验证码发送失败！');
                    console.log(reason);
                }
            ); 
        }

        function save() {
            var saveData = vm.saveData;

            var authString = "";
            angular.forEach(vm.menuList, function (value, key) {
                if (value.selected) {
                    authString += value.key + ',';
                }
            });

            if (account)
            {
                Core.Api.Company.updateAccount(
                    saveData.userId,
                    saveData.name,
                    authString,
                    ''
                ).then(
                    function (data) {
                        Core.Notify.success('save success');
                    }, function (reason) {
                        Core.Notify.error('save error');
                        console.log(reason);
                    }
                );
            }
            else
            {
                if (!saveData.code)
                {
                    Core.Notify.error('验证码不能为空');
                    return false;
                }

                Core.Api.Company.addAccount(
                    saveData.phone,
                    saveData.password,
                    saveData.code,
                    saveData.name,
                    authString
                ).then(
                    function (responseData) {
                        Core.Notify.success('save success');
                    },
                    function (error) {
                        Core.Notify.error('save error');
                    }
                );
            }

            $uibModalInstance.close();
        };

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        };

    }
})();
(function(){
    angular
        .module('app')
        .controller('AccountListController', ['$scope', 'Core', AccountListController]);

    function AccountListController($scope, Core)
    {
        var vm = $scope;
        //
        //vm.count = 0;
        //vm.currentPage = 1;
        //vm.maxSize = 10;
        //vm.totalPage = 0;


        vm.accountList = [];

        getAccountList();

        vm.showConfirmModal = showConfirmModal;
        vm.editAccount = editAccount;


        function getAccountList() {

            Core.Api.Company.getChildAccountList().then(
                function (data) {
                    vm.accountList = data.user_list;
                    //vm.count = data.count;
                    //vm.totalPage = parseInt(vm.count / vm.maxSize) + (vm.count % vm.maxSize ? 1 : 0);
                },
                function (reason) {
                    Core.Notify.error(reason.message);
                }
            )
        }

        function editAccount(account) {
            account = account ? account : null;
            var uibModal = Core.$uibModal.open({
                templateUrl: 'user/account/edit-account-modal.html',
                controller: 'EditAccountModalController',
                resolve: {
                    account: function () {
                        return account;
                    }
                }
            });

            uibModal.result.then(
                function (result) {
                    Core.$timeout(function(){
                        Core.$state.reload();
                    }, 200);
                },
                function (reason) {
                    console.log(reason);
                    Core.Log.d('Modal dismissed at: ' + new Date());
                }
            );
        }


        function showConfirmModal(type, id)
        {
            var uibModal = Core.$uibModal.open({
                templateUrl: 'user/public-modal/confirm-modal.html',
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




//(function(){
//    angular
//        .module('app')
//        .controller('WaybillListController', ['$scope', '$element', 'Core', WaybillListController]);
//
//    function WaybillListController($scope, $element, Core)
//    {
//        $element[0].querySelector('#start-date').onchange = function () {
//            console.log('start date change');
//            console.log(arguments);
//        };
//
//
//
//        var vm = $scope;
//
//        vm.count = 0;
//        vm.currentPage = 1;
//        vm.maxSize = 10;
//        vm.totalPage = 0;
//        vm.date = {
//            // start: moment().startOf('month'),
//            // start: moment("2016-03-01"),
//            // end: moment()
//            start: '',
//            end: '',
//        };
//        vm.status = '';
//        vm.routeId = '';
//        vm.fromCompany = '';
//        vm.toCompany = '';
//        vm.waybillList = [];
//        //vm.routeSelect = {};
//        vm.statusList = [
//            { number: '',      text: '全部' },
//            { number: '0',      text: Core.Const.WAYBILL_SUCCESS[0] },
//            { number: '1',      text: Core.Const.WAYBILL_SUCCESS[1] },
//        ];
//
//        vm.oddList = [
//            { name: '是', value: 1 },
//            { name: '否', value: 0 }
//        ];
//
//        getWaybillList();
//
//        vm.getWaybillList = getWaybillList;
//        vm.pageChanged = getWaybillList;
//        vm.showConfirmModal = showConfirmModal;
//
//        function getWaybillList(filter) {
//            if (!filter)
//            {
//                filter = '';
//            }
//
//            var routeId = '';
//
//            var status = '';
//            if (vm.statusList.selected != undefined) {
//                status = vm.statusList.selected.number;
//            }
//
//            if (vm.oddList.selected != undefined)
//            {
//                //todo
//            }
//
//            var startDate = '';
//            if (vm.date.start)
//            {
//                startDate = vm.date.start.format('YYYY-MM-DD');
//            }
//            var endDate = '';
//            if (vm.date.end)
//            {
//                endDate = vm.date.end.format('YYYY-MM-DD');
//            }
//
//            Core.Api.WaybillCross.getWaybillList(
//                vm.currentPage,
//                filter,
//                startDate,
//                endDate,
//                status,
//                routeId,
//                vm.fromCompany,
//                vm.toCompany
//            ).then(
//                function (data) {
//                    vm.waybillList = data.waybill_list;
//                    vm.count = data.count;
//                    vm.totalPage = parseInt(vm.count / vm.maxSize) + (vm.count % vm.maxSize ? 1 : 0);
//                },
//                function (reason) {
//                    Core.Notify.error(reason.message);
//                }
//            )
//        }
//
//        function showConfirmModal(type, id)
//        {
//            Core.$uibModal.open({
//                templateUrl: 'main/public-modal/confirm-modal.html',
//                controller: 'ConfirmModalController',
//                resolve: {
//                    type: function () {
//                        return type;
//                    },
//                    id: function () {
//                        return id;
//                    }
//                }
//            });
//        }
//
//    }
//})();



(function(){
    angular
        .module('app')
        .controller('DeliverAddressController', ['$scope', 'Core', DeliverAddressController]);

    function DeliverAddressController($scope, Core)
    {
        var vm = $scope;

        vm.item = {
            city: ''
        }

        vm.count = 0;
        vm.currentPage = 1;
        vm.maxSize = 10;
        vm.totalPage = 0;

        vm.name = '';
        vm.phone = '';
        vm.companyName = '';
        vm.provinceName = '';
        vm.cityName = '';
        vm.countyName = '';


        getDeliverAddressList();

        vm.getDeliverAddressList = getDeliverAddressList;
        vm.pageChanged = getDeliverAddressList;
        vm.showConfirmModal = showConfirmModal;
        vm.editAddress = editAddress;

        vm.$on('onCitySelected', function() {
            vm.provinceName = vm.item.city.cn[0] != undefined ? vm.item.city.cn[0] : '';
            vm.cityName = vm.item.city.cn[1] != undefined ? vm.item.city.cn[1] : '';
            vm.countyName = vm.item.city.cn[2] != undefined ? vm.item.city.cn[2] : '';
        });

        function getDeliverAddressList() {

            Core.Api.User.getAddressList(
                vm.currentPage,
                Core.Const.ADDRESS_TYPE.DELIVER,
                vm.name,
                vm.phone,
                vm.companyName,
                vm.provinceName,
                vm.cityName,
                vm.countyName
            ).then(
                function (data) {
                    vm.addressList = data.address_list;
                    vm.count = data.count;
                    vm.totalPage = parseInt(vm.count / vm.maxSize) + (vm.count % vm.maxSize ? 1 : 0);
                },
                function (reason) {
                    Core.Notify.error(reason.message);
                }
            )
        }

        function editAddress(data, type) {
            var uibModal = Core.$uibModal.open({
                templateUrl: 'user/address/edit-address-modal.html',
                controller: 'EditAddressModalController',
                resolve: {
                    data: function () {
                        return data;
                    },
                    type: function () {
                        return type;
                    }
                }
            });

            uibModal.result.then(
                function (result) {
                    console.log(result);
                    Core.$timeout(function(){
                        Core.$state.reload();
                    }, 200);
                },
                function (reason) {
                    console.log(reason);
                    Core.Log.d('Modal dismissed at: ' + new Date());
                }
            );
        }

        function showConfirmModal(type, id)
        {
            var uibModal = Core.$uibModal.open({
                templateUrl: 'user/public-modal/confirm-modal.html',
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
        .controller('ReceiveAddressController', ['$scope', '$element', 'Core', 'RegionControl', ReceiveAddressController]);

    function ReceiveAddressController($scope, $element, Core, RegionControl)
    {
        var vm = $scope;

        vm.item = {
            city: ''
        }

        vm.count = 0;
        vm.currentPage = 1;
        vm.maxSize = 10;
        vm.totalPage = 0;

        vm.name = '';
        vm.phone = '';
        vm.companyName = '';
        vm.provinceName = '';
        vm.cityName = '';
        vm.countyName = '';

        getReceiveAddressList();

        vm.getReceiveAddressList = getReceiveAddressList;
        vm.pageChanged = getReceiveAddressList;
        vm.showConfirmModal = showConfirmModal;
        vm.editAddress = editAddress;

        vm.$on('onCitySelected', function() {
            vm.provinceName = vm.item.city.cn[0] != undefined ? vm.item.city.cn[0] : '';
            vm.cityName = vm.item.city.cn[1] != undefined ? vm.item.city.cn[1] : '';
            vm.countyName = vm.item.city.cn[2] != undefined ? vm.item.city.cn[2] : '';
        });

        function getReceiveAddressList() {

            Core.Api.User.getAddressList(
                vm.currentPage,
                Core.Const.ADDRESS_TYPE.RECEIVE,
                vm.name,
                vm.phone,
                vm.companyName,
                vm.provinceName,
                vm.cityName,
                vm.countyName
            ).then(
                function (data) {
                    vm.addressList = data.address_list;
                    vm.count = data.count;
                    vm.totalPage = parseInt(vm.count / vm.maxSize) + (vm.count % vm.maxSize ? 1 : 0);
                },
                function (reason) {
                    Core.Notify.error(reason.message);
                }
            )
        }

        function editAddress(data, type) {
            var uibModal = Core.$uibModal.open({
                templateUrl: 'user/address/edit-address-modal.html',
                controller: 'EditAddressModalController',
                resolve: {
                    data: function () {
                        return data;
                    },
                    type: function () {
                        return type;
                    }
                }
            });

            uibModal.result.then(
                function (result) {
                    console.log(result);
                    Core.$timeout(function(){
                        Core.$state.reload();
                    }, 200);
                },
                function (reason) {
                    console.log(reason);
                    Core.Log.d('Modal dismissed at: ' + new Date());
                }
            );
        }


        function showConfirmModal(type, id)
        {
            var uibModal = Core.$uibModal.open({
                templateUrl: 'user/public-modal/confirm-modal.html',
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
        .controller('EditAddressModalController', ['$scope', '$templateCache', '$uibModalInstance', 'Core', 'RegionControl', 'data', 'type', EditAddressModalController]);


    function EditAddressModalController($scope, $templateCache, $uibModalInstance, Core, RegionControl, data, type)
    {
        var vm = $scope;
        vm.title = data ? '修改' : '添加';
        vm.addressType = type == 1 ? '发货' : '收货';

        //城市选择初始化
        vm.regionList = RegionControl.init();
        vm.cityList = {};

        vm.changeProvinceCode = function(provinceObject) {
            vm.cityList = provinceObject.city;
            //vm.saveData.cityName = '';
            //vm.saveData.countyName = '';
        };

        vm.changeCityCode = function(cityObject) {
            vm.countyList = cityObject.county;
            //vm.saveData.countyName = '';
        };

        vm.saveData = {
            addressId: data ? data.id : 0,
            type: type,
            name: data ? data.name : "",
            phone: data ? data.phone : "",
            provinceName: data ? data.province : "",
            cityName: data ? data.city : "",
            countyName: data ? data.county : "",
            address: data ? data.address : "",
        };
        vm.returnData = {};

        vm.save = save;
        vm.cancel = cancel;

        console.log($templateCache.info() + 'Edit address');

        function save() {
            if (vm.saveData.province) {
                vm.saveData.provinceName = vm.saveData.province.name;
            }
            if (vm.saveData.city) {
                vm.saveData.cityName = vm.saveData.city.name;
            }

            Core.Api.User.saveAddress(
                vm.saveData.addressId,
                vm.saveData.type,
                vm.saveData.name,
                vm.saveData.phone,
                vm.saveData.provinceName,
                vm.saveData.cityName,
                vm.saveData.countyName,
                vm.saveData.address
            ).then(
                function (data) {
                    vm.returnData = data.user_address;
                    Core.Notify.success('保存成功！');
                    $uibModalInstance.close(vm.returnData);
                }, function (reason) {
                    Core.Notify.error('保存失败！' + reason);
                    console.log(reason);
                }
            );


        };

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        };

    }
})();
(function(){
    angular
        .module('app')
        .controller('CompanyBindController', ['$scope', '$element', 'Core', CompanyBindController]);

    function CompanyBindController($scope, $element, Core)
    {

        var vm = $scope;
        vm.bankCardList = {};

        getBankCardList();
        vm.openEditModal = openEditModal;

        function getBankCardList() {
            Core.Api.BankCard.getBankCardList().then(
                function (data) {
                    vm.bankCardList = data.bank_card_list;
                },
                function (reason) {
                    Core.Notify.error(reason.message);
                }
            )
        }

        function openEditModal(bankCard)
        {
            var uibModal = Core.$uibModal.open({
                templateUrl: 'user/company/edit-company-bank-card-modal.html',
                controller: 'EditBankCardController',
                resolve: {
                    bankCard: function() {
                        return bankCard;
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
        .controller('CompanyCertificateController', ['$scope', '$element', 'Core', 'RegionControl', CompanyCertificateController]);

    function CompanyCertificateController($scope, $element, Core, RegionControl)
    {

        var vm = $scope;
        vm.detail = {};


        getCompanyDetail();
        vm.openEditModal = openEditModal;



        function getCompanyDetail() {
            Core.Api.Company.getCompanyDetail().then(
                function (data) {
                    vm.detail = data.company;
                },
                function (reason) {
                    Core.Notify.error(reason.message);
                }
            )
        }

        function openEditModal(detail)
        {
            var uibModal = Core.$uibModal.open({
                templateUrl: 'user/company/edit-company-detail-modal.html',
                controller: 'EditCompanyDetailController',
                resolve: {
                    detail: function() {
                        return detail;
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
        .controller('EditBankCardController', ['$scope', '$templateCache', '$uibModalInstance', 'Core', 'bankCard', EditBankCardController]);


    function EditBankCardController($scope, $templateCache, $uibModalInstance, Core, bankCard)
    {
        var vm = $scope;

        vm.saveData = {
            id : bankCard.id,
            usage : bankCard.usage,
            accountType : bankCard.account_type,
            bankType : bankCard.bank_type,
            accountNo : bankCard.account_no,
            ownerName : bankCard.owner_name,
            certificateType : bankCard.owner_certificate_type,
            certificateNo : bankCard.owner_certificate_no,
            ownerPhone : bankCard.owner_phone,
            smsFlag : bankCard.flag_sms_notification == 1 ? true : false
        };

        vm.bankCardTypeList = [];

        getBankCardTypeList();

        vm.save = save;
        vm.cancel = cancel;

        console.log($templateCache.info() + 'Eidt bank card');


        function getBankCardTypeList() {
            Core.Api.BankCard.getBankCardTypeList().then(
                function (data) {
                    vm.bankCardTypeList = data.bank_type_list;
                },
                function (reason) {
                    Core.Notify.error(reason.message);
                }
            )
        }

        function save() {

            vm.saveData.smsFlag = vm.saveData.smsFlag ? 1 : 0;

            if (vm.bankCardTypeList.selected != undefined) {
                vm.saveData.bankType = vm.bankCardTypeList.selected.type;
            }

            console.log(vm.saveData);


            Core.Api.BankCard.saveBankCard(
                vm.saveData.id,
                vm.saveData.usage,
                vm.saveData.accountType,
                vm.saveData.bankType,
                vm.saveData.accountNo,
                vm.saveData.ownerName,
                vm.saveData.certificateType,
                vm.saveData.certificateNo,
                vm.saveData.ownerPhone,
                vm.saveData.smsFlag

            ).then(
                function (data) {
                    Core.Notify.success('save success');
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
        .controller('EditCompanyDetailController', ['$scope', '$templateCache', '$uibModalInstance', 'Core', 'RegionControl', 'detail', EditCompanyDetailController]);


    function EditCompanyDetailController($scope, $templateCache, $uibModalInstance, Core, RegionControl, detail)
    {
        var vm = $scope;

        //城市选择初始化
        vm.regionList = RegionControl.init();
        vm.cityList = {};
        vm.countyList = {};

        vm.name = detail.name;
        vm.legalPersonName = detail.legal_person_name;
        vm.legalPersonPhone = detail.legal_person_phone;
        vm.legalPersonId = detail.legal_person_id_no;
        vm.boothNumber = detail.booth_number;
        vm.provinceName = detail.province;
        vm.cityName = detail.city;
        vm.countyName = detail.county;
        vm.address = detail.address;
        vm.businessScope = detail.business_scope;
        vm.telephone = detail.telephone;
        vm.fax = detail.fax;

        vm.saveData = {
            province: '',
            city: ''
        }

        vm.save = save;
        vm.cancel = cancel;

        console.log($templateCache.info() + 'Eidt address');


        vm.changeProvinceCode = function(provinceObject) {
            vm.cityList = provinceObject.city;
        };

        vm.changeCityCode = function(cityObject) {
            vm.countyList = cityObject.county;
        };


        function save() {

            if (vm.saveData.province) {
                vm.provinceName = vm.saveData.province.name;
            }
            if (vm.saveData.city) {
                vm.cityName = vm.saveData.city.name;
            }

            Core.Api.Company.saveCompany(
                vm.legalPersonName,
                vm.legalPersonPhone,
                vm.legalPersonId,
                vm.boothNumber,
                vm.businessScope,
                vm.provinceName,
                vm.cityName,
                vm.countyName,
                vm.address,
                vm.telephone,
                vm.fax
            ).then(
                function (data) {
                    Core.Notify.success('save success');
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
        .controller('EditController', ['$scope', '$templateCache', '$uibModalInstance', 'Core', 'data', 'RegionControl', EditController]);


    function EditController($scope, $templateCache, $uibModalInstance, Core, data, RegionControl) {
        var vm = $scope;


        vm.operation = data ? '修改' : '添加';

        //城市选择初始化
        vm.regionList = RegionControl.init();
        vm.cityList = {};

        vm.changeProvinceCode = function (provinceObject) {
            vm.cityList = provinceObject.city;
            //vm.saveData.cityName = '';
            //vm.saveData.countyName = '';
        };

        vm.changeCityCode = function (cityObject) {
            vm.countyList = cityObject.county;
            //vm.saveData.countyName = '';
        };

        console.log(data);
        vm.saveData = {
            companyId: data ? data.id : 0,
            legalPersonName: data ? data.legal_person_name : "",
            legalPersonPhone: data ? (data.legal_person_phone ? data.legal_person_phone : data.phone) : "",
            legalPersonIdNo: data ? data.legal_person_id_no : "",
            boothNumber: data ? data.booth_number : "",
            businessScope: data ? data.business_scope : "",
            name: data ? data.name : "",
            provinceName: data ? data.province : "",
            cityName: data ? data.city : "",
            countyName: data ? data.county : "",
            address: data ? data.address : "",
            telephone: data ? data.phone : "",
            fax: data ? data.fax : ""
        };


        vm.save = save;
        vm.cancel = cancel;
        function save() {
            var saveData = vm.saveData;
            if (vm.saveData.province) {
                vm.saveData.provinceName = vm.saveData.province.name;
            }
            if (vm.saveData.city) {
                vm.saveData.cityName = vm.saveData.city.name;
            }
            
            Core.Api.Company.saveCompany(
                saveData.companyId,
                saveData.legalPersonName,
                saveData.legalPersonPhone,
                saveData.legalPersonIdNo,
                saveData.boothNumber,
                saveData.businessScope,
                vm.saveData.provinceName,
                vm.saveData.cityName,
                vm.saveData.countyName,
                saveData.address,
                saveData.telephone,
                saveData.fax
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
        .controller('CustomerListController', ['$scope', '$uibModal', 'Core', CustomerListController]);


    function CustomerListController($scope, $uibModal, Core) {
        var vm = $scope;

        //分页初始化配置
        vm.count = 0;
        vm.currentPage = 1;
        vm.pageSize = 20;
        vm.totalPage = 0;

        vm.customerList = [];

        vm.item = {
            city: ''
        };

        vm.search = {
            name: "",
            phone: "",
            company: ""
        };

        vm.$on('onCitySelected', function() {
            vm.provinceName = vm.item.city.cn[0] != undefined ? vm.item.city.cn[0] : '';
            vm.cityName = vm.item.city.cn[1] != undefined ? vm.item.city.cn[1] : '';
            vm.countyName = vm.item.city.cn[2] != undefined ? vm.item.city.cn[2] : '';
        });

        vm.pageChanged = getCompanyList;
        vm.openModalOfEdit = openModalOfEdit;
        vm.getCompanyList = getCompanyList;
        vm.showConfirmModal = showConfirmModal;
        vm.clearSearchOptions = clearSearchOptions;

        getCompanyList();

        function clearSearchOptions()
        {
            vm.item = {
                city: ''
            };

            vm.search = {
                name: "",
                phone: "",
                company: ""
            };
            getCompanyList();
        }

        function getCompanyList() {

            var name = vm.search.name ? vm.search.name : '';
            var phone = vm.search.phone ? vm.search.phone : "";
            var company = vm.search.company ? vm.search.company : "";

            Core.Api.Company.getCompanyList(
                vm.currentPage,
                name,
                phone,
                company,
                vm.provinceName,
                vm.cityName,
                vm.countyName
            ).then(
                function (data) {
                    vm.customerList = data.list;
                    console.log('-------------');
                    console.log(vm.customerList);
                    vm.search = {
                        name: data.name,
                        phone: data.phone,
                        company: data.company ? data.company: ""
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
                templateUrl: 'user/customer/edit-modal.html',
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
                templateUrl: 'user/public-modal/confirm-modal.html',
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
        .controller('AddressListController', ['$scope', '$uibModalInstance', 'Core', 'type', AddressListController]);

    function AddressListController($scope, $uibModalInstance, Core, type)
    {
        var vm = $scope;
        vm.title = type == Core.Const.ADDRESS_TYPE.DELIVER ? '发货' : '收货';
        vm.type = type;

        vm.item = {
            city: ''
        };

        vm.count = 0;
        vm.currentPage = 1;
        vm.maxSize = 10;
        vm.totalPage = 0;

        vm.input = {
            name: '',
        };
        vm.name = '';
        vm.phone = '';
        vm.companyName = '';
        vm.provinceName = '';
        vm.cityName = '';
        vm.countyName = '';


        getAddressList();

        vm.search = getAddressList;
        vm.pageChanged = getAddressList;
        vm.addressManage = addressManage;
        vm.chooseAddress = chooseAddress;
        //vm.showConfirmModal = showConfirmModal;
        //vm.editAddress = editAddress;

        vm.$on('onCitySelected', function() {
            vm.provinceName = vm.item.city.cn[0] != undefined ? vm.item.city.cn[0] : '';
            vm.cityName = vm.item.city.cn[1] != undefined ? vm.item.city.cn[1] : '';
            vm.countyName = vm.item.city.cn[2] != undefined ? vm.item.city.cn[2] : '';
        });

        function getAddressList() {

            Core.Api.User.getAddressList(
                vm.currentPage,
                type,
                vm.input.name,
                vm.phone,
                vm.companyName,
                vm.provinceName,
                vm.cityName,
                vm.countyName
            ).then(
                function (data) {
                    vm.addressList = data.address_list;
                    vm.count = data.count;
                    vm.totalPage = parseInt(vm.count / vm.maxSize) + (vm.count % vm.maxSize ? 1 : 0);
                },
                function (reason) {
                    Core.Notify.error(reason.message);
                }
            )
        }

        function addressManage() {
            $uibModalInstance.dismiss('cancel');
            if (type == Core.Const.ADDRESS_TYPE.DELIVER) {
                Core.$state.go('address.deliver');
            } else {
                Core.$state.go('address.receive');
            }
        }

        function chooseAddress(address) {
            $uibModalInstance.close(address);
        }

        //function editAddress(data, type) {
        //    var uibModal = Core.$uibModal.open({
        //        templateUrl: 'user/address/edit-address-modal.html',
        //        controller: 'EditAddressModalController',
        //        resolve: {
        //            data: function () {
        //                return data;
        //            },
        //            type: function () {
        //                return type;
        //            }
        //        }
        //    });
        //
        //    uibModal.result.then(
        //        function (result) {
        //            console.log(result);
        //            Core.$timeout(function(){
        //                Core.$state.reload();
        //            }, 200);
        //        },
        //        function (reason) {
        //            console.log(reason);
        //            Core.Log.d('Modal dismissed at: ' + new Date());
        //        }
        //    );
        //}
        //
        //function showConfirmModal(type, id)
        //{
        //    var uibModal = Core.$uibModal.open({
        //        templateUrl: 'user/public-modal/confirm-modal.html',
        //        controller: 'ConfirmModalController',
        //        resolve: {
        //            type: function () {
        //                return type;
        //            },
        //            id: function () {
        //                return id;
        //            }
        //        }
        //    });
        //
        //    uibModal.result.then(function (data) {
        //        Core.$timeout(function(){
        //            Core.$state.reload();
        //        }, 200);
        //    }, function () {
        //        Core.Log.d('Modal dismissed at: ' + new Date());
        //    });
        //}
    }
})();




//(function(){
//    angular
//        .module('app')
//        .controller('WaybillListController', ['$scope', '$element', 'Core', WaybillListController]);
//
//    function WaybillListController($scope, $element, Core)
//    {
//        $element[0].querySelector('#start-date').onchange = function () {
//            console.log('start date change');
//            console.log(arguments);
//        };
//
//
//
//        var vm = $scope;
//
//        vm.count = 0;
//        vm.currentPage = 1;
//        vm.maxSize = 10;
//        vm.totalPage = 0;
//        vm.date = {
//            // start: moment().startOf('month'),
//            // start: moment("2016-03-01"),
//            // end: moment()
//            start: '',
//            end: '',
//        };
//        vm.status = '';
//        vm.routeId = '';
//        vm.fromCompany = '';
//        vm.toCompany = '';
//        vm.waybillList = [];
//        //vm.routeSelect = {};
//        vm.statusList = [
//            { number: '',      text: '全部' },
//            { number: '0',      text: Core.Const.WAYBILL_SUCCESS[0] },
//            { number: '1',      text: Core.Const.WAYBILL_SUCCESS[1] },
//        ];
//
//        vm.oddList = [
//            { name: '是', value: 1 },
//            { name: '否', value: 0 }
//        ];
//
//        getWaybillList();
//
//        vm.getWaybillList = getWaybillList;
//        vm.pageChanged = getWaybillList;
//        vm.showConfirmModal = showConfirmModal;
//
//        function getWaybillList(filter) {
//            if (!filter)
//            {
//                filter = '';
//            }
//
//            var routeId = '';
//
//            var status = '';
//            if (vm.statusList.selected != undefined) {
//                status = vm.statusList.selected.number;
//            }
//
//            if (vm.oddList.selected != undefined)
//            {
//                //todo
//            }
//
//            var startDate = '';
//            if (vm.date.start)
//            {
//                startDate = vm.date.start.format('YYYY-MM-DD');
//            }
//            var endDate = '';
//            if (vm.date.end)
//            {
//                endDate = vm.date.end.format('YYYY-MM-DD');
//            }
//
//            Core.Api.WaybillCross.getWaybillList(
//                vm.currentPage,
//                filter,
//                startDate,
//                endDate,
//                status,
//                routeId,
//                vm.fromCompany,
//                vm.toCompany
//            ).then(
//                function (data) {
//                    vm.waybillList = data.waybill_list;
//                    vm.count = data.count;
//                    vm.totalPage = parseInt(vm.count / vm.maxSize) + (vm.count % vm.maxSize ? 1 : 0);
//                },
//                function (reason) {
//                    Core.Notify.error(reason.message);
//                }
//            )
//        }
//
//        function showConfirmModal(type, id)
//        {
//            Core.$uibModal.open({
//                templateUrl: 'main/public-modal/confirm-modal.html',
//                controller: 'ConfirmModalController',
//                resolve: {
//                    type: function () {
//                        return type;
//                    },
//                    id: function () {
//                        return id;
//                    }
//                }
//            });
//        }
//
//    }
//})();



(function () {
    angular
        .module('app')
        .controller('user.CityDeliverController', ['$scope', '$stateParams', 'Core', CityDeliverController]);

    function CityDeliverController($scope, $stateParams, Core) {

        var vm = $scope;

        vm.isNew = $stateParams.waybillId ? false : true;
        vm.waybill = {};
        vm.waybill_id = $stateParams.waybillId ? $stateParams.waybillId : 0;

        vm.charge_pay_type_list = [
            {value: 0, text: '寄方付'},
            {value: 1, text: '收方付'}
        ];
        vm.has_cod = [
            {value: 0, text: '无'},
            {value: 1, text: '有'}
        ];
        vm.deliver_type_list = [
            {value: 1, text: '送货'},
            {value: 0, text: '自提'}
        ];
        vm.flag_send_deliver_success_message_list = [
            {value: 0, text: '无'},
            {value: 1, text: '有'}
        ];
        //vm.spinOption = {
        //    min: 0,
        //    max: 1000000000000,
        //    step: 0.1,
        //    decimals: 2
        //};

        if ($stateParams.waybillId) {
            Core.Api.Intra.getWaybillDetail(vm.waybill_id).then(
                function (data) {
                    vm.waybill = data.waybill;
                    init();
                },
                function (reason) {
                    Core.Notify.error(reason.message);
                }
            )
        }
        else {
            init();
        }

        function init() {
            vm.from_address_id = vm.isNew ? 0 : vm.waybill.from_user_address_id;
            vm.from_address = {
                id: vm.isNew ? 0 : vm.waybill.from_user_address_id,
                name: vm.isNew ? '' : vm.waybill.from_name,
                phone: vm.isNew ? '' : vm.waybill.from_phone,
                province: vm.isNew ? '' : vm.waybill.from_province,
                city: vm.isNew ? '' : vm.waybill.from_city,
                county: vm.isNew ? '' : vm.waybill.from_county,
                address: vm.isNew ? '' : vm.waybill.from_address
            };

            vm.to_address_id = vm.isNew ? 0 : vm.waybill.to_user_address_id;
            vm.to_address = {
                id: vm.isNew ? 0 : vm.waybill.to_user_address_id,
                name: vm.isNew ? '' : vm.waybill.to_name,
                phone: vm.isNew ? '' : vm.waybill.to_phone,
                province: vm.isNew ? '' : vm.waybill.to_province,
                city: vm.isNew ? '' : vm.waybill.to_city,
                county: vm.isNew ? '' : vm.waybill.to_county,
                address: vm.isNew ? '' : vm.waybill.to_address
            };

            vm.route_id = vm.isNew ? 0 : vm.waybill.route_id;

            vm.content = vm.isNew ? '汽配件' : vm.waybill.content;
            vm.comment = vm.isNew ? '' : vm.waybill.comment;
            vm.charge_pay_type = vm.isNew ? 1 : vm.waybill.charge_pay_type;
            vm.cod = vm.isNew ? '' : parseInt(vm.waybill.cod / 100);
            vm.disableCod = vm.cod ? false : true;
            vm.disableAlipayId = vm.cod ? false : true;
            vm.disableAlipayName = vm.cod ? false : true;
            vm.deliver_type = vm.isNew ? 1 : vm.waybill.deliver_type;
            vm.flag_send_deliver_success_message = vm.isNew ? 0 : vm.waybill.flag_send_deliver_success_message;
            vm.charge = vm.isNew ? '' : vm.waybill.charge;
            vm.large_size_count = vm.isNew ? '' : vm.waybill.cargo_large_size_count;
            vm.small_size_count = vm.isNew ? '' : vm.waybill.cargo_small_size_count;
            vm.cod_alipay_id = vm.isNew ? '' : vm.waybill.cod_alipay_id;
            vm.cod_alipay_name = vm.isNew ? '' : vm.waybill.cod_alipay_name;

            angular.forEach(vm.charge_pay_type_list, function (data, index, array) {
                if (data.value == vm.charge_pay_type) {
                    vm.charge_pay_type_list.selected = data;
                }
            });
            angular.forEach(vm.has_cod, function (data, index, array) {
                if (data.value == !vm.disableCod) {
                    vm.has_cod.selected = data;
                }
            });
            angular.forEach(vm.deliver_type_list, function (data, index, array) {
                if (data.value == vm.deliver_type) {
                    vm.deliver_type_list.selected = data;
                }
            });
            angular.forEach(vm.flag_send_deliver_success_message_list, function (data, index, array) {
                if (data.value == vm.flag_send_deliver_success_message) {
                    vm.flag_send_deliver_success_message_list.selected = data;
                }
            });

            //vm.express_waybill_id = vm.isNew ? '' : vm.waybill.express_waybill_id;

            getDeliverAddress();
            getReceiveAddress();
            getTransportRouteList();

            vm.$watch('has_cod.selected', function () {
                if (vm.has_cod.selected != undefined) {
                    vm.disableCod = vm.has_cod.selected.value ? false : true;
                    vm.disableAlipayId = vm.has_cod.selected.value ? false : true;
                    vm.disableAlipayName = vm.has_cod.selected.value ? false : true;
                    vm.cod = vm.disableCod ? '' : vm.cod;
                }
            });

            vm.$watch('deliveryRouteList.selected', function () {
                if (vm.deliveryRouteList && vm.deliveryRouteList.selected != undefined) {
                    vm.route_id = vm.deliveryRouteList.selected.id;
                }
            });

            vm.$watchGroup(['large_size_count', 'small_size_count', 'route_id'], function () {
                if ((vm.large_size_count || vm.small_size_count) && vm.route_id != 0) {
                    var largeCount = vm.large_size_count ? vm.large_size_count : 0;
                    var smallCount = vm.small_size_count ? vm.small_size_count : 0;
                    calculateWaybillCharge(largeCount, smallCount, vm.route_id);
                } else if (!vm.large_size_count && !vm.small_size_count && vm.route_id != 0) {
                    calculateWaybillCharge(0, 0, vm.route_id);
                }
            });
        }

        vm.saveWaybill = saveWaybill;
        vm.quickChoose = quickChoose;
        vm.editAddress = editAddress;
        vm.deleteConfirm = deleteConfirm;

        function saveWaybill(status) {

            if (vm.deliverAddressList.selected != undefined) {
                vm.from_address_id = vm.deliverAddressList.selected.id;
            }
            if (vm.receiveAddressList.selected != undefined) {
                console.log(vm.receiveAddressList.selected);
                vm.to_address_id = vm.receiveAddressList.selected.id;
            }

            if (vm.deliveryRouteList.selected != undefined) {
                vm.route_id = vm.deliveryRouteList.selected.id;
            }

            if (vm.charge_pay_type_list.selected != undefined) {
                vm.charge_pay_type = vm.charge_pay_type_list.selected.value;
            }
            if (vm.deliver_type_list.selected != undefined) {
                vm.deliver_type = vm.deliver_type_list.selected.value;
            }
            if (vm.flag_send_deliver_success_message_list.selected != undefined) {
                vm.flag_send_deliver_success_message = vm.flag_send_deliver_success_message_list.selected.value;
            }

            //if (!vm.express_waybill_id) {
            //    Core.Notify.error("快递单号不能为空");
            //    return false;
            //}
            if (!vm.from_address_id) {
                Core.Notify.error("请选择发货地址");
                return false;
            }
            if (!vm.to_address_id) {
                Core.Notify.error("请选择收货地址");
                return false;
            }

            if (!vm.large_size_count && !vm.small_size_count) {
                Core.Notify.error("请选择大件或者小件");
                return false;
            }

            if (!vm.deliver_type) {
                Core.Notify.error("请选择签收方式");
                return false;
            }

            Core.Api.Intra.saveWaybill(
                vm.waybill_id,
                vm.from_address_id,
                vm.to_address_id,
                vm.content,
                vm.comment,
                vm.large_size_count,
                vm.small_size_count,
                //vm.package,
                "",
                //vm.amount,
                "",
                //vm.insure_declare_value,
                "",
                //vm.insure_charge * 100,
                "",
                vm.charge * 100,
                vm.charge_pay_type,
                vm.cod * 100,
                vm.cod_alipay_id,
                vm.cod_alipay_name,
                vm.deliver_type,
                vm.flag_send_deliver_success_message,
                vm.route_id,
                status
            ).then(
                function (data) {
                    Core.Notify.success('创建快递单成功！');
                    Core.$state.go('waybillIntra.list');
                },
                function (reason) {
                    Core.Notify.error('reason ' + reason.message);
                }
            )
        };


        function getDeliverAddress() {
            Core.Api.User.getPopularAddressList(Core.Const.ADDRESS_TYPE.DELIVER).then(
                function (data) {
                    vm.deliverAddressList = data.address_list;
                    if (!vm.isNew) {
                        vm.deliverAddressList.selected = vm.from_address;
                    } else {
                        vm.deliverAddressList.selected = vm.deliverAddressList[0];
                    }
                    Core.$timeout(function () {
                        vm.$apply();
                    });
                },
                function (reason) {
                    Core.Notify.error('获取发货地址列表失败： ' + reason.message);
                }
            )
        };

        function getReceiveAddress() {
            Core.Api.User.getPopularAddressList(Core.Const.ADDRESS_TYPE.RECEIVE).then(
                function (data) {
                    vm.receiveAddressList = data.address_list;
                    if (!vm.isNew) {
                        vm.receiveAddressList.selected = vm.to_address;
                        Core.$timeout(function () {
                            vm.$apply();
                        });
                    }
                },
                function (reason) {
                    Core.Notify.error('获取收件地址列表失败： ' + reason.message);
                }
            )
        };

        function quickChoose(type, size) {
            var uibModal = Core.$uibModal.open({
                templateUrl: 'user/deliver/address-list-modal.html',
                controller: 'AddressListController',
                size: size,
                resolve: {
                    type: function () {
                        return type;
                    }
                }
            });

            uibModal.result.then(
                function (result) {
                    if (type == Core.Const.ADDRESS_TYPE.DELIVER) {
                        //vm.deliverAddressList.unshift(result);
                        vm.deliverAddressList.selected = result;
                        Core.$timeout(function () {
                            vm.$apply();
                        });
                    } else if (type == Core.Const.ADDRESS_TYPE.RECEIVE) {
                        //vm.receiveAddressList.unshift(result);
                        vm.receiveAddressList.selected = result;
                        Core.$timeout(function () {
                            vm.$apply();
                        });
                    }

                    console.log(vm.deliverAddressList);

                    // Core.$timeout(function () {
                    //     Core.$state.reload();
                    // }, 200);
                },
                function (reason) {
                    console.log(reason);
                    Core.Log.d('Modal dismissed at: ' + new Date());
                }
            );
        }


        function editAddress(data, type) {

            var uibModal = Core.$uibModal.open({
                templateUrl: 'user/address/edit-address-modal.html',
                controller: 'EditAddressModalController',
                resolve: {
                    data: function () {
                        return data;
                    },
                    type: function () {
                        return type;
                    }
                }
            });

            uibModal.result.then(
                function (result) {
                    if (type == Core.Const.ADDRESS_TYPE.DELIVER) {
                        if (data != '') {
                            getDeliverAddress();
                        } else {
                            vm.deliverAddressList.unshift(result);
                        }
                        vm.deliverAddressList.selected = result;
                        vm.$apply();
                    } else if (type == Core.Const.ADDRESS_TYPE.RECEIVE) {
                        if (data != '') {
                            getDeliverAddress();
                        } else {
                            vm.receiveAddressList.unshift(result);
                        }
                        vm.receiveAddressList.selected = result;
                        vm.$apply();
                    }

                    console.log(vm.deliverAddressList);

                    Core.$timeout(function () {
                        Core.$state.reload();
                    }, 200);
                },
                function (reason) {
                    console.log(reason);
                    Core.Log.d('Modal dismissed at: ' + new Date());
                }
            );
        }

        function deleteAddress(address) {
            Core.Api.User.deleteAddress(address.id).then(
                function (data) {
                    Core.Notify.success('删除成功');
                    Core.$state.reload();
                },
                function (reason) {
                    Core.Notify.error(reason.message ? reason.message : '删除失败');
                }
            )
        }

        function deleteConfirm(address) {
            if (confirm('确定删除吗?')) {
                deleteAddress(address);
            }
        }


        function getTransportRouteList() {
            Core.Api.Intra.getWaybillRouteList().then(
                function (data) {
                    vm.deliveryRouteList = data.route_list;
                },
                function (error) {
                    Core.Notify.error('获取线路失败!');
                }
            );
        }

        function calculateWaybillCharge(cargo_large_size_count, cargo_small_size_count, route_id) {
            Core.Api.Intra.calculateWaybillCharge(cargo_large_size_count, cargo_small_size_count, route_id).then(
                function (responseData) {
                    vm.charge = responseData.charge / 100;

                },
                function (error) {
                    //Core.Notify.error('运费估价失败!');
                }
            );
        }

    }
})();
(function () {
    angular
        .module('app')
        .controller('user.DeliverController', ['$scope', '$stateParams', 'Core', DeliverController]);

    function DeliverController($scope, $stateParams, Core) {

        var vm = $scope;

        vm.isNew = $stateParams.waybillId ? false : true;
        vm.waybill = {};
        vm.waybill_id = $stateParams.waybillId ? $stateParams.waybillId : 0;

        vm.package_type_list = [
            {value: 0, text: '木'},
            {value: 2, text: '编织袋'},
            {value: 1, text: '纸'},
            {value: 3, text: '信封'},
        ];
        vm.charge_pay_type_list = [
            {value: 0, text: '寄方付'},
            {value: 1, text: '收方付'}
        ]
        vm.has_cod = [
            {value: 0, text: '无'},
            {value: 1, text: '有'}
        ]
        vm.deliver_type_list = [
            {value: 1, text: '送货'},
            {value: 0, text: '自提'}
        ]
        vm.flag_send_deliver_success_message_list = [
            {value: 0, text: '无'},
            {value: 1, text: '有'}
        ];

        //vm.spinOption = {
        //    min: 0,
        //    max: 1000000000000,
        //    step: 0.1,
        //    decimals: 2
        //};

        if ($stateParams.waybillId) {
            Core.Api.Waybill.getWaybillDetail(vm.waybill_id).then(
                function (data) {
                    vm.waybill = data.waybill;
                    init();
                },
                function (reason) {
                    Core.Notify.error(reason.message);
                }
            )
        }
        else
        {
            init();
        }

        function init() {
            vm.from_address_id = vm.isNew ? 0 : vm.waybill.from_user_address_id;
            vm.from_address = {
                id: vm.isNew ? 0 : vm.waybill.from_user_address_id,
                name: vm.isNew ? '' : vm.waybill.from_name,
                phone: vm.isNew ? '' : vm.waybill.from_phone,
                province: vm.isNew ? '' : vm.waybill.from_province,
                city: vm.isNew ? '' : vm.waybill.from_city,
                county: vm.isNew ? '' : vm.waybill.from_county,
                address: vm.isNew ? '' : vm.waybill.from_address
            }

            vm.to_address_id = vm.isNew ? 0 : vm.waybill.to_user_address_id;
            vm.to_address = {
                id: vm.isNew ? 0 : vm.waybill.to_user_address_id,
                name: vm.isNew ? '' : vm.waybill.to_name,
                phone: vm.isNew ? '' : vm.waybill.to_phone,
                province: vm.isNew ? '' : vm.waybill.to_province,
                city: vm.isNew ? '' : vm.waybill.to_city,
                county: vm.isNew ? '' : vm.waybill.to_county,
                address: vm.isNew ? '' : vm.waybill.to_address
            }

            vm.content = vm.isNew ? '汽配件' : vm.waybill.content;
            vm.comment = vm.isNew ? '' : vm.waybill.comment;
            vm.package_type = vm.isNew ? '1' : vm.waybill.package;
            vm.amount = vm.isNew ? "" : vm.waybill.amount;
            vm.insure_declare_value = vm.isNew ? '' : parseInt(vm.waybill.insure_declare_value / 100);
            vm.insure_charge = vm.isNew ? 0 : parseInt(vm.waybill.insure_charge / 100);
            vm.charge = '';
            vm.charge_pay_type = vm.isNew ? 1 : vm.waybill.charge_pay_type;
            vm.cod = vm.isNew ? '' : parseInt(vm.waybill.cod / 100);
            vm.disableCod = vm.cod ? false : true;
            vm.deliver_type = vm.isNew ? 1 : vm.waybill.deliver_type;
            vm.flag_send_deliver_success_message = vm.isNew ? 0 : vm.waybill.flag_send_deliver_success_message;



            angular.forEach(vm.package_type_list, function (data, index, array) {
                var package_type_list = vm.package_type.split(',');
                angular.forEach(package_type_list, function (data1, index1, array1) {
                    if (data.value == data1) {
                        data.checked = true;
                    }
                })
            })
            angular.forEach(vm.charge_pay_type_list, function (data, index, array) {
                if (data.value == vm.charge_pay_type) {
                    vm.charge_pay_type_list.selected = data;
                }
            })
            angular.forEach(vm.has_cod, function (data, index, array) {
                if (data.value == !vm.disableCod) {
                    vm.has_cod.selected = data;
                }
            })
            angular.forEach(vm.deliver_type_list, function (data, index, array) {
                if (data.value == vm.deliver_type) {
                    vm.deliver_type_list.selected = data;
                }
            })
            angular.forEach(vm.flag_send_deliver_success_message_list, function (data, index, array) {
                if (data.value == vm.flag_send_deliver_success_message) {
                    vm.flag_send_deliver_success_message_list.selected = data;
                }
            })


            vm.express_branch_id = vm.isNew ? '' : vm.waybill.express_branch_id;
            vm.express_company_id = vm.isNew ? '' : vm.waybill.express_company_id;
            vm.express_waybill_id = vm.isNew ? '' : vm.waybill.express_waybill_id;

            vm.disableCompany = vm.isNew ? true : false;
            vm.disableBranch = vm.isNew ? true : false;
            vm.deliverAddressList = vm.receiveAddressList = vm.expressCompanyList = vm.expressBranchList = [];


            getDeliverAddress();
            getReceiveAddress();

            vm.$watch('has_cod.selected', function () {
                if (vm.has_cod.selected != undefined) {
                    vm.disableCod = vm.has_cod.selected.value ? false : true;
                    vm.cod = vm.disableCod ? '' : vm.cod;
                }
            });

            vm.$watch('receiveAddressList.selected', function () {
                if (vm.receiveAddressList.selected != undefined) {
                    var address = vm.receiveAddressList.selected;
                    getCompanyList(address.province, address.city, address.county);
                    vm.disableCompany = false;
                }
            });

            vm.$watch('expressCompanyList.selected', function () {
                if (vm.expressCompanyList.selected != undefined) {
                    var address = vm.receiveAddressList.selected;
                    var company = vm.expressCompanyList.selected;
                    getBranchList(address.province, address.city, address.county, company.id);
                    vm.disableBranch = false;
                }
            });
        }

        vm.saveWaybill = saveWaybill;
        vm.quickChoose = quickChoose;
        vm.editAddress = editAddress;
        vm.deleteConfirm = deleteConfirm;
        vm.calculateInsure = calculateInsure;

        function saveWaybill(status) {

            angular.forEach(vm.package_type_list, function (data, index, array) {
                if (data.checked) {
                    vm.package_type = vm.package_type + data.value + ',';
                }
            });
            vm.package_type = vm.package_type.slice(0, -1);

            if (vm.deliverAddressList.selected != undefined) {
                vm.from_address_id = vm.deliverAddressList.selected.id;
            }
            if (vm.receiveAddressList.selected != undefined) {
                console.log(vm.receiveAddressList.selected);
                vm.to_address_id = vm.receiveAddressList.selected.id;
            }
            if (vm.charge_pay_type_list.selected != undefined) {
                vm.charge_pay_type = vm.charge_pay_type_list.selected.value;
            }
            if (vm.deliver_type_list.selected != undefined) {
                vm.deliver_type = vm.deliver_type_list.selected.value;
            }
            if (vm.flag_send_deliver_success_message_list.selected != undefined) {
                vm.flag_send_deliver_success_message = vm.flag_send_deliver_success_message_list.selected.value;
            }
            if (vm.expressBranchList.selected != undefined) {
                vm.express_branch_id = vm.expressBranchList.selected.id;
            }
            if (vm.expressCompanyList.selected != undefined) {
                vm.express_company_id = vm.expressCompanyList.selected.id;
            }
            if (!vm.express_waybill_id) {
                Core.Notify.error("快递单号不能为空");
                return false;
            }
            if (!vm.from_address_id) {
                Core.Notify.error("请选择发货地址");
                return false;
            }
            if (!vm.to_address_id) {
                Core.Notify.error("请选择收货地址");
                return false;
            }
            if (!vm.express_company_id) {
                Core.Notify.error('请选择物流公司');
                return false;
            }
            if (!vm.express_branch_id) {
                Core.Notify.error("请选择运送网点");
                return false;
            }

            if (!vm.amount || vm.amount <= 0) {
                Core.Notify.error("请填写件数");
                return false;
            }
            if (!vm.deliver_type) {
                Core.Notify.error("请选择签收方式");
                return false;
            }
            //if (!vm.charge_pay_type) {
            //    Core.Notify.error("请选择运费结算方式");
            //    return false;
            //}
            if (!vm.amount) {
                Core.Notify.error("请填写件数");
                return false;
            }

            Core.Api.WaybillCross.saveWaybillCross(
                vm.waybill_id,
                vm.from_address_id,
                vm.to_address_id,
                vm.content,
                vm.comment,
                vm.package_type,
                vm.amount,
                vm.insure_declare_value * 100,
                vm.insure_charge * 100,
                vm.charge * 100,
                vm.charge_pay_type,
                vm.cod * 100,
                vm.deliver_type,
                vm.flag_send_deliver_success_message,
                vm.express_branch_id,
                vm.express_company_id,
                vm.express_waybill_id,
                status
            ).then(
                function (data) {
                    Core.Notify.success('创建快递单成功！');
                    Core.$state.go('waybill.list');
                },
                function (reason) {
                    Core.Notify.error('reason ' + reason.message);
                }
            )
        };


        function getDeliverAddress() {
            Core.Api.User.getPopularAddressList(Core.Const.ADDRESS_TYPE.DELIVER).then(
                function (data) {
                    vm.deliverAddressList = data.address_list;
                    if (!vm.isNew) {
                        vm.deliverAddressList.selected = vm.from_address;
                    } else {
                        vm.deliverAddressList.selected = vm.deliverAddressList[0];
                    }
                    Core.$timeout(function () {
                        vm.$apply();
                    });
                },
                function (reason) {
                    Core.Notify.error('获取发货地址列表失败： ' + reason.message);
                }
            )
        };

        function getReceiveAddress() {
            Core.Api.User.getPopularAddressList(Core.Const.ADDRESS_TYPE.RECEIVE).then(
                function (data) {
                    vm.receiveAddressList = data.address_list;
                    if (!vm.isNew) {
                        vm.receiveAddressList.selected = vm.to_address;
                        Core.$timeout(function () {
                            vm.$apply();
                        });
                    }
                },
                function (reason) {
                    Core.Notify.error('获取收件地址列表失败： ' + reason.message);
                }
            )
        };
 
        function getCompanyList(province, city, county) {
            Core.Api.Express.getCompanyListByRoute(
                province,
                city,
                county
            ).then(
                function (data) {
                    vm.expressCompanyList = data.express_company_list;
                    if (!vm.isNew) {
                        angular.forEach(vm.expressCompanyList, function (data, index, array) {
                            if (data.id == vm.express_company_id) {
                                vm.expressCompanyList.selected = data;
                                Core.$timeout(function () {
                                    vm.$apply();
                                });
                            }
                        })
                    }
                },
                function (reason) {
                    Core.Notify.error('reason ' + reason.message);
                }
            )
        };

        function getBranchList(province, city, county, company) {
            Core.Api.Express.getBranchListByCompany(
                province,
                city,
                county,
                company
            ).then(
                function (data) {
                    vm.expressBranchList = data.express_branch_list;
                    if (!vm.isNew) {
                        angular.forEach(vm.expressBranchList, function (data, index, array) {
                            if (data.id == vm.express_branch_id) {
                                vm.expressBranchList.selected = data;
                                Core.$timeout(function () {
                                    vm.$apply();
                                });
                            }
                        })
                    }
                },
                function (reason) {
                    Core.Notify.error('reason ' + reason.message);
                }
            )
        }

        function quickChoose(type, size) {
            var uibModal = Core.$uibModal.open({
                templateUrl: 'user/deliver/address-list-modal.html',
                controller: 'AddressListController',
                size: size,
                resolve: {
                    type: function () {
                        return type;
                    }
                }
            });

            uibModal.result.then(
                function (result) {
                    if (type == Core.Const.ADDRESS_TYPE.DELIVER) {
                        //vm.deliverAddressList.unshift(result);
                        vm.deliverAddressList.selected = result;
                        Core.$timeout(function () {
                            vm.$apply();
                        });
                    } else if (type == Core.Const.ADDRESS_TYPE.RECEIVE) {
                        //vm.receiveAddressList.unshift(result);
                        vm.receiveAddressList.selected = result;
                        Core.$timeout(function () {
                            vm.$apply();
                        });
                    }

                    console.log(vm.deliverAddressList);

                    // Core.$timeout(function () {
                    //     Core.$state.reload();
                    // }, 200);
                },
                function (reason) {
                    console.log(reason);
                    Core.Log.d('Modal dismissed at: ' + new Date());
                }
            );
        }


        function editAddress(data, type) {

            var uibModal = Core.$uibModal.open({
                templateUrl: 'user/address/edit-address-modal.html',
                controller: 'EditAddressModalController',
                resolve: {
                    data: function () {
                        return data;
                    },
                    type: function () {
                        return type;
                    }
                }
            });

            uibModal.result.then(
                function (result) {
                    if (type == Core.Const.ADDRESS_TYPE.DELIVER) {
                        if (data != '') {
                            getDeliverAddress();
                        } else {
                            vm.deliverAddressList.unshift(result);
                        }
                        vm.deliverAddressList.selected = result;
                        vm.$apply();
                    } else if (type == Core.Const.ADDRESS_TYPE.RECEIVE) {
                        if (data != '') {
                            getDeliverAddress();
                        } else {
                            vm.receiveAddressList.unshift(result);
                        }
                        vm.receiveAddressList.selected = result;
                        vm.$apply();
                    }

                    console.log(vm.deliverAddressList);

                    Core.$timeout(function () {
                        Core.$state.reload();
                    }, 200);
                },
                function (reason) {
                    console.log(reason);
                    Core.Log.d('Modal dismissed at: ' + new Date());
                }
            );
        }

        function deleteAddress(address) {
            Core.Api.User.deleteAddress(address.id).then(
                function (data) {
                    Core.Notify.success('删除成功');
                    Core.$state.reload();
                },
                function (reason) {
                    Core.Notify.error(reason.message ? reason.message : '删除失败');
                }
            )
        }

        function deleteConfirm(address) {
            if (confirm('确定删除吗?')) {
                deleteAddress(address);
            }
        }

        function calculateInsure()
        {
            Core.Api.Common.calculateInsure(vm.insure_declare_value * 100).then(
                function(responseData) {
                    vm.insure_charge = parseInt(responseData.insure);
                },
                function (error) {
                    Core.Notify.error('计算保费失败!');
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
        .controller('FinanceDetailController', ['$scope', '$stateParams', '$uibModal', 'Core', FinanceDetailController]);


    function FinanceDetailController($scope, $stateParams, $uibModal, Core)
    {
        var vm = $scope;

        vm.tradeId = $stateParams.tradeId;

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
        var isFirst = true;
        //分页初始化设置
        vm.count = 0;
        vm.currentPage = 1;
        vm.maxSize = 10;
        vm.totalPage = 0;

        vm.date = {
            start: '',
            end: ''
        };
        vm.search = {
            orderNo: '',
            fromCompany: '',
            toCompany: '',
        };
        vm.payStatusList = [
            { number: '1',      text: "交易成功" },
            { number: '-1',      text: "交易失败" },
        ];
        vm.payObjectList = [
            { name: '速联平台', number: 1 },
            { name: '物流', number: 2 }
        ];
        vm.payTypeList = [
            { name: '运费', number: 1 },
            { name: '代收款', number: 2 },
            { name: '保价费', number: 3 }
        ];
        vm.expressCompanyList = [];

        vm.getTradeInList = getTradeInList;
        vm.pageChanged = getTradeInList;
        vm.clearSearchOptions = clearSearchOptions;

        getTradeInList();

        function clearSearchOptions() {
            vm.date = {
                start: '',
                end: ''
            };
            vm.search = {
                orderNo: '',
                fromCompany: '',
                toCompany: ''
            };
            vm.payStatusList.selected = null;
            vm.payObjectList.selected = null;
            vm.payTypeList.selected = null;

            getTradeInList();
        }

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

        function getTradeInList() {

            var startDate = "", endDate = "";
            if (vm.date.start)
            {
                startDate = vm.date.start.unix();
            }
            if (vm.date.end)
            {
                endDate = vm.date.end.unix();
            }
            var expressCompanyId = "";
            if (vm.expressCompanyList.selected)
            {
                expressCompanyId = vm.expressCompanyList.selected.id;
            }
            var payStatus = "";
            if (vm.payStatusList.selected)
            {
                payStatus = vm.payStatusList.selected.number;
            }
            var payObject = "";
            if (vm.payObjectList.selected)
            {
                payObject = vm.payObjectList.selected.number;
            }
            var payType = "";
            if (vm.payTypeList.selected)
            {
                payType = vm.payTypeList.selected.number;
            }
            var currentPage = Core.Data.get('currentPage') ? Core.Data.get('currentPage') : vm.currentPage;
            Core.Api.Finance.getTradeListIn(
                currentPage,
                startDate,
                endDate,
                vm.search.orderNo,
                expressCompanyId,
                vm.search.fromCompany,
                vm.search.toCompany,
                payStatus,
                payObject,
                payType
            ).then(
                function(response) {
                    vm.tradeList = response.trade_list;

                    vm.count = response.count;
                    vm.totalPage = parseInt(vm.count / vm.maxSize) + (vm.count % vm.maxSize ? 1 : 0);
                    vm.currentPage = currentPage;
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
        .controller('FinanceTradeOutController', ['$scope', '$templateCache', '$uibModal', 'Core', FinanceTradeOutController]);


    function FinanceTradeOutController($scope, $templateCache, $uibModal, Core)
    {
        var vm = $scope;
        var isFirst = true;

        //分页初始化设置
        vm.count = 0;
        vm.currentPage = 1;
        vm.maxSize = 10;
        vm.totalPage = 0;

        vm.date = {
            start: '',
            end: ''
        };
        vm.search = {
            orderNo: '',
            expressCompany: '',
            fromCompany: '',
            toCompany: '',
        };
        vm.payStatusList = [
            { number: '',      text: '全部' },
            { number: '0',      text: Core.Const.BANK_PAY_STATUS_NAME[0] },
            { number: '1',      text: Core.Const.BANK_PAY_STATUS_NAME[1] },
        ];
        vm.payObjectList = [
            { name: '速联平台', value: 1 },
            { name: '物流', value: 2 }
        ];
        vm.payTypeList = [
            { name: '运费', number: 1 },
            { name: '代收款', number: 2 },
            { name: '保价费', number: 3 }
        ];

        vm.expressCompanyList = [];

        vm.getTradeListOut = getTradeListOut;
        vm.pageChanged = getTradeListOut;
        vm.clearSearchOptions = clearSearchOptions;

        getTradeListOut();

        function clearSearchOptions()
        {
            vm.date = {
                start: '',
                end: ''
            };
            vm.search = {
                orderNo: '',
                expressCompany: '',
                fromCompany: '',
                toCompany: '',
            };
            vm.payStatusList.selected = null;
            vm.payObjectList.selected = null;
            vm.payTypeList.selected = null;

            getTradeListOut();
        }

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

        function getTradeListOut() {

            var startDate = "", endDate = "";
            if (vm.date.start)
            {
                startDate = vm.date.start.unix();
            }
            if (vm.date.end)
            {
                endDate = vm.date.end.unix();
            }
            var expressCompanyId = "";
            if (vm.expressCompanyList.selected)
            {
                expressCompanyId = vm.expressCompanyList.selected.id;
            }
            var payStatus = "";
            if (vm.payStatusList.selected)
            {
                payStatus = vm.payStatusList.selected.number;
            }
            var payObject = "";
            if (vm.payObjectList.selected)
            {
                payObject = vm.payObjectList.selected.number;
            }
            var payType = "";
            if (vm.payTypeList.selected)
            {
                payType = vm.payTypeList.selected.number;
            }
            var currentPage = Core.Data.get('currentPage') ? Core.Data.get('currentPage') : vm.currentPage;
            Core.Api.Finance.getTradeListOut(
                currentPage,
                startDate,
                endDate,
                vm.search.orderNo,
                expressCompanyId,
                vm.search.fromCompany,
                vm.search.toCompany,
                payStatus,
                payObject,
                payType
            ).then(
                function(response) {
                    vm.tradeList = response.trade_list;

                    vm.count = response.count;
                    vm.totalPage = parseInt(vm.count / vm.maxSize) + (vm.count % vm.maxSize ? 1 : 0);
                    vm.currentPage = currentPage;
                },
                function(reason) {
                    Core.Notify.error(reason.message);
                }
            );
        }
    }
})();
(function(){
    angular
        .module('app')
        .controller('user.HomeController', ['$scope', '$templateCache', '$interval', 'Core', HomeController]);


    function HomeController($scope, $templateCache, $interval, Core) {
        var vm = $scope;

        console.log($templateCache.info() + 'transport');

        Core.on(Core.Const.EVENT.REFRESH_CURRENT_PAGE, function (event, data) {
            Core.$state.reload();
        });

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
(function () {
    angular
        .module('app')
        .controller('ForgotPwdController', ['$scope', '$templateCache', '$stateParams', 'Core', ForgotPwdController]);


    function ForgotPwdController($scope, $templateCache, $stateParams, Core) {
        var vm = $scope;
        vm.phone = "";
        vm.getSmsCode = getSmsCode;
        vm.resetPwd = resetPwd;
        vm.back = back;
        vm.wait = {name: '获取验证码', time: 0, timeCount: 60};
        var time;

        function getSmsCode() {
            if (vm.wait.time > 0 || !vm.phone) {
                return;
            }
            Core.Api.Common.getSmsCode(vm.phone).then(
                function (data) {
                    Core.Notify.success('验证码已发送！');
                    vm.wait.name = "重新发送(" + vm.wait.timeCount + ")";
                    time = Core.$interval(countDown, 1000, vm.wait.timeCount);
                }, function (reason) {
                    switch (reason.code) {
                        case 17:
                            Core.Notify.error("请稍后获取验证码");
                            break;
                        default:
                            Core.Notify.error(reason.message);
                            break;
                    }
                }
            );
            function countDown() {
                if (vm.wait.time == 0) {
                    vm.wait.time = vm.wait.timeCount - 1;
                    vm.wait.name = "重新发送(" + vm.wait.time + ")";
                } else {
                    vm.wait.time--;
                    vm.wait.name = "重新发送(" + vm.wait.time + ")";
                    if (vm.wait.time == 0) {
                        vm.wait.name = "获取验证码";
                    }

                }
            }
        }

        function back() {
            Core.$state.go('login');
        }

        function resetPwd() {
            if (!verification()) {
                return;
            }
            Core.Api.User.reset(vm.phone, vm.pwd, vm.code).then(
                function (data) {
                    Core.Notify.success('密码修改成功！');
                    Core.$state.go('login');
                }, function (reason) {
                    switch (reason.code) {
                        case 16:
                            Core.Notify.error("验证码错误");
                            break;
                        default:
                            Core.Notify.error(reason.message);
                            break;
                    }
                }
            );
        }

        function verification() {
            if (!vm.phone) {
                Core.Notify.error('请输入手机号');
                return false;
            }
            if (!vm.pwd) {
                Core.Notify.error('请输入密码');
                return false;
            }
            if (!vm.code) {
                Core.Notify.error('请输入验证码');
                return false;
            }
            return true;
        }


    }
})();
(function () {
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
            console.log(vm.username);
            Core.Api.User.login('', username, password).then(
                function (data) {
                    Core.Data.setToken(data.token);
                    Core.Data.setUser(data.user);
                    Core.Notify.success('登录成功');

                    Core.publish(Core.Const.EVENT.REFRESH_NAV_INFO);

                    Core.Data.setUserType(Core.Config.DATA.APP_USER_TYPE.APP_USER_TYPE_USER);
                    Core.$state.go('user.home');
                },
                function (reason) {
                    Core.Notify.error(reason.message);
                    return false;
                }
            );
        }


        function goToAppLaunch() {
            Core.localStorageService.set(Core.Config.DATA.APP_USER_TYPE, "");
            Core.localStorageService.set(Core.Config.DATA.KEY_APP_LAUNCH_INIT_ID, "");

            Core.$window.location.href = "index.html";
        }
    }
})();
(function () {
    angular
        .module('app')
        .controller('RegisterController', ['$scope', '$templateCache', 'Core', RegisterController]);


    function RegisterController($scope, $templateCache, Core) {
        var vm = $scope;

        vm.phone = "";
        vm.wait = {name: '获取验证码', time: 0, timeCount: 60};
        vm.getSmsCode = getSmsCode;
        vm.register = register;
        vm.back = back;
        var time;

        function getSmsCode() {
            if (vm.wait.time > 0 || !vm.phone) {
                return;
            }
            Core.Api.Common.getSmsCode(vm.phone).then(
                function (data) {
                    Core.Notify.success('验证码已发送！');
                    vm.wait.name = "重新发送(" + vm.wait.timeCount + ")";
                    time = Core.$interval(countDown, 1000, vm.wait.timeCount);
                }, function (reason) {

                    switch (reason.code) {
                        case 17:
                            Core.Notify.error("请稍后获取验证码");
                            break;
                        default:
                            Core.Notify.error(reason.message);
                            break;
                    }
                }
            );
            function countDown() {
                if (vm.wait.time == 0) {
                    vm.wait.time = vm.wait.timeCount - 1;
                    vm.wait.name = "重新发送(" + vm.wait.time + ")";
                } else {
                    vm.wait.time--;
                    vm.wait.name = "重新发送(" + vm.wait.time + ")";
                    if (vm.wait.time == 0) {
                        vm.wait.name = "获取验证码";
                    }

                }
            }
        }

        function back() {
            Core.$state.go('login');
        }

        function register() {
            if (!verification()) {
                return;
            }
            Core.Api.User.register(vm.companyName, vm.phone, vm.pwd, vm.code).then(
                function (data) {
                    Core.Notify.success('注册成功！');
                    Core.Data.setToken(data.token);
                    Core.Data.setUser(data.user);
                    Core.Data.setUserType(Core.Config.DATA.APP_USER_TYPE.APP_USER_TYPE_USER);
                    Core.$state.go('user.home');
                }, function (reason) {

                    if (reason.code == 16)
                    {
                        Core.Notify.error('验证码错误');
                    }
                    else {
                        Core.Notify.error(reason.message);
                    }
                }
            );
        }

        function verification() {
            if (!vm.companyName) {
                Core.Notify.error('请输入公司名');
                return false;
            }
            if (!vm.phone) {
                Core.Notify.error('请输入手机号');
                return false;
            }
            if (!vm.pwd) {
                Core.Notify.error('请输入密码');
                return false;
            }
            if (!vm.code) {
                Core.Notify.error('请输入验证码');
                return false;
            }
            return true;
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
                case 'company_auth_pass':
                    url = Core.Api.Express.changeCompanyStatus(id, Core.Const.EXPRESS_COMPANY_STATUS.STATUS_AUTH);
                    break;
                case 'frozen_account':
                    // 0 未认证  1 已认证 2已冻结
                    url = Core.Api.Merchant.changeStatus(id, 2);
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
                case 'delete_waybill_cross':
                    url = Core.Api.WaybillCross.deleteWaybillCross(id);
                    break;
                case 'delete_account':
                    url = Core.Api.Company.deleteAccount(id);
                    break;
                case 'delete_address':
                    url = Core.Api.User.deleteAddress(id);
                    break;
                case "delete_return_waybill":
                    url = Core.Api.Waybill.deleteReturnWaybill(id);
                    break;
                case "delete_customer":
                    url = Core.Api.Company.deleteCompany(id);
                    break;
                case "update_waybill_status_pending":
                    url = Core.Api.WaybillCross.updateWaybillStatusPending(id);
                    break;
                case 'logout':
                    url = "";
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
                        Core.Notify.success('操作成功！');
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
        .controller('WaybillDetailController', ['$scope', '$templateCache', 'Core', '$stateParams', WaybillDetailController]);


    function WaybillDetailController($scope, $templateCache, Core, $stateParams)
    {
        var vm = $scope;

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

        getWaybillDetail();
        getWaybillActionList();
        getWaybillStatusList();

        vm.openEditModal = openEditModal;
        vm.goBack = goBack;

        console.log($templateCache.info() + 'waybill detail');

        function getWaybillDetail() {

            Core.Api.Waybill.getWaybillDetail(vm.waybillId).then(
                function (data) {
                    vm.waybill = data.waybill;
                },
                function (reason) {
                    Core.Notify.error(reason.message);
                }
            )
        }

        function openEditModal(type, waybill) {

            var uibModal = Core.$uibModal.open({
                templateUrl: 'user/waybill/edit-waybill-modal.html',
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
                    }
                },
                function (error) {
                    Core.Notify.error(error.message);
                }
            );
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
        var isFirst = true;
        var cacheSearch = {};

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
            fromCompany: "",
            toCompany: ""
        };

        vm.statusList = [
            {number: '', text: '全部'},
            {number: '0', text: Core.Const.WAYBILL_STATUS_NAME[0]},
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
            {name: '是', value: 1},
            {name: '否', value: 0}
        ];

        vm.payTypeList = [
            {name: '是', value: 1},
            {name: '否', value: 0}
        ];

        vm.expressCompanyList = [];

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

        vm.getWaybillList = getWaybillList;
        vm.pageChanged = getWaybillList;
        vm.showConfirmModal = showConfirmModal;
        vm.openEditModal = openEditModal;
        vm.showWaybillReturnModal = showWaybillReturnModal;
        vm.clearSearchOptions = clearSearchOptions;
        vm.submitWaybill = submitWaybill;

        function getExpressCompanyList() {
            Core.Api.Express.getCompanyList('', '', '').then(
                function (data) {
                    vm.expressCompanyList = data.express_company_list;

                    vm.expressCompanyList.unshift({id: 0, 'name': '全部'});

                    getCacheSearch();
                    startSaveCacheSearchService();
                    getWaybillList();
                },
                function (reason) {
                    Core.Notify.error(reason.message);
                }
            )
        }

        function getCacheSearch() {
            cacheSearch = Core.Data.get("user-waybill-list-search") ? Core.Data.get("user-waybill-list-search") : {};
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
                Core.Data.set("user-waybill-list-search", cacheSearch);
            });

        }

        function clearSearchOptions() {
            Core.Data.set("user-waybill-list-search", {});

            getCacheSearch();
            getWaybillList();
        }

        function getWaybillList(filter) {
            if (!filter) {
                filter = '';
            }

            var waybillSn = vm.search.waybillSn ? vm.search.waybillSn : "";

            var expressCompanyId = "";
            if (vm.expressCompanyList.selected != undefined) {
                expressCompanyId = vm.expressCompanyList.selected.id;
            }
            var fromCompany = vm.search.fromCompany ? vm.search.fromCompany : "";
            var toCompany = vm.search.toCompany ? vm.search.toCompany : "";

            var status = '';
            if (vm.statusList.selected != undefined) {
                status = vm.statusList.selected.number;
            }

            var oddStatus = 0;
            if (vm.oddList.selected != undefined) {
                oddStatus = vm.oddList.selected.value;
                filter = oddStatus;
            }

            var payType = 1;
            if (vm.payTypeList.selected != undefined) {
                payType = vm.payTypeList.selected.value;
            }


            var startDate = '';
            // console.log("vm.date.start");
            // console.log(vm.date.start);
            if (vm.date.start) {
                startDate = vm.date.start.format('YYYY-MM-DD');
            }
            var endDate = '';
            if (vm.date.end) {
                endDate = vm.date.end.format('YYYY-MM-DD');
            }
            var currentPage = Core.Data.get('currentPage') ? Core.Data.get('currentPage') : vm.currentPage;
            Core.Api.WaybillCross.getWaybillList(
                currentPage,
                filter,
                startDate,
                endDate,
                waybillSn,
                status,
                fromCompany,
                toCompany,
                '', '', '',
                expressCompanyId,
                payType
            ).then(
                function (data) {
                    vm.waybillList = data.waybill_list;

                    // console.log('---------');
                    // console.log(vm.waybillList);

                    vm.count = data.count;
                    vm.totalPage = parseInt(vm.count / vm.pageSize) + (vm.count % vm.pageSize ? 1 : 0);
                    vm.currentPage = currentPage;
                },
                function (reason) {
                    Core.Notify.error(reason.message);
                }
            )
        }

        function submitWaybill(waybillId) {
            Core.Api.WaybillCross.updateWaybillStatusPending(waybillId).then(
                function (responseData) {
                    Core.Notify.success('提交成功');
                },
                function (error) {
                    Core.Notify.error(error.message);
                }
            );
        }

        function showConfirmModal(type, id) {
            var uibModal = Core.$uibModal.open({
                templateUrl: 'user/public-modal/confirm-modal.html',
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
                templateUrl: 'user/waybill/edit-waybill-modal.html',
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

        function showWaybillReturnModal(data) {
            data = data ? data : null;
            var uibModal = Core.$uibModal.open({
                templateUrl: 'user/waybill/waybill-return-modal.html',
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


//(function(){
//    angular
//        .module('app')
//        .controller('WaybillListController', ['$scope', '$element', 'Core', WaybillListController]);
//
//    function WaybillListController($scope, $element, Core)
//    {
//        $element[0].querySelector('#start-date').onchange = function () {
//            console.log('start date change');
//            console.log(arguments);
//        };
//
//
//
//        var vm = $scope;
//
//        vm.count = 0;
//        vm.currentPage = 1;
//        vm.maxSize = 10;
//        vm.totalPage = 0;
//        vm.date = {
//            // start: moment().startOf('month'),
//            // start: moment("2016-03-01"),
//            // end: moment()
//            start: '',
//            end: '',
//        };
//        vm.status = '';
//        vm.routeId = '';
//        vm.fromCompany = '';
//        vm.toCompany = '';
//        vm.waybillList = [];
//        //vm.routeSelect = {};
//        vm.statusList = [
//            { number: '',      text: '全部' },
//            { number: '0',      text: Core.Const.WAYBILL_SUCCESS[0] },
//            { number: '1',      text: Core.Const.WAYBILL_SUCCESS[1] },
//        ];
//
//        vm.oddList = [
//            { name: '是', value: 1 },
//            { name: '否', value: 0 }
//        ];
//
//        getWaybillList();
//
//        vm.getWaybillList = getWaybillList;
//        vm.pageChanged = getWaybillList;
//        vm.showConfirmModal = showConfirmModal;
//
//        function getWaybillList(filter) {
//            if (!filter)
//            {
//                filter = '';
//            }
//
//            var routeId = '';
//
//            var status = '';
//            if (vm.statusList.selected != undefined) {
//                status = vm.statusList.selected.number;
//            }
//
//            if (vm.oddList.selected != undefined)
//            {
//                //todo
//            }
//
//            var startDate = '';
//            if (vm.date.start)
//            {
//                startDate = vm.date.start.format('YYYY-MM-DD');
//            }
//            var endDate = '';
//            if (vm.date.end)
//            {
//                endDate = vm.date.end.format('YYYY-MM-DD');
//            }
//
//            Core.Api.WaybillCross.getWaybillList(
//                vm.currentPage,
//                filter,
//                startDate,
//                endDate,
//                status,
//                routeId,
//                vm.fromCompany,
//                vm.toCompany
//            ).then(
//                function (data) {
//                    vm.waybillList = data.waybill_list;
//                    vm.count = data.count;
//                    vm.totalPage = parseInt(vm.count / vm.maxSize) + (vm.count % vm.maxSize ? 1 : 0);
//                },
//                function (reason) {
//                    Core.Notify.error(reason.message);
//                }
//            )
//        }
//
//        function showConfirmModal(type, id)
//        {
//            Core.$uibModal.open({
//                templateUrl: 'main/public-modal/confirm-modal.html',
//                controller: 'ConfirmModalController',
//                resolve: {
//                    type: function () {
//                        return type;
//                    },
//                    id: function () {
//                        return id;
//                    }
//                }
//            });
//        }
//
//    }
//})();



(function () {
    angular
        .module('app')
        .controller('WaybillReturnController', ['$scope', '$uibModalInstance', 'Core', 'data', WaybillReturnController]);


    function WaybillReturnController($scope, $uibModalInstance, Core, data) {
        var vm = $scope;

        console.log(data);
        vm.saveData = {
            waybillId: data ? data.id : 0,
            returnCod: data ? parseInt(data.return_cod / 100.0) : "",
            returnCharge: data ? parseInt(data.return_charge_back / 100.0) : "",
            returnComment: data ? data.return_comment : "",
            returnExpressComment: data ? data.return_express_comment : "",
            returnAdminComment: data ? data.return_admin_comment : "",
            returnStatus: data ? data.return_status : 0,
        };

        vm.noEdit = true;

        vm.returnChargeGoUserType = [
            {text: '商户', value: 1},
            {text: '汽修店', value: 2}
        ];

        vm.returnChargeBackUserType = [
            {text: '商户', value: 1},
            {text: '汽修店', value: 2}
        ];

        var textArr = ['商户', '汽修店'];
        if (data) {
            vm.returnChargeGoUserType.selected = {
                value: data.return_charge_go_user_type,
                text: textArr[data.return_charge_go_user_type - 1]
            };
            vm.returnChargeBackUserType.selected = {
                value: data.return_charge_back_user_type,
                text: textArr[data.return_charge_back_user_type - 1]
            };
        }

        vm.rejectReturnWaybill = rejectReturnWaybill;
        vm.confirmReturnWaybill = confirmReturnWaybill;
        vm.save = save;
        vm.cancel = cancel;

        function confirmReturnWaybill()
        {
            var saveData = vm.saveData;
            var returnChargeGoUserType = 1;
            if (vm.returnChargeGoUserType.selected) {
                returnChargeGoUserType = vm.returnChargeGoUserType.selected.value;
            }
            var returnChargeBackUserType = 1;
            if (vm.returnChargeBackUserType.selected) {
                returnChargeBackUserType = vm.returnChargeBackUserType.selected.value;
            }

            Core.Api.Waybill.confirmReturnWaybill(
                saveData.waybillId,
                saveData.returnCod * 100,
                saveData.returnCharge * 100,
                returnChargeGoUserType,
                returnChargeBackUserType,
                saveData.returnComment
            ).then(
                function (responseData) {
                    Core.Notify.success('确认退货单成功');
                },
                function (error) {
                    Core.Notify.error('确认退货单失败');
                }
            );

            save();
        }

        function rejectReturnWaybill()
        {
            var saveData = vm.saveData;
            var returnChargeGoUserType = 1;
            if (vm.returnChargeGoUserType.selected) {
                returnChargeGoUserType = vm.returnChargeGoUserType.selected.value;
            }
            var returnChargeBackUserType = 1;
            if (vm.returnChargeBackUserType.selected) {
                returnChargeBackUserType = vm.returnChargeBackUserType.selected.value;
            }
            
            Core.Api.Waybill.rejectReturnWaybill(
                saveData.waybillId,
                saveData.returnCod * 100,
                saveData.returnCharge * 100,
                returnChargeGoUserType,
                returnChargeBackUserType,
                saveData.returnComment
            ).then(
                function (responseData) {
                    Core.Notify.success('申请平台介入成功');
                },
                function (error) {
                    Core.Notify.error(error.message);
                }
            );

            save();
        }

        function save() {


            $uibModalInstance.close();
        }

        function cancel() {
            console.log('cancel');
            $uibModalInstance.dismiss('cancel');
        };

    }
})();
(function(){
    angular
        .module('app')
        .controller('WaybillReturnListController', ['$scope', '$element', 'Core', WaybillReturnListController]);

    function WaybillReturnListController($scope, $element, Core)
    {
        var vm = $scope;
        var isFirst = true;
        vm.count = 0;
        vm.currentPage = 1;
        vm.maxSize = 10;
        vm.totalPage = 0;

        vm.date = {
            start: '',
            end: '',
        };

        vm.search = {
            waybillSn: "",
            toCompany: ""
        };

        vm.waybillReturnList = [];

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
        ];

        vm.returnStatusList = [
            { number: '',      text: '全部' },
            { number: '1', text: Core.Const.WAYBILL_RETURN_STATUS[1]},
            { number: '2', text: Core.Const.WAYBILL_RETURN_STATUS[2]},
            { number: '-1', text: Core.Const.WAYBILL_RETURN_STATUS['-1']},
        ];

        vm.oddList = [
            { name: '是', value: 1 },
            { name: '否', value: 0 }
        ];

        vm.payTypeList = [
            {name: '是', value: 1},
            {name: '否', value: 0}
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

        getWaybillReturnList();

        vm.getWaybillReturnList = getWaybillReturnList;
        vm.pageChanged = getWaybillReturnList;
        vm.showConfirmModal = showConfirmModal;
        vm.showWaybillReturnModal = showWaybillReturnModal;
        vm.deleteReturnWaybill = deleteReturnWaybill;
        vm.confirmReturnWaybill = confirmReturnWaybill;


        function getWaybillReturnList(filter) {
            if (!filter)
            {
                filter = '';
            }

            var start = '';
            if (vm.date.start)
            {
                start = vm.date.start.format('YYYY-MM-DD');
            }
            var end = '';
            if (vm.date.end)
            {
                end = vm.date.end.format('YYYY-MM-DD');
            }
            var status = "";
            if (vm.statusList.selected) {
                status = vm.statusList.selected.number;
            }
            var oddStatus = 0;
            if (vm.oddList.selected) {
                oddStatus = vm.oddList.selected.value;
            }
            // var payType = 1;
            // if (vm.payTypeList.selected) {
            //     payType = vm.payTypeList.selected.value;
            // }

            var returnStatus = "";
            if (vm.returnStatusList.selected)
            {
                returnStatus = vm.returnStatusList.selected.number;
            }

            var currentPage = Core.Data.get('currentPage') ? Core.Data.get('currentPage') : vm.currentPage;
            Core.Api.Waybill.getWaybillReturnList(
                currentPage,
                oddStatus,
                start,
                end,
                vm.search.waybillSn,
                status,
                vm.search.toCompany,
                returnStatus 
            ).then(
                function (data) {
                    vm.waybillReturnList = data.waybill_list;

                    vm.count = data.count;
                    vm.totalPage = parseInt(vm.count / vm.maxSize) + (vm.count % vm.maxSize ? 1 : 0);
                    vm.currentPage = currentPage;
                },
                function (reason) {
                    Core.Notify.error(reason.message);
                }
            )
        }


        function showConfirmModal(type, id)
        {
            Core.$uibModal.open({
                templateUrl: 'main/public-modal/confirm-modal.html',
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
        }

        function showWaybillReturnModal(data)
        {
            data = data ? data : null;
            var uibModal = Core.$uibModal.open({
                templateUrl: 'user/waybill/waybill-return-modal.html',
                controller: 'WaybillReturnController',
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

        function deleteReturnWaybill(type, id)
        {
            var uibModal = Core.$uibModal.open({
                templateUrl: 'user/public-modal/confirm-modal.html',
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
 

        function confirmReturnWaybill(id)
        {
            var uibModal = Core.$uibModal.open({
                templateUrl: 'user/public-modal/confirm-modal.html',
                controller: 'ConfirmModalController',
                resolve: {
                    type: function () {
                        return "confirm_return_waybill";
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
        .controller('WaybillStatisticsController', ['$scope', 'Core', WaybillStatisticsController]);

    function WaybillStatisticsController($scope, Core)
    {

        var vm = $scope;

        vm.count = 0;
        vm.currentPage = 1;
        vm.maxSize = 10;
        vm.totalPage = 0;
        vm.date = {
            start: '',
            end: '',
        };

        vm.waybillList = [];
        vm.stat = {};
        vm.expressCompanyList = [];


        getExpressCompanyList();

        getWaybillReport();

        vm.getWaybillReport = getWaybillReport;
        vm.pageChanged = getWaybillReport;

        function getExpressCompanyList() {
            Core.Api.Express.getCompanyList('', '', '').then(
                function (data) {
                    vm.expressCompanyList = data.express_company_list;
                },
                function (reason) {
                    Core.Notify.error(reason.message);
                }
            )
        }

        function getWaybillReport(isExport) {

            var startDate = '';
            if (vm.date.start) {
                startDate = vm.date.start.format('YYYY-MM-DD');
            }
            var endDate = '';
            if (vm.date.end) {
                endDate = vm.date.end.format('YYYY-MM-DD');
            }
            var expressCompanyId = '';
            if (vm.expressCompanyList.selected != undefined) {
                expressCompanyId = vm.expressCompanyList.selected.id;
            }

            if (isExport) {
 
                var data = {
                    begin_date: startDate,
                    end_date: endDate,
                    express_company_id: expressCompanyId
                };

                Core.$window.location.href = Core.Api.getUrl('waybill-cross-city/waybill-report-export', data);
            }
            else
            {
                Core.Api.WaybillCross.getWaybillReport(
                    vm.currentPage,
                    startDate,
                    endDate,
                    expressCompanyId
                ).then(
                    function (data) {
                        vm.waybillList = data.waybill_list;
                        vm.stat = data.stat;
                        vm.count = data.count;
                        vm.totalPage = parseInt(vm.count / vm.maxSize) + (vm.count % vm.maxSize ? 1 : 0);
                    },
                    function (reason) {
                        Core.Notify.error(reason.message);
                    }
                )
            }
        }

    }
})();
(function(){
    angular
        .module('app')
        .controller('WaybillIntraDetailController', ['$scope', 'Core', '$uibModal', '$stateParams', WaybillIntraDetailController]);


    function WaybillIntraDetailController($scope, Core, $uibModal, $stateParams)
    {
        var vm = $scope;

        vm.waybillId = $stateParams.waybillId;
        vm.waybill = {};
        vm.waybillActionList = [];

        vm.updateStatusReturnSuccess = updateStatusReturnSuccess;

        getWaybillDetail();
        getWaybillActionList();

        vm.STATUS_RETURNING = Core.Const.WAYBILL_STATUS.STATUS_RETURNING;

        vm.openEditModal = openEditModal;

        function getWaybillDetail() {
            console.log('sss' + vm.waybillId);

            Core.Api.Intra.getWaybillDetail(vm.waybillId).then(
                function (data) {
                    vm.waybill = data.waybill;
                    console.log(vm.waybill);
                },
                function (reason) {
                    //console.log('fff');
                    Core.Notify.error(reason.message);
                }
            )
        }

        function getWaybillActionList() {
            Core.Api.Intra.getWaybillActionList(vm.waybillId).then(
                function (data) {
                    vm.waybillActionList = data.waybill_action_list;
                },
                function (reason) {
                    Core.Notify.error(reason.message ? reason.message : '获取失败');
                }
            );
        }


        function openEditModal(type, waybill) {
            $uibModal.open({
                templateUrl: 'main/waybill/edit-waybill-modal.html',
                controller: 'EditWaybillController',
                resolve: {
                    type: function () {
                        return type;
                    },
                    waybill: function () {
                        return waybill;
                    }
                }
            });
        }

    }
})();
(function () {
    angular
        .module('app')
        .controller('WaybillIntraListController', ['$scope', 'Core', WaybillIntraListController]);

    function WaybillIntraListController($scope, Core) {
        var vm = $scope;

        vm.count = 0;
        vm.currentPage = 1;
        vm.pageSize = 20;
        vm.totalPage = 0;

        vm.date = {
            start: '',
            end: ''
        };

        vm.sn = '';
        vm.status = '';
        vm.routeId = '';
        vm.fromCompany = '';
        vm.toCompany = '';
        vm.waybillList = [];
        vm.routeList = [];
        //vm.routeSelect = {};
        vm.statusList = [
            { number: '',      text: '全部' },
            { number: '0',      text: Core.Const.WAYBILL_STATUS_NAME[0] },
            { number: '100',      text: Core.Const.WAYBILL_STATUS_NAME[100] },
            //{ number: '101',      text: Core.Const.WAYBILL_STATUS_NAME[101] },
            { number: '200',      text: Core.Const.WAYBILL_STATUS_NAME[200] },
            { number: '300',      text: Core.Const.WAYBILL_STATUS_NAME[300] },
            { number: '400',      text: Core.Const.WAYBILL_STATUS_NAME[400] },
            { number: '500',      text: Core.Const.WAYBILL_STATUS_NAME[500] },
            { number: '600',      text: Core.Const.WAYBILL_STATUS_NAME[600] },
            { number: '700',      text: Core.Const.WAYBILL_STATUS_NAME[700] },

            { number: '-1',      text: Core.Const.WAYBILL_STATUS_NAME['-1'] },
            { number: '-200',      text: Core.Const.WAYBILL_STATUS_NAME['-200'] },
            //{ number: '-201',      text: Core.Const.WAYBILL_STATUS_NAME['-201'] },
            { number: '-400',      text: Core.Const.WAYBILL_STATUS_NAME['-400'] },
            //{ number: '-401',      text: Core.Const.WAYBILL_STATUS_NAME['-401'] },
            { number: '-9999',      text: Core.Const.WAYBILL_STATUS_NAME['-9999'] },
        ];

        vm.chargeDoneList = [
            { name: '是', value: 1 },
            { name: '否', value: 0 }
        ];
        vm.codDoneList = [
            { name: '是', value: 1 },
            { name: '否', value: 0 }
        ];
        vm.boolList = [
            { name: '全部', value: -1 },
            { name: '是', value: 1 },
            { name: '否', value: 0 }
        ];

        vm.chargeDone = {};
        vm.codDone = {};
        vm.codPaidDone = {};

        getWaybillList();
        getRouteList();

        vm.getWaybillList = getWaybillList;
        vm.pageChanged = getWaybillList;
        vm.batchUpdateCodPaid = batchUpdateCodPaid;

        function getWaybillList(filter, isExport) {
            if (!filter)
            {
                filter = '';
            }

            var routeId = '';
            if (vm.routeList.selected != undefined) {
                routeId = vm.routeList.selected.id;
                if (routeId <= 0)
                {
                    routeId = '';
                }
            }

            var status = '';
            if (vm.statusList.selected != undefined) {
                status = vm.statusList.selected.number;
            }

            var chargeDone = '';
            if (vm.chargeDone.selected != undefined)
            {
                chargeDone = vm.chargeDone.selected.value;
                if (chargeDone == -1)
                {
                    chargeDone = '';
                }
            }

            var codDone = '';
            if (vm.codDone.selected != undefined)
            {
                codDone = vm.codDone.selected.value;
                if (codDone == -1)
                {
                    codDone = '';
                }
            }

            var codPaidDone = '';
            if (vm.codPaidDone.selected != undefined)
            {
                codPaidDone = vm.codPaidDone.selected.value;
                if (codPaidDone == -1)
                {
                    codPaidDone = '';
                }
            }

            var startDate = '';
            if (vm.date.start)
            {
                startDate = vm.date.start.format('YYYY-MM-DD');
            }
            var endDate = '';
            if (vm.date.end)
            {
                endDate = vm.date.end.format('YYYY-MM-DD');
            }

            if (isExport)
            {
                var data = {
                    page: vm.currentPage,
                    filter: filter,
                    begin_date: startDate,
                    end_date: endDate,
                    sn: vm.sn,
                    status: status,
                    route_id: routeId,
                    from_company_name: vm.fromCompany,
                    to_company_name: vm.toCompany,
                    charge_done: chargeDone,
                    cod_done: codDone,
                    cod_paid_done: codPaidDone
                };

                Core.$window.location.href = Core.Api.getUrl('waybill-intra/waybill-list-export', data);
            }
            else
            {
                Core.Api.Intra.getWaybillList(
                    vm.currentPage,
                    filter,
                    startDate,
                    endDate,
                    vm.sn,
                    status,
                    routeId,
                    vm.fromCompany,
                    vm.toCompany,
                    chargeDone,
                    codDone,
                    codPaidDone
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


        }

        function getRouteList() {
            Core.Api.Intra.getWaybillRouteList().then(
                function (data) {
                    vm.routeList = [{id: 0, name: '全部'}].concat(data.route_list);
                },
                function (reason) {
                }
            )
        }

        function batchUpdateCodPaid() {
            var waybillIdList = [];
            var sum = 0;
            var errorCodNotReceivedSNList = [];
            var errorCodPaidDoneSNList = [];
            angular.forEach(vm.waybillList, function (item, list) {
                if (item.selected)
                {
                    sum += item.cod;
                    waybillIdList.push(item.id);

                    if (item.cod_received < item.cod)
                    {
                        errorCodNotReceivedSNList.push(item.sn);
                    }

                    if (item.cod_paid && item.cod_paid >= item.cod_received)
                    {
                        errorCodPaidDoneSNList.push(item.sn);
                    }
                }
            });

            if (waybillIdList.length <= 0)
            {
                alert('请至少选择一个运单');
                return;
            }

            if (errorCodNotReceivedSNList.length > 0)
            {
                alert('运单:' + errorCodNotReceivedSNList.join(',') + '的代收款未收取,请重新选择');
                return;
            }

            if (errorCodPaidDoneSNList.length > 0)
            {
                alert('运单:' + errorCodPaidDoneSNList.join(',') + '的代收款已付清,请重新选择');
                return;
            }

            sum = parseInt(sum / 100);
            if (!confirm('总金额' + sum + '元, 确定打款?'))
            {
                return;
            }

            Core.Api.Intra.updateWaybillCodPaidBatch(waybillIdList.join(','), '').then(
                function (data) {
                    Core.$state.reload();
                }, function (reason) {
                    Core.Notify.error('更新失败');
                    console.log(reason);
                }
            )
        }
    }
})();


