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
                    filter: 'mean',
                    appendPeriod: true
                },
                {
                    name: 'Total',
                    filter: 'total'
                }
            ],

            variableUnitSummaries: [
                {
                    name: 'Worst',
                    filter: 'min',
                    appendPeriod: true
                },
                {
                    name: 'Best',
                    filter: 'max',
                    appendPeriod: true
                },
                {
                    name: 'Average',
                    filter: 'mean',
                    appendPeriod: true
                },
                {
                    name: 'Total',
                    filter: 'total',
                    appendPeriod: false
                }
            ],

            queryStringDurations: ['days', 'weeks', 'months'],

            resolutions: [
              {name: "Half hourly", code: "PT30M", period: 'half-hour'},
              {name: "Hourly", code: "PT1H", period: 'hour'},
              {name: "Daily", code: "P1D", period: 'day'},
              {name: "Weekly", code: "P1W", period: 'week'},
              {name: "Monthly", code: "P1M", period: 'month'},
              {name: "Quarterly", code: "P3M", period: 'quarter'},
              {name: "Yearly", code: "P1Y", period: 'year'},
            ],

            units: [
              {name: "Energy generation", unit: "kWh", factor: 1, prefix: "", suffix: "kWh", fixed: true, icon: 'wb_sunny'},
              {name: "CO2 saved", unit: "kg", factor: 462/1000, prefix: "", suffix: "kg", fixed: true, icon: 'cloud'},
              {name: "Value of electricity generated", unit: "£", factor: 0.14, prefix: "£", suffix: "", fixed: true, icon: '£'},
              {name: "Days of electricity for an average person", unit: "", factor: 1/13, prefix: "", suffix: "days of electricity",fixed: false, icon: 'person'},
              {name: "Cups of tea boiled", unit: "", factor: 1/0.025, prefix: "", suffix: "cups", icon: "free_breakfast", fixed: false},
            ]

        };

    }

})();
