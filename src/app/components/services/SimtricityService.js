(function(){
  'use strict';

  angular.module('app')
        .service('simtricityService', [
        '$q', 'readingService', 'utilitiesService',
      simtricityService
  ]);

  function simtricityService($q, readingService, utilitiesService){

        var service = {
            data: [],
            retrieve: retrieve
        };

        return service;    

        function retrieve(params) {
            return readingService.get(params).then(function() {
                service.data = readingService.data;
            });
        }   
  }
  
})();
