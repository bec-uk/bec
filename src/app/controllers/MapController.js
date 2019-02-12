(function(){

  angular
       .module('app')
       .config(function(uiGmapGoogleMapApiProvider) {
            uiGmapGoogleMapApiProvider.configure({
                key: 'AIzaSyCGyv5O3qRvRFpfp_WkeOYuAomF-HrKJdk',
                v: '3.20', //defaults to latest 3.X anyhow
                libraries: 'weather,geometry,visualization'
            });
        })
       .controller('MapController', [
          '$state', 'uiGmapGoogleMapApi', 'sitesService',
          MapController
       ]);

  function MapController($state, uiGmapGoogleMapApi, sitesService) {

      self = this;

      sitesService
        .loadAllItems()
        .then(function(siteData) {
            self.siteData = [].concat(siteData);
        });

      uiGmapGoogleMapApi.then(function(maps) {

          //small hack to fix issues with older lodash version. to be resolved in future
          if( typeof _.contains === 'undefined' ) {
              _.contains = _.includes;
          }
          if( typeof _.object === 'undefined' ) {
              _.object = _.zipObject;
          } 

          self.mapParams = { center: { latitude: 51.48, longitude: -2.53 }, zoom: 12 };


      });
          
      self.goToSite = function (shortcode) {
          $state.go('home.site', {shortcode: shortcode});
      };

   }

})();