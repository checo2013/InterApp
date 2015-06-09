//servicio que verifica sesiones de usuario
function sesion($rootScope, $http, $q, url, $state, storage){
    return{
        login : function(credenciales)
        {   

            $http.post(url + 'login',credenciales).success(function (data){


                if (credenciales.recordar) {
                    storage.set('username',data.username);
                };

                $rootScope.username = data.username;


            }).error(function (data){

            });

            //$rootScope.mensaje = 'El usuario o password son incorrectos';
        },
        logout : function()
        {
            storage.remove('username');
            $state.go('login');
        },
        verify : function(url)
        {
        }
    }
}



function loading(){
    return{
        inicio:function(){

        },
        fin:function(){
         
        }
    }
}


function mensajes(){
    return{
        alerta:function(titulo,mensaje){
         
        },
        confirmación:function(mensaje){
            
        },
        popup:function(mensaje){
            
        }
    }
}


function storage($window){
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    },
    remove: function(key) {
        $window.localStorage.removeItem(key);
    }
  }
}


function aplicacion(storage,$http){
  return {
    consulta: function(id) {
     
    },
    guardar: function(datos) {
     console.log(datos);
    }
  }
}


function consulta($http){
  return {
    categorias: function(id) {
        return $http.get('data/categorias.json');
    }
  }
}



sesion.$inject = ['$rootScope', '$http', '$q', 'url','$state','storage'];
loading.$inject = [];
mensajes.$inject = [];
storage.$inject = ['$window'];
aplicacion.$inject = ['storage','$http'];
consulta.$inject = ['$http'];


angular.module('app.services', [])
.constant('url', 'http://iterapp.daseda.net/api/')
// .constant('url', 'http://localhost/interapp/public/api/')
.factory("sesion",sesion)
.factory("loading",loading)
.factory("mensajes",mensajes)
.factory("storage",storage)
.factory("aplicacion",aplicacion)
.factory("consulta",consulta)