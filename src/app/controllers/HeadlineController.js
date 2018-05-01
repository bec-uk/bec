(function(){

  angular
    .module('app')
    .controller('HeadlineController', [
      'dataService', 'quantitiesService', '$state',
      HeadlineController
    ]);

  function HeadlineController(dataService, quantitiesService, $state) {

    self = this;

    self.meta = dataService.getMeta;
    // self.data = dataService.getData;

    // self.data = chartSeries;
    self.originalData = dataService.getOriginalData;
    self.factors = dataService.getFactors;

    self.quantities = quantitiesService;

    self.getData = function() {
      let allData = dataService.getData();
      let siteShortcode = $state.params.shortcode;
      if(allData.hasOwnProperty(siteShortcode)) {
          return allData[siteShortcode];
      } else {
          return [];
      }
    }

    self.getOriginalData = function() {
      let allData = dataService.getOriginalData();
      let siteShortcode = $state.params.shortcode;
      if(allData.hasOwnProperty(siteShortcode)) {
          return allData[siteShortcode];
      } else {
          return [];
      }
    }

  }

})();
