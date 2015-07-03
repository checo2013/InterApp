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

    $rootScope.username = username;
    $rootScope.nombre = storage.get('nombre','');

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

  $rootScope.$on('$stateChangeStart', function(event, toState){ 

      // console.log(toState);

  })


})

.filter('confiable', ['$sce', function($sce){
    return function(text) {
        return $sce.trustAsHtml(text);
    };
}])


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

  $stateProvider.state('app.poliza', {
      url: '/poliza/:id',
      templateUrl: 'templates/poliza.html',
      resolve: {
          // para cargar datos antes de cargar el controller
          datosTemplate: function(templateService,$stateParams){
              return templateService.get(6,$stateParams.id);
          }
      },
      controller: 'PolizaCtrl'
  });

  $stateProvider.state('app.consulta', {
      url: '/consulta/:id',
      templateUrl: 'templates/consulta.html'
  });


  $stateProvider.state('app.resultados', {
      url: '/resultados/:id',
      templateUrl: 'templates/resultados.html'
  });

  $stateProvider.state('app.digital', {
      url: '/digital',
      templateUrl: 'templates/digital.html'
  });


  // vistas para validaciones
  $stateProvider.state('app.nogmm', {
      url: '/nogmm',
      templateUrl: 'templates/nogmm.html'
  });

  $stateProvider.state('app.noautomovil', {
      url: '/noautomovil',
      templateUrl: 'templates/noautomovil.html'
  });

  $stateProvider.state('app.nocasa', {
      url: '/nocasa',
      templateUrl: 'templates/nocasa.html'
  });

  $stateProvider.state('app.novida', {
      url: '/novida',
      templateUrl: 'templates/novida.html'
  });


  // menu red medica aun sin desarrollo y se queda manual
    $stateProvider.state('app.redmedica', {
        url: '/redmedica',        
        templateUrl: 'templates/redmedica.html'
        
    });

      // busqueda de directorio de medicos
      $stateProvider.state('app.busquedadirectorio', {
          url: '/busquedadirectorio',          
          templateUrl: 'templates/busquedadirectorio.html',
          controller:'BusquedaDirectorioCtrl',
          resolve:{
            info:function($q,loading,consultas){

                loading.inicio();

                var promesa      = $q.defer(),
                    especialidades = consultas.especialidades(),
                    estados       = consultas.estados(),
                    ciudades     = consultas.ciudades();

                $q.all([especialidades,estados,ciudades]).then(function (data){
                  loading.fin();
                  promesa.resolve(data);
                });

                return promesa.promise;

            }
          }
          
      });

      // directorio
      $stateProvider.state('app.directorios', {
          url: '/directorios/:estado/:ciudad/:especialidad',          
          templateUrl: 'templates/directorios.html',
          controller:'MedicosCtrl',
          resolve:{
            info:function($stateParams,loading,consultas){
              loading.inicio();
                return consultas.medicos($stateParams.estado,$stateParams.ciudad,$stateParams.especialidad);
            }
          }
      });


      // busqueda de hospitales
      $stateProvider.state('app.busquedahospitales', {
          url: '/busquedahospitales',          
          templateUrl: 'templates/busquedahospitales.html',
          controller:'BusquedaHospitalesCtrl',
          resolve:{
            info:function($q,loading,consultas){

                loading.inicio();

                var promesa      = $q.defer(),                    
                    estados       = consultas.estados(),
                    ciudades     = consultas.ciudades();

                $q.all([estados,ciudades]).then(function (data){
                  loading.fin();
                  promesa.resolve(data);
                });

                return promesa.promise;

            }
          }
          
      });


      // resultado hospitales
      $stateProvider.state('app.hospitales', {
          url: '/hospitales/:estado/:ciudad',          
          templateUrl: 'templates/hospitales.html',
          controller:'HospitalesCtrl',
          resolve:{
            info:function($stateParams,loading,consultas){
              loading.inicio();
                return consultas.hospitales($stateParams.estado,$stateParams.ciudad);
            }
          }
          
      });


    // menu  beneficios inter
    $stateProvider.state('app.beneficios', {
        url: '/beneficios',        
        templateUrl: 'templates/beneficios.html'
        
    });

      // busqueda de hospitales inter
      $stateProvider.state('app.busquedainterhospitales', {
          url: '/busquedainterhospitales',          
          templateUrl: 'templates/busquedainterhospitales.html',
          controller:'BusquedaInterHospitalesCtrl',
          resolve:{
            info:function($q,loading,consultas){

                loading.inicio();

                var promesa      = $q.defer(),                    
                    estados       = consultas.estados(),
                    ciudades     = consultas.ciudades();

                $q.all([estados,ciudades]).then(function (data){
                  loading.fin();
                  promesa.resolve(data);
                });

                return promesa.promise;

            }
          }
          
      });

      // resultado hospitales inter
      $stateProvider.state('app.interhospitales', {
          url: '/interhospitales/:estado/:ciudad',          
          templateUrl: 'templates/interhospitales.html',
          controller:'InterHospitalesCtrl',
          resolve:{
            info:function($stateParams,loading,consultas){
              loading.inicio();
                return consultas.interhospitales($stateParams.estado,$stateParams.ciudad);
            }
          }
          
      });

      // menu convenios
      $stateProvider.state('app.conveniosinter', {
          url: '/conveniosinter',          
          templateUrl: 'templates/conveniosinter.html' 
      });

        // menu laboratorios
        $stateProvider.state('app.laboratorios', {
            url: '/laboratorios',            
            templateUrl: 'templates/laboratorios.html',
            resolve:{
              info:function(loading,consultas){
                loading.inicio();
                return consultas.conveniosinter(9);
              }
            },
            controller:function($scope,info,loading){
              loading.fin();
              $scope.laboratorios = info.data;
            }
        });

        // menu checkups
        $stateProvider.state('app.checkups', {
            url: '/checkups',            
            templateUrl: 'templates/checkups.html'
            
        });

          // menu checkups hospitales grupo angeles
          $stateProvider.state('app.checkangeles', {
              url: '/checkangeles',              
              templateUrl: 'templates/checkangeles.html'
      
          });

          // menu checkups hospital medica sur
          $stateProvider.state('app.checksur', {
              url: '/checksur',              
              templateUrl: 'templates/checksur.html'
      
          });

        // menu clinicas de cirugia ambulatoria
        $stateProvider.state('app.clinicas', {
            url: '/clinicas',            
            templateUrl: 'templates/clinicas.html',
            resolve:{
              info:function(loading,consultas){
                loading.inicio();
                return consultas.conveniosinter(5);
              }
            },
            controller:function($scope,info,loading){
              loading.fin();
              $scope.convenios = info.data;
            }
            
        });

        // busqueda cristales
        $stateProvider.state('app.busquedacristales', {
            url: '/busquedacristales',              
            templateUrl: 'templates/busquedacristales.html',
            controller:'BusquedaCristalesCtrl',
            resolve:{
              info:function($q,loading,consultas){

                  loading.inicio();

                  var promesa      = $q.defer(),                    
                      estados       = consultas.estados(),
                      ciudades     = consultas.ciudades();

                  $q.all([estados,ciudades]).then(function (data){
                    loading.fin();
                    promesa.resolve(data);
                  });

                  return promesa.promise;

              }
            }
    
        });
        
          // menu cristales
          $stateProvider.state('app.cristales', {
              url: '/cristales/:estado/:ciudad',            
              templateUrl: 'templates/cristales.html',
              controller:'CristalesCtrl',
              resolve:{
                info:function($stateParams,loading,consultas){
                  loading.inicio();
                    return consultas.conveniosinterEstado(2,$stateParams.estado,$stateParams.ciudad);
                }
              }
              
          });


        // menu talleres
        $stateProvider.state('app.talleres', {
            url: '/talleres',            
            templateUrl: 'templates/talleres.html',
            resolve:{
              info:function(loading,consultas){
                loading.inicio();
                return consultas.conveniosinter(1);
              }
            },
            controller:function($scope,info,loading){
              loading.fin();
              $scope.convenios = info.data;
            }
            
        });

        // menu convenios hospitales
        $stateProvider.state('app.convenioshospitales', {
            url: '/convenioshospitales',            
            templateUrl: 'templates/convenioshospitales.html',
            resolve:{
              info:function(loading,consultas){
                loading.inicio();
                return consultas.conveniosinter(3);
              }
            },
            controller:function($scope,info,loading){
              loading.fin();
              $scope.convenios = info.data;
            }
        });

        // menu convenios red medica
        $stateProvider.state('app.conveniosredmedica', {
            url: '/conveniosredmedica',            
            templateUrl: 'templates/conveniosredmedica.html',
            resolve:{
              info:function(loading,consultas){
                loading.inicio();
                return consultas.conveniosinter(6);
              }
            },
            controller:function($scope,info,loading){
              loading.fin();
              $scope.convenios = info.data;
            }
        });

        // menu ambulancias
        $stateProvider.state('app.ambulancias', {
            url: '/ambulancias',            
            templateUrl: 'templates/ambulancias.html',
            resolve:{
              info:function(loading,consultas){
                loading.inicio();
                return consultas.conveniosinter(8);
              }
            },
            controller:function($scope,info,loading){
              loading.fin();
              $scope.convenios = info.data;
            }
        });

        // menu farmacias
        $stateProvider.state('app.farmacias', {
            url: '/farmacias',            
            templateUrl: 'templates/farmacias.html',
            resolve:{
              info:function(loading,consultas){
                loading.inicio();
                return consultas.conveniosinter(10);
              }
            },
            controller:function($scope,info,loading){
              loading.fin();
              $scope.convenios = info.data;
            }
            
        });

        // menu servicios enfermeria
        $stateProvider.state('app.enfermeria', {
            url: '/enfermeria',            
            templateUrl: 'templates/enfermeria.html',
            resolve:{
              info:function(loading,consultas){
                loading.inicio();
                return consultas.conveniosinter(11);
              }
            },
            controller:function($scope,info,loading){
              loading.fin();
              $scope.convenios = info.data;
            }
        });



  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

})


