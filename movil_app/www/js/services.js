//servicio que verifica sesiones de usuario
function sesion($rootScope, $http, $q, url, $ionicLoading, $ionicPopup, $state, storage){
    return{
        login : function(credenciales)
        {   
            $ionicLoading.show({
                template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
            });

            $http.post(url + 'movil/login',credenciales).success(function (data){

                if (credenciales.recordar) {
                    storage.set('username',data.completo);
                    storage.set('nombre',data.nombre + ' ' + data.paterno);
                };

                storage.set('user',data.id);

                storage.set('GMM',false);
                storage.set('AUTO',false);
                storage.set('VIDA',false);
                storage.set('CASA',false);


                angular.forEach(data.polizas,function (poliza){
          
                    if (poliza.name == 'GMM'){
                        storage.set('GMM',true);
                    } 

                    if(poliza.name == 'AUTO'){
                        storage.set('AUTO',true);
                    } 

                    if(poliza.name == 'VIDA'){
                        storage.set('VIDA',true);
                    } 

                    if(poliza.name == 'CASA'){
                        storage.set('CASA',true);
                    }

                });

                $rootScope.completo = data.completo;
                $rootScope.nombre = data.nombre + ' ' + data.paterno;

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


function templateService($http,$state,url,$q,verificaPermisos,storage){
    return{
        get:function(categoria,id){

            var promesa = $q.defer();

            var info = $http.get(url + 'movil/template/' + id + '/' + categoria + '/' + storage.get('user'));

            $q.when(info).then(function (data){

                console.log(categoria);

                if (categoria == 5) {

                    var seccion = data.data.name;
                    console.log(seccion);

                    if (seccion == 'Gastos médicos mayores' || seccion == 'Automovil' || seccion == 'Vida' || seccion == 'Casa Habitación') {
                        
                        console.log('Si es una seccion a validar');
                        if(verificaPermisos.seccion(seccion)){

                            promesa.resolve(data);  

                        };
                        
                    }else{

                        promesa.resolve(data);

                    }


                }else{
                    promesa.resolve(data);
                }
            });

            return promesa.promise;
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


function verificaPermisos(storage,$q,$state){
    return{
        seccion:function(sitio){

            if (sitio == 'Gastos médicos mayores' && storage.get('GMM') == 'true'){
                console.log('si hay GMM');
                return true;
            }else if(sitio == 'Automovil' && storage.get('AUTO') == 'true'){
                console.log('si hay AUTO');
                return true;
            }else if(sitio == 'Vida' && storage.get('VIDA') == 'true'){
                console.log('si hay VIDA');
                return true;
            }else if(sitio == 'Casa Habitación' && storage.get('CASA') == 'true'){
                console.log('si hay CASA');
                return true;
            }else{

                if (sitio == 'Gastos médicos mayores'){
                    $state.go('app.nogmm');
                }else if(sitio == 'Automovil'){
                    $state.go('app,noautomovil');
                }else if(sitio == 'Vida'){
                    $state.go('app.novida');
                }else if(sitio == 'Casa Habitación'){
                    $state.go('app.nocasa');
                }

            }

        }
    }
}


function consultas($http,url){
    return{
        ciudades:function(estado){
            return $http.get(url + 'movil/ciudades/' + estado);
        },
        estados:function(){
            return $http.get(url + 'movil/estados');
        },
        especialidades:function(){
            return $http.get(url + 'movil/especialidades');
        },
        medicos:function(estado,ciudad,especialidad){
            return $http.get(url + 'movil/medicos/' + estado + '/' + ciudad + '/' + especialidad);
        },
        hospitales:function(estado,ciudad){
            return $http.get(url + 'movil/hospitales/' + estado + '/' + ciudad);
        },
        interhospitales:function(estado,ciudad){
            return $http.get(url + 'movil/interhospitales/' + estado + '/' + ciudad);
        },
        conveniosinter:function(tipo){
            return $http.get(url + 'movil/conveniosinter/' + tipo);
        },
        conveniosinterEstado:function(tipo,estado,ciudad){
            return $http.get(url + 'movil/conveniosinter/' + tipo + '/' + estado + '/' + ciudad);
        }
    }
}


sesion.$inject = ['$rootScope', '$http', '$q', 'url','$ionicLoading','$ionicPopup','$state','storage'];
loading.$inject = ['$ionicLoading'];
mensajes.$inject = ['$ionicPopup'];
storage.$inject = ['$window'];
templateService.$inject = ['$http','$state','url','$q','verificaPermisos','storage'];
verificaPermisos.$inject = ['storage','$q','$state'];
consultas.$inject = ['$http', 'url'];

angular.module('app.services', ['ngResource'])
.constant('url', 'http://iterapp.daseda.net/api/')
// .constant('url', 'http://localhost/interapp/public/api/')
.factory("sesion",sesion)
.factory("loading",loading)
.factory("mensajes",mensajes)
.factory("storage",storage)
.factory("templateService",templateService)
.factory("verificaPermisos",verificaPermisos)
.factory("consultas",consultas)








