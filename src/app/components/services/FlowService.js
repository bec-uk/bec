(function()
{
    'use strict';

    angular.module('app')
           .service('flowService', ['$q', '$http', 'utilitiesService', '$location', flowService]);


    function flowService($q, $http, utilitiesService, $location)
    {

        var service = {
            flowTokens: {},
            data: [],
            get: get
        }

        return service;

        /**
         * Fetch the service's data and set the data variable.
         * Valid flow types are 'gen', 'use' and 'exp'.
         */
        function get(params, flowType)
        {
            var port = $location.port().toString();

            if (port.substring(0,2) === '30')
                var simHost = 'http://livegen.bristolenergy.coop/proxy.php';
            else
                var simHost = '/proxy.php/';

            var accessToken = 'XXTOKENXX';
            var flowStartDate = '';
            var flowEndDate = '';
            var resolution = 'PT30M';

            if (flowType === undefined)
                flowType = 'gen';

            var simtricityFormat = 'YYYY-MM-DDT00:00'; //formats date using moment.js
            //date format of API: YYYY-MM-DDT00:00:00Z

            //if date not set, default to 3 days ago
            if (params.hasOwnProperty('exportStartDate'))
                flowStartDate = moment(params.exportStartDate).format(simtricityFormat);
            else
                flowStartDate = moment().subtract(30, 'days').format(simtricityFormat);

            if (params.hasOwnProperty('exportEndDate'))
                flowEndDate = moment(params.exportEndDate).format(simtricityFormat);
            else
                flowEndDate = moment().subtract(1, 'days').format(simtricityFormat);

            //add one day to end date so selected date is included
            flowEndDate = moment(flowEndDate).add(1, 'days').format(simtricityFormat);

            if (params.hasOwnProperty('resolution'))
                resolution = params.resolution;

            return getFlowTokens($http, params.siteShortCode).then(function(){
                var flowToken = service.flowTokens['flow_token_' + flowType];
                return gvizRequest(simHost, accessToken, flowStartDate, flowEndDate, resolution, flowToken, flowType);
            });
        }

        function gvizRequest(simHost, accessToken, flowStartDate, flowEndDate, resolution, flowToken, flowType)
        {
            // Build the request:
            // Format is GET /gviz/flow?<args>
            var flowSvcUri = simHost + '/gviz/flow';

            // Add the REST token to the request
            flowSvcUri += '?authkey=' + accessToken;

            // Add date and resolution
            flowSvcUri += '&start=' + flowStartDate + '&end=' + flowEndDate;
            flowSvcUri += '&resolution=' + resolution;

            // Add flow token for site in gviz query form
            flowSvcUri += '&tq=' + encodeURIComponent('select `timestamp`, `' + flowToken + '` label `timestamp` "Time", `' + flowToken + '` "' + flowType + '"') + '&tqx=reqId:3';

            return $http.get(flowSvcUri).success(function(data) {
                data = utilitiesService.GVIZToObjects(data);
                // For half-hourly data we need to divide the Import values by 2 (they are in kW, so half to get kWh)
                if (resolution === 'PT30M')
                {
                    data = data.map(function(obj){
                        obj.Import /= 2;
                        return obj;
                    });
                }
                service.data = data;
            });
        }

        function getFlowTokens($http, siteShortCode)
        {
            var flowTokens = null;

            // Retrieve flow tokens from bec-monitoring back-end
            var tokenUri = 'http://livegen.bristolenergy.coop/services/data.php?dataset=simtricity_flows&site_shortcode=' + siteShortCode;
            return $http.get(tokenUri).success(function(data) {
                service.flowTokens = data[0];
            });
        }

    }
})();
