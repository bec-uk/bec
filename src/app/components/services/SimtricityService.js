(function(){
  'use strict';

  angular.module('app')
        .service('simtricityService', [
        '$q', 'flowService', 'readingService', 'utilitiesService', 'toastService',
      simtricityService
  ]);

  function simtricityService($q, flowService, readingService, utilitiesService, toastService){

        var service = {
            data: [],
            retrieve: retrieve
        };

        return service;    

        function retrieve(params) {
            
            //using the flow API for all data. consider deprecating the reading API TBC
            return flowService.get(params).then(function() {
              console.log(flowService.data);
                service.data = flowService.data;
            });
        
            // return readingService.get(params).then(function() {
            //     service.data = readingService.data;
            // });
            
        }   
  }
  
})();
