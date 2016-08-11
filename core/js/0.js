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

