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
            key: "Cumulative Return",
            values: [
                {
                    "label" : "A" ,
                    "value" : -29.765957771107
                } ,
                {
                    "label" : "B" ,
                    "value" : 0
                } ,
                {
                    "label" : "C" ,
                    "value" : 32.807804682612
                } ,
                {
                    "label" : "D" ,
                    "value" : 196.45946739256
                } ,
                {
                    "label" : "E" ,
                    "value" : 0.19434030906893
                } ,
                {
                    "label" : "F" ,
                    "value" : -98.079782601442
                } ,
                {
                    "label" : "G" ,
                    "value" : -13.925743130903
                } ,
                {
                    "label" : "H" ,
                    "value" : -5.1387322875705
                }
            ]
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
