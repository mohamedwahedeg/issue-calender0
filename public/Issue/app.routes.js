angular.module('appRoutes', ['ngRoute'])


.config(function($routeProvider, $locationProvider) {

  $routeProvider
  
  .when('/reports2', {
    templateUrl: 'Issue/views/reports2.html',
    controller: 'reports0'
  })
    .when('/', {
      templateUrl: 'Issue/views/calendar.html',
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
  .when('/calendar', {
			templateUrl: 'views/calendar.html',
            controller: 'calendar'
		})
  .when('/add', {
			templateUrl: 'views/add_issue.html',
            controller: 'add'
		})
  .when('/issue_details', {
			templateUrl: 'views/issue_details.html',
            controller: 'issue_details'
		})
  
  .when('/issue_edit', {
			templateUrl: 'views/issue_edit.html',
            controller: 'issue_edit'
		})
    .when('/user', {
			templateUrl: 'views/user.html',
            controller: 'user'
		})
   .when('/report_today', {
			templateUrl: 'views/report_today.html',
            controller: 'report_today'
		})
  .when('/search_result', {
			templateUrl: 'views/search_result.html',
            controller: 'search_result'
		})
  .when('/reports0', {
			templateUrl: 'views/reports0.html',
            controller: 'reports0'
		})
  
    .when('/home-admin', {
        templateUrl: 'views/home.html',
        controller: 'home'
		})
  $locationProvider.html5Mode(true);

  })
