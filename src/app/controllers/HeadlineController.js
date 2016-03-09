(function(){

  angular
    .module('app')
    .controller('HeadlineController', [
      'sitesService', '$state', 'simtricityService', 'quantitiesService', 'chartsService', 'toastService', '$interval', '$rootScope',
      HeadlineController
    ]);

  function HeadlineController(sitesService, $state, simtricityService, quantitiesService, chartsService, toastService, $interval, $rootScope) {  

      

  }

})();
