(function() {
    'use strict';

    angular.module('app')
        .service('dataService', [
        '$q', 'simtricityService', 'forecastService', 'sitesService', 'toastService', 'quantitiesService', '$interval', '$location',
      dataService
    ]);

    function dataService($q, simtricityService, forecastService, sitesService, toastService, quantitiesService, $interval, $location){

        var dataOriginal = {};
        var dataConverted = {};
        var dataTotalled = {};

        var sites = [];

        var params = {
            exportStartDate: moment().subtract(60, 'days').toDate(),
            exportEndDate: moment().subtract(1, 'days').toDate(),
            resolution: 'P1D',
            meterSerial: '',
            unitIndex: 0,
            drawWeatherIcons: false,
        };

        var units = quantitiesService.units;

        var summary = {
            min: 0,
            max: 0,
            total: 0,
            average: 0
        };

        var meta = {
            site: {},
            params: params,
            unit: {},
            duration: {},
            period: ''
        };

        var service = {
          getData: getData,
          getOriginalData: getOriginalData,
          getTotalData: getTotalData,
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

        function getTotalData() {
            return dataTotalled;
        }

        function getOriginalData() {
            return dataOriginal;
        }

        function getMeta() {
            meta.unit = units[params.unitIndex];
            meta.site = sites.length ? sites[0] : {};
            meta.params = params;
            meta.period = quantitiesService.resolutions.filter(function(resolution) { return resolution.code == params.resolution} )[0].period;
            return meta;
        }

        function getParams() {
            return params;
        }

        function setParams(newParams, siteCodes) {
            params = newParams;
            sitesService.loadItems(siteCodes).then(function(sitesData) {
                sites = sitesData;
                removeSites(siteCodes);
                angular.forEach(sites, function(site) {
                    params.meterSerial = site.meterSerial;
                    params.siteShortCode = site.shortcode;
                    updateData(site.shortcode).then(function() {
                        convertData(site.shortcode);
                        totalData(site.shortcode);
                        // Update meta data for number of days based on data in dataConverted
                        var firstMoment = moment(dataConverted[site.shortcode][0][0], "x");
                        var lastMoment = moment(dataConverted[site.shortcode][dataConverted[site.shortcode].length - 1][0], "x");
                        meta.duration.days = Math.ceil(moment.duration(lastMoment.diff(firstMoment)).asDays());
                    });
                });
            });
        }

        function updateData(siteCode) {

            //update data using simtricity service and request data from forecast service to merge into results
            return $q.all([
                simtricityService.retrieve(params).then(function(simtricityResponse) {
                    console.log(simtricityResponse);
                    var data = [];
                    for (var i = simtricityResponse.data.length - 1; i >= 0; i--) {
                        data.unshift([
                            moment(simtricityResponse.data[i].Time).format('x'),
                            simtricityResponse.data[i].Import// * units[params.unitIndex].factor
                        ])
                    };
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
                    return icons;
                }),
            ])
            .then(function(responses) {
                dataOriginal[siteCode] = responses[0];
                var icons = responses[1];
                for (var i = dataOriginal[siteCode].length - 1; i >= 0; i--) {
                    for (var j = icons.length - 1; j >= 0; j--) {
                        if (typeof(icons[j])!=='undefined') {
                            if (dataOriginal[siteCode][i][0]==icons[j][0]) {
                                dataOriginal[siteCode][i].push(icons[j][1]);
                                dataOriginal[siteCode][i].push(icons[j][0]);
                            }
                        }
                    }
                }
            });

        }

        function convertData(siteCode) {
            dataConverted[siteCode] = [];
            for (var i = dataOriginal[siteCode].length - 1; i >= 0; i--) {
                dataConverted[siteCode].unshift([
                    dataOriginal[siteCode][i][0],
                    dataOriginal[siteCode][i][1] * units[params.unitIndex].factor,
                    dataOriginal[siteCode][i][2]
                ])
            }
        }

        function totalData(siteCode) {
            let total = dataOriginal[siteCode].reduce(function(accumulator, currentValue) {
                return accumulator + parseFloat(currentValue[1]);
            }, 0);
            dataTotalled[siteCode] = total;
        }

        //Auto update of data - TODO: move some of this to a separate service.
        function toggleAutoUpdate() {
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

        function removeSites(siteCodes) {
            angular.forEach(dataOriginal, function(data, site) {
                console.log(siteCodes, site, siteCodes.indexOf(site));
                if(siteCodes.indexOf(site) < 0) {
                    delete dataOriginal[site];
                }
            })
            angular.forEach(dataConverted, function(data, site) {
                if(siteCodes.indexOf(site) < 0) {
                    delete dataConverted[site];
                }
            })
            angular.forEach(dataTotalled, function(data, site) {
                if(siteCodes.indexOf(site) < 0) {
                    delete dataTotalled[site];
                }
            })
        }

    }

})();
