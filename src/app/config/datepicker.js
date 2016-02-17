(function() {
    'use strict';

    angular
        .module('app')
        .config(
            function($mdDateLocaleProvider) {
                $mdDateLocaleProvider.formatDate = function(date) {
                   return moment(date).format('DD-MM-YYYY');
                };
            });
})();