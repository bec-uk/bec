(function(){
  'use strict';

  angular.module('app')
          .service('navService', [
          '$q',
          navService
  ]);

  function navService($q){
    var menuItems = [
      {
        name: 'Map',
        icon: 'map',
        sref: '.map'
      },
      // {
      //   name: 'Dashboard',
      //   icon: 'dashboard',
      //   sref: '.dashboard'
      // },
      // {
      //   name: 'Profile',
      //   icon: 'person',
      //   sref: '.profile'
      // },
      {
        name: 'List',
        icon: 'view_list',
        sref: '.list'
      },
    ];

    return {
      loadAllItems : function() {
        return $q.when(menuItems);
      }
    };
  }

})();
