(function(){

  angular
    .module('app')
    .controller('HeadlineController', [
      'dataService',
      HeadlineController
    ]);

  function HeadlineController(dataService) {  

  	self = this;
  
  	self.meta = dataService.getMeta;
    self.data = dataService.getData;
    self.originalData = dataService.getOriginalData;
    self.factors = dataService.getFactors;

  }

})();
