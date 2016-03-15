(function(){

  angular
    .module('app')
    .controller('GraphController', [
      'dataService', 'chartsService', '$interval', '$rootScope',
      GraphController
    ]);

  function GraphController(dataService, chartsService, $interval, $rootScope) {  

    self = this;
    
    self.autoUpdate = null;

    // chart series format from chartService
    var chartSeries = [
        chartsService.series
    ];

    // chart options from chartService
    var chartOptions = chartsService.historicalBarChartOptions;

    //getters for chart data and options to bind to chart
    self.getChartSeries = function() {
        chartSeries[0].values = dataService.getData();
        return chartSeries;
    }
    self.getChartOptions = function() {
        var meta = dataService.getMeta();
        chartOptions.chart.yAxis.axisLabel = meta.unit.unit;
        chartOptions.title.text = meta.unit.name + ' for ' + meta.site.name;
        return chartOptions;
    }

  }

})();
