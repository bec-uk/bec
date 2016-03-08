(function(){

  angular
    .module('app')
    .controller('SiteController', [
      'sitesService', '$state', 'simtricityService', 'quantitiesService', 'chartsService', 'toastService', '$interval', '$rootScope',
      SiteController
    ]);

  function SiteController(sitesService, $state, simtricityService, quantitiesService, chartsService, toastService, $interval, $rootScope) {  

    self = this;

    self.siteData = [];

    self.resolutions = quantitiesService.resolutions;
    self.units = quantitiesService.units;
    
    self.autoUpdate = null;

    self.params = {
        exportStartDate: moment().subtract(30, 'days').toDate(),
        exportEndDate: moment().subtract(1, 'days').toDate(),
        resolution: 'P1D',
        meterSerial: ''
    };

    self.chosenUnit = 0;

    self.getData = function() {
        var toast = toastService.createPersistentToast('Loading');
        simtricityService.retrieve(self.params)
            .then(function() {
                self.buildGraphData()
                toastService.hidePersistentToast(toast);
            });
    }

    self.buildGraphData = function() {
        var unit = self.units[self.chosenUnit];
        self.options.title.text = unit.name+' by '+self.siteData.name;
        self.options.chart.yAxis.axisLabel = unit.unit;
        self.data[0].values = [];
        for (var i = simtricityService.data.length - 1; i >= 0; i--) {
            self.data[0].values.unshift([
                moment(simtricityService.data[i].Time).format('x'),
                simtricityService.data[i].Import * unit.factor
            ])
        };
    }

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


    //chart options
    self.options = chartsService.historicalBarChartOptions;

    // chart data
    self.data = [
        {
            key: "Quantity" ,
            bar: true,
            values: []
        }];

    // run on startup
    sitesService
      .loadItem($state.params.shortcode)
      .then(function(siteData) {
        self.siteData = siteData;
        self.params.meterSerial = self.siteData.meterSerial;
        self.getData();
      });
  }

})();
