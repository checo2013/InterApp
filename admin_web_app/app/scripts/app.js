
(function () {  

	'use strict';

	angular.module('app', [
		'ui.router',
		'app.controllers',
		'ngMessages',
		'ui.materialize',
		'ngFileUpload'
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
			controller: "createCtrl",
			controllerAs: "app"
		});
		// .state('index.app', {
		// 	url: 'app/:id',
		// 	templateUrl: "views/app.html",
		// 	controller: "appCtrl",
		// 	controllerAs: "app"
		// });
	  
	};



	function run($rootScope, $state) {
		
 
	};

	angular    
	.module('app')   
	.config(config)
	.run(run);

})();

