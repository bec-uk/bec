(function(){

  angular
    .module('app')
    .controller('TableController', [
      'sitesService', '$scope',
      TableController
    ]);

  function TableController(sitesService, $scope) {

    $scope.siteData = [];

    sitesService
      .loadAllItems()
      .then(function(siteData) {
        $scope.siteData = [].concat(siteData);
      });
  }

})();
