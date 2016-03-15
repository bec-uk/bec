(function(){

  angular
    .module('app')
    .controller('ListController', [
      'sitesService', '$scope',
      ListController
    ]);

  function ListController(sitesService, $scope) {

    self = this;

    self.siteData = [];

    sitesService
      .loadAllItems()
      .then(function(siteData) {
        self.siteData = [].concat(siteData);
      });
  }

})();
