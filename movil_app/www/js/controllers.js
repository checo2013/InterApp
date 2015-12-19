angular.module('starter.controllers', ['app.services'])

.controller('LoginCtrl', function($scope,sesion,mensajes,$ionicModal) {
    
  $scope.inicio = function(){
    // inicializa los datos del formulario
    // eag10@live.com.mx
    // 60003734

    // cvalle@vitro.com
    // 60000802
    $scope.datos = {
      email:'',
      password:'',
      aceptar:false,
      recordar:false
    }
  }

  // ejectua el login
  $scope.login = function(){
    
    if ($scope.datos.aceptar) {
      sesion.login($scope.datos);
    }else{
      mensajes.alerta('Error','Debes aceptar los terminos y condiciones');
    }
  }


  $ionicModal.fromTemplateUrl('termino.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };

})


.controller('MenuCtrl', function($scope,$stateParams,datosTemplate,templateService) {

    $scope.tamplate = datosTemplate.data;

    $scope.inicio = function(){

    }

    $scope.ir = function(id){
      templateService.set(id);
    }
})


.controller('SeccionCtrl', function($scope,$stateParams,templateService,datosTemplate) {

    $scope.otro = datosTemplate.data;

    $scope.inicio = function(){

    }

    $scope.ir = function(id){
      templateService.set(id);
    }
})


.controller('ContenidoCtrl', function($scope,$stateParams,templateService,datosTemplate) {

    $scope.contenido = datosTemplate.data;
    $scope.inicio = function(){

    }

})

.controller('PolizaCtrl', function($scope,$stateParams,templateService,datosTemplate) {

    $scope.poliza = datosTemplate.data;
    $scope.inicio = function(){

    }

})

.controller('GastosCtrl', function($scope,$ionicSideMenuDelegate) {

  $scope.llamar = function () {
      var call = "tel: 01-800-911-9999";
      document.location.href = call;
  }

})

.controller('BusquedaInterHospitalesCtrl', function($scope,$state, info, consultas,mensajes) {

  $scope.estados = info[0].data;
  // $scope.ciudades = info[1].data;

  $scope.datos = {
    estado:'',
    ciudad:''
  }

  $scope.CiudadEstado = function(estado){
    consultas.ciudades(estado).success(function (data){
      $scope.ciudades = data;
    });
  }

  $scope.buscar = function() {

      if ($scope.datos.estado == '' || $scope.datos.ciudad == '') {
        mensajes.alerta('Incompleto','Debes Ingresar todos los campos');
      }else{
        $state.go('app.interhospitales',{estado:$scope.datos.estado,ciudad:$scope.datos.ciudad});  
      }
  };

})

.controller('BusquedaDirectorioCtrl', function($scope,$state,$timeout,loading, info,consultas,mensajes) {

  $scope.especialidades = info[0].data;
  $scope.estados = info[1].data;
  // $scope.ciudades = info[2].data;

  $scope.datos = {
    estado:'',
    ciudad:'',
    especialidad:''
  }

  $scope.CiudadEstado = function(estado){
    consultas.ciudades(estado).success(function (data){
      $scope.ciudades = data;
    });
  }

  $scope.EspecialidadesCiudadEstado = function(estado,ciudad){
    consultas.especialidadesDisponibles(estado,ciudad).success(function (data){
      $scope.especialidades = data;
    });
  }

  $scope.buscar = function() {
    
    if ($scope.datos.estado == '' || $scope.datos.ciudad == '' || $scope.datos.especialidad == '') {
      mensajes.alerta('Incompleto','Debes Ingresar todos los campos');
    }else{
      $state.go('app.directorios',{estado:$scope.datos.estado,ciudad:$scope.datos.ciudad,especialidad:$scope.datos.especialidad});
    }

  };

})

.controller('MedicosCtrl', function($scope,info,loading) {
  loading.fin();
  console.log(info.data);
  $scope.medicos = info.data;
})


.controller('BusquedaHospitalesCtrl', function($scope,$state, info,consultas,mensajes) {

  $scope.estados = info[0].data;
  // $scope.ciudades = info[1].data;

  $scope.datos = {
    estado:'',
    ciudad:''
  }

  $scope.CiudadEstado = function(estado){
    consultas.ciudades(estado).success(function (data){
      $scope.ciudades = data;
    });
  }

  $scope.buscar = function() {
    
    if ($scope.datos.estado == '' || $scope.datos.ciudad == '') {
      mensajes.alerta('Incompleto','Debes Ingresar todos los campos');
    }else{
      $state.go('app.hospitales',{estado:$scope.datos.estado,ciudad:$scope.datos.ciudad});
    }

  };

})


.controller('BusquedaCristalesCtrl', function($scope,$state, info,consultas,mensajes) {

  $scope.estados = info[0].data;
  // $scope.ciudades = info[1].data;

  $scope.datos = {
    estado:'',
    ciudad:''
  }

  $scope.CiudadEstado = function(estado){
    consultas.ciudades(estado).success(function (data){
      $scope.ciudades = data;
    });
  }

  $scope.buscar = function() {
    if ($scope.datos.estado == '' || $scope.datos.ciudad == '') {
      mensajes.alerta('Incompleto','Debes Ingresar todos los campos');
    }else{
      $state.go('app.cristales',{estado:$scope.datos.estado,ciudad:$scope.datos.ciudad});
    }

  };

})

.controller('HospitalesCtrl', function($scope,info,loading) {
  loading.fin();
  console.log(info.data);
  $scope.hospitales = info.data;
})


.controller('InterHospitalesCtrl', function($scope,info,loading) {
  loading.fin();
  $scope.hospitales = info.data;
})


.controller('CristalesCtrl', function($scope,info,loading) {
  loading.fin();
  $scope.convenios = info.data;
})


.controller('ModulosHospitalesCtrl', function($scope,$state,$timeout,loading) {
  $scope.buscar = function() {
    loading.inicio();
    $timeout(function(){
      loading.fin();
      $state.go('app.busquedamodulohospitales');
    },500);
  };
})


.controller('perfilCtrl', function($scope,$state, datos,mensajes, loading) {

  var info = datos.data;
  loading.fin();
  // console.log(info);

  $scope.edita = false;

  $scope.datos = {
    nombre:info.nombre,
    apellidoP:info.paterno,
    apellidoM:info.materno,
    email:info.email,
    password:'',
    password2:''
  }

  $scope.guardar = function() {

  };

})
