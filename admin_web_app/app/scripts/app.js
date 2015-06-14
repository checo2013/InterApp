
(function () {  

	'use strict';

	angular.module('app', [
		'ui.router',
		'app.controllers',
		'app.services',
		'ngMessages',
		'ngSanitize',
		'ngMeditor',
		'ui.materialize'
	]);

	function config($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise("/home");

		$stateProvider
		.state('index', {
			url: "/",
			templateUrl: "views/dashboard.html"
		})
		.state('index.home', {
			url: 'home',
			templateUrl: "views/home.html",
			controller: "homeCtrl",
			controllerAs: "home"
		})
		.state('index.create', {
			url: 'app',
			templateUrl: "views/app.html",
			resolve:{
				categorias:function(consulta){
					return consulta.categorias(1);
				}
			},
			controller: "createCtrl",
			controllerAs: "app"
		});
	  
	};



	function run($rootScope, $state) {
		
 
	};

	angular    
	.module('app')   
	.config(config)
	.run(run);

})();

