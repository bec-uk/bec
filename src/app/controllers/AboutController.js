(function(){

  angular
    .module('app')
    .controller('AboutController', [
      'sitesService', '$state', 'dataService', 'quantitiesService', 'chartsService', 'toastService', '$interval', '$rootScope',
      AboutController
    ]);

  function AboutController(sitesService, $state, dataService, quantitiesService, chartsService, toastService, $interval, $rootScope) {  

  
  }

})();
