
(function () {  

	'use strict';
	angular.module('app.controllers', []);

	function homeCtrl($rootScope) {
		var home = this;
		$rootScope.titulo = 'Bienvenido';

		this.elimina = function(id){
			alert('Vas a eliminar el onbjeto: ' + id);
		}
	};


	function createCtrl($rootScope) {
		
		var app = this;
		var indice;
		$rootScope.titulo = '';

		app.inicio = function(){

			app.titulo = 'Nueva Aplicación';
			app.templates = [];
			app.menus = [];
			app.categoria = '';
			app.categorias = [{'id':1,'name':'menu'},{'id':2,'name':'secciones'},{'id':3,'name':'contenido'},{'id':4,'name':'consultas'},{'id':5,'name':'resultados'}]
			app.nuevo = false;
			app.modifica = false;
			app.muestra = '';
			app.tituloMuestra = 'Agregar Items de menu';
			app.datos = {
				nombre:'',
				descripcion:'',
				imagen:'',
				status:true,
				templates:app.templates,
				menus:app.menus
			}

			app.limpiavariabes();

		};

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

		app.addInfo = function(index){

			indice = index;
			var categoria = app.templates[index].categoria;
			
			app.modifica = true;

			if (categoria == 1) {
				app.tituloMuestra = 'Agregar Items de menu';
				app.muestra = 'menu';
			}else if (categoria == 2) {
				app.tituloMuestra = 'Agregar Items de seccion';
				app.muestra = 'secciones';
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



	};

	angular    
	.module('app.controllers')  
	.controller('homeCtrl',homeCtrl)
	.controller('createCtrl',createCtrl);

})();

