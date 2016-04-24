(function(){
  'use strict';

  angular.module('app')
        .service('readingService', [
        '$q', '$http', 'utilitiesService', '$location',
      readingService
  ]);

  function readingService($q, $http, utilitiesService, $location){

    var service = {
        //raw_data: [],
        data: [],
        get: get
    }

    return service;

    function get(params) {

        // var simHost = 'https://trial.simtricity.com';

        var port = $location.port().toString();
        
        if(port.substring(0,2) === '30')
            var simHost = 'http://simtricity_proxy.local:8888/';
        else
            var simHost = '/proxy.php/';

        var meterType = 'ELSTER';
        var accessToken = 'XXTOKENXX';
        var exportStartDate = '';
        var exportEndDate = '';
        var resolution = 'P1D';

        var simtricityFormat = 'YYYY-MM-DDT00:00:00[Z]'; //formats date using moment.js

        //date format of API: YYYY-MM-DDT00:00:00Z

        //if date not set, default to one month ago
        if(params.hasOwnProperty('exportStartDate')) {
            exportStartDate = moment(params.exportStartDate).format(simtricityFormat);
        }
        else {
            exportStartDate = moment().subtract(30, 'days').format(simtricityFormat);
        }
        /* Take an extra day off the start date so that the start date the
         * user requested is shown as well (we discard the first reading as
         * we cannot convert it to a kWh value).
         */
        exportStartDate = moment(exportStartDate).subtract(1, 'days').format(simtricityFormat);

        if(params.hasOwnProperty('exportEndDate')) {
            exportEndDate = moment(params.exportEndDate).format(simtricityFormat);
        }
        else {
            exportEndDate = moment().subtract(1, 'days').format(simtricityFormat);
        }

        if(params.hasOwnProperty('resolution')) {
            resolution = params.resolution;
        }

        // Build the request:
        //  form is GET /export/meter/{meter-type}/{meter-serial}
        var exportSvcUri = simHost + '/a/export/meter/' + meterType + '/' + params.meterSerial;

        // Add the REST token to the request
        exportSvcUri += '?authkey=' + accessToken;

        // Add date and resolution
        exportSvcUri += '&start=' + exportStartDate + '&end=' + exportEndDate;
        exportSvcUri += '&resolution=' + resolution;

        return $http.get(exportSvcUri).success(function(data) {
            data = utilitiesService.CSVToObjects(data);
            service.data = processReadingData(data);
        });

    }

    function processReadingData(data) {

        for (var i = data.length - 1; i > 0; i--) {
            data[i].Import = data[i].Import - data[i-1].Import;
        };
        /* We remove the first reading from the data as it is still a meter
         * reading value rather than a kWh value.
         */
        data.splice(0,1); //remove first entry

        return data;

    }

  }
})();
