(function(){

  angular
    .module('app')
    .controller('GraphController', [
      'dataService', 'chartsService', '$interval', '$rootScope', '$timeout', 'quantitiesService',
      GraphController
    ]);

  function GraphController(dataService, chartsService, $interval, $rootScope, $timeout, quantitiesService) {  

    self = this;
    
    self.autoUpdate = null;

    // chart series format from chartService
    var chartSeries = [
        chartsService.series
    ];

    // chart options from chartService
    var chartOptions = chartsService.historicalBarChartOptions;

    // callback for adding weather icons when chart object is created. should be hooked into draw complete event rather than using the 5000ms timeout.
    chartOptions.chart.dispatch = {
        renderEnd: function() {
            chartsService.clearWeatherIcons();
            chartsService.addWeatherIcons(chartSeries);
        }
    }  

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
