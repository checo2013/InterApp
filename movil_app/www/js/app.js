// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
  'ionic',
  'ngCordova',
  'ionic.service.core',
  'ionic.service.push',
  'ionic.service.deploy',
  'ionic-material',
  'starter.controllers',
  'app.services',
  'ngSanitize'
])

.config(['$ionicAppProvider', function($ionicAppProvider) {
  // Identify app
  $ionicAppProvider.identify({
    // The App ID (from apps.ionic.io) for the server
    app_id: '9d494b56',
    // The public API key all services will use for this app
    api_key: 'YOUR_PUBLIC_KEY',
    // The GCM project ID (project number) from your Google Developer Console (un-comment if used)
    // gcm_id: 'GCM_ID'
  });
}])

.run(function($rootScope, $ionicDeploy, $ionicPlatform, $cordovaStatusbar, $ionicSideMenuDelegate, $state,storage,sesion) {

  $ionicPlatform.ready(function() {

    var username = storage.get('username',false);

    if (username !== false) {
      $state.go('app.home');
    };
    
    // Hide the accessory bar by default
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }

    // Color the iOS status bar text to white
    if (window.StatusBar) {
      $cordovaStatusbar.overlaysWebView(true);
      $cordovaStatusBar.style(1); //Light
    }

    // Default update checking
    $rootScope.updateOptions = {
      interval: 2 * 60 * 1000
    };

    // Watch Ionic Deploy service for new code
    $ionicDeploy.watch($rootScope.updateOptions).then(function() {}, function() {}, function(hasUpdate) {
      $rootScope.lastChecked = new Date();
      console.log('WATCH RESULT', hasUpdate);
    });
  });


  $rootScope.logout = function(){
    sesion.logout();
  }

  $rootScope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

  // $rootScope.$on('$stateChangeStart', function(event, toState){ 

  //     if (toState.name == 'app.gmm' && $rootScope.accesogmm) {
  //       event.preventDefault();
  //       $state.go('app.gmm2');
  //     };

  //     if (toState.name == 'app.noautomovil' && $rootScope.accesoaut) {
  //       event.preventDefault();
  //       $state.go('app.automovil');
  //     };

  //     if (toState.name == 'app.vidano' && $rootScope.accesovid) {
  //       event.preventDefault();
  //       $state.go('app.vida');
  //     };

  //     if (toState.name == 'app.casano' && $rootScope.accesocas) {
  //       event.preventDefault();
  //       $state.go('app.casa');
  //     }; 

  // })

  // $rootScope.accesogmm = true;
  // $rootScope.accesoaut = true;
  // $rootScope.accesovid = true;
  // $rootScope.accesocas = true;


})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider.state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
  });

  $stateProvider.state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/app.html'
  });

  // $stateProvider.state('app.home', {
  //     url: '/home',
  //     templateUrl: 'templates/home.html'
  // });

  $stateProvider.state('app.menu', {
      url: '/menu/:id',
      templateUrl: 'templates/menu.html',
      resolve: {
          // para cargar datos antes de cargar el controller
          datosTemplate: function(templateService,$stateParams){
              return templateService.get(1,$stateParams.id);
          }
      },
      controller: 'MenuCtrl'
  });

  $stateProvider.state('app.seccion', {
      url: '/seccion/:id',
      templateUrl: 'templates/seccion.html',
      resolve: {
          // para cargar datos antes de cargar el controller
          datosTemplate: function(templateService,$stateParams){
              return templateService.get(5,$stateParams.id);
          }
      },
      controller: 'SeccionCtrl'
  });
  
  $stateProvider.state('app.contenido', {
      url: '/contenido/:id',
      templateUrl: 'templates/contenido.html',
      resolve: {
          // para cargar datos antes de cargar el controller
          datosTemplate: function(templateService,$stateParams){
              return templateService.get(2,$stateParams.id);
          }
      },
      controller: 'ContenidoCtrl'
  });

  $stateProvider.state('app.consulta', {
      url: '/consulta/:id',
      templateUrl: 'templates/consulta.html'
  });


  $stateProvider.state('app.resultados', {
      url: '/resultados/:id',
      templateUrl: 'templates/resultados.html'
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
