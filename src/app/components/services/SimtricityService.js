(function(){
  'use strict';

  angular.module('app')
        .service('simtricityService', [
        '$q', 'flowService', 'readingService', 'utilitiesService', 'toastService', '$rootScope',
      simtricityService
  ]);

  function simtricityService($q, flowService, readingService, utilitiesService, toastService, $rootScope){

        var service = {
            data: [],
            retrieve: retrieve
        };

        var storage = window.localStorage;

        return service;

        function retrieve(params) {

            var startDateString = _roundDateToResolution(params.exportStartDate, params.resolution);
            var endDateString = _roundDateToResolution(params.exportEndDate, params.resolution);

            var cacheKey = (params.siteShortCode + startDateString + endDateString + params.resolution).replace(/[^A-Z0-9]/ig, "_");

            var cacheResult = _checkCache(cacheKey);

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

          var result = {
            hit: false
          }

          var storageContents = storage.getItem(cacheKey);
          if(!storageContents) {
            return result;
          }

          var parsedContents = JSON.parse(storageContents)
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

          var expiry = moment().endOf("day").format("X"); // unix timestamp
          var cacheItem = {
            payload: payload,
            expiry: expiry
          }
          storage.setItem(cacheKey, JSON.stringify(cacheItem));

        }

        function _roundDateToResolution(dateString, resolution) {

          var dateMoment = moment(dateString);
          switch(resolution) {
            case 'P1D':
            case "P1W":
              return dateMoment.format("YYYYMMDD");
              break;
            case "PT30M":
              return dateMoment.format("YYYYMMDDHHmm");
              break;
            case "PT1H":
              return dateMoment.format("YYYYMMDDHH");
              break;
            case "P1M":
            case "P3M":
              return dateMoment.format("YYYYMM");
              break;
            case "P1Y":
              return dateMoment.format("YYYY");
              break;
            default:
              return dateMoment.format();
              break;
          }

        }

  }

})();
