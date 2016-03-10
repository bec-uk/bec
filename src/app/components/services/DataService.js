(function() {
    'use strict';

    angular.module('app')
        .service('dataService', [
        '$q', 'simtricityService', 'sitesService', 'toastService', 'quantitiesService',
      dataService
    ]);

    function dataService($q, simtricityService, sitesService, toastService, quantitiesService){

        var data = []
        
        var site = {};

        var params = {
            exportStartDate: moment().subtract(30, 'days').toDate(),
            exportEndDate: moment().subtract(1, 'days').toDate(),
            resolution: 'P1D',
            meterSerial: '',
            unitIndex: 0
        };
        
        var units = quantitiesService.units;

        var summary = {
            min: 0,
            max: 0,
            total: 0,
            average: 0
        }

        var meta = {
            site: site,
            params: params,
            unit: {}
        };

        var service = {
          getData: getData,
          getDataSummary: getDataSummary,
          updateData: updateData,
          getMeta: getMeta,
          getParams: getParams,
          setParams: setParams,

        };

        return service;    


        function getData() {
            return data;
        }

        function getDataSummary () {
            var values = [];
            for (var i = data.length - 1; i >= 0; i--) {
                values.push(data[i][1]);
            }
            summary.min = sigFigs(Math.min.apply(null, values),3);
            summary.max = sigFigs(Math.max.apply(null, values),3);
            var total = 0;
            for (var i = data.length - 1; i >= 0; i--) {
                total += data[i][1];
            }
            summary.total = sigFigs(total,3);
            summary.average = sigFigs(summary.total/values.length,3);
            return summary;
        }

        function sigFigs(n, sig) {
            var mult = Math.pow(10,
            sig - Math.floor(Math.log(n) / Math.LN10) - 1);
            return Math.round(n * mult) / mult;
        }

        function getMeta() {
            meta.unit = units[params.unitIndex];
            meta.site = site;
            meta.params = params;
            return meta;
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
                data = [];
                for (var i = simtricityService.data.length - 1; i >= 0; i--) {
                    data.unshift([
                        moment(simtricityService.data[i].Time).format('x'),
                        simtricityService.data[i].Import// * units[params.unitIndex].factor
                    ])
                };
                // toastService.hidePersistentToast(toast);
            });
        }

        function convertData(unitIndex) {

            for (var i = data.length - 1; i >= 0; i--) {
                data[i][1] *= units[params.unitIndex].factor;
            }

        }

    }
  
})();
