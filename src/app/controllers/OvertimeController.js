(function(){

  angular
    .module('app')
    .controller('OvertimeController', [
      'dataService', 'chartsService', '$interval', '$rootScope', '$timeout', 'quantitiesService', '$window', '$scope',
      OvertimeController
    ]);

  function OvertimeController(dataService, chartsService, $interval, $rootScope, $timeout, quantitiesService, $window, $scope) {  

    self = this;

    self.autoUpdate = null;

    // chart options from chartService
    var chartOptions = chartsService.lineChartOptions;

    // dummy data
    var chartSeries = [
            
        {
            key: "Series 1",
            values: [ {x:1,y:1}, {x:2,y:2}, {x:3,y:3}, {x:4,y:1} ]
        },

        {
            key: "Series 2",
            values: [ {x:1,y:2}, {x:2,y:1}, {x:3,y:4}, {x:5,y:2} ]
        }
    
    ]

    //getters for chart data and options to bind to chart
    self.getChartSeries = function() {
        return chartSeries;
    }
    self.getChartOptions = function() {
        return chartOptions;
    }

  }

})();
