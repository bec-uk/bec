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
        console.log(chartOptions.title.text);
        return chartOptions;
    }

    //full screen stuff. TODO needs to be refactored.
    self.toggleFullScreen = function() {
        
        if($rootScope.fullScreen) 
            stopAutoUpdate();
        else
            startAutoUpdate();
      
        $rootScope.fullScreen = !$rootScope.fullScreen;
    }
    
    startAutoUpdate = function() {
        self.autoUpdate = $interval(function() {
            if(moment().isBetween(
                moment().hour(7).minute(0).seconds(0),
                moment().hour(7).minute(5).seconds(0)
            )) {
                self.params.exportStartDate = moment().subtract(30, 'days').toDate();
                self.params.exportEndDate = moment().subtract(1, 'days').toDate();
                self.getData();
            }
        }, 300000);
    }

    stopAutoUpdate = function() {
        $interval.cancel(self.autoUpdate);
    }

  }

})();
