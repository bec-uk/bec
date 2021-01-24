(function(){
  'use strict';

  angular.module('app')
        .service('forecastService', [
        '$q', '$http', 'quantitiesService',
      forecastService
  ]);

  function forecastService($q, $http, quantitiesService){

        var service = {
            data: [],
            retrieve: retrieve,
        };

        return service;    

        function retrieve(params) {
            
            var endpoint = '//livegen.bristolenergy.coop/services/data.php';
            var forecastMethod = 'forecast'; //only this method supported for now (filton/create centre also available)
            var forecastStartDate = '';
            var forecastEndDate = '';
            var forecastResolution = '';

            if(params.hasOwnProperty('resolution')) {
                if(quantitiesService.resolutionConversions.hasOwnProperty(params.resolution)) {
                    forecastResolution = quantitiesService.resolutionConversions[params.resolution];
                }
                else forecastResolution = '';
                //resolution won't be added to request, and request will default to hourly
            }

            if (forecastResolution=='daily') {
                var dateFormat = 'YYYY-MM-DD'; //time cannot be specified in request using daily mode
            }
            else {
                var dateFormat = 'YYYY-MM-DDTHH:mm';
            }

            //if date not set, default to one month ago
            if(params.hasOwnProperty('exportStartDate')) {
                forecastStartDate = moment(params.exportStartDate).format(dateFormat);
            }
            else {
                forecastStartDate = moment().subtract(30, 'days').format(dateFormat);
            }

            if(params.hasOwnProperty('exportEndDate')) {
                forecastEndDate = moment(params.exportEndDate).format(dateFormat);
            }
            else {
                forecastEndDate = moment().subtract(1, 'days').format(dateFormat);
            }

            // Build the request:
            var query = endpoint + '?dataset=' + forecastMethod; //source
            query += '&start=' + forecastStartDate + '&end=' + forecastEndDate; //date range
            if (forecastResolution!='') {
                query += '&format=' + forecastResolution;
            } 
            
            return $http.get(query).success(function(data) {
                service.data = data;
            });

        }

    }
  
})();
