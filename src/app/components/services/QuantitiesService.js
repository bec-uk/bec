(function(){
  'use strict';

  angular.module('app')
        .service('quantitiesService', [
        '$q',
      quantitiesService
  ]);

  function quantitiesService($q){
    
    return{

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
          {name: "Energy generation", unit: "kWh", factor: 1},
          {name: "CO2 saved", unit: "kg", factor: 462/1000},
          {name: "Cost of electricity", unit: "£", factor: 0.14},
          {name: "People's day's electricity supplied", unit: "", factor: 1/13},
          {name: "Cups of tea boiled", unit: "", factor: 1/0.025},
      ]

    };

  }

})();
