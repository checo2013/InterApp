
(function () {  

	'use strict';
	angular.module('app.controllers', ['app.services','ngFileUpload']);

	function homeCtrl($rootScope) {
		var home = this;
		$rootScope.titulo = 'Bienvenido';

		home.nuevaReceta = function(id){
			alert('Vas a eliminar el onbjeto: ' + id);
		}
	};


	function createCtrl($rootScope,aplicacion,categorias,Upload) {
		
		var app = this;
		var indice;
		$rootScope.titulo = '';
		

		app.inicio = function(){

			app.titulo = 'Nueva Aplicación';
			app.templates = [];
			app.menus = [];
			app.secciones = [];
			app.categoria = '';
			app.nuevo = false;
			app.modifica = false;
			app.muestra = '';
			app.tituloMuestra = '';
			app.datos = {
				nombre:'',
				descripcion:'',
				imagen:'',
				status:true,
				templates:app.templates,
				menus:app.menus,
				secciones:app.secciones
			}

			app.categorias = categorias.data;
			app.limpiavariabes();



		};

		app.guardaAplicacion = function(){

			// aplicacion.guardar(app.datos);
			console.log(app.datos);
		}

		app.limpiavariabes = function(){
			app.categoria = '';
			app.nombre = '';
			app.descripcion = '';
			app.principal = false;
			app.status = true;
			app.menu = false;
		};

		app.nuevoTemplate = function(){

			app.nuevo = true;
			$('#modal1').openModal();
			
		};

		app.editarTemplate = function(index){

			indice = index;
			app.nuevo = false;
			var template = app.templates[index];

			app.nombre = template.nombre;
			app.categoria = template.categoria;
			app.descripcion = template.descripcion;
			app.principal = template.principal;
			app.status = template.status;

			$('#modal1').openModal();
		};


		app.guardaTemplate = function(){

			app.templates.push({
				nombre:app.nombre,
				categoria:app.categoria,
				descripcion:app.descripcion,
				principal:app.principal,
				status:app.status
			});

			app.limpiavariabes();

			Materialize.toast('Vista agregada a tu aplicación', 4000) 
			
		};


		app.actualizaTemplate = function(){
			
			app.templates[indice].nombre = app.nombre;
			app.templates[indice].categoria = categoria;
			app.templates[indice].descripcion = app.descripcion;
			app.templates[indice].principal = app.principal;
			app.templates[indice].status = app.status;
			
			app.limpiavariabes();

			Materialize.toast('Vista actualizada', 4000);
			// app.nuevo = false;
		};

		app.addInfo = function(index){

			indice = index;
			var categoria = app.templates[index].categoria;
			
			app.modifica = true;
			app.sinimg = true;

			if (categoria == 1) {
				app.tituloMuestra = 'Agregar Items de menu';
				app.muestra = 'menu';
				app.templates[index].menus = [];
				app.itemsMenu = [];
			}else if (categoria == 2) {
				app.tituloMuestra = 'Agregar Items de seccion';
				app.muestra = 'seccion';
				app.templates[index].secciones = [];
			}else if (categoria == 3) {
				app.tituloMuestra = 'Agregar contenido';
				app.muestra = 'contenido';
			}else if (categoria == 4) {
				app.tituloMuestra = 'Agregar consulta';
				app.muestra = 'consultas';
			}else if (categoria == 5){
				app.tituloMuestra = 'Agregar detalle';
				app.muestra = 'resultado';
			}

		};

		app.addMenu = function(){

			app.itemsMenu.push({
				nombre:app.nombreMenu,
				descripcion:app.descripcionMenu,
				image:'',
				destino:app.templateMen
			});
			app.templates[indice].menus.push({
				nombre:app.nombreMenu,
				descripcion:app.descripcionMenu,
				image:'',
				destino:app.templateMen
			});


			app.nombreMenu = '';
			app.descripcionMenu = '';
			app.templateMe = '';
			app.sinimg = true;

			Materialize.toast('Item agregado', 4000);

		}

		app.removeMenu = function(index){
			app.itemsMenu.splice(index,1);
			app.templates[indice].menus.splice(index,1);
		}	

		app.imagenApp = function (files) {
	        if (files && files.length) {
	        	for (var i = 0; i < files.length; i++) {
		            var file = files[i];
		            console.log(file);
		            app.sinimg = false;
		        }
	        }
	    };

		app.imagenMenu = function (files) {
	        if (files && files.length) {
	        	for (var i = 0; i < files.length; i++) {
		            var file = files[i];
		            console.log(file);
		            app.sinimg = false;
		        }
	        }
	    };

	    app.imagenSeccion = function (files) {
	        if (files && files.length) {
	        	for (var i = 0; i < files.length; i++) {
		            var file = files[i];
		            console.log(file);
		            app.sinimg = false;
		        }
	        }
	    };

	    app.imagenContenido = function (files) {
	        if (files && files.length) {
	        	for (var i = 0; i < files.length; i++) {
		            var file = files[i];
		            console.log(file);
		            app.sinimg = false;
		        }
	        }
	    };

	};

	angular    
	.module('app.controllers')  
	.controller('homeCtrl',homeCtrl)
	.controller('createCtrl',createCtrl);

})();

