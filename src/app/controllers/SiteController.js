(function(){

  angular
    .module('app')
    .controller('SiteController', [
      'dataService', '$rootScope',
      SiteController
    ]);

  function SiteController(dataService, $rootScope) {

    self = this;

    //full screen mode. toggle full screen variable in rootscope and begin autoupdate in data service.
    self.toggleFullScreen = function() {
        dataService.toggleAutoUpdate();
        $rootScope.fullScreen = !$rootScope.fullScreen;
    }
    
  }


})();
