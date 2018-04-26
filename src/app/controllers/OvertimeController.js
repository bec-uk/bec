(function(){

  angular
    .module('app')
    .controller('OvertimeController', [
      'dataService', 'chartsService', '$interval', '$rootScope', '$timeout', 'quantitiesService', '$window', '$scope', 'sitesService',
      OvertimeController
    ]);

  function OvertimeController(dataService, chartsService, $interval, $rootScope, $timeout, quantitiesService, $window, $scope, sitesService) {

    self = this;

    self.autoUpdate = null;

    // chart options from chartService
    var chartOptions = chartsService.lineChartOptions;

    // dummy data
    var chartSeries = [];

    //getters for chart data and options to bind to chart
    self.getChartSeries = function() {
        var allData = dataService.getData();
        chartSeries.length = 0;
        angular.forEach(allData, function(values, key) {
            chartSeries.push({
                key: sitesService.loadItemSync(key).name,
                values: values
            })
        })
        return chartSeries;
    }
    self.getChartOptions = function() {
        return chartOptions;
    }

  }

})();
