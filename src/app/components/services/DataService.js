(function() {
    'use strict';

    angular.module('app')
        .service('dataService', [
        '$q', 'simtricityService', 'forecastService', 'sitesService', 'toastService', 'quantitiesService', '$interval', '$location',
      dataService
    ]);

    function dataService($q, simtricityService, forecastService, sitesService, toastService, quantitiesService, $interval, $location){

        var dataOriginal = [];
        var dataConverted = [];
        
        var site = {};

        var params = {
            exportStartDate: moment().startOf('year').toDate(),
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
        };

        var meta = {
            site: site,
            params: params,
            unit: {},
            duration: {},
            period: ''
        };

        var service = {
          getData: getData,
          getOriginalData: getOriginalData,
          updateData: updateData,
          getMeta: getMeta,
          getParams: getParams,
          setParams: setParams,
          convertData: convertData,
          toggleAutoUpdate: toggleAutoUpdate
        };

        var autoUpdating = false;
        var autoUpdate = null;

        _setInitialParams();
        return service;    

        // set initial parameters from query string
        function _setInitialParams() {
            var queryString = $location.search();

            // direct set of params
            angular.forEach(params, function(value, key) {
                if(queryString.hasOwnProperty(key)) {
                    params[key] = queryString[key];
                }
            });

            // override start/end dates using previous number of days
            angular.forEach(quantitiesService.queryStringDurations, function(value) {
                if(queryString.hasOwnProperty(value)) {
                    params.exportEndDate = moment().subtract(1, 'days').toDate();
                    params.exportStartDate = moment().subtract(queryString[value], value).subtract(1, 'days').toDate();
                }
            });
        }

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
            meta.period = quantitiesService.resolutions.filter(function(resolution) { return resolution.code == params.resolution} )[0].period;
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
                params.siteShortCode = site.shortcode;
                updateData().then(function() {
                    convertData();
                    // Update meta data for number of days based on data in dataConverted
                    var firstMoment = moment(dataConverted[0][0], "x");
                    var lastMoment = moment(dataConverted[dataConverted.length - 1][0], "x");
                    meta.duration.days = Math.ceil(moment.duration(lastMoment.diff(firstMoment)).asDays());
                }); 
            });
        }

        function updateData() {

            //update data using simtricity service

            return $q.all([
                simtricityService.retrieve(params).then(function() {
                    var data = [];
                    for (var i = simtricityService.data.length - 1; i >= 0; i--) {
                        data.unshift([
                            moment(simtricityService.data[i].Time).format('x'),
                            simtricityService.data[i].Import// * units[params.unitIndex].factor
                        ])
                    };
                    //console.log(data);
                    //console.log('S'+simtricityService.data.length);
                    return data;
                }),
                forecastService.retrieve(params).then(function() {
                    var icons = [];
                    for (var i = forecastService.data.length - 1; i >= 0; i--) {
                        if (forecastService.data[i].hasOwnProperty('date')) {
                            icons.unshift([
                                moment(forecastService.data[i].date, 'YYYY-MM-DD').format('x'),
                                forecastService.data[i].icon
                            ])
                        }
                        else if (forecastService.data[i].hasOwnProperty('datetime')) {
                            icons.unshift([
                                moment(forecastService.data[i].datetime, 'YYYY-MM-DD HH:mm:ss').format('x'),
                                forecastService.data[i].icon
                            ])
                        }

                    };
                    // console.log(icons);
                    //console.log('F'+forecastService.data.length);
                    return icons;
                }),
            ])
            .then(function(responses) {
                dataOriginal = responses[0];
                var icons = responses[1];
                for (var i = dataOriginal.length - 1; i >= 0; i--) {
                    if (typeof(icons[i])!=='undefined') {
                        if (dataOriginal[i][0]==icons[i][0]) {
                            dataOriginal[i].push(icons[i][1]);
                            dataOriginal[i].push(icons[i][0]);
                        }
                    }
                }
            });

            /*
            //old form with single api call - not sure where toast stuff goes in new structure
            //TODO Toast notifications sometimes get stuck. Fix before renabling.
            // var toast = toastService.createPersistentToast('Retrieving data from Simtricity');
            return simtricityService.retrieve(params).then(function() {
                dataOriginal = [];
                for (var i = simtricityService.data.length - 1; i >= 0; i--) {
                    dataOriginal.unshift([
                        moment(simtricityService.data[i].Time).format('x'),
                        simtricityService.data[i].Import// * units[params.unitIndex].factor
                    ])
                };
            });
            // toastService.hidePersistentToast(toast);
            */
        
        }

        function convertData() {
            dataConverted = [];
            for (var i = dataOriginal.length - 1; i >= 0; i--) {
                dataConverted.unshift([
                    dataOriginal[i][0],
                    dataOriginal[i][1] * units[params.unitIndex].factor,
                    dataOriginal[i][2]
                ])
            }
        }

        //Auto update of data - TODO: move some of this to a separate service.
        function toggleAutoUpdate() {
            // console.log('toggle');
            if(autoUpdating) 
                stopAutoUpdate();
            else
                startAutoUpdate();

        }
        
        function startAutoUpdate() {
            autoUpdating = true;
            autoUpdate = $interval(function() {
                if(moment().isBetween(
                    moment().hour(7).minute(0).seconds(0),
                    moment().hour(7).minute(5).seconds(0)
                )) {
                    params.exportStartDate = moment().startOf('year').toDate();
                    params.exportEndDate = moment().subtract(1, 'days').toDate();
                    updateData();
                }
            }, 300000);
        }

        function stopAutoUpdate() {
            autoUpdating = false;
            $interval.cancel(autoUpdate);
        }

    }
  
})();
