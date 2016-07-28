angular.module('resource-mobile', ['ionic', 
  'LocalStorageModule',
   'angular-jwt'
])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .service('serverUrl', function () {
    return {
      get: function () {
        return 'http://localhost:9200';
      }
    }
  })

  .config(function ($stateProvider, $urlRouterProvider, $httpProvider, jwtInterceptorProvider) {

    jwtInterceptorProvider.tokenGetter = ['jwtHelper', 'localStorageService', function(jwtHelper, localStorageService) {
      return localStorageService.get('authToken');
    }];
    $httpProvider.interceptors.push('jwtInterceptor');
    
    $stateProvider
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'components/menu/menu.component.html',
        controller: 'MenuCtrl',
        controllerAs: 'menuCtrl'
      })

      .state('app.search', {
        url: '/search',
        views: {
          'menuContent': {
            templateUrl: 'components/search/search.component.html',
            controller: 'SearchController',
            controllerAs: 'searchCtrl'
          }
        }
      })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/search');
  });
