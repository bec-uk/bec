(function(){

  angular
    .module('app')
    .controller('TotalsController', [
      'dataService', 'chartsService', '$interval', '$rootScope', '$timeout', 'quantitiesService', '$window', '$scope', 'sitesService',
      TotalsController
    ]);

  function TotalsController(dataService, chartsService, $interval, $rootScope, $timeout, quantitiesService, $window, $scope, sitesService) {

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
        var newSeries = [];
        angular.forEach(allData, function(value, key) {
            newSeries.push({
                label: sitesService.loadItemSync(key).name,
                value: value
            })
        })
        chartSeries[0].values = newSeries;
        return chartSeries;
    }
    self.getChartOptions = function() {
        var meta = dataService.getMeta();
        chartOptions.chart.yAxis.axisLabel = meta.unit.unit;
        chartOptions.title.text = meta.unit.name;
        return chartOptions;
    }

  }

})();
