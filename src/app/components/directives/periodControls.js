(function() {
    'use strict';

    angular
        .module('app')
        .directive('periodControls', periodControlsDirective);

    function periodControlsDirective() {
        return {
            restrict: 'E',
            scope: {
                multisite: '@'
                // title: '@',
                // theme: '@',
                // messages: '='
            },
            templateUrl: 'app/views/partials/periodControls.html',
            link : function(scope, element, attrs, ctrl) {
                ctrl.refreshData();

            },
            controller: PeriodControlsController,
            controllerAs: 'pc'
        };
    }
})();


PeriodControlsController.$inject = ['$state','quantitiesService','dataService','sitesService','chartsService', '$scope'];

function PeriodControlsController($state, quantitiesService, dataService, sitesService, chartsService, $scope) {
    
    var self = this;    

    self.params = dataService.getParams();
    self.resolutions = quantitiesService.resolutions;
    self.units = quantitiesService.units;
    self.convertData = dataService.convertData;
    self.selectedSites = [];
    self.sites = [];

    sitesService.loadAllItems().then(function(sitesData) {
        self.sites = sitesData;
    })

    self.refreshData = function() {
        if (parseInt($scope.multisite)) {
            dataService.setParams(self.params, self.selectedSites);
        } else {
            dataService.setParams(self.params, [$state.params.shortcode]);            
        }
    }

    self.toggleWeatherIcons = function() {
        //Horrible work around because drawing icons is hooked into the render function
        //and changing this checkbox does not cause data to be re-rendered.
        //Hence we need to trigger manually and horribly.
        if (self.params.drawWeatherIcons) {
            var chartSeries = [chartsService.series];
            chartSeries[0].values = dataService.getData();
            chartsService.addWeatherIcons(chartSeries);
        }
        else {
            chartsService.clearWeatherIcons();
        }
    }

    self.selectSite = function(site) {
        var idx = self.selectedSites.indexOf(site.shortcode);
        if (idx > -1) {
          self.selectedSites.splice(idx, 1);
        }
        else {
          self.selectedSites.push(site.shortcode);
        }
    }

    self.isSelected = function(site) {
        return self.selectedSites.indexOf(site.shortcode) > -1;
    }
}