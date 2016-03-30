(function(){

  angular
    .module('app')
    .controller('SiteController', [
      'dataService', '$rootScope', '$location',
      SiteController
    ]);

  function SiteController(dataService, $rootScope, $location) {

    self = this;


    //full screen mode. toggle full screen variable in rootscope and begin autoupdate in data service.
    self.toggleFullScreen = function() {
        dataService.toggleAutoUpdate();
        $rootScope.fullScreen = !$rootScope.fullScreen;
    }
    
    //allow query string parameter to make start in full screen
    if($location.search().fullscreen) {
      self.toggleFullScreen();
    }
    
  }


})();
