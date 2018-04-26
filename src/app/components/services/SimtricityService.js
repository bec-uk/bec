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

        var storage = window.localStorage;

        return service;

        function retrieve(params) {

            // let cacheKey = params.siteShortCode + params.exportStartDate + params.exportEndDate + params.resolution;
            let cacheKey = params.siteShortCode;

            let cacheResult = _checkCache(cacheKey);

            if(cacheResult.hit) {
              return $q.resolve({
                data: cacheResult.payload
              });
            }
            else {
              return flowService.get(params).then(function() {
                  _storeCache(flowService.data, cacheKey);
                  return $q.resolve({
                    data: flowService.data
                  });
              });
            }

            //using the flow API for all data. consider deprecating the reading API TBC

            // return readingService.get(params).then(function() {
            //     service.data = readingService.data;
            // });

        }

        function _checkCache(cacheKey) {

          let result = {
            hit: false
          }

          let storageContents = storage.getItem(cacheKey);
          if(!storageContents) {
            return result;
          }

          let parsedContents = JSON.parse(storageContents)
          if (moment(parsedContents.expiry).isBefore(moment())) { // expired 
            storage.removeItem(cacheKey);
            return result;
          } else {
            result.payload = parsedContents.payload;
            result.hit = true;
            return result;
          }

        }

        function _storeCache(payload, cacheKey) {

          let expiry = moment().endOf("day").format("X"); // unix timestamp
          let cacheItem = {
            payload: payload,
            expiry: expiry
          }
          storage.setItem(cacheKey, JSON.stringify(cacheItem));

        }



  }

})();
