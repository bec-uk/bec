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

    // chart callbacks
    chartOptions.chart.dispatch = {
        renderEnd: function() {
            chartsService.clearWeatherIcons();
            var resolution = dataService.getParams().resolution;
            // check this is a resolution for which we have weather data and draw icons if so
            if(quantitiesService.resolutionConversions.hasOwnProperty(resolution) && dataService.getParams().drawWeatherIcons) {
                chartsService.addWeatherIcons(chartSeries);
            }
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
