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
            if (params.hasOwnProperty('resolution') &&
                (params.resolution == "PT30M" || params.resolution == "PT1H"))
            {
                return flowService.get(params).then(function() {
                    service.data = flowService.data;
                });
            }
            else
            {
                return readingService.get(params).then(function() {
                    service.data = readingService.data;
                });
            }
        }   
  }
  
})();
