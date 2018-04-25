(function(){

  angular
    .module('app')
    .controller('TotalsController', [
      'dataService', 'chartsService', '$interval', '$rootScope', '$timeout', 'quantitiesService', '$window', '$scope',
      TotalsController
    ]);

  function TotalsController(dataService, chartsService, $interval, $rootScope, $timeout, quantitiesService, $window, $scope) {

    self = this;

    self.autoUpdate = null;

    // chart options from chartService
    var chartOptions = chartsService.discreteBarChartOptions;

    // dummy data
    var chartSeries = [

        {
            key: "Totals",
            values: []
        }

    ]

    //getters for chart data and options to bind to chart
    self.getChartSeries = function() {
        var allData = dataService.getTotalData();
        let newSeries = [];
        angular.forEach(allData, function(value, key) {
            newSeries.push({
                label: key,
                value: value
            })
        })
        chartSeries[0].values = newSeries;
        return chartSeries;
    }
    self.getChartOptions = function() {
        return chartOptions;
    }

  }

})();
