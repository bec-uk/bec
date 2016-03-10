(function(){

  angular
    .module('app')
    .controller('HeadlineController', [
      'sitesService', '$state', 'dataService', 'quantitiesService', 'chartsService', 'toastService', '$interval', '$rootScope',
      HeadlineController
    ]);

  function HeadlineController(sitesService, $state, dataService, quantitiesService, chartsService, toastService, $interval, $rootScope) {  

  	self = this;
  
  	self.meta = dataService.getMeta;
  	self.summary = dataService.getDataSummary;

  }

})();
