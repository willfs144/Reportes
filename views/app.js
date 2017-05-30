//Define an angular module for our app
var app = angular.module('sampleApp', ['ngRoute', 'ngMaterial', 'ngMessages', 'ui.calendar', 'ui.bootstrap']);

//rutas del inicio session
app.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/', {			
			templateUrl: 'main/login.html',
			controller: 'loginController'
		}).
		when('/dashboard', {			
			templateUrl: 'start/initiate.html',
			controller: 'initiateController',
			controller: 'dashboardController'
		}).
		when('/signup',{
			templateUrl: 'main/signup.html',
			controller: 'signupController'
		}).
		when('/addprocess',{
			templateUrl: 'process/add-process.html',
			controller: 'addProcessController',
			controller: 'dashboardController'
		}).
		when('/calendar',{
			templateUrl: 'calendar/calendario.html',
			controller: 'myNgController',
			controller: 'dashboardController'
		}).
		otherwise({
			redirectTo: '/'
			});
	}]);

app.config(function($mdThemingProvider) {
   $mdThemingProvider
    .theme('default')  
    .primaryPalette('blue',{
      'default': '900',
      'hue-2': '500'
    })
    .accentPalette('indigo')
    .warnPalette('red')
    .backgroundPalette('grey');
  });

app.run(function($rootScope, $location, sessionService){
	var routespermission= ['/dashboard','/addprocess','/calendar'];
	$rootScope.$on('$routeChangeStart', function(){
		if(routespermission.indexOf($location.path()) !=-1 && !sessionService.isLogged()){
			$location.path("/");
		}
	});

});