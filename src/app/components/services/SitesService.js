(function(){
  'use strict';

  angular.module('app')
        .service('sitesService', [
        '$q',
      sitesService
  ]);

  function sitesService($q){
    var siteData = [
      {
          shortcode: 'kwmc',
          name: 'Knowle West Media Centre',
          meterSerial: 14230570,
          address: 'Leinster Ave, Bristol BS4 1NL',
          location: {
            latitude: 51.425229,
            longitude: -2.5955517
          }
      },
      {
          shortcode: 'hh',
          name: 'Hamilton House',
          meterSerial: 14230571,
          address: '80 Stokes Croft, Bristol BS1 3QY',
          location: {
            latitude: 51.4628408,
            longitude: -2.589774
          }
      },
      {
          shortcode: 'bfh',
          name: 'Bristol Folk House',
          meterSerial: 12156991,
          address: '40A Park St, Bristol BS1 5JG',
          location: {
            latitude: 51.454225,
            longitude: -2.602208
          }
      },
      {
          shortcode: 'ecc',
          name: 'Easton Community Centre',
          meterSerial: 15096967, /* FIXME: There will be 4 generation meters when the older ones are connected!  Better to use flow for site to retrieve data */
          address: 'Kilburn St, Bristol BS5 6AW',
          location: {
            latitude: 51.461752,
            longitude: -2.562805
          }
      },
      {
          shortcode: 'sbsc',
          name: 'South Bristol Sports Centre',
          meterSerial: 14230573,
          address: 'West Town Lane, Bristol BS14 9EA',
          location: {
            latitude: 51.426273,
            longitude: -2.559397
          }
      },
      {
          shortcode: 'myc',
          name: 'Mill Youth Centre',
          meterSerial: 12156990,
          address: 'Lower Ashley Rd, Bristol BS5 0YJ',
          location: {
            latitude: 51.466210,
            longitude: -2.573985
          }
      },
      {
          shortcode: 'bhcc',
          name: 'Brentry & Henbury Childrens Centre',
          meterSerial: 15096965,
          address: 'Brentry Lane, Bristol BS10 6RG',
          location: {
            latitude: 51.512655,
            longitude: -2.611479
          }
      },
    ];

    return {
      loadAllItems: function() {
          return $q.when(siteData);
      },
      loadItem: function(shortcode) {
          var site = siteData.filter(function( obj ) {
             return obj.shortcode == shortcode;
          });

          return $q.when(site[0]);
      }
    };
  }
})();
