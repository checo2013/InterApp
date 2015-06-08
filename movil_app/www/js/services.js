//servicio que verifica sesiones de usuario
function sesion($rootScope, $http, $q, url, $ionicLoading, $ionicPopup, $state, storage){
    return{
        login : function(credenciales)
        {   
            $ionicLoading.show({
                template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
            });

            $http.post(url + 'login',credenciales).success(function (data){


                if (credenciales.recordar) {
                    storage.set('username',data.username);
                };

                $rootScope.username = data.username;

                // // esta aplicacion simpre sera la 1
                $http.get(url + 'movil/app/1').success(function (data){

                    var categoria = data.name;
                    var template_id = data.id;

                    $state.go('app.' + categoria,{id:template_id});
                    $ionicLoading.hide();

                });


            }).error(function (data){

                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: 'Upss',
                    template: '<div class="text-center">' + data.flash + "</div>"
                });

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



function loading($ionicLoading){
    return{
        inicio:function(){
            $ionicLoading.show({
                template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
            });
        },
        fin:function(){
            $ionicLoading.hide();
        }
    }
}


function templateService($http,$state,url){
    return{
        get:function(categoria,id){

            return $http.get(url + 'movil/template/' + id + '/' + categoria);
        },
        set:function(id){

            $http.get(url + 'movil/template/'+id).success(function (data){
                console.log(data);
                var categoria = data.name;
                var template_id = data.id;

                $state.go('app.' + categoria,{id:template_id});

            });
        }
    }
}


function mensajes($ionicPopup){
    return{
        alerta:function(titulo,mensaje){
            $ionicPopup.alert({
                title: titulo,
                template: '<div class="text-center">' + mensaje + "</div>"
            });
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



sesion.$inject = ['$rootScope', '$http', '$q', 'url','$ionicLoading','$ionicPopup','$state','storage'];
loading.$inject = ['$ionicLoading'];
mensajes.$inject = ['$ionicPopup'];
storage.$inject = ['$window'];
templateService.$inject = ['$http','$state','url'];


angular.module('app.services', ['ngResource'])
.constant('url', 'http://iterapp.daseda.net/api/')
// .constant('url', 'http://localhost/interapp/public/api/')
.factory("sesion",sesion)
.factory("loading",loading)
.factory("mensajes",mensajes)
.factory("storage",storage)
.factory("templateService",templateService)




