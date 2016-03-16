(function(){

  angular
    .module('app')
    .controller('HeadlineController', [
      'dataService', 'quantitiesService',
      HeadlineController
    ]);

  function HeadlineController(dataService, quantitiesService) {  

  	self = this;
  
  	self.meta = dataService.getMeta;
    self.data = dataService.getData;
    self.originalData = dataService.getOriginalData;
    self.factors = dataService.getFactors;

    self.quantities = quantitiesService;

  }

})();
