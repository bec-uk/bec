(function() {
    'use strict';

    angular.module('app')
        .service('dataService', [
        '$q', 'simtricityService', 'sitesService', 'toastService', 'quantitiesService',
      dataService
    ]);

    function dataService($q, simtricityService, sitesService, toastService, quantitiesService){

        var dataOriginal = [];
        var dataConverted = [];
        
        var site = {};

        var params = {
            exportStartDate: moment().subtract(30, 'days').toDate(),
            exportEndDate: moment().subtract(1, 'days').toDate(),
            resolution: 'P1D',
            meterSerial: '',
            unitIndex: 0
        };
        
        var units = quantitiesService.units;

        var factors = {
            co2: units[1].factor,
            cost: units[2].factor
        };

        var summary = {
            min: 0,
            max: 0,
            total: 0,
            average: 0
        };

        var meta = {
            site: site,
            params: params,
            unit: {}
        };

        var service = {
          getData: getData,
          getOriginalData: getOriginalData,
          updateData: updateData,
          getMeta: getMeta,
          getFactors: getFactors,
          getParams: getParams,
          setParams: setParams,
          convertData: convertData
        };

        return service;    


        function getData() {
            return dataConverted;
        }

        function getOriginalData() {
            return dataOriginal;
        }

        function getMeta() {
            meta.unit = units[params.unitIndex];
            meta.site = site;
            meta.params = params;
            return meta;
        }

        function getFactors() {
            return factors;
        }

        function getParams() {
            return params;
        }

        function setParams(newParams, siteCode) {
            params = newParams;
            sitesService.loadItem(siteCode).then(function(siteData) {
                site = siteData;
                params.meterSerial = site.meterSerial;
                updateData().then(function() {
                    convertData();
                }); 
            });
        }



        function updateData() {

            //update data using simtricity service TODO Toast notifications sometimes get stuck. Fix before renabling.
            // var toast = toastService.createPersistentToast('Retrieving data from Simtricity');
            return simtricityService.retrieve(params).then(function() {
                dataOriginal = [];
                for (var i = simtricityService.data.length - 1; i >= 0; i--) {
                    dataOriginal.unshift([
                        moment(simtricityService.data[i].Time).format('x'),
                        simtricityService.data[i].Import// * units[params.unitIndex].factor
                    ])
                };
                // toastService.hidePersistentToast(toast);
            });
        }

        function convertData() {

            dataConverted = [];

            for (var i = dataOriginal.length - 1; i >= 0; i--) {
                dataConverted.unshift([
                    dataOriginal[i][0],
                    dataOriginal[i][1] * units[params.unitIndex].factor
                ])
            }

        }

    }
  
})();
