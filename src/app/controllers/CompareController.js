(function(){

  angular
    .module('app')
    .controller('CompareController', [
      'dataService', 'chartsService', '$interval', '$rootScope', '$timeout', 'quantitiesService', '$window', '$scope',
      CompareController
    ]);

  function CompareController(dataService, chartsService, $interval, $rootScope, $timeout, quantitiesService, $window, $scope) {  

    self = this;

  }

})();
