angular.module('resource-mobile', ['ionic', 
  'LocalStorageModule',
   'angular-jwt'
])

  .run(function ($ionicPlatform, LoginModalService, LoginService) {
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

      if (!LoginService.isLoggedIn()) {
        LoginModalService.show();
      }
    });
  })

  .service('serverUrl', function () {
    return {
      get: function() {
        return 'http://resource.resourcefulsoftware.com.au'
      }
    }
  })

  .config(function ($stateProvider, $urlRouterProvider, $httpProvider, jwtInterceptorProvider) {

    jwtInterceptorProvider.tokenGetter = ['jwtHelper', 'localStorageService', function(jwtHelper, localStorageService) {
      return localStorageService.get('authToken');
    }];
    $httpProvider.interceptors.push('jwtInterceptor');
    
    $stateProvider
      .state('search', {
        url: '/search',
        templateUrl: 'components/search/search.component.html',
        controller: 'SearchController',
        controllerAs: 'searchCtrl'
      })
      .state('personnel', {
        url: '/personnel',
        params: {
          personnel: null
        },
        templateUrl: 'components/personnelDetails/personnelDetails.component.html',
        controller: 'PersonnelDetailsController',
        controllerAs: 'personnelCtrl'
      })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/search');
  });
