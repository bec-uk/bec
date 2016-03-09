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
          {name: "People's day's electricity supplied", unit: "People days", factor: 1/13},
      ]

    };

  }

})();
