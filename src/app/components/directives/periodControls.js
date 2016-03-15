(function() {
    'use strict';

    angular
        .module('app')
        .directive('periodControls', periodControlsDirective);

    function periodControlsDirective() {
        return {
            restrict: 'E',
            scope: {
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


PeriodControlsController.$inject = ['$state','quantitiesService','dataService','sitesService'];

function PeriodControlsController($state, quantitiesService, dataService, sitesService) {
    
    var self = this;    

    self.params = dataService.getParams();
    self.resolutions = quantitiesService.resolutions;
    self.units = quantitiesService.units;
    self.convertData = dataService.convertData;

    self.refreshData = function() {
        dataService.setParams(self.params, $state.params.shortcode);
    }

}