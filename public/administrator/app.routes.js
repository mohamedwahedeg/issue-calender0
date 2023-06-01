angular.module('appRoutes', ['ngRoute'])


.config(function($routeProvider, $locationProvider) {

  $routeProvider

    .when('/', {
      templateUrl: 'administrator/views/home.html',
      controller: 'home'
    })
    .when('/login', {
			templateUrl: 'views/login.html',
            controller: 'login',
            class: 'login'
		})
    .when('/logout', {
			templateUrl: 'views/logout.html',
            controller: 'logout'
		})
  
  
  
  $locationProvider.html5Mode(true);

  })
