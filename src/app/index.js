'use strict';

angular.module('angularMaterialAdmin', ['ngAnimate', 'ngCookies',
  'ngSanitize', 'ui.router', 'ngMaterial', 'nvd3', 'app', 'uiGmapgoogle-maps'])

  .config(function($locationProvider) {
    $locationProvider.html5Mode(true);
  })

  .run(function($rootScope, $state, navService) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {
      if (toState.redirectTo) {
        event.preventDefault();
        $state.go(toState.redirectTo, toParams);
      }
    });

    $rootScope.$on('$stateChangeSuccess', 
      function(event, toState, toParams, fromState, fromParams){ 
        navService.loadSubMenuItems($state.current.parent);
      });
  })

  .config(function ($stateProvider, $urlRouterProvider, $mdThemingProvider,
                    $mdIconProvider) {
    $stateProvider
      .state('home', {
        url: '',
        templateUrl: 'app/views/main.html',
        controller: 'MainController',
        controllerAs: 'vm',
        abstract: true
      })
      .state('home.map', {
        url: '/map',
        templateUrl: 'app/views/map.html',
        controller: 'MapController',
        controllerAs: 'mapc',
        data: {
          title: 'Map'
        }
      })
      .state('home.site', {
        redirectTo: 'graph',
        url: '/site/:shortcode',
        templateUrl: 'app/views/site.html',
        controller: 'SiteController',
        controllerAs: 'site',
        data: {
          title: 'Site'
        },
        // abstract: true
      })
        .state('headline', {
          parent: 'home.site',
          url: '/headline',
          templateUrl: 'app/views/site.headline.html',
          controller: 'HeadlineController',
          controllerAs: 'headline',
          data: {
            title: 'Site Headline Figures'
          }
        })
        .state('graph', {
          parent: 'home.site',
          url: '/graph',
          templateUrl: 'app/views/site.graph.html',
          controller: 'SiteController',
          controllerAs: 'site',
          data: {
            title: 'Site Consumption Over Time'
          }
        })
      .state('home.list', {
        url: '/list',
        controller: 'TableController',
        controllerAs: 'vm',
        templateUrl: 'app/views/list.html',
        data: {
          title: 'List'
        }
      });

    $urlRouterProvider.otherwise('/map');

    $mdThemingProvider
      .theme('default')
        .primaryPalette('grey', {
          'default': '600'
        })
        .accentPalette('teal', {
          'default': '500'
        })
        .warnPalette('defaultPrimary');

    $mdThemingProvider.theme('dark', 'default')
      .primaryPalette('defaultPrimary')
      .dark();

    $mdThemingProvider.theme('grey', 'default')
      .primaryPalette('grey');

    $mdThemingProvider.theme('custom', 'default')
      .primaryPalette('defaultPrimary', {
        'hue-1': '50'
    });

    $mdThemingProvider.definePalette('defaultPrimary', {
      '50':  '#FFFFFF',
      '100': 'rgb(255, 198, 197)',
      '200': '#E75753',
      '300': '#E75753',
      '400': '#E75753',
      '500': '#E75753',
      '600': '#E75753',
      '700': '#E75753',
      '800': '#E75753',
      '900': '#E75753',
      'A100': '#E75753',
      'A200': '#E75753',
      'A400': '#E75753',
      'A700': '#E75753'
    });

    $mdIconProvider.icon('user', 'assets/images/user.svg', 64);
  });
