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
        name: 'Compare',
        icon: 'compare',
        sref: 'home.compare',
        subItems: [
          {
            name: 'Totals',
            sref: 'totals',
            icon: 'dashboard'
          },
          {
            name: 'Over Time',
            sref: 'overtime',
            icon: 'insert_chart'
          },
        ]
      },
      {
        name: 'Map',
        icon: 'map',
        sref: '.map'
      },
      {
        name: 'Site',
        sref: 'home.site',
        abstract: true,
        subItems: [
          {
            name: 'Graph',
            sref: 'graph',
            icon: 'insert_chart'
          },
          {
            name: 'Headlines',
            sref: 'headline',
            icon: 'dashboard'
          },
        ]
      },
      {
        name: 'List',
        icon: 'view_list',
        sref: '.list'
      },
      {
        name: 'About',
        icon: 'info_outline',
        sref: '.about'
      },
    ];

    var subMenuItems = [];

    return {
        getSubMenuItems : function() {
            return subMenuItems;
        },
        loadAllItems : function() {
            // return $q.when(menuItems);
            return $q.when(menuItems.filter(function(item) {
              return !(item.hasOwnProperty('abstract') && item.abstract)
            }));
        },
        loadSubMenuItems : function(sref) {
            var item = menuItems.filter(function(item) {
              return item.sref === sref;
            });
            if(item.length && item[0].hasOwnProperty('subItems'))
              subMenuItems = item[0].subItems;
            else 
              subMenuItems = [];
        }
    };
  }

})();
