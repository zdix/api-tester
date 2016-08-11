(function(){
    angular
        .module('app')
        .config(['$stateProvider', '$urlRouterProvider', function(
           $stateProvider, $urlRouterProvider
        )
        {
            //IdleProvider.idle(5); // in seconds
            //IdleProvider.timeout(120); // in seconds

            $urlRouterProvider.otherwise('/index');

            //$ocLazyLoadProvider.config({
            //    // Set to true if you want to see what and when is dynamically loaded
            //    debug: false
            //});

            function libFilePath(file)
            { 
                return 'asset/inspinia/' + file;
            }

            var launchLayout = 'launch/layout/blank.html';

            $stateProvider

                .state('index', {
                    url: '/index',
                    controller: 'IndexController',
                    templateUrl: 'api/index/index.html',
                    resolve: {
                        //loadPlugin: function ($ocLazyLoad) {
                        //    return $ocLazyLoad.load([
                        //        {
                        //            name: 'ui.select',
                        //            files: [libFilePath('js/plugins/ui-select/select.min.js'), libFilePath('css/plugins/ui-select/select.min.css')]
                        //        },
                        //    ]);
                        //}
                    }
                })

        }])
        
        .run(['$rootScope', '$state', 'Core', function($rootScope, $state, Core) {
            $rootScope.$state = $state;
            console.log('$state: ');

        }]);
})();