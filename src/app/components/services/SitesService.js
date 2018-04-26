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
          id: 0,
          shortcode: 'kwmc',
          name: 'Knowle West Media Centre',
          meterSerial: 14230570,
          address: 'Leinster Ave, Bristol BS4 1NL',
          location: {
            latitude: 51.425286,
            longitude: -2.596237
          },
          capacity: 24.99
      },
      {
          id: 1,
          shortcode: 'hh',
          name: 'Hamilton House',
          meterSerial: 14230571,
          address: '80 Stokes Croft, Bristol BS1 3QY',
          location: {
            latitude: 51.4628408,
            longitude: -2.589774
          },
          capacity: 20.24
      },
      {
          id: 2,
          shortcode: 'bfh',
          name: 'Bristol Folk House',
          meterSerial: 12156991,
          address: '40A Park St, Bristol BS1 5JG',
          location: {
            latitude: 51.45433,
            longitude: -2.60174
          },
          capacity: 10
      },
      {
          id: 3,
          shortcode: 'ecc',
          name: 'Easton Community Centre',
          meterSerial: 15096967, /* FIXME: There will be 4 generation meters when the older ones are connected!  Better to use flow for site to retrieve data */
          address: 'Kilburn St, Bristol BS5 6AW',
          location: {
            latitude: 51.461752,
            longitude: -2.562805
          },
          capacity: 18
      },
      {
          id: 4,
          shortcode: 'sbsc',
          name: 'South Bristol Sports Centre',
          meterSerial: 14230573,
          address: 'West Town Lane, Bristol BS14 9EA',
          location: {
            latitude: 51.426252,
            longitude: -2.559184
          },
          capacity: 50
      },
      {
          id: 5,
          shortcode: 'myc',
          name: 'Mill Youth Centre',
          meterSerial: 12156990,
          address: 'Lower Ashley Rd, Bristol BS5 0YJ',
          location: {
            latitude: 51.466706,
            longitude: -2.573856
          },
          capacity: 19.76
      },
      {
          id: 6,
          shortcode: 'bhcc',
          name: 'Brentry & Henbury Childrens Centre',
          meterSerial: 15096965,
          address: 'Brentry Lane, Bristol BS10 6RG',
          location: {
            latitude: 51.512519,
            longitude: -2.611585
          },
          capacity: 13.26
      },
      {
          id: 7,
          shortcode: 'conn',
          name: 'Coniston Community Centre',
          meterSerial: 16017855,
          address: 'The Parade, Coniston Rd, Patchway, Bristol, BS34 5LP',
          location: {
            latitude: 51.538164,
            longitude: -2.582581
          },
          capacity: 19.98
      },
      {
          id: 8,
          shortcode: 'acta',
          name: 'ACTA Community Theatre',
          meterSerial: 16017855,
          address: 'Gladstone St, Avon, Bristol, BS3 3AY',
          location: {
            latitude: 51.4393698,
            longitude: -2.6053986
          },
          capacity: 22.26
      },
      {
          id: 9,
          shortcode: 'wsg',
          name: 'Wick Sports Ground',
          meterSerial: 16017855,
          address: 'Wick',
          location: {
            latitude: 51.4468948,
            longitude: -2.4232650
          },
          capacity: 26.4
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
      },
      loadItemSync: function(shortcode) {
          var site = siteData.filter(function( obj ) {
             return obj.shortcode == shortcode;
          });

          return site[0];
      },
      loadItems: function(shortcodes) {
          var sites = siteData.filter(function( obj ) {
             return shortcodes.indexOf(obj.shortcode) > -1;
          });

          return $q.when(sites);
      }
    };
  }
})();
