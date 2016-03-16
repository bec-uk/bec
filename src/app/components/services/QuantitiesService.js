(function(){
    'use strict';

    angular.module('app')
        .service('quantitiesService', [
        '$q',
      quantitiesService
    ]);

    function quantitiesService($q){

        return{

            fixedUnitSummaries: [
                {
                    name: 'Average',
                    filter: 'mean'
                },
                {
                    name: 'Total',
                    filter: 'total'
                }
            ],

            variableUnitSummaries: [
                {
                    name: 'Minimum',
                    filter: 'min'
                },
                {
                    name: 'Maximum',
                    filter: 'max'
                },
                {
                    name: 'Average',
                    filter: 'mean'
                },
                {
                    name: 'Total',
                    filter: 'total'
                }
            ],

            resolutions: [
              // {name: "Half hourly", code: "PT30M"},
              // {name: "Hourly", code: "PT1H"},
              {name: "Daily", code: "P1D"},
              {name: "Weekly", code: "P1W"},
              {name: "Monthly", code: "P1M"},
              {name: "Quarterly", code: "P3M"},
              {name: "Yearly", code: "P1Y"},
            ],

            units: [
              {name: "Energy generation", unit: "kWh", factor: 1, prefix: "", suffix: "kWh", fixed: true, icon: 'battery_full'},
              {name: "CO2 saved", unit: "kg", factor: 462/1000, prefix: "", suffix: "kg", fixed: true, icon: 'cloud'},
              {name: "Cost of electricity", unit: "£", factor: 0.14, prefix: "£", suffix: "", fixed: true, icon: 'attach_money'},
              {name: "People's day's electricity supplied", unit: "", factor: 1/13, prefix: "", suffix: "people days"},
              {name: "Cups of tea boiled", unit: "", factor: 1/0.025, prefix: "", suffix: "cups"},
            ]

        };

    }

})();
